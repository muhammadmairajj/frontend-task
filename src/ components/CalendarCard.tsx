import { useState } from "react";

import { Card } from "./Card";
import { Icons, Photo, Typography } from "./common";

import { CalendarCardProps } from "@/types";

import { IMAGES } from "@/lib";

export const CalendarCard = ({
  title = "My Calendar",
  subtitle = "Upcoming Interviews",
  interviews = [
    {
      id: 1,
      position: "UI UX Designer",
      company: "Figma",
      date: "16th Feb",
      time: "13:45",
      type: "Remote",
      logo: IMAGES.FIGMA,
    },
    {
      id: 2,
      position: "UI UX Designer",
      company: "Figma",
      date: "16th Feb",
      time: "13:45",
      type: "Remote",
      logo: IMAGES.FIGMA,
    },
    {
      id: 3,
      position: "UI UX Designer",
      company: "Figma",
      date: "16th Feb",
      time: "13:45",
      type: "Remote",
      logo: IMAGES.FIGMA,
    },
  ],
  className = "",
  initialExpanded = true,
}: CalendarCardProps) => {
  const [open, setOpen] = useState(initialExpanded);

  return (
    <Card className={`p-0 ${className}`}>
      {/* Header */}
      <div className="flex justify-between px-4 py-3">
        <div>
          <Typography
            variant="div"
            className="font-neue text-small leading-5 font-semibold text-text-light-title"
          >
            {title}
          </Typography>

          <Typography
            variant="div"
            className="mt-0.5 font-neue text-[15px] leading-4 font-medium text-text-lighter"
          >
            {subtitle}
          </Typography>
        </div>

        <button onClick={() => setOpen(!open)}>
          <Icons
            icon={open ? "mdi:chevron-up" : "mdi:chevron-down"}
            fontSize={18}
            classNames={{ icon: "w-5 h-5 transition-transform text-[#6B7280]" }}
          />
        </button>
      </div>

      {/* Body */}
      {open && (
        <div className="px-4 pb-4 space-y-3">
          {interviews.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between bg-[#fbfbfb] rounded-[18px] h-18 px-3"
            >
              <div className="flex items-center gap-3">
                <div
                  className="
                    w-10 h-10
                    rounded-[10px]
                    bg-[#f8f9ff]
                    flex items-center justify-center
                  "
                >
                  <Photo
                    src={item.logo}
                    width={24}
                    height={24}
                    className="object-contain"
                  />
                </div>
                <div>
                  <Typography
                    variant="div"
                    className="font-neue text-small leading-5 font-semibold text-[#111827]"
                  >
                    {item.position}
                  </Typography>

                  <Typography
                    variant="div"
                    className="font-neue text-[13px] leading-4.5 font-normal text-[#6B7280]"
                  >
                    {item.company}
                  </Typography>

                  <Typography
                    variant="div"
                    className="mt-0.5 font-neue text-[12px] leading-4 font-normal text-[#6B7280]"
                  >
                    {item.date} | {item.time} | {item.type}
                  </Typography>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Typography
                  variant="div"
                  className="h-7 px-3.5 rounded-lg bg-[#98fed7] text-[#21a073] text-[13px] leading-7 font-medium"
                >
                  Accepted
                </Typography>

                <Typography
                  variant="div"
                  className="text-[13px] font-medium text-[#6B7280]"
                >
                  Deny
                </Typography>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};
