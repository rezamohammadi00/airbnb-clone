//Global Imports
import { db } from "@/db";
import { categories } from "@/db/schema";
import { PageHeader } from "@/components/common/pageHeader";
//Local Imports
import { CreateAccommodationForm } from "./createAccommodationForm";

export default async function CreateAccommodationPage() {
  const all = await db.select().from(categories);

  return (
    <div className="space-y-6">
      <PageHeader
        title="اقامتگاه"
        description="برای ثبت اقامتگاه فرم زیر را تکمیل کنید."
      />
      <CreateAccommodationForm categories={all} />
    </div>
  );
}
