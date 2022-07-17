import { DateTime } from "luxon";

// Formats ISO Date date to a human-readable format
export default function readableDate(date) {
  return (
    DateTime.fromISO(date).toJSDate().toString().slice(0, 3) +
    ", " +
    DateTime.fromISO(date).toJSDate().toString().slice(4, 15) +
    " at " +
    from24hrto12hr(DateTime.fromISO(date).toJSDate().toString().slice(16, 21))
  );
}

//
const from24hrto12hr = (fourDigitTime) => {
  const hours24 = parseInt(fourDigitTime.substring(0, 2));
  const hours = ((hours24 + 11) % 12) + 1;
  const amPm = hours24 > 11 ? "PM" : "AM";
  const minutes = fourDigitTime.substring(2);

  return `${hours}${minutes} ${amPm}`;
};
