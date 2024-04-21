import { Suspense } from "react";

export default async function LayoutMatch({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div>
            <Suspense fallback={<div>Loading.....</div>}>
                <div>
                    {/* <HandleData detail={children} /> */}
                    {children}
                </div>
            </Suspense>
        </div>
    );
}
