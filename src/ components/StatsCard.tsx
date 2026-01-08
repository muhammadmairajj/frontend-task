import { Card } from "./Card";
import { Typography } from "./common";

import { StatsCardProps } from "@/types";

export const StatsCard = ({ stats, className = "" }: StatsCardProps) => {
  return (
    <Card className={`p-0 ${className}`}>
      <div className="px-6 py-2">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="
              flex items-center justify-between
              h-12
              border-b border-[#E9ECEF]
              last:border-b-0
            "
          >
            <Typography
              className="
                text-small
                font-medium
                font-neue
                text-text-light-title
              "
            >
              {stat.label}
            </Typography>

            <Typography
              className="
                text-regular
                font-medium
                font-neue
                text-secondary
              "
            >
              {stat.value}
            </Typography>
          </div>
        ))}
      </div>
    </Card>
  );
};
