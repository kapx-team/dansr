import { CreatorsSection } from "@dansr/web-ui";
import { Footer, HeroSection } from "@dansr/web-ui/server";

export default function HomePage() {
    return (
        <div
            className="w-full"
            style={{
                backgroundImage: `url(/images/landing-background.jpeg)`,
                backgroundSize: "cover",
                backgroundPosition: "top",
                backgroundRepeat: "no-repeat",
            }}
        >
            <HeroSection />

            <CreatorsSection />

            <Footer />
        </div>
    );
}
