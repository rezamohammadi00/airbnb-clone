import Image from "next/image";
import { eq } from "drizzle-orm";
//Global Imports
import { db } from "@/db";
import { accommodations } from "@/db/schema";
import { PageHeader } from "@/components/shared/pageHeader";
import { DatePickerWithRange } from "@/components/shared/datePickerWithRange";

export default async function AccommodationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const rows = await db
    .select()
    .from(accommodations)
    .where(eq(accommodations.id, id));

  return (
    <div className="space-y-6">
      <PageHeader
        title={rows?.[0]?.name ?? ""}
        description={rows?.[0]?.description ?? ""}
      />
      <div className="relative w-full h-[60vh] overflow-hidden rounded-xl">
        <Image
          fill
          src={"/images/card-placeholder.webp"}
          alt={""}
          className="object-cover w-full"
        />
      </div>
      <div>
        <DatePickerWithRange />
      </div>
    </div>
  );
}
