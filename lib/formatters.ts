import { DateTime } from "luxon"

export const prettyDate = (isoDateString: string): string => {
  return DateTime.fromISO(isoDateString).toLocaleString({
    day: "numeric",
    month: "short",
    year: "numeric",
  })
}
