import Link from "next/link";
import { headers } from "next/headers";
import { and, eq } from "drizzle-orm";
//Global Imports
import { auth } from "@/lib/auth";
import { db } from "@/db";
import { accommodations, favorites } from "@/db/schema";
import { ROUTES } from "@/lib/routes";
import { PageHeader } from "@/components/shared/pageHeader";
import { AccommodationCard } from "@/components/shared/accommodationCard";

export default async function AccommodationsPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  const userId = session?.user.id ?? "";

  const rows = await db
    .select()
    .from(accommodations)
    .leftJoin(
      favorites,
      and(
        eq(favorites.accommodationId, accommodations.id),
        eq(favorites.userId, userId),
      ),
    );

  return (
    <div className="space-y-6">
      <PageHeader
        title="اقامتگاها"
        description="برای ثبت اقامتگاه فرم زیر را تکمیل کنید."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-4">
        {rows.map((i) => (
          <Link
            key={i.accommodations.id}
            href={ROUTES.accommodation.getHref({ id: i.accommodations.id })}
          >
            <AccommodationCard
              accommodation={i.accommodations}
              isFavorited={!!i?.favorites?.id}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
