import { db } from "@/db";
import { accommodations } from "@/db/schema";
import { PageHeader } from "@/components/common/pageHeader";
import { AccommodationCard } from "@/components/common/accommodationCard";

export default async function AccommodationsPage() {
  const allAccommodations = await db.select().from(accommodations);

  return (
    <div className="space-y-6">
      <PageHeader
        title="اقامتگاها"
        description="برای ثبت اقامتگاه فرم زیر را تکمیل کنید."
      />
      <div className="grid grid-cols-5 gap-4">
        {allAccommodations.map((i) => (
          <AccommodationCard key={i.id} accommodation={i} />
        ))}
      </div>
    </div>
  );
}
