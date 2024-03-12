import Image from "next/image";
import thumbnail from "../../../../public/thumbnail_auth.jpg";
import Link from "next/link";
import { routes } from "@/helpers/menuRouterHeader";

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

            <Link href={"/home"}>
                <div className="absolute z-3 w-[100px] h-[40px] mt-[20px] ml-[20px] flex justify-center items-center border-[1px] rounded-[10px] bg-[#fecfef] hover:opacity-">
                    <i className="bi bi-house-door-fill text-[#2a5298]"></i>
                    <p className="ml-[5px] text-[#2a5298]">Home</p>
                </div>
            </Link>
            <div className="absolute z-2 w-[100%] h-[100%]">{children}</div>
        </div>
    );
}
