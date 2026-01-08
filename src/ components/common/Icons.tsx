"use client";

import React, { CSSProperties, MouseEventHandler, ReactNode } from "react";
// import Link from "next/link";
import { Icon, IconProps } from "@iconify/react";
import { TooltipProps, Tooltip } from "./Tooltip";
import { cn } from "@/lib";

export type IconSlotTypes = "base" | "icon" | "prefix" | "suffix";

export interface IconsProps extends IconProps {
  icon: string;
  link?: string;
  classNames?: Partial<Record<IconSlotTypes, string>>;
  onClick?: MouseEventHandler<SVGSVGElement> | undefined;
  blank?: boolean;
  prefix?: string | number | ReactNode;
  suffix?: string | number | ReactNode;
  styles?: Partial<Record<IconSlotTypes, CSSProperties>>;
  tooltip?: Partial<Omit<TooltipProps, "children">>;
}

export const Icons = React.memo(function Icons({
  classNames,
  icon,
  link,
  onClick,
  styles,
  blank = false,
  prefix,
  suffix,
  tooltip,
  ...rest
}: IconsProps) {
  const prefixElement =
    typeof prefix === "string" || typeof prefix === "number" ? (
      <span style={styles?.prefix} className={cn(classNames?.prefix)}>
        {prefix}&nbsp;
      </span>
    ) : (
      prefix
    );

  const suffixElement =
    typeof suffix === "string" || typeof suffix === "number" ? (
      <span style={styles?.suffix} className={cn(classNames?.suffix)}>
        &nbsp;{suffix}
      </span>
    ) : (
      suffix
    );

  const coreElement = (
    <span style={styles?.base} className={cn("flex gap-2", classNames?.base)}>
      {prefixElement}
      <Icon
        onClick={onClick}
        className={cn(
          onClick && "text-inherit cursor-pointer",
          classNames?.icon
        )}
        icon={icon}
        style={styles?.icon}
        fontSize={20}
        {...rest}
      />
      {suffixElement}
    </span>
  );

  const element = tooltip?.content ? (
    <Tooltip content={tooltip?.content} {...tooltip}>
      {coreElement}
    </Tooltip>
  ) : (
    coreElement
  );

  return link ? (
    <a
      href={link}
      target={blank ? "_blank" : "_self"}
      rel={blank ? "noreferrer noopener" : undefined}
    >
      {element}
    </a>
  ) : (
    element
  );
});
