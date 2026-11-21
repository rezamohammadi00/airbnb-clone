import Image from "next/image";
//Global Imports
import { IAccommodation } from "@/db/schema";
import { Text } from "./typography";

type IAccommodationCardProps = {
  accommodation: IAccommodation;
};

export const AccommodationCard = ({
  accommodation,
}: IAccommodationCardProps) => {
  return (
    <section className="w-full flex flex-col gap-2">
      <div className="relative w-full h-52">
        <Image
          fill
          src={"/images/card-placeholder.webp"}
          alt={accommodation.name}
          className="object-cover rounded-xl"
        />
      </div>

      <Text variant={"h3"}>{accommodation?.name}</Text>

      <Text tone={"muted"}>
        {accommodation.province}،{accommodation.city}،{accommodation.capacity}
        نفر
      </Text>

      <div className="flex gap-1 items-center">
        <Text>{accommodation.pricePerNight} تومن</Text>
        <Text variant="small">/هرشب</Text>
      </div>
    </section>
  );
};
