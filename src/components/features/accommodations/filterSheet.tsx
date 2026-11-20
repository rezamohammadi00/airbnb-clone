"use client";
import { type ReactElement } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm, useWatch } from "react-hook-form";
import * as z from "zod";
import { getProvincesList, getCities } from "@code-plate/iran-cities";
//Global Imports
import { ICategory } from "@/db/schema";
import { Field } from "@/components/common/field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import { FieldError } from "@/components/ui/field";

const formSchema = z.object({
  province: z.string(),
  city: z.string(),
  categoryId: z.string(),
  capacity: z
    .number({ message: "تعداد نفرات را وارد کنید" })
    .int("عدد صحیح وارد کنید")
    .min(1, "حداقل ۱ نفر"),
});

const provincesList = getProvincesList().map((i) => i.fa);

export const FilterSheet = ({
  children,
  categories,
}: {
  children: ReactElement;
  categories: ICategory[];
}) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      categoryId: "",
      province: "",
      city: "",
      capacity: 1,
    },
  });
  const selectedProvince = useWatch({
    control,
    name: "province",
  });

  const router = useRouter();
  const onSubmit = (data: z.infer<typeof formSchema>) => {
    router.push("/accommodations");
  };

  return (
    <Sheet>
      <SheetTrigger render={children} />
      <SheetContent>
        <SheetHeader>
          <SheetTitle>مقصد</SheetTitle>
          <SheetDescription>
            فیلدهای زیر را برای پیدا کردن مقصد کامل کنید
          </SheetDescription>
        </SheetHeader>
        <div className="grid flex-1 auto-rows-min gap-6 px-4">
          <div className="grid gap-3">
            <Field label="دسته‌بندی" name="categoryId" errors={errors}>
              <Controller
                control={control}
                name="categoryId"
                render={({ field }) => (
                  <Combobox
                    // disabled={isSubmitting}
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
          </div>
          <div className="grid gap-3">
            <Label htmlFor="sheet-demo-name">استان</Label>
            <Controller
              name="province"
              control={control}
              render={({ field }) => (
                <Combobox
                  items={provincesList}
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <ComboboxInput placeholder="استان را انتخاب کنید" />
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
          </div>
          <div className="grid gap-3">
            <Label htmlFor="sheet-demo-username">شهرستان</Label>
            <Controller
              name="city"
              control={control}
              render={({ field }) => (
                <Combobox
                  items={getCities(selectedProvince).map((i) => i.fa)}
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <ComboboxInput placeholder="شهرستان را انتخاب کنید" />
                  <ComboboxContent>
                    {selectedProvince ? (
                      <ComboboxEmpty>موردی یافت نشد.</ComboboxEmpty>
                    ) : (
                      <ComboboxEmpty>
                        ابتدا استان خود را انتخاب کنید
                      </ComboboxEmpty>
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
          </div>
          <div className="grid gap-3">
            <Label htmlFor="sheet-demo-username">تعداد نفرات</Label>
            <Input
              {...register("capacity", { valueAsNumber: true })}
              type="number"
              min={1}
              id="capacity"
              placeholder="تعداد نفرات را وارد کنید"
            />
            <FieldError errors={[errors.capacity]} />
          </div>
        </div>
        <SheetFooter>
          <Button type="button" onClick={handleSubmit(onSubmit)}>
            جست‌وجو
          </Button>
          <SheetClose render={<Button variant="outline">پاک کردن</Button>} />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
