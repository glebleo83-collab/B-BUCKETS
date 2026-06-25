import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * `cn` merges Tailwind classes safely. clsx joins conditional classes; twMerge
 * removes conflicts (e.g. "p-2 p-4" -> "p-4"). Every shadcn component uses this.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
