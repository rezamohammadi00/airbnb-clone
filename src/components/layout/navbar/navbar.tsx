import Image from "next/image";
import Link from "next/link";
// GLOBAL
import { Container } from "@/components/layout/container";
// LOCAL
import { UserMenu } from "./userMenu";
import { Search } from "./search";

export const Navbar = () => {
  return (
    <nav className="w-full bg-white z-10 shadow-sm">
      {/* fixed class removed temporary*/}
      <div className="py-4 border-b">
        <Container>
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
            <Search />
            <UserMenu />
          </div>
        </Container>
      </div>
    </nav>
  );
};
