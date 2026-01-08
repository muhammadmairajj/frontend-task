import { Card } from "./Card";
import { StatsCard } from "./StatsCard";
import { CalendarCard } from "./CalendarCard";
import { Photo, Typography } from "./common";

import { ProfileCardProps } from "@/types";

import { IMAGES } from "@/lib";

export const ProfileCard = ({
  name,
  title,
  location,
  stats,
  className = "",
}: ProfileCardProps) => {
  return (
    <>
      <Card className={`p-0 overflow-hidden ${className}`}>
        <div className="relative h-35 w-full">
          <Photo
            src={IMAGES.BANNER}
            alt="Profile cover"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="relative flex justify-center">
          <div className="absolute -top-12">
            <Photo
              src={IMAGES.AVATAR || IMAGES.FALLBACK}
              alt="Profile photo"
              width={96}
              height={96}
              className="h-24 w-24 rounded-full border-4 border-white object-cover bg-white"
            />
          </div>
        </div>

        <div className="pt-14 pb-6 px-6 flex flex-col items-center text-center">
          <Typography
            className="
              font-neue font-semibold
              text-body1
              leading-6
              text-text-light-title
            "
          >
            {name}
          </Typography>

          <Typography
            className="
              mt-1
              max-w-65
              text-small
              leading-5
              font-neue font-medium
              text-text-light-title
              line-clamp-2
            "
          >
            {title}
          </Typography>
          <Typography
            className="
              mt-2
              text-extra
              leading-4
              font-neue font-medium
              text-text-light
            "
          >
            {location}
          </Typography>
        </div>
      </Card>
      <StatsCard stats={stats} />
      <CalendarCard />
    </>
  );
};

