import { CreatorsSection } from "@dansr/web-ui";
import {
    AdvisorSection,
    Footer,
    Header,
    HeroSection,
    RadarSection,
    TeamSection,
} from "@dansr/web-ui/server";

export default function HomePage() {
    return (
        <div
            className="w-full"
            style={{
                backgroundImage: `url(/images/landing-background.jpg)`,
                backgroundSize: "cover",
                backgroundPosition: "top",
                backgroundPositionY: "-280px",
                backgroundRepeat: "no-repeat",
            }}
        >
            <Header />

            <HeroSection />

            <RadarSection className="mt-96" />

            <TeamSection className="mt-44" />

            <AdvisorSection className="mt-28" />

            <CreatorsSection className="mt-20 mb-10" />

            <Footer />
        </div>
    );
}
