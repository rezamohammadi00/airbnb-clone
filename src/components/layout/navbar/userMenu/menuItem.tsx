"use client";
import Link from "next/link";

export const MenuItem = ({
  href = "",
  label,
}: {
  href?: string;
  label: string;
}) => {
  return (
    <Link
      href={href}
      className="px-4 py-3 hover:bg-neutral-100 transition font-bold"
    >
      {label}
    </Link>
  );
};
