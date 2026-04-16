import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/Utils";

// Variants for alert
const alertVariants = cva(
  "relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        destructive:
          "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

// Alert Component
const Alert = React.forwardRef((props, ref) => {
  const { className, variant = "default", ...rest } = props;
  return (
    <div
      ref={ref}
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...rest}
    />
  );
});
Alert.displayName = "Alert";

// Alert Title
const AlertTitle = React.forwardRef((props, ref) => {
  const { className, ...rest } = props;
  return (
    <h5
      ref={ref}
      className={cn("mb-1 font-medium leading-none tracking-tight", className)}
      {...rest}
    />
  );
});
AlertTitle.displayName = "AlertTitle";

// Alert Description
const AlertDescription = React.forwardRef((props, ref) => {
  const { className, ...rest } = props;
  return (
    <div
      ref={ref}
      className={cn("text-sm [&_p]:leading-relaxed", className)}
      {...rest}
    />
  );
});
AlertDescription.displayName = "AlertDescription";

// Export components
export { Alert, AlertTitle, AlertDescription };
