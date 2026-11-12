import Link from "next/link";
import {
  Hotel,
  House,
  Building2,
  Warehouse,
  Home,
  type LucideIcon,
} from "lucide-react";
//GLOBAL
import { db } from "@/db";
import { categories } from "@/db/schema";
import { Container } from "@/components/layout/container";
import { ROUTES } from "@/lib/routes";

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  hotel: Hotel,
  guesthouse: House,
  apartment: Building2,
  villa: Warehouse,
};

export const Categories = async () => {
  const all = await db.select().from(categories);
  return (
    <Container>
      <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto">
        {all?.map((item) => {
          const Icon = CATEGORY_ICONS[item.slug] ?? Home;
          return (
            <Link href={ROUTES.accommodations(item.slug)} key={item.id}>
              <div className="flex flex-col items-center justify-center gap-2 p-3 border-b-2 hover:text-neutral-800 transition cursor-pointer border-transparent text-neutral-500">
                <Icon size={26} />
                <div className="font-medium text-sm">{item.name}</div>
              </div>
            </Link>
          );
        })}
      </div>
    </Container>
  );
};
