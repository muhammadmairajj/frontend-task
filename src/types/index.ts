import { ClassValue } from "clsx";
import { CSSProperties, ElementType, ReactNode } from "react";

export type TranslateType = (
  text: string, // Previously LangTypes
  params?: ParamsType<false, false>
) => ReactNode;

interface ComponentDynamicParamsInterface {
  text?: ParamsType<false>;
  id?: string;
  className?: ClassValue;
  style?: CSSProperties;
  elementType?: ElementType;
  onClick?: () => void;
}

// ================================================
// Utility types to extract dynamic parameters
// ================================================

type ExtractDaynamicParams<T extends string> =
  T extends `${infer _Start}{${infer Placeholder}}${infer _End}`
    ? Placeholder | ExtractDaynamicParams<_End>
    : never;

type FlattenStrings<T> = T extends Record<string, any>
  ? { [K in keyof T]: FlattenStrings<T[K]> }[keyof T]
  : T extends string
  ? T
  : never;

type ExtractAllDaynamicParams<T> = ExtractDaynamicParams<FlattenStrings<T>>;

// Generic placeholder type since we removed English locale
type DaynamicParamsType = string;

// ================================================
// ParamsType
// ================================================
type ParamsType<
  IsRequired extends boolean = true,
  IsLangTypes extends boolean = true
> = IsRequired extends true
  ? {
      [K in DaynamicParamsType]: IsLangTypes extends true
        ? string // Previously LangTypes
        : ReactNode;
    }
  : {
      [K in DaynamicParamsType]?: IsLangTypes extends true
        ? string
        : ReactNode;
    };

// ================================================
// Response interface
// ================================================
interface ResponseErrorInterface {
  message: string;
  errors: {
    [key: string]: string[];
  };
}

export type {
  ElementType,
  ComponentDynamicParamsInterface,
  ParamsType,
  DaynamicParamsType,
  ResponseErrorInterface,
};

export interface Media {
  id: string;
  media: string;
  type: string;
}

// PROFILE CARD TYPES:
export interface ProfileCardProps {
  name: string;
  title: string;
  location: string;
  stats: StatsItem[];
  className?: string;
}

// STATS CARD TYPES:
export interface StatsItem {
  label: string;
  value: number | string;
}

export interface StatsCardProps {
  stats: StatsItem[];
  className?: string;
}

// CALENDAR CARD TYPES:
interface InterviewItem {
  id: number;
  position: string;
  company: string;
  date: string;
  time: string;
  type: string;
  logo?: string;
}

export interface CalendarCardProps {
  title?: string;
  subtitle?: string;
  interviews?: InterviewItem[];
  className?: string;
  initialExpanded?: boolean;
}