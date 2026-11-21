import { db } from "@/db";
import { accommodations } from "@/db/schema";
import { PageHeader } from "@/components/shared/pageHeader";
import { AccommodationCard } from "@/components/shared/accommodationCard";

export default async function AccommodationsPage() {
  const allAccommodations = await db.select().from(accommodations);

  return (
    <div className="space-y-6">
      <PageHeader
        title="اقامتگاها"
        description="برای ثبت اقامتگاه فرم زیر را تکمیل کنید."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-4">
        {allAccommodations.map((i) => (
          <AccommodationCard key={i.id} accommodation={i} />
        ))}
      </div>
    </div>
  );
}
