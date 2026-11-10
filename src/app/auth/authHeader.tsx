import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
// GLOBAL
import { ROUTES } from "@/lib/routes";

export const AuthHeader = () => {
  const router = useRouter();

  return (
    <header className="mb-12 flex items-center">
      <button
        type="button"
        onClick={() => router.back()}
        aria-label="بازگشت"
        className="rounded-full p-1 text-gray-700 transition-colors hover:bg-gray-100"
      >
        <ArrowRight />
      </button>

      <Link
        href={ROUTES.home}
        className="flex flex-1 items-center justify-center"
      >
        <Image
          src="/images/logo.png"
          alt="لوگو"
          width={140}
          height={140}
          priority
        />
      </Link>

      {/* Spacer keeps the logo visually centered */}
      <span aria-hidden className="w-8" />
    </header>
  );
};
