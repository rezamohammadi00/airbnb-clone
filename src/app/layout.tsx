import "./globals.css";
import type { Metadata } from "next";
import localFont from "next/font/local";

const myFont = localFont({
  src: [
    {
      path: "../../public/fonts/IRANYekanX-Regular.woff2",
      weight: "400",
      style: "normal", //font-normal
    },
    {
      path: "../../public/fonts/IRANYekanX-Bold.woff2",
      weight: "700",
      style: "normal", //font-bold
    },
  ],
});

export const metadata: Metadata = {
  title: "Airbnb",
  description: "Airbnb Clone",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fa"
      dir="rtl"
      className={`${myFont.className} h-full antialiased`}
    >
      {/*the browser use the default font weight of 400 */}
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
