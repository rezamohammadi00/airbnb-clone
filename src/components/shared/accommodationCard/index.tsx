"use client";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Heart } from "lucide-react";
//Global Imports
import { IAccommodation } from "@/db/schema";
import { cn } from "@/lib/utils";
import { Text } from "@/components/shared/typography";
import { Button } from "@/components/ui/button";
// Local Imports
import { addFavorite, removeFavorite } from "./actions";

type IAccommodationCardProps = {
  accommodation: IAccommodation;
  isFavorited: boolean;
};

export const AccommodationCard = ({
  accommodation,
  isFavorited,
}: IAccommodationCardProps) => {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const toggleFavorite = () => {
    startTransition(async () => {
      const res = await (isFavorited
        ? removeFavorite({ accommodationId: accommodation.id })
        : addFavorite({ accommodationId: accommodation.id }));
      if (!res.success) return;
      router.refresh();
    });
  };

  return (
    <section className="w-full flex flex-col gap-2">
      <div className="relative w-full h-52">
        <Image
          fill
          src={"/images/card-placeholder.webp"}
          alt={accommodation.name}
          className="object-cover rounded-xl"
        />
        <div className="absolute right-1 top-1">
          <Button
            size="icon"
            variant="destructive"
            onClick={toggleFavorite}
            disabled={pending}
          >
            <Heart
              className={cn("text-primary", isFavorited && "fill-primary")}
            />
          </Button>
        </div>
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
