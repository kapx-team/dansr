import { XLogin } from "@dansr/web-ui";
import { Suspense } from "react";

export default function AuthPage() {
    return (
        <div
            style={{
                backgroundImage: `url(/images/background.jpeg)`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "100vh",
            }}
        >
            <div
                className="flex flex-col items-center justify-center h-full
            space-y-2 md:-space-y-2 text-center"
            >
                <Suspense fallback={<div>Loading...</div>}>
                    <XLogin />
                </Suspense>
            </div>
        </div>
    );
}
