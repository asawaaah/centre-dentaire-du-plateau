'use client';

import { usePathname } from "next/navigation";
import { ContactBlock } from "../contact/ContactBlock";

export function ConditionalContactBlock() {
  const pathname = usePathname();
  if (pathname.endsWith('/contact') || pathname.endsWith('/carriere') || pathname.endsWith('/careers')) return null;
  return <ContactBlock />;
}
