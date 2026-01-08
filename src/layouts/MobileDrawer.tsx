import React from "react";
import { Link, useLocation } from "react-router-dom";

import { Button } from "@/ components";
import { Icons } from "@/ components/common/Icons";
import { Typography } from "@/ components/common/Typography";
import { Photo } from "@/ components/common/Photo";

import { IMAGES } from "@/lib";

interface MobileDrawerProps {
  open: boolean;
  onClose: () => void;
}

const menuItems = [
  { label: "Find Jobs", path: "#", icon: "mdi:briefcase-outline" },
  {
    label: "Top Companies",
    path: "#",
    icon: "mdi:office-building-outline",
  },
  {
    label: "Job Tracker",
    path: "#",
    icon: "mdi:clipboard-check-outline",
  },
  {
    label: "My Calendar",
    path: "#",
    icon: "mdi:calendar-month-outline",
  },
  { label: "Documents", path: "#", icon: "mdi:file-document-outline" },
  { label: "Messages", path: "#", icon: "mdi:message-text-outline" },
  { label: "Notifications", path: "#", icon: "mdi:bell-outline" },
];

export const MobileDrawer: React.FC<MobileDrawerProps> = ({
  open,
  onClose,
}) => {
  const { pathname } = useLocation();
  if (!open) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black/40 lg:hidden"
        onClick={onClose}
      />

      <aside className="fixed top-0 right-0 z-50 h-full w-80 bg-white shadow-xl lg:hidden flex flex-col">
        <div className="flex items-center justify-between px-6 h-20 border-b">
          <div className="flex items-center gap-3">
            <Photo
              src={IMAGES.PROFILE_AVATAR}
              width={40}
              height={40}
              className="rounded-full"
            />

            <div>
              <Typography variant="p" className="font-semibold text-sm">
                Welcome
              </Typography>
              <Typography variant="span" className="text-xs text-gray-500">
                Job Seeker
              </Typography>
            </div>
          </div>

          <button onClick={onClose}>
            <Icons icon="mdi:close" className="text-2xl text-gray-600" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-4 py-5 space-y-1">
          {menuItems.map((item) => {
            const active = pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-xl transition
                  ${active ? "bg-secondary/10" : "hover:bg-gray-100"}
                `}
              >
                <Icons
                  icon={item.icon}
                  className={`text-xl ${
                    active ? "text-secondary" : "text-gray-500"
                  }`}
                />

                <Typography
                  variant="p"
                  className={`text-[15px] font-medium ${
                    active ? "text-secondary" : "text-gray-700"
                  }`}
                >
                  {item.label}
                </Typography>
              </Link>
            );
          })}
        </nav>

        <div className="p-5 border-t">
          <Button
            text="Resume Builder"
            variant="secondary"
            size="sm"
            className="w-full flex-1 rounded-lg text-[12px]! font-medium font-neue text-white"
          />
        </div>
      </aside>
    </>
  );
};
