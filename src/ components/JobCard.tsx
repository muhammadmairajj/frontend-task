import { useState } from "react";
import { Typography, Button, Input, Icons, Photo } from "./common";

import { ICONS, IMAGES } from "@/lib";

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  time: string;
  applicants: number;
  logo?: string;
  type: "Full Time" | "Part Time" | "Remote";
}

export interface JobCardProps {
  job: Job;
  promoted?: boolean;
  onApply?: () => void;
  onSave?: (saved: boolean) => void;
}

export const JobCard: React.FC<JobCardProps> = ({
  job,
  promoted = false,
  onApply,
  onSave,
}) => {
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    const newValue = !saved;
    setSaved(newValue);
    onSave?.(newValue);
  };
  return (
    <div className="bg-white border border-[#E1E1E1] rounded-lg p-4 flex flex-col h-full">
      {promoted && (
        <Typography className="text-[11px] sm:text-xs font-neue font-semibold -mt-2 text-text-light-title">
          Promoted
        </Typography>
      )}

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mt-2">
        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#FAFAFA] rounded-[9.11px] flex items-center justify-center shrink-0">
          <Photo
            src={IMAGES.MICROSOFT_TEAM}
            alt="Logo"
            width={32}
            height={32}
            className="object-contain"
          />
        </div>

        {/* Job Info */}

        <div className="flex-1 min-w-0">
          <Typography className="truncate text-sm sm:text-[16px] font-neue font-medium text-text-light-title leading-4.5">
            {job.title}
          </Typography>
          <Typography className="truncate text-xs sm:text-[14px] text-text-light-title leading-4.5 font-neue font-medium">
            {job.company}
          </Typography>
        </div>
      </div>

      {/* Meta */}
      <div className="mt-3 space-y-1 text-[12px] sm:text-[13px] font-neue font-medium text-text-light">
        <div className="flex items-center gap-1">
          <Icons icon={ICONS.PIN_LOCATION} fontSize={14} />
          {job.location}
        </div>
        <div className="flex items-center gap-1">
          <Icons icon={ICONS.TIME} fontSize={14} />
          {job.time}
          <span className="mx-1">|</span>
          <span className="text-secondary">{job.applicants}</span>
        </div>
      </div>

      <div className="flex-1" />

      <div className="flex flex-col sm:flex-row gap-2 mt-4">
        <Button
          variant="secondary"
          className="flex-1 h-10 sm:h-11 text-[12px] sm:text-[14px] font-medium rounded-lg text-white"
        >
          Apply Now
        </Button>

        <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center">
          <Icons icon={ICONS.BOOK_MARK} fontSize={28} color={saved ? "#0154AA" : "#AAAAAA"} onClick={handleSave} />
        </div>
      </div>
    </div>
  );
};
