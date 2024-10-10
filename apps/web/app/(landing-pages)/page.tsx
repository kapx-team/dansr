import {
    Footer,
    Header,
    HeroSection,
    RadarSection,
} from "@dansr/web-ui/server";

export default function HomePage() {
    return (
        <div
            className="w-full"
            style={{
                backgroundImage: `url(/images/landing-background.jpeg)`,
                backgroundSize: "cover",
                backgroundPosition: "top",
                backgroundPositionY: "-160px",
                backgroundRepeat: "no-repeat",
            }}
        >
            <Header />

            <HeroSection />

            <RadarSection className="py-72" />

            <Footer />
        </div>
    );
}
