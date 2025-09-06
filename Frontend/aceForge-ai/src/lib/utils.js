import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const UI_CONFIG = {
  DESCRIPTION_PREVIEW_LENGTH: 100,
  MAX_VISIBLE_TOPICS: 3,
};
