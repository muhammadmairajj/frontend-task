import { useState } from "react";
import { Typography, Button, Input, Icons } from "./common";
import { JobCard } from "./JobCard";

import { ICONS } from "@/lib";

const jobsTemplate = {
  title: "UI/UX Designer",
  company: "Teams",
  location: "Seattle, USA (Remote)",
  time: "1 day ago",
  applicants: "22 applicants",
};

const jobSections = [
  {
    title: "Featured Jobs",
    seeMore: "See Featured Jobs",
    count: 5,
    promoted: true,
  },
  {
    title: "Recommended Jobs",
    seeMore: "See Recommended Jobs",
    count: 10,
    promoted: false,
  },
  {
    title: "Latest Jobs",
    seeMore: "See Latest Jobs",
    count: 10,
    promoted: false,
  },
];


export const JobSearchUI = () => {
  const [search, setSearch] = useState("");

  const renderJobSection = (section: (typeof jobSections)[0]) => {
    const jobs = Array(section.count)
      .fill(jobsTemplate)
      .filter((job) =>
        `${job.title} ${job.company}`
          .toLowerCase()
          .includes(search.toLowerCase())
      );

    const noDataText = `No ${section.title} Found`;

    return (
      <div key={section.title} className="mt-10">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
          <Typography
            variant="div"
            className="text-h5 font-medium font-neue text-text-light-title"
          >
            {section.title}
          </Typography>
          <Typography className="text-body! underline font-normal font-neue text-secondary cursor-pointer">
            {section.seeMore}
          </Typography>
        </div>

        {/* Data / No Data */}
        {jobs.length === 0 ? (
          <div className="mt-6 bg-[#FAFAFA] border border-dashed border-gray-300 rounded-lg py-10 text-center">
            <Typography className="text-text-light font-neue text-[15px] font-medium">
              {noDataText}
            </Typography>
          </div>
        ) : (
          <div
            className={`
              grid gap-4 mt-4
              grid-cols-1
              sm:grid-cols-2
              md:grid-cols-3
              lg:grid-cols-4
              xl:grid-cols-5
            `}
          >
            {jobs.map((job, i) => (
              <JobCard
                key={i}
                job={job}
                promoted={section.promoted}
                onApply={() => alert(`Applied to ${job.title}`)}
                onSave={(saved) =>
                  console.log(job.title, saved ? "Saved" : "Unsaved")
                }
              />
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Typography
        variant="div"
        className="font-neue font-semibold text-h6 leading-tight"
      >
        Find your Dream Job, <span className="text-secondary"> Albert!</span>
      </Typography>
      <Typography
        variant="div"
        className="font-neue text-text-light text-regular font-medium mt-2"
      >
        Explore the latest job openings and apply for the best opportunities
        available today!
      </Typography>

      <div className="w-full bg-white rounded-xl border border-white shadow-lg mt-6 px-4 py-3 overflow-x-auto">
        <div className="flex min-w-max items-center gap-3">
          <Input
            placeholder="Job Title, Company, or Keywords"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            classNames={{
              input:
                "h-11 text-sm text-gray-700 placeholder-gray-400 bg-transparent outline-none px-0",
              wrapper: "flex-1 min-w-[200px] shadow-none bg-transparent",
            }}
          />

          <div className="h-6 w-px bg-gray-200" />

          <select className="h-11 min-w-[160px] text-sm text-gray-500 bg-transparent outline-none cursor-pointer">
            <option>Select Location</option>
          </select>

          <div className="h-6 w-px bg-gray-200" />

          <select className="h-11 min-w-[120px] text-sm text-gray-500 bg-transparent outline-none cursor-pointer">
            <option>Job Type</option>
          </select>

          <Button
            type="button"
            size="sm"
            className="flex-1 h-10 px-18! bg-secondary text-white text-regular font-medium rounded-lg flex items-center gap-2"
          >
            <Icons icon={ICONS.SEARCH} fontSize={24} />
            Search
          </Button>
        </div>
      </div>

      <div className="flex gap-2 mt-4 sm:mt-6 overflow-x-auto items-center">
        <Typography className="text-[#737A91] font-normal font-neue text-[16px]! whitespace-nowrap">
          Similar:
        </Typography>
        {["Frontend", "Backend", "Graphic Designer"].map((item) => (
          <Typography
            key={item}
            className="border border-[#737A91]! px-4 py-1.5 rounded-md text-[#737A91] text-[14px]! font-neue font-medium cursor-pointer whitespace-nowrap"
          >
            {item}
          </Typography>
        ))}
      </div>

      {jobSections.map(renderJobSection)}
    </div>
  );
};
