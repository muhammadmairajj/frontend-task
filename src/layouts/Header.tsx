import React, { useState } from "react";

import { Link } from "react-router-dom";

import { Button } from "@/ components/common/Button";
import { Icons } from "@/ components/common/Icons";
import { Input } from "@/ components/common/Input";
import { Photo } from "@/ components/common/Photo";
import { MobileDrawer } from "./MobileDrawer";

import { IMAGES } from "@/lib";

const NAV_LINKS = [
  { label: "Find Jobs", to: "#", active: true },
  { label: "Top Companies", to: "#" },
  { label: "Job Tracker", to: "#" },
  { label: "My Calendar", to: "#" },
  { label: "Documents", to: "#" },
  { label: "Messages", to: "#" },
  { label: "Notifications", to: "#" },
];

export const Header: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 z-50 w-full bg-white shadow-[0_1px_6px_rgba(0,0,0,0.06)]">
        <div className="mx-auto max-w-screen-exl px-24">
          <div className="flex h-20 items-center justify-between">
            <div className="flex items-center gap-10">
              <Photo src={IMAGES.LOGO} alt="Logo" width={36} height={36} />

              <nav className="hidden lg:flex items-center gap-7 text-[15px] font-medium">
                {NAV_LINKS.map(({ label, to, active }) => (
                  <Link
                    key={label}
                    to={to}
                    className={active ? "text-secondary" : "text-[#737A91]"}
                  >
                    {label}
                  </Link>
                ))}
              </nav>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-65 hidden lg:block">
                <Input
                  placeholder="Search"
                  classNames={{
                    wrapper: "h-10 rounded-lg border bg-[#F6F9FF] px-3",
                    input: "h-full text-sm text-[#737A91]",
                  }}
                  startEndContent={{
                    start: (
                      <Icons icon="mdi:magnify" className="text-gray-400" />
                    ),
                  }}
                />
              </div>

              <Button
                text="Resume Builder"
                variant="secondary"
                size="sm"
                className="flex-1 hidden lg:block px-6 rounded-lg text-[12px] font-medium font-neue text-white"
              />

              <div className="h-10 w-10 rounded-full overflow-hidden">
                <Photo
                  src={IMAGES.PROFILE_AVATAR}
                  alt="Profile"
                  width={40}
                  height={40}
                />
              </div>

              {/* MOBILE ICON */}
              <button onClick={() => setOpen(true)} className="lg:hidden">
                <Icons icon="mdi:menu" className="text-2xl text-gray-700" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* MOBILE DRAWER */}
      <MobileDrawer open={open} onClose={() => setOpen(false)} />
    </>
  );
};
