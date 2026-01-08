"use client";

import { CSSProperties, forwardRef, ReactNode } from "react";

// import { ErrorText, IconsProps } from "";
import { ErrorText } from "./ErrorText";
import { IconsProps } from "./Icons";

import { cn, labelIdTrim, renderStartEndContent } from "@/lib";

import { sanitizePlainText } from "@/lib/helpers";

import { ComponentDynamicParamsInterface } from "@/types";


export type SlotTypes =
  | "base"
  | "helper"
  | "label"
  | "input"
  | "title"
  | "info";

export interface CommonInputProps {
  startEndContent?: Partial<{
    start: IconsProps | ReactNode;
    end: IconsProps | ReactNode;
  }>;
  labelProps?: Partial<{
    label: string;
    type: "simple" | "float";
    optionalLabel: string;
  }>;
  title?: string;
  error?: string;
  info?: string;
  classNames?: Partial<Record<SlotTypes | "wrapper", string>>;
  styles?: Partial<Record<SlotTypes, CSSProperties>>;
  disabled?: boolean;
  params?: ComponentDynamicParamsInterface;
  placeholder?: string;
  formatNumber?: boolean;
  acceptNumber?: boolean;
}

export interface InputProps
  extends CommonInputProps,
    Omit<
      React.InputHTMLAttributes<HTMLInputElement>,
      "className" | "value" | "placeholder" | "title"
    > {
  value?: HTMLInputElement["value"];
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      styles,
      labelProps,
      title,
      info,
      error,
      classNames,
      startEndContent,
      value,
      disabled,
      params,
      placeholder,
      formatNumber,
      acceptNumber,
      ...rest
    }: InputProps,
    ref
  ) => {
    // Just use raw strings now
    const label = labelProps?.label;
    const titleInp = title;
    const placeholderInp = placeholder;

    labelProps = {
      type: "simple",
      ...labelProps,
    };

    const displayValue =
      formatNumber && value
        ? Number(String(value).replace(/[^\d.]/g, "")).toLocaleString("en-US")
        : acceptNumber && value
        ? String(value).replace(/[^\d.]/g, "")
        : value;

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
      let inputVal = e.target.value;

      if (acceptNumber) {
        inputVal = inputVal.replace(/[^0-9.]/g, "").replace(/(\..*?)\..*/g, "$1");
      } else if (!formatNumber) {
        inputVal = sanitizePlainText(inputVal);
      }

      if (formatNumber) {
        const raw = inputVal.replace(/[^0-9.]/g, "");
        e.target.value = raw;
        rest.onChange?.({
          ...e,
          target: { ...e.target, value: raw },
        } as React.ChangeEvent<HTMLInputElement>);
      } else {
        e.target.value = inputVal;
        rest.onChange?.({
          ...e,
          target: { ...e.target, value: inputVal },
        } as React.ChangeEvent<HTMLInputElement>);
      }
    };

    return (
      <div
        className={cn(`${error ? "text-error" : "text-input"} w-full select-none`, classNames?.base)}
        style={styles?.base}
      >
        <div
          className={cn(
            `relative w-full ${labelProps?.type === "simple" ? "flex flex-col" : ""}`,
            labelProps?.label ? "gap-1" : "gap-0"
          )}
        >
          {/* Label */}
          {labelProps?.type === "simple" && label && (
            <label
              style={styles?.label}
              htmlFor={labelIdTrim(labelProps?.label)}
              className={cn("transition-all font-medium text-regular text-inherit", classNames?.label)}
            >
              {label}
            </label>
          )}

          {labelProps?.type === "float" && label && (
            <label
              style={styles?.label}
              htmlFor={labelIdTrim(labelProps?.label)}
              className={cn(
                `text-inherit transition-all peer-[]: z-1 font-normal px-1 text-small absolute left-3 my-auto flex items-center pointer-events-none ${
                  startEndContent?.start ? (value ? "translate-x-0" : "translate-x-7") : "translate-x-0"
                } ${value || value === undefined
                  ? "bg-white rounded-full text-primary sm:font-bold font-semibold dark:bg-darkish -top-2 sm:text-sm text-[10px]"
                  : "top-0 bottom-0 sm:text-regular"
                }`,
                classNames?.label
              )}
            >
              {label}
              {labelProps?.optionalLabel ? ` (${labelProps.optionalLabel})` : ""}
            </label>
          )}

          {titleInp && (
            <label htmlFor={labelIdTrim(titleInp)} className={cn("text-black font-medium pb-3", classNames?.title)}>
              {titleInp}
            </label>
          )}

          <div
            className={cn(
              "relative flex px-2 items-center border text-inherit rounded-3xl w-full",
              disabled ? "opacity-60" : "",
              classNames?.wrapper
            )}
          >
            {renderStartEndContent(startEndContent?.start)}

            <input
              id={labelProps?.label ? labelIdTrim(labelProps.label) : undefined}
              ref={ref}
              className={cn(
                "h-[60px] select-none placeholder:text-[#737A91] peer w-full py-2 rounded-full bg-transparent px-1 outline-none focus transition-all text-inherit sm:text-base text-sm",
                classNames?.input
              )}
              inputMode={acceptNumber ? "decimal" : undefined}
              pattern={acceptNumber ? "^[0-9]*\\.?[0-9]*$" : undefined}
              value={displayValue}
              onChange={handleChange}
              style={styles?.input}
              disabled={disabled}
              placeholder={placeholderInp ?? ""}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck={false}
              {...rest}
            />

            {renderStartEndContent(startEndContent?.end)}
          </div>
        </div>

        {/* Error Message */}
        {error && <ErrorText className={classNames?.helper} error={error} />}
        {info && <small className={classNames?.info}>{info}</small>}
      </div>
    );
  }
);

Input.displayName = "Input";
