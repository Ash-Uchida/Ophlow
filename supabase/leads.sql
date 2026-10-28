-- Demo bookings and setup forms from the landing page, stored in the product's Supabase project.
--
-- Lives in its own `leads` schema, which the API doesn't expose: nobody can read or change these tables from
-- outside. The site can only call the three functions at the bottom, with the publishable key. Read the rows in
-- the Supabase dashboard (Table Editor → schema "leads").
--
-- Applied by hand (SQL editor), not as a migration, so the product repo's migration history stays its own.
-- Safe to run again.

create schema if not exists leads;
revoke all on schema leads from public, anon, authenticated;

create table if not exists leads.demo_bookings (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  start_at timestamptz not null,
  end_at timestamptz not null,
  time_zone text not null,
  name text not null,
  email text not null,
  phone text,
  organization text not null,
  details jsonb not null default '{}'::jsonb,
  notes text,
  status text not null default 'booked' check (status in ('booked', 'cancelled'))
);

-- One demo per time slot. Cancelled ones free the slot again.
create unique index if not exists demo_bookings_one_per_slot on leads.demo_bookings (start_at) where status = 'booked';

create table if not exists leads.setup_requests (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  organization text not null,
  contact_name text not null,
  email text not null,
  answers jsonb not null
);

alter table leads.demo_bookings enable row level security;
alter table leads.setup_requests enable row level security;
revoke all on all tables in schema leads from public, anon, authenticated;

-- Save a demo booking. Returns the booking id, or raises 'slot_taken' if someone got there first.
create or replace function public.book_demo(booking jsonb)
returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare
  new_id uuid;
  starts timestamptz := (booking->>'start')::timestamptz;
  ends timestamptz := (booking->>'end')::timestamptz;
begin
  if starts is null or ends is null or ends <= starts or ends - starts > interval '2 hours'
     or starts < now() or starts > now() + interval '90 days' then
    raise exception 'invalid_time';
  end if;
  if coalesce(trim(booking->>'name'), '') = '' or coalesce(trim(booking->>'organization'), '') = ''
     or coalesce(booking->>'email', '') !~ '^[^\s@]+@[^\s@]+\.[^\s@]+$' or length(booking::text) > 20000 then
    raise exception 'invalid_booking';
  end if;
  insert into leads.demo_bookings (start_at, end_at, time_zone, name, email, phone, organization, details, notes)
  values (
    starts, ends,
    left(coalesce(booking->>'timeZone', 'UTC'), 80),
    left(trim(booking->>'name'), 120),
    left(trim(booking->>'email'), 200),
    left(booking->>'phone', 40),
    left(trim(booking->>'organization'), 160),
    coalesce(booking->'details', '{}'::jsonb),
    left(booking->>'notes', 2000)
  )
  returning id into new_id;
  return new_id;
exception when unique_violation then
  raise exception 'slot_taken';
end;
$$;

-- Booked start times in a window, so the calendar can hide them. Times only: no names or emails.
create or replace function public.taken_demo_slots(from_time timestamptz, to_time timestamptz)
returns setof timestamptz
language sql
stable
security definer
set search_path = ''
as $$
  select start_at from leads.demo_bookings
  where status = 'booked' and start_at >= from_time and start_at < least(to_time, from_time + interval '120 days')
  order by start_at;
$$;

-- Save a setup form. Returns its id.
create or replace function public.submit_setup(request jsonb)
returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare
  new_id uuid;
begin
  if coalesce(trim(request->>'organization'), '') = '' or coalesce(trim(request->>'contactName'), '') = ''
     or coalesce(request->>'email', '') !~ '^[^\s@]+@[^\s@]+\.[^\s@]+$' or length(request::text) > 50000 then
    raise exception 'invalid_setup';
  end if;
  insert into leads.setup_requests (organization, contact_name, email, answers)
  values (left(trim(request->>'organization'), 160), left(trim(request->>'contactName'), 120), left(trim(request->>'email'), 200), request->'answers')
  returning id into new_id;
  return new_id;
end;
$$;

revoke all on function public.book_demo(jsonb), public.taken_demo_slots(timestamptz, timestamptz), public.submit_setup(jsonb) from public;
grant execute on function public.book_demo(jsonb), public.taken_demo_slots(timestamptz, timestamptz), public.submit_setup(jsonb) to anon, authenticated;
