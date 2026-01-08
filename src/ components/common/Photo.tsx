import React, { forwardRef, useState } from "react";

import { cn, IMAGES } from "@/lib";

import { motion, AnimatePresence } from "framer-motion";

export interface PhotoProps {
  width?: number;
  height?: number;
  src?: string;
  alt?: string;
  link?: string;
  className?: string;
  draggable?: boolean;
  blank?: boolean;
  enlargeOnClick?: boolean;
  fallback?: string;
}

export const Photo = React.memo(
  forwardRef<HTMLImageElement, PhotoProps>(
    (
      {
        blank = false,
        width = 100,
        height = 100,
        src = IMAGES.FALLBACK,
        fallback = IMAGES.FALLBACK,
        alt = "dummy",
        link = "",
        className = "",
        draggable = false,
        enlargeOnClick = false,
        ...rest
      },
      ref
    ) => {
      const [hasError, setError] = useState(false);
      const [isEnlarged, setIsEnlarged] = useState(false);

      const imageElement = (
        <img
          ref={ref}
          src={
            src === ""
              ? fallback
              : hasError
              ? fallback
              : src?.includes("http")
              ? decodeURI(src)
              : src
          }
          alt={alt}
          width={width}
          height={height}
          draggable={draggable}
          className={cn(
            "max-w-full object-cover transition-transform select-none",
            link ? "cursor-pointer hover:scale-95" : "",
            enlargeOnClick ? "cursor-zoom-in" : "",
            className
          )}
          onError={() => setError(true)}
          onClick={() => {
            if (enlargeOnClick) setIsEnlarged(true);
          }}
          {...rest}
        />
      );

      const content = link ? (
        <a
          href={link}
          target={blank ? "_blank" : "_self"}
          rel={blank ? "noreferrer noopener" : undefined}
        >
          {imageElement}
        </a>
      ) : (
        imageElement
      );

      return (
        <>
          {content}

          {/* Enlarge Modal */}
          {/* <AnimatePresence>
            {isEnlarged && (
              <motion.div
                as="div"
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsEnlarged(false)}
              >
                <motion.img
                  as="img"
                  src={hasError ? IMAGES.FALLBACK : src}
                  alt={alt}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{
                    scale: 1,
                    opacity: 1,
                    transition: { type: "spring", damping: 15, stiffness: 200 },
                  }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg shadow-lg"
                  onClick={(e) => e.stopPropagation()}
                />
              </motion.div>
            )}
          </AnimatePresence> */}
        </>
      );
    }
  )
);

Photo.displayName = "Photo";
