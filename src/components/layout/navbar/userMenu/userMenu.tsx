"use client";
import { Menu } from "lucide-react";
//GLOBAL
import { Avatar } from "@/components/ui/avatar";
import { useToggle } from "@/hooks/useToggle";
import { COPY } from "@/lib/copy";
//LOCAL
import { MenuItem } from "./menuItem";

const t = COPY.userMenu;
const USER_LINKS = [
  { label: t.links.trips, href: "/trips" },
  { label: t.links.favorites, href: "/favorites" },
  { label: t.links.reservations, href: "/reservations" },
  { label: t.links.properties, href: "/properties" },
];

export const UserMenu = () => {
  const currentUser = {};

  const { value: isOpen, toggle } = useToggle();

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer">
          {t.hostCta}
        </div>
        <div
          onClick={toggle}
          className="p-4 md:py-1 md:px-2 border border-neutral-100 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
        >
          <Menu />
          <div className="hidden md:block">
            <Avatar src={""} />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                {USER_LINKS.map((link) => (
                  <MenuItem
                    key={link.href}
                    href={link.href}
                    label={link.label}
                  />
                ))}
                <MenuItem label={t.hostHome} />
                <hr />
                <MenuItem label={t.logout} />
              </>
            ) : (
              <>
                <MenuItem label={t.login} />
                <MenuItem label={t.signup} />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
