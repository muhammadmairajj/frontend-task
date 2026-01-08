import React, { useId } from "react";

import { motion, AnimatePresence } from "framer-motion";
import { Typography } from "./Typography";

import { cn } from "@/lib";
import { ComponentDynamicParamsInterface } from "@/types";

type SlotTypes = "base" | "content" | "box" | "arrow" | "text";

export interface TooltipProps {
  children: React.ReactNode;
  content: string;
  params?: ComponentDynamicParamsInterface;
  position?: "top" | "bottom" | "left" | "right";
  classNames?: Partial<Record<SlotTypes, string>>;
  hide?: boolean;
}

export const Tooltip: React.FC<TooltipProps> = ({
  children,
  content,
  position = "top",
  classNames,
  params,
  hide = false,
}) => {
  const tooltipId = useId(); // unique id for accessibility

  if (hide) return <>{children}</>;

  const positionClasses: Record<string, string> = {
    top: "bottom-full left-1/2 transform -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 transform -translate-x-1/2 mt-2",
    left: "right-full top-1/2 transform -translate-y-1/2 mr-2",
    right: "left-full top-1/2 transform -translate-y-1/2 ml-2",
  };

  return (
    <div className={cn("relative group inline-block", classNames?.base)}>
      {/* Tooltip Target */}
      <div
        className={cn("cursor-pointer", classNames?.content)}
        aria-describedby={tooltipId}
      >
        {children}
      </div>

      {/* Tooltip Box */}
      {/* <AnimatePresence> */}
        {/* <motion.div
          id={tooltipId as any}
          role="tooltip"
          aspect="div"
          initial={{ opacity: 0, scale: 0.9 }}
          whileHover={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.2 }}
          className={cn(
            "absolute w-[200px] text-sm z-50 p-1 text-center bg-black rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-300 dark:bg-gray-700",
            positionClasses[position],
            classNames?.box
          )}
        > */}
          <Typography
            className={cn(
              "text-balance text-sm! font-medium text-white",
              classNames?.text
            )}
            text={content}
            params={{
              ...params,
              className: typeof params?.className === "string" ? params.className : undefined
            }}
          />

          {/* Tooltip Arrow */}
          <div
            className={cn(
              "absolute w-2 h-2 rotate-45 bg-black dark:bg-gray-700",
              position === "top" &&
                "left-1/2 transform -translate-x-1/2 bottom-[-4px]",
              position === "bottom" &&
                "left-1/2 transform -translate-x-1/2 top-[-4px]",
              position === "left" &&
                "top-1/2 transform -translate-y-1/2 right-[-4px]",
              position === "right" &&
                "top-1/2 transform -translate-y-1/2 left-[-4px]",
              classNames?.arrow
            )}
          />
        {/* </motion.div> */}
      {/* </AnimatePresence> */}
    </div>
  );
};
