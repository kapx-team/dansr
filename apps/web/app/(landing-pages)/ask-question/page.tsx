import { CreatorsSection, Header } from "@dansr/web-ui";
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
            <Header />

            <AskQuestionHeroSection />

            <CreatorsSection className="pb-10" />

            <Footer />
        </div>
    );
}
