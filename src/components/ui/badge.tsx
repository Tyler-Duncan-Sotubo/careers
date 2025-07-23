import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-3.5 py-1 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-monzo-brandDark text-monzo-textPrimary shadow hover:bg-monzo-brandDark",
        secondary:
          "border-transparent bg-monzo-secondary text-black hover:bg-monzo-monzoOrange",
        destructive:
          "border-transparent bg-monzo-error text-white shadow hover:bg-monzo-error/80",
        success:
          "border-transparent bg-monzo-success text-white hover:bg-monzo-success/80",
        outline:
          "text-monzo-textPrimary border border-monzo-textPrimary bg-monzo-monzoOrange",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
