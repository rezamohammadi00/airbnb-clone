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
      className={cn("antialiased font-sans", myFont.className)}
      suppressHydrationWarning
    >
      {/*✉️: the browser use the default font weight of 400 */}
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
