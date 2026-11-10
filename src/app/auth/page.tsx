"use client";
import { useState, type ChangeEvent, type FormEvent } from "react";
// GLOBAL
import { Button } from "@/components/ui/button";
//LOCAL
import { AuthHeader } from "./authHeader";

export default function AuthPage() {
  const [mobile, setMobile] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMobile(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: call send-OTP action / API with `mobile`
  };

  return (
    <main className="flex min-h-screen w-full items-center justify-center px-4">
      <section className="w-full max-w-lg rounded-lg border border-gray-300 p-8">
        <AuthHeader />

        <form onSubmit={handleSubmit} noValidate>
          <label htmlFor="mobile" className="mb-2 block text-sm text-gray-700">
            شماره همراه
          </label>

          <input
            id="mobile"
            name="mobile"
            type="tel"
            inputMode="numeric"
            autoComplete="tel"
            dir="ltr"
            placeholder="09123456789"
            value={mobile}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-left outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-100"
          />

          <div className="mt-4">
            <Button onClick={() => {}} label="ادامه" />
          </div>
        </form>
      </section>
    </main>
  );
}
