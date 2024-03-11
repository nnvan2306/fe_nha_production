import Header from "@/components/Header/Header";

export default function LayoutHome({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div>
            <div className="w-[100%] h-[var(--height-header)] fixed t-0 l-0 r-0 z-[100]">
                <Header />
            </div>

            <div className="w-[100%] h-[100%] absolute z-1 mt-[var(--height-header)]">
                {children}
            </div>
        </div>
    );
}
