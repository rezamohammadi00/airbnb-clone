export const ROUTES = {
  home: "/",
  about: "/about",
  login: "/login",
  dashboard: "/dashboard",

  // dynamic routes: use functions
  blog: {
    list: "/blog",
    post: (slug: string) => `/blog/${slug}`,
  },
  user: {
    profile: (id: string | number) => `/users/${id}`,
    settings: (id: string | number) => `/users/${id}/settings`,
  },

  // with query params
  search: (q: string) => `/search?q=${encodeURIComponent(q)}`,
} as const;

//how to use?
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { redirect } from "next/navigation";
// import { ROUTES } from "@/lib/routes";

// // Link
// <Link href={ROUTES.about}>About</Link>
// <Link href={ROUTES.blog.post("my-first-post")}>Read</Link>

// // Programmatic navigation (client component)
// const router = useRouter();
// router.push(ROUTES.dashboard);

// // Server redirect
// redirect(ROUTES.login);
