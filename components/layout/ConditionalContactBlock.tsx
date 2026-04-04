'use client';

import { usePathname } from "next/navigation";
import { ContactBlock } from "../contact/ContactBlock";

export function ConditionalContactBlock() {
  const pathname = usePathname();
  if (pathname.endsWith('/contact')) return null;
  return <ContactBlock />;
}
