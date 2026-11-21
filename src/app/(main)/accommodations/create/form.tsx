"use client";
import { useRouter } from "next/navigation";
import { Controller, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getCities } from "@code-plate/iran-cities";
import { getProvincesList } from "@code-plate/iran-cities";
// GLOBAL
import { ICategory } from "@/db/schema";
import { Field } from "@/components/shared/field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
//Local Imports
import { createAccommodation } from "./createAccommodation";
import {
  createAccommodationSchema,
  createAccommodationFormValues,
} from "./schema";

const provincesList = getProvincesList().map((i) => i.fa);

export const CreateAccommodationForm = ({
  categories,
}: {
  categories: ICategory[];
}) => {
  const router = useRouter();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<createAccommodationFormValues>({
    resolver: zodResolver(createAccommodationSchema),
    defaultValues: {
      description: "",
      categoryId: "",
      city: "",
      province: "",
      capacity: 1,
      pricePerNight: 0,
    },
  });

  const selectedProvince = useWatch({
    control,
    name: "province",
  });

  const onSubmit = async (values: createAccommodationFormValues) => {
    const payload = { ...values };
    // const payload = { ...values, user_id: userId };
    await createAccommodation(payload);
    console.log(payload, "client");
    // router.back();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid max-w-2xl gap-6 sm:grid-cols-2"
      noValidate
    >
      <Field label="نام اقامتگاه" name="name" errors={errors}>
        <Input
          id="name"
          placeholder="مثلاً ویلای ساحلی آرامش"
          disabled={isSubmitting}
          {...register("name")}
        />
      </Field>

      <Field label="دسته‌بندی" name="categoryId" errors={errors}>
        <Controller
          control={control}
          name="categoryId"
          render={({ field }) => (
            <Combobox
              disabled={isSubmitting}
              items={categories}
              value={field.value}
              onValueChange={field.onChange}
            >
              <ComboboxInput placeholder="دسته‌بندی را انتخاب کنید" />
              <ComboboxContent>
                <ComboboxEmpty>موردی یافت نشد.</ComboboxEmpty>
                <ComboboxList>
                  {(item) => (
                    <ComboboxItem key={item.id} value={item.id}>
                      {item.name}
                    </ComboboxItem>
                  )}
                </ComboboxList>
              </ComboboxContent>
            </Combobox>
          )}
        />
      </Field>

      <Field label="استان" name="province" errors={errors}>
        <Controller
          name="province"
          control={control}
          render={({ field }) => (
            <Combobox
              items={provincesList}
              value={field.value}
              onValueChange={field.onChange}
            >
              <ComboboxInput placeholder="مثلاً مازندران" />
              <ComboboxContent>
                <ComboboxEmpty>موردی یافت نشد.</ComboboxEmpty>
                <ComboboxList>
                  {(item) => (
                    <ComboboxItem key={item} value={item}>
                      {item}
                    </ComboboxItem>
                  )}
                </ComboboxList>
              </ComboboxContent>
            </Combobox>
          )}
        />
      </Field>

      <Field label="شهر" name="city" errors={errors}>
        <Controller
          name="city"
          control={control}
          render={({ field }) => (
            <Combobox
              items={
                selectedProvince
                  ? getCities(selectedProvince).map((i) => i.fa)
                  : []
              }
              value={field.value}
              onValueChange={field.onChange}
            >
              <ComboboxInput placeholder="مثلاً نوشهر" />
              <ComboboxContent>
                {selectedProvince ? (
                  <ComboboxEmpty>موردی یافت نشد.</ComboboxEmpty>
                ) : (
                  <ComboboxEmpty>ابتدا استان خود را انتخاب کنید</ComboboxEmpty>
                )}
                <ComboboxList>
                  {(item) => (
                    <ComboboxItem key={item} value={item}>
                      {item}
                    </ComboboxItem>
                  )}
                </ComboboxList>
              </ComboboxContent>
            </Combobox>
          )}
        />
      </Field>

      <Field label="آدرس" name="address" errors={errors}>
        <Input
          id="address"
          placeholder="آدرس کامل اقامتگاه"
          disabled={isSubmitting}
          {...register("address")}
        />
      </Field>

      <Field label="ظرفیت (نفر)" name="capacity" errors={errors}>
        <Input
          id="capacity"
          type="number"
          inputMode="numeric"
          min={1}
          placeholder="4"
          disabled={isSubmitting}
          {...register("capacity", { valueAsNumber: true })}
        />
      </Field>

      <Field label="قیمت هر شب (تومان)" name="pricePerNight" errors={errors}>
        <Input
          id="pricePerNight"
          type="number"
          inputMode="numeric"
          min={0}
          placeholder="1500000"
          disabled={isSubmitting}
          {...register("pricePerNight", { valueAsNumber: true })}
        />
      </Field>

      <Field label="توضیحات" name="description" errors={errors}>
        <Textarea
          id="description"
          rows={4}
          placeholder="امکانات، قوانین و ویژگی‌های اقامتگاه را بنویسید"
          disabled={isSubmitting}
          {...register("description")}
        />
      </Field>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full sm:col-span-2"
      >
        {isSubmitting ? "در حال ثبت..." : "ثبت اقامتگاه"}
      </Button>
    </form>
  );
};
