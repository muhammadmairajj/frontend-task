import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export const Card = ({ children, className = "" }: CardProps) => {
  return (
    <div
      className={`
        bg-white
        rounded-2xl
        border border-[#E5E7EB]
        shadow-[0_8px_30px_rgba(0,0,0,0.08)]
        ${className}
      `}
    >
      {children}
    </div>
  );
};

