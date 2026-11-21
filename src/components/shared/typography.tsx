//⚠️: Keep this list in sync with the sizes in typography.css .

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
//Global Imports
import { cn } from "@/lib/utils";

const textVariants = cva("", {
  variants: {
    variant: {
      display: "text-display",
      h1: "text-h1",
      h2: "text-h2",
      h3: "text-h3",
      lead: "text-lead",
      body: "text-body",
      small: "text-small",
      caption: "text-caption",
    },
    tone: {
      default: "text-foreground",
      muted: "text-muted-foreground",
      primary: "text-primary",
      destructive: "text-destructive",
    },
  },
  defaultVariants: { variant: "body", tone: "default" },
});

type Variant = NonNullable<VariantProps<typeof textVariants>["variant"]>;

const defaultTag: Record<Variant, React.ElementType> = {
  display: "h1",
  h1: "h1",
  h2: "h2",
  h3: "h3",
  lead: "p",
  body: "p",
  small: "span",
  caption: "span",
};
export interface TextProps
  extends
    Omit<React.HTMLAttributes<HTMLElement>, "color">,
    VariantProps<typeof textVariants> {
  as?: React.ElementType;
}

export function Text({
  variant = "body",
  tone,
  as,
  className,
  ...props
}: TextProps) {
  const Comp = as ?? defaultTag[variant as Variant];
  return (
    <Comp
      className={cn(textVariants({ variant, tone }), className)}
      {...props}
    />
  );
}

export { textVariants };

// Usage:
// <Text variant="h1">Dashboard</Text>
// <Text tone="muted">Last updated 2 minutes ago</Text>
// <Text variant="h2" as="h3">Semantic h3, visual h2</Text>
// <label className={textVariants({ variant: "small", tone: "muted" })}>Email</label>
