import { DashboardPageHeader } from "@dansr/web-ui/server";
import { getCurrentHourName } from "@dansr/web-utils";

export const metadata = {
    title: "Dashboard | dansr",
};

export default function DashboardPage() {
    const currentHourName = getCurrentHourName();

    let headerSubText = "New day, new hustle. You're doing awesome!";

    if (currentHourName === "afternoon") {
        headerSubText = "Midday momentum! Keep up the fantastic work!";
    } else if (currentHourName === "evening") {
        headerSubText = "You're finishing strong!";
    } else if (currentHourName === "night") {
        headerSubText = "End of the day, you've made it count! Rest well!";
    }

    return (
        <>
            <DashboardPageHeader
                headerText={`Good ${currentHourName}!`}
                headerSubText={headerSubText}
            />

            <div>Dashboard</div>
        </>
    );
}
