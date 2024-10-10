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

            <RadarSection className="pt-96" />

            <TeamSection className="pt-44" />

            <AdvisorSection className="pt-28" />

            <CreatorsSection className="pt-20 pb-10" />

            <Footer />
        </div>
    );
}
