import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-semibold transition-colors gap-1 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-3.5 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "border-primary/40 bg-primary/15 text-primary",
        secondary:
          "border-border bg-secondary/60 text-secondary-foreground",
        destructive:
          "border-destructive/40 bg-destructive/15 text-destructive",
        success:
          "border-success/40 bg-success/15 text-success",
        outline: "border-border text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant,
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return (
    <span
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
