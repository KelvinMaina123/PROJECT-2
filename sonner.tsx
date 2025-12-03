import { useTheme } from "next-themes";
import { Toaster as Sonner, toast } from "sonner";
import React from "react";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = (props: ToasterProps) => {
  const { theme } = useTheme();

  // Explicitly cast theme to allowed type
  const themeProp: Partial<Pick<ToasterProps, "theme">> =
    theme === "light" || theme === "dark" || theme === "system"
      ? { theme: theme as "light" | "dark" | "system" }
      : {};

  return (
    <Sonner
      {...themeProp}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border-default group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
      {...props}
    />
  );
};

export { Toaster, toast };
