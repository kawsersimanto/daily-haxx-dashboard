import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

/**
 * Returns a relative time string for a date
 * Example: "2 days ago", "a few seconds ago"
 */

export const formatDate = (date: string | Date | undefined) => {
  if (!date) return "";
  return dayjs(date).fromNow();
};
