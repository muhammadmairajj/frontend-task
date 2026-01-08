"use client";

import { cn } from "@/lib";
import { Typography, TypographyProps } from "./Typography";

export interface HelperProps {
  error?: string;
}

export const ErrorText = ({
  className,
  error,
  text,
  ...rest
}: HelperProps & TypographyProps) => {
  return (
    <Typography
      className={cn("text-error !text-small mt-1 text-start", className)}
      variant="p"
      text={text}
      {...rest}
    >
      {error}
    </Typography>
  );
};
