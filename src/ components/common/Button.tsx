"use client";

import React, { ReactNode, ButtonHTMLAttributes, forwardRef } from "react";
import { IconsProps, Icons } from "./Icons";
import { cn, renderStartEndContent } from "@/lib";
import { ComponentDynamicParamsInterface } from "@/types";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isRippleDark?: boolean;
  children?: ReactNode;
  variant?:
    | "primary"
    | "secondary"
    | "outlineSecondary"
    | "outline"
    | "ghost"
    | "danger"
    | "dark"
    | "outlineDark"
    | "none";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  iconClassName?: string;
  fullWidth?: boolean;
  linkProps?: { href: string };
  blank?: boolean;
  buttonClassName?: string;
  startEndContent?: Partial<{
    start: IconsProps | ReactNode;
    end: IconsProps | ReactNode;
  }>;
  text?: string;
  params?: ComponentDynamicParamsInterface;
}

export const Button = React.memo(
  forwardRef<HTMLButtonElement, ButtonProps>(
    (
      {
        children,
        text,
        params,
        className,
        startEndContent,
        variant = "secondary",
        size = "md",
        isLoading = false,
        iconClassName,
        onClick,
        disabled,
        linkProps,
        blank = false,
        buttonClassName,
        isRippleDark = false,
        ...props
      },
      ref
    ) => {
      const content = children || text || "";

      // Base button styles
      const baseStyles = cn(
        "relative max-w-sm select-none w-full overflow-hidden font-medium group border cursor-pointer rounded-2xl flex items-center justify-center transition-all duration-100 ease-in-out transform active:scale-97 focus:outline-none",
        "disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg/5",
        linkProps?.href ? "cursor-pointer" : "",
        disabled ? "active:scale-none shadow-none" : "",
        buttonClassName
      );

      // Variant styles
      const variantStyles = {
        primary: "border border-primary bg-primary text-white hover:bg-primary/90",
        secondary:
          "border border-secondary bg-secondary text-black hover:bg-secondary/90 hover:border-white/90",
        outline: "border border-primary text-black hover:bg-primary/10",
        outlineSecondary:
          "border border-secondary text-secondary hover:text-black hover:bg-secondary",
        ghost: "bg-transparent text-white hover:bg-black border-white hover:border-black",
        danger: "border border-red-600 bg-red-600 text-white hover:bg-red-700",
        dark: "border border-black bg-black text-white hover:bg-black/90",
        outlineDark: "border border-black hover:bg-black text-black hover:text-white",
        none: "border-0 bg-none h-auto py-0 px-1 rounded-md text-inherit font-normal",
      };

      // Size styles (fixed height, py removed)
      const sizeStyles = {
        sm: "h-9 text-small px-4",
        md: "h-11 text-base px-8",
        lg: "h-14 text-lg px-20",
      };

      const buttonStyles = cn(baseStyles, sizeStyles[size], variantStyles[variant], className);

      // Icon styles
      const iconStyles = cn(
        "text-current",
        size === "sm" ? "text-lg" : size === "md" ? "text-xl" : "text-2xl",
        iconClassName
      );

      const buttonContent = (
        <>
          {isLoading && (
            <span className="mr-2 inline-block animate-spin">
              <Icons icon="eos-icons:loading" className={iconStyles} />
            </span>
          )}
          {renderStartEndContent(startEndContent?.start)}
          {content}
          {renderStartEndContent(startEndContent?.end)}
        </>
      );

      const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        onClick?.(e);

        if (typeof window !== "undefined" && "vibrate" in navigator) {
          navigator.vibrate(50);
        }

        // Ripple effect
        const target = e.currentTarget;
        target.querySelectorAll(".ripple, .ripple-dark").forEach((r) => r.remove());

        const circle = document.createElement("span");
        const rect = target.getBoundingClientRect();
        const diameter = Math.max(rect.width, rect.height);
        const radius = diameter / 2;

        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${e.clientX - rect.left - radius}px`;
        circle.style.top = `${e.clientY - rect.top - radius}px`;
        circle.style.position = "absolute";
        circle.style.borderRadius = "50%";
        circle.style.pointerEvents = "none";
        circle.style.transform = "scale(0)";
        circle.style.opacity = "0.3";
        circle.style.transition = "transform 0.6s, opacity 0.6s";
        circle.classList.add(isRippleDark ? "ripple-dark" : "ripple");

        target.appendChild(circle);

        setTimeout(() => circle.remove(), 600);
      };

      const button = (
        <button
          ref={ref}
          className={buttonStyles}
          disabled={disabled || isLoading}
          onClick={handleClick}
          {...props}
        >
          {buttonContent}
        </button>
      );

      // Render as link if href is provided
      if (linkProps && linkProps.href) {
        return (
          <a
            href={linkProps.href}
            target={blank ? "_blank" : "_self"}
            rel={blank ? "noopener noreferrer" : undefined}
            className="contents"
          >
            {button}
          </a>
        );
      }

      return button;
    }
  )
);

Button.displayName = "Button";
