import * as React from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

// --- START: Dependency Definitions (to make the file self-contained) ---

// 1. Placeholder for cn utility (combines class names)
const cn = (...inputs: (string | boolean | undefined | null)[]): string => {
  return inputs.filter(Boolean).join(' ');
};

// 2. Button Variant Types
type ButtonVariant = 'default' | 'outline' | 'ghost';
type ButtonSize = 'default' | 'icon';

// 3. ButtonProps type definition needed for PaginationLinkProps
// Mimics the necessary parts of the external Button component props
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

// 4. Simplified buttonVariants function (mimics the behavior without cva/tailwind-merge library)
const buttonVariants = ({
  variant = 'default',
  size = 'default',
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
}): string => {
  // Base styling for all buttons (assuming a standard set of shadcn/ui classes)
  let classes = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background";

  // Handle Variant Styling
  switch (variant) {
    case 'outline':
      classes += " border border-input bg-background hover:bg-accent hover:text-accent-foreground";
      break;
    case 'ghost':
      classes += " hover:bg-accent hover:text-accent-foreground";
      break;
    case 'default':
    default:
      classes += " bg-primary text-primary-foreground hover:bg-primary/90";
      break;
  }

  // Handle Size Styling
  switch (size) {
    case 'icon':
      classes += " h-10 w-10";
      break;
    case 'default':
    default:
      classes += " h-10 py-2 px-4";
      break;
  }

  return classes.trim();
};
// --- END: Dependency Definitions ---


const Pagination = ({ className, ...props }: React.ComponentProps<"nav">) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn("mx-auto flex w-full justify-center", className)}
    {...props}
  />
);
Pagination.displayName = "Pagination";

const PaginationContent = React.forwardRef<HTMLUListElement, React.ComponentProps<"ul">>(
  ({ className, ...props }, ref) => (
    <ul ref={ref} className={cn("flex flex-row items-center gap-1", className)} {...props} />
  ),
);
PaginationContent.displayName = "PaginationContent";

const PaginationItem = React.forwardRef<HTMLLIElement, React.ComponentProps<"li">>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn("", className)} {...props} />
));
PaginationItem.displayName = "PaginationItem";

type PaginationLinkProps = {
  isActive?: boolean;
} & Pick<ButtonProps, "size"> & // CORRECTED: Removed the extraneous 'type' keyword
  React.ComponentProps<"a">;

const PaginationLink = ({ className, isActive, size = "icon", ...props }: PaginationLinkProps) => (
  <a
    aria-current={isActive ? "page" : undefined}
    className={cn(
      buttonVariants({
        variant: isActive ? "outline" : "ghost",
        size,
      }),
      className,
    )}
    {...props}
  />
);
PaginationLink.displayName = "PaginationLink";

const PaginationPrevious = ({ className, ...props }: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink aria-label="Go to previous page" size="default" className={cn("gap-1 pl-2.5", className)} {...props}>
    <ChevronLeft className="h-4 w-4" />
    <span>Previous</span>
  </PaginationLink>
);
PaginationPrevious.displayName = "PaginationPrevious";

const PaginationNext = ({ className, ...props }: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink aria-label="Go to next page" size="default" className={cn("gap-1 pr-2.5", className)} {...props}>
    <span>Next</span>
    <ChevronRight className="h-4 w-4" />
  </PaginationLink>
);
PaginationNext.displayName = "PaginationNext";

const PaginationEllipsis = ({ className, ...props }: React.ComponentProps<"span">) => (
  <span aria-hidden className={cn("flex h-9 w-9 items-center justify-center", className)} {...props}>
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More pages</span>
  </span>
);
PaginationEllipsis.displayName = "PaginationEllipsis";

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
};