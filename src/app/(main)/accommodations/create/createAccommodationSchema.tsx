import { z } from "zod";

export const createAccommodationSchema = z.object({
  name: z.string().min(1, "نام اقامتگاه را وارد کنید"),
  categoryId: z.string().min(1, "دسته‌بندی اقامتگاه را وارد کنید"),
  description: z.string(),
  address: z.string().min(1, "آدرس را وارد کنید"),
  province: z.string().min(1, "استان را وارد کنید"),
  city: z.string().min(1, "شهر را وارد کنید"),
  capacity: z.number().int("عدد صحیح وارد کنید").min(1, "حداقل ۱ نفر"),
  pricePerNight: z.number().min(1, "قیمت باید بیشتر از صفر باشد"),
});

export type createAccommodationFormValues = z.infer<
  typeof createAccommodationSchema
>;