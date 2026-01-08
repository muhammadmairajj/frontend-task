
import React, { CSSProperties, ElementType, ReactNode } from "react";

import { IconsProps } from "./Icons";

import { cn, renderStartEndContent } from "@/lib";

type SlotTypes = "text" | "link" | "prefix" | "suffix";

export interface ComponentDynamicParamsInterface {
  id?: string;
  className?: string;
  style?: CSSProperties;
  onClick?: () => void;
}

export interface TypographyProps {
  variant?:
    | "hero"
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "p"
    | "div"
    | "span";
  className?: string;
  linkClassName?: string;
  onClick?: () => void;
  children?: ReactNode;
  link?: string;
  isBlank?: boolean; 
  startEndContent?: Partial<{
    start: IconsProps | ReactNode;
    end: IconsProps | ReactNode;
  }>;
  text?: string;
  params?: ComponentDynamicParamsInterface;
  styles?: Partial<Record<SlotTypes, CSSProperties>>;
  disabled?: boolean;
}

export const Typography = React.memo<TypographyProps>(
  ({
    disabled = false,
    variant = "p",
    children,
    className = "",
    linkClassName = "",
    onClick,
    link,
    isBlank = false,
    startEndContent,
    params,
    text,
    styles,
  }) => {
    const content = children || text;
    const Element: ElementType = variant as ElementType;

    const variantClasses: Record<string, string> = {
      hero: "xxl:text-hero! xl:text-[95px] lg:text-[80px] md:text-[60px] sm:text-[40px] text-[30px] xl:leading-30 font-semibold leading-tight",
      h1: "lg:text-h1 md:text-h2 sm:text-h4 text-h5 font-semibold leading-tight",
      h2: "md:text-h2 text-h4 font-semibold leading-tight",
      h3: "md:text-h3 sm:text-h5 text-h5 font-medium leading-tight",
      h4: "md:text-h4 sm:text-h5 text-h5 leading-tight",
      h5: "md:text-h5 sm:text-md text-md leading-tight",
      h6: "sm:text-h6 text-regular leading-tight ",
      p: "sm:text-regular text-extra font-normal",
      span: "text-inherit",
      div: "",
    };

    const textClasses = cn(
      "transition-colors text-inherit",
      variantClasses[variant],
      link && "cursor-pointer hover:text-secondary",
      onClick && "cursor-pointer",
      startEndContent?.start || startEndContent?.end
        ? "flex gap-2 items-center"
        : "",
      disabled ? "opacity-50 cursor-not-allowed" : "",
      className
    );

    const element = (
      <Element
        className={textClasses}
        onClick={disabled ? undefined : onClick}
        style={styles?.text}
      >
        {renderStartEndContent(startEndContent?.start)}
        {content}
        {renderStartEndContent(startEndContent?.end)}
      </Element>
    );

    return link ? (
      <a
        href={link}
        target={isBlank ? "_blank" : "_self"}
        rel={isBlank ? "noopener noreferrer" : undefined}
        className={cn("inline-block", linkClassName)}
        style={styles?.link}
      >
        {element}
      </a>
    ) : (
      element
    );
  }
);

Typography.displayName = "Typography";
