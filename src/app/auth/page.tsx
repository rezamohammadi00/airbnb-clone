"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
// GLOBAL
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
//LOCAL
import { AuthHeader } from "./authHeader";

export const schema = z.object({
  mobile: z
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

  const onSubmit = async (data: { mobile: string }) => {
    console.log(data);
  };

  return (
    <main className="min-h-screen w-full flex items-center justify-center">
      <section className="p-8 w-full max-w-lg space-y-12 rounded-md border-2 border-neutral-300">
        <AuthHeader />
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            type="tel"
            label={"شماره همراه"}
            id="mobile"
            register={register}
            errors={errors}
            disabled={isSubmitting}
          />
          <div className="mt-4">
            <Button onClick={() => {}} label="ادامه" disabled={isSubmitting} />
          </div>
        </form>
      </section>
    </main>
  );
}
