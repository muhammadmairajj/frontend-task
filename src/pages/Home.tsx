import {JobSearchUI} from "@/ components/JobSearchUI";
import { ProfileCard } from "@/ components/ProfileCard";

import { profileData } from "@/data";

function Home() {
  return (
    <div className="min-h-screen bg-[#F4F4F4] p-4 md:p-8">
      <div className="max-w-full mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1 space-y-6">
            <ProfileCard {...profileData} />
          </div>
          <div className="lg:col-span-3">
            <JobSearchUI />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
