import { CreatorsSection, Header } from "@dansr/web-ui";
import {
    AdvisorSection,
    Footer,
    HeroSection,
    RadarSection,
    TeamSection,
} from "@dansr/web-ui/server";

export const metadata = {
    title: "Home | dansr",
};

export default function HomePage() {
    return (
        <div
            className="w-full"
            style={{
                backgroundImage: `url(/images/landing-background.jpg)`,
                backgroundSize: "cover",
                backgroundPosition: "top",
                backgroundRepeat: "no-repeat",
            }}
        >
            <Header />

            <HeroSection />

            <RadarSection className="mt-16 md:mt-36 lg:mt-80" />

            <TeamSection className="mt-16 md:mt-24 lg:mt-44" />

            <AdvisorSection className="mt-16 md:mt-24 lg:mt-28" />

            <CreatorsSection className="mt-14 md:mt-20 lg:mt-28 mb-10" />

            <Footer />
        </div>
    );
}
