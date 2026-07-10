import * as React from "react";
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const toggleVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-lg text-sm font-semibold transition-all hover:bg-secondary/60 hover:text-foreground disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground data-[state=on]:glow-primary [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 outline-none focus-visible:ring-ring/50 focus-visible:ring-[3px] focus-visible:border-ring",
  {
    variants: {
      variant: {
        default: "bg-transparent text-muted-foreground",
        outline:
          "border border-border bg-transparent hover:bg-secondary/60 hover:text-foreground",
      },
      size: {
        default: "h-9 px-2 min-w-9",
        sm: "h-8 px-2.5 min-w-8",
        lg: "h-10 px-2.5 min-w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

type ToggleGroupContextValue = {
  variant: "default" | "outline" | null | undefined;
  size: "default" | "sm" | "lg" | null | undefined;
  type: "single" | "multiple" | undefined;
};

const ToggleGroupContext = React.createContext<ToggleGroupContextValue>({
  variant: "default",
  size: "default",
  type: "single",
});

function ToggleGroup({
  className,
  variant,
  size,
  children,
  ...props
}: React.ComponentProps<typeof ToggleGroupPrimitive.Root> &
  VariantProps<typeof toggleVariants>) {
  return (
    <ToggleGroupPrimitive.Root
      data-slot="toggle-group"
      data-variant={variant}
      data-size={size}
      className={cn(
        "group/toggle-group flex w-fit items-stretch rounded-lg gap-0.5 border border-border/60 p-1 bg-muted/30 glass",
        className,
      )}
      {...props}
    >
      <ToggleGroupContext.Provider value={{ variant, size, type: props.type }}>
        {children}
      </ToggleGroupContext.Provider>
    </ToggleGroupPrimitive.Root>
  );
}

function ToggleGroupItem({
  className,
  children,
  variant,
  size,
  ...props
}: React.ComponentProps<typeof ToggleGroupPrimitive.Item> &
  VariantProps<typeof toggleVariants>) {
  const ctx = React.useContext(ToggleGroupContext);

  return (
    <ToggleGroupPrimitive.Item
      data-slot="toggle-group-item"
      data-variant={ctx.variant || variant}
      data-size={ctx.size || size}
      className={cn(
        toggleVariants({
          variant: ctx.variant || variant,
          size: ctx.size || size,
        }),
        "min-w-9 flex-1 shrink-0 rounded-sm",
        className,
      )}
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.Item>
  );
}

export { ToggleGroup, ToggleGroupItem, toggleVariants };
