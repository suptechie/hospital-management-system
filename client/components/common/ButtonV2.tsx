import * as React from "react"
import { Slot, Slottable } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-zinc-800 text-zinc-100 hover:bg-zinc-700",
        destructive: "bg-red-900 text-red-100 hover:bg-red-800",
        outline: "border border-zinc-700 bg-transparent hover:bg-zinc-800 hover:text-zinc-100",
        secondary: "bg-zinc-700 text-zinc-100 hover:bg-zinc-600",
        ghost: "hover:bg-zinc-800 hover:text-zinc-100",
        link: "text-zinc-100 underline-offset-4 hover:underline",
        expandIcon: "group relative text-zinc-100 bg-zinc-800 hover:bg-zinc-700",
        ringHover: "bg-zinc-800 text-zinc-100 transition-all duration-300 hover:bg-zinc-700 hover:ring-2 hover:ring-zinc-600 hover:ring-offset-2 hover:ring-offset-zinc-900",
        shine: "text-zinc-100 animate-shine bg-gradient-to-r from-zinc-800 via-zinc-700 to-zinc-800 bg-[length:400%_100%]",
        gooeyRight: "text-zinc-100 relative bg-zinc-800 z-0 overflow-hidden transition-all duration-500 before:absolute before:inset-0 before:-z-10 before:translate-x-[150%] before:translate-y-[150%] before:scale-[2.5] before:rounded-[100%] before:bg-gradient-to-r from-zinc-700 before:transition-transform before:duration-1000 hover:before:translate-x-[0%] hover:before:translate-y-[0%]",
        gooeyLeft: "text-zinc-100 relative bg-zinc-800 z-0 overflow-hidden transition-all duration-500 after:absolute after:inset-0 after:-z-10 after:translate-x-[-150%] after:translate-y-[150%] after:scale-[2.5] after:rounded-[100%] after:bg-gradient-to-l from-zinc-700 after:transition-transform after:duration-1000 hover:after:translate-x-[0%] hover:after:translate-y-[0%]",
        linkHover1: "relative text-zinc-100 after:absolute after:bg-zinc-100 after:bottom-2 after:h-[1px] after:w-2/3 after:origin-bottom-left after:scale-x-100 hover:after:origin-bottom-right hover:after:scale-x-0 after:transition-transform after:ease-in-out after:duration-300",
        linkHover2: "relative text-zinc-100 after:absolute after:bg-zinc-100 after:bottom-2 after:h-[1px] after:w-2/3 after:origin-bottom-right after:scale-x-0 hover:after:origin-bottom-left hover:after:scale-x-100 after:transition-transform after:ease-in-out after:duration-300",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

interface IconProps {
  Icon: React.ElementType
  iconPlacement: "left" | "right"
}

interface IconRefProps {
  Icon?: never
  iconPlacement?: undefined
}

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

export type ButtonIconProps = IconProps | IconRefProps

const ButtonV2 = React.forwardRef<HTMLButtonElement, ButtonProps & ButtonIconProps>(
  ({ className, variant, size, asChild = false, Icon, iconPlacement, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props}>
        {Icon && iconPlacement === "left" && (
          <div className="w-0 translate-x-[0%] pr-0 opacity-0 transition-all duration-200 group-hover:w-5 group-hover:translate-x-100 group-hover:pr-2 group-hover:opacity-100">
            <Icon />
          </div>
        )}
        <Slottable>{props.children}</Slottable>
        {Icon && iconPlacement === "right" && (
          <div className="w-0 translate-x-[100%] pl-0 opacity-0 transition-all duration-200 group-hover:w-5 group-hover:translate-x-0 group-hover:pl-2 group-hover:opacity-100">
            <Icon />
          </div>
        )}
      </Comp>
    )
  }
)
ButtonV2.displayName = "Button"

export { ButtonV2, buttonVariants }