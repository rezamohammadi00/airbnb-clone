"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
// GLOBAL
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { phoneNumber } from "@/lib/auth-client";
//LOCAL
import { AuthHeader } from "./authHeader";

export const schema = z.object({
  phoneNumber: z
    .string()
    .min(1, "شماره همراه را وارد کنید")
    .max(11, "شماره همراه معتبر نیست")
    .regex(/^09\d{9}$/, "شماره همراه معتبر نیست (مثال: 09123456789)"),
});

export default function AuthPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: { phoneNumber: string }) => {
    const res = await phoneNumber.sendOtp({
      phoneNumber: data.phoneNumber,
    });

    const code = window.prompt("Enter the OTP from the terminal") as string;
    await phoneNumber.verify({
      phoneNumber: data.phoneNumber,
      code: code,
      disableSession: false,
      updatePhoneNumber: false,
    });
    console.log(res.data, res.error, "client");
  };

  return (
    <main className="min-h-screen w-full flex items-center justify-center">
      <section className="p-8 w-full max-w-lg space-y-12 rounded-md border-2 border-neutral-300">
        <AuthHeader />
        <form onSubmit={handleSubmit(onSubmit)}>
          <Field>
            <FieldLabel htmlFor="checkout-7j9-card-number-uw1">
              شماره همراه
            </FieldLabel>
            <Input
              id="phoneNumber"
              type="tel"
              {...register("phoneNumber")}
              disabled={isSubmitting}
              placeholder="09167718891"
              required
            />
            <FieldDescription>شماره همراه خود را وارد کنید</FieldDescription>
          </Field>
          <div className="mt-4 w-full">
            <Button
              type="submit"
              className={"w-full"}
              onClick={() => {}}
              disabled={isSubmitting}
            >
              ادامه
            </Button>
          </div>
        </form>
      </section>
    </main>
  );
}
