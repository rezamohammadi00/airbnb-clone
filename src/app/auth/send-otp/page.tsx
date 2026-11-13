"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
// GLOBAL
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FieldError, FieldLabel } from "@/components/ui/field";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { phoneNumber } from "@/lib/auth-client";
//LOCAL
import { ROUTES } from "@/lib/routes";
import { useRouter } from "next/navigation";

export const schema = z.object({
  phoneNumber: z
    .string()
    .min(1, "شماره همراه را وارد کنید")
    .max(11, "شماره همراه معتبر نیست")
    .regex(/^09\d{9}$/, "شماره همراه معتبر نیست (مثال: 09123456789)"),
});

export default function SendOtpPage() {
  const router = useRouter();
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
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>ورود به حساب</CardTitle>
          <CardDescription>
            شماره همراه خود را در فرمت درست وارد کنید
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <FieldLabel htmlFor="email">شماره همراه</FieldLabel>
                <Input
                  id="phoneNumber"
                  type="tel"
                  placeholder="09167718891"
                  {...register("phoneNumber")}
                  disabled={isSubmitting}
                  required
                />
                <FieldError errors={[errors.phoneNumber]} />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button onClick={handleSubmit(onSubmit)} className="w-full">
            ادامه
          </Button>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => router.push(ROUTES.home)}
          >
            بازشگت
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}
