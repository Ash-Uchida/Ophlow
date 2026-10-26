"use client";

import { useMemo, useSyncExternalStore } from "react";
import { featuresFromSearch } from "@/lib/features";

const noSubscribe = () => () => {};

/** Features the visitor picked in the home page's builder, carried over in `?features=`. Empty while server-rendering. */
export function useUrlFeatures() {
  const search = useSyncExternalStore(noSubscribe, () => window.location.search, () => "");
  return useMemo(() => featuresFromSearch(search), [search]);
}
