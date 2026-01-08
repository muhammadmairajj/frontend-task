const path = (
  file: string,
  type: "common" | "web" | "icons" | "temp" = "web"
) => {
  return `/assets/${type}/${file}`;
};

export const IMAGES = {
  // Common
  LOGO: path("logo.png", "common"),
  BANNER: path("banner.jpg", "common"),
  AVATAR: path("avatar.png", "common"),
  PROFILE_AVATAR: path("profile_avatar.png", "common"),
  FALLBACK: path("not-available.jpg", "common"),
  MICROSOFT_TEAM: path("microsoft-team.png", "common"),
  FIGMA: path("figmalogo.png", "common"),
} as const;

export type ImagePathProps = typeof IMAGES;
