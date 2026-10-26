import Image from "next/image";

export function Logo() {
  return <Image src="/logo.svg" alt="Ophlow" width={144} height={40} className="h-10 w-36 object-cover object-center" />;
}

/** The square Ophlow icon, for tight spots like the workspace sidebar. */
export function Mark({ className = "h-9 w-9" }: { className?: string }) {
  return <Image src="/icon.svg" alt="" width={36} height={36} className={`shrink-0 ${className}`} />;
}
