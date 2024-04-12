import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";

export default function LayoutHome({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div>
            <div className="w-[100%] h-[var(--height-header)] fixed top-0 left-0 right-0 z-[100]">
                <Header />
            </div>

            <div className="w-[100%] min-h-[80vh] z-1 mt-[var(--height-header)] pb-[30px] pt-[5px]">
                {children}
            </div>

            <div className="w-[100%] absolute z-1">
                <Footer />
            </div>
        </div>
    );
}
