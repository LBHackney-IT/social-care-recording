import { DateTime } from "luxon"

export const prettyDate = (isoDateString: string): string => {
  const parsed = DateTime.fromISO(isoDateString).setLocale("en-gb")
  return parsed.isValid
    ? parsed.toLocaleString({
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : ""
}
