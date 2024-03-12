import Image from "next/image";
import thumbnail from "../../../../public/thumbnail_auth.jpg";

export default function LayoutAuth({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="w-[100vw] h-[100vh] relative">
            <Image
                className="w-[100vw] h-[100vh] object-cover absolute z-1"
                src={thumbnail}
                alt="Thumbnail"
            />
            <div className="absolute z-2 w-[100%] h-[100%]">{children}</div>
        </div>
    );
}
