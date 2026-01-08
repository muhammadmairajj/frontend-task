// toast.tsx
"use client";

import toast, { ToastOptions } from "react-hot-toast";
import { Icons, IconsProps } from "./Icons";
import { Photo, PhotoProps } from "./Photo";
// import { Icons, IconsProps, Photo, PhotoProps } from "@/components/common";

interface ToastType extends ToastOptions {
  title: string;
  type?: "success" | "error" | "loading" | "promise" | "info" | "warning";
  promiseResolver?: number;
  id?: string;
  iconProps?: IconsProps; // Optional icon for visual enhancement
  onDismiss?: () => void; // Callback when the toast is dismissed
  photoProps?: PhotoProps;
}

const toastEmitter = async ({
  title,
  type,
  promiseResolver = 3000,
  position = "top-center",
  id = "toast",
  iconProps,
  onDismiss,
  photoProps,
  ...rest
}: ToastType) => {
  const attr = {
    ...rest,
    id,
    position,
    duration: promiseResolver,
    onClose: onDismiss, // Trigger onDismiss callback when toast closes
  };

  const toastContent = (
    <div style={{ display: "flex", alignItems: "center" }}>
      {iconProps && (
        <Icons
          className="text-primary"
          style={{ marginRight: 8 }}
          {...iconProps}
        />
      )}
      {photoProps && <Photo className="mr-8" {...photoProps} />}
      <span>{title}</span>
    </div>
  );

  switch (type) {
    case "success":
      toast.success(toastContent, attr);
      break;
    case "info":
      toast(title, {
        icon: "ℹ️",
      });
      break;
    case "warning":
      toast(title, {
        icon: "⚠️",
      });
      break;
    case "error":
      toast.error(toastContent, attr);
      break;
    case "loading":
      toast.loading(toastContent, attr);
      break;
    case "promise":
      toast.promise(
        new Promise((resolve) => setTimeout(resolve, promiseResolver)),
        {
          loading: "Processing...",
          success: toastContent,
          error: "Failed",
        },
        attr
      );
      break;
    default:
      toast(toastContent, attr);
      break;
  }
};

export { toastEmitter, type ToastType };

// USAGE EXAMPLES:
// Uncomment and use these examples as needed:

// Custom Success Toast with Icon and Dismiss Button
// const showSuccessToast = () => {
//   toastEmitter({
//     title: "Operation successful",
//     type: "success",
//     icon: "path/to/success-icon.svg", // optional icon path
//     onDismiss: () => console.log("Toast dismissed successfully!"), // optional callback
//   });
// };

// Custom Error Toast with Icon
// const showErrorToast = () => {
//   toastEmitter({
//     title: "An error occurred",
//     type: "error",
//     icon: "path/to/error-icon.svg", // optional icon path
//   });
// };

// Custom Loading Toast with Duration and Callback
// const showLoadingToast = () => {
//   toastEmitter({
//     title: "Loading...",
//     type: "loading",
//     promiseResolver: 5000, // specify the duration (in ms)
//     onDismiss: () => console.log("Loading completed!"), // optional callback
//   });
// };

// Custom Promise Toast with Success/Error Callbacks
// const showPromiseToast = () => {
//   toastEmitter({
//     title: "Operation completed",
//     type: "promise",
//     promiseResolver: 2000,
//     icon: "path/to/loading-icon.svg", // optional loading icon
//     onDismiss: () => console.log("Promise Toast has finished!"), // optional callback
//   });
// };
