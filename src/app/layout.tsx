import "@/styles/globals.css";
import { myFont } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { Providers } from "./providers";

export const metadata = {
  title: "Airbnb",
  description: "Airbnb Clone",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fa"
      dir="rtl"
      className={cn("antialiased", myFont.variable)}
      suppressHydrationWarning
    >
      {/*✉️: the browser use the default font weight of 400 and font size of 16px (the same as 1rem). */}
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
