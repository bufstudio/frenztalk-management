// util.ts
// TODO: Move this file to /lib/utils

/**
 * Formats the given date to a readable date format or date and time.
 * @param date - The date string in UTC format
 * @param includeTime - Whether to include the time in the formatted output
 * @returns Formatted date string or an error message if the input is invalid
 */
export function formatDate(dateString: string): string | null | undefined {
  if (!dateString) {
    console.error("Invalid start time: null or undefined");
    return "Invalid time";
  }
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  } catch (error) {
    console.error("Error formatting date:", error);
    return "Invalid date";
  }
}

/**
 * Formats a date object to a readable time format.
 * @param date - The date object to format
 * @returns Formatted time string
 */
function formatDateTime(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };

  return date
    .toLocaleTimeString([], options)
    .replace(/am|pm/i, (match) => match.toUpperCase());
}

// Used at tuition card and tuition detail
export const formatTime = (
  date: string | null | undefined,
  duration: number | null | undefined
) => {
  if (!date) {
    console.error("Invalid start time: null or undefined");
    return "Invalid time";
  }
  try {
    // Create a date object in UTC
    const start = new Date(date);
    const end = new Date(start.getTime() + (duration ?? 0) * 60 * 1000);

    const formatOptions: Intl.DateTimeFormatOptions = {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };

    const startTime = start
      .toLocaleTimeString([], formatOptions)
      .replace(/am|pm/i, (match) => match.toUpperCase());
    const endTime = end
      .toLocaleTimeString([], formatOptions)
      .replace(/am|pm/i, (match) => match.toUpperCase());

    return `${startTime} to ${endTime}`;
  } catch (error) {
    console.error("Error formatting time range:", error);
    return "Invalid time range";
  }
};

/**
 * Formats the end date and time based on a start date and duration.
 * @param start - The start time string in UTC format
 * @param duration - The duration in hours
 * @returns Formatted end date string or an error message if the input is invalid
 */
export function formatDateRange(
  start: string | null | undefined,
  duration: number | null | undefined,
  outputFormat?: string | null
): string | null | undefined {
  if (!start) {
    console.error("Invalid start time: null or undefined");
    return "Invalid time";
  }

  try {
    const startDate = new Date(start);
    const endDate = new Date(
      startDate.getTime() + (duration ?? 0) * 60 * 60 * 1000
    );
    return outputFormat === "date"
      ? formatDate(endDate.toISOString())
      : formatDateTime(endDate);
  } catch (error) {
    console.error("Error formatting time range:", error);
    return "Invalid time range";
  }
}

export const formatDateTimeLocal = (isoString: string): string => {
  console.log("isoString date: ", isoString);
  if (!isoString) return "";

  const date = new Date(isoString);

  const utcIsoTime = new Date(date.getTime()).toISOString();

  return utcIsoTime.slice(0, 16); // Remove seconds and milliseconds
};

export const formatDateTimeLocalToUTC = (isoString: string): string => {
  if (!isoString) return "";
  const date = new Date(isoString);
  // Adjust for local timezone offset
  const offset = date.getTimezoneOffset() * 60000;
  const localISOUTCTime = new Date(date.getTime() - offset).toISOString();

  console.log("before: ",date.toISOString())
  console.log("after: ",localISOUTCTime)


  return localISOUTCTime.slice(0, 16); // Remove seconds and milliseconds
};

export function toLocalIsoString(date: Date) {
  var tzo = -date.getTimezoneOffset(),
    dif = tzo >= 0 ? "+" : "-",
    pad = function (num: number) {
      return (num < 10 ? "0" : "") + num;
    };

  return (
    date.getFullYear() +
    "-" +
    pad(date.getMonth() + 1) +
    "-" +
    pad(date.getDate()) +
    "T" +
    pad(date.getHours()) +
    ":" +
    pad(date.getMinutes()) +
    ":" +
    pad(date.getSeconds()) +
    dif +
    pad(Math.floor(Math.abs(tzo) / 60)) +
    ":" +
    pad(Math.abs(tzo) % 60)
  );
}

export const utcIsoStringToLocalTime = (utcDate: string): Date => {
  const date = new Date(utcDate);
  return new Date(date.getTime());
};

