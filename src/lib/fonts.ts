import localFont from "next/font/local";

// dont remove that
// import { Inter } from "next/font/google";
// const inter = Inter({subsets:['latin'],variable:'--font-sans'});
// className={cn("h-full", "antialiased", myFont.className, "font-sans", inter.variable)}

export const myFont = localFont({
  src: [
    {
      path: "../../public/fonts/IRANYekanX-Regular.woff2",
      weight: "400",
      style: "normal", //✉️: font-normal
    },
    {
      path: "../../public/fonts/IRANYekanX-Bold.woff2",
      weight: "700",
      style: "normal", //✉️: font-bold
    },
  ],
});
