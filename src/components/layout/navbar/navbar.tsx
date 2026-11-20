import Image from "next/image";
import Link from "next/link";
// GLOBAL
import { FilterSheet } from "@/components/features/accommodations/filterSheet";
// LOCAL
import { UserMenu } from "./userMenu";
import { Search } from "./search";
import { db } from "@/db";
import { categories } from "@/db/schema";

export const Navbar = async () => {
  const allCategories = await db.select().from(categories);

  return (
    <nav className="w-full z-10 shadow-sm">
      <div className="py-4 border-b container mx-auto">
        <div className="flex items-center justify-between gap-3 md:gap-0">
          {/* LOGO */}
          <Link href="/">
            <Image
              src="/images/logo.png"
              alt="logo"
              width={100}
              height={100}
              className="hidden md:block"
            />
          </Link>
          <FilterSheet categories={allCategories}>
            <Search />
          </FilterSheet>
          <UserMenu />
        </div>
      </div>
    </nav>
  );
};
