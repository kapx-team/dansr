import { CreatorsSection } from "@dansr/web-ui";
import { AskQuestionHeroSection, Footer } from "@dansr/web-ui/server";

export default function AskQuestionPage() {
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
            <AskQuestionHeroSection />

            <CreatorsSection />

            <Footer />
        </div>
    );
}
