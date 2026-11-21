"use client";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Menu } from "lucide-react";
//GLOBAL
import { Avatar } from "@/components/ui/avatar";
import { useToggle } from "@/hooks/useToggle";
import { COPY } from "@/lib/copy";
import { ROUTES } from "@/lib/routes";
import { useClickOutside } from "@/hooks/useClickOutside";
import { useSession, signOut } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
//LOCAL
import { MenuItem } from "./menuItem";
import { ModeToggle } from "./modeToggle";

const t = COPY.userMenu;
const USER_LINKS = [
  { label: t.links.trips, href: "/trips" },
  { label: t.links.favorites, href: "/favorites" },
  { label: t.links.reservations, href: "/reservations" },
  { label: t.links.properties, href: "/properties" },
  { label: "ثبت اقامتگاه جدید", href: "/accommodations/create" },
];

export const UserMenu = () => {
  const router = useRouter();

  const { data: session } = useSession();
  const isLogin = !!session?.user?.id;

  const { value: isOpen, toggle, setFalse } = useToggle();
  const boxRef = useClickOutside<HTMLDivElement>(setFalse);

  const pathname = usePathname();
  useEffect(() => {
    setFalse();
  }, [pathname, setFalse]);

  const handleSignOut = () =>
    signOut({
      fetchOptions: {
        onSuccess: () => {
          router.refresh();
        },
      },
    });

  return (
    <div ref={boxRef} className="relative">
      <div className="flex flex-row items-center gap-3">
        {/* <div className="hidden md:block text-sm font-bold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer">
          {t.hostCta}
        </div> */}
        <div className="p-4 md:py-1 md:px-2 border flex flex-row items-center gap-3 rounded-full">
          <Button variant="ghost" size="icon" onClick={toggle}>
            <Menu />
          </Button>
          <div className="hidden md:block">
            <Avatar src={""} />
          </div>
          <ModeToggle />
        </div>
      </div>
      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-background overflow-hidden left-0 top-12 text-sm">
          <div className="flex flex-col cursor-pointer">
            {isLogin ? (
              <>
                {USER_LINKS.map((link) => (
                  <MenuItem
                    key={link.href}
                    href={link.href}
                    label={link.label}
                  />
                ))}
                <MenuItem label={t.hostHome} href={ROUTES.home} />
                <hr />
                <button onClick={handleSignOut} className="flex">
                  <MenuItem label={t.logout} href={"#"} />
                </button>
              </>
            ) : (
              <MenuItem label={t.auth} href={ROUTES.sendOtp} />
            )}
          </div>
        </div>
      )}
    </div>
  );
};
