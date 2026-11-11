import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
// GLOBAL
import { ROUTES } from "@/lib/routes";

export const AuthHeader = () => {
  const router = useRouter();

  return (
    <div className="flex items-center">
      <button onClick={() => router.back()}>
        <ArrowRight className="text-black cursor-pointer" />
      </button>

      <div className="flex flex-1 items-center justify-center">
        <Link href={ROUTES.home}>
          <Image
            src="/images/logo.png"
            alt="لوگو"
            width={140}
            height={140}
            priority
          />
        </Link>
      </div>
    </div>
  );
};
