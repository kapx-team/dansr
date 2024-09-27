import { getHours } from "date-fns";

export function getCurrentHourName(wantFirstLetterCapital = false) {
    const currentTime = new Date();
    const currentHour = getHours(currentTime);

    let result;

    if (currentHour >= 0 && currentHour < 12) {
        result = "Morning";
    } else if (currentHour >= 12 && currentHour < 18) {
        result = "Afternoon";
    } else if (currentHour >= 18 && currentHour < 22) {
        result = "Evening";
    } else {
        result = "Night";
    }

    return wantFirstLetterCapital ? result : result.toLowerCase();
}
