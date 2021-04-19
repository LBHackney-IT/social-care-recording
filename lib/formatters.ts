import { DateTime } from "luxon"

/** Convert an ISO-formatted string into a human-friendly date string */
export const prettyDate = (isoDateString: string): string => {
  const parsed = DateTime.fromISO(isoDateString)
  return parsed.isValid ? parsed.toFormat("d MMM yyyy") : ""
}

/** Convert a millisecond string into a human-friendly date string */
export const prettyDateFromMillis = (millis: number): string => {
  const parsed = DateTime.fromMillis(millis)
  return parsed.isValid ? parsed.toFormat("d MMM yyyy") : ""
}

/** Convert bytes to human-friendly file sizes */
export const prettyFileSize = (bytes: number): string => {
  if (bytes == 0) {
    return "0.0 B"
  }
  const e = Math.floor(Math.log(bytes) / Math.log(1024))
  return (bytes / Math.pow(1024, e)).toFixed(1) + " " + " KMGTP".charAt(e) + "B"
}
