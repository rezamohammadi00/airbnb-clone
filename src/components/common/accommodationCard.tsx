import Image from "next/image";
//Global Imports
import { IAccommodation } from "@/db/schema";

type IAccommodationCardProps = {
  accommodation: IAccommodation;
};

export const AccommodationCard = ({
  accommodation,
}: IAccommodationCardProps) => {
  return (
    <section className="w-full flex flex-col gap-1">
      <div className="relative w-full h-52">
        <Image
          fill
          src={"/images/card-placeholder.webp"}
          alt={accommodation.name}
          className="object-cover rounded-xl"
        />
      </div>

      <div className="font-bold text-lg">{accommodation?.name}</div>
      <div className="text-muted-foreground">
        {accommodation.province}،{accommodation.city}،{accommodation.capacity}
        نفر
      </div>
      <div className="flex gap-1 text-sm">
        <p className="font-bold">{accommodation.pricePerNight} تومن</p>
        <p className="text-muted-foreground">/هرشب</p>
      </div>
    </section>
  );
};
