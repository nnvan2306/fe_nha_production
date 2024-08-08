// import Image from "next/image";
// import thumbnail from "../../../../public/thumbnail_auth.jpg";
// import Link from "next/link";

// export default function LayoutAuth({
//     children,
// }: {
//     children: React.ReactNode;
// }) {
//     return (
//         <div className="w-[100vw] h-[100vh] relative ">
//             <Image
//                 className="w-full h-full object-cover absolute z-1"
//                 src={thumbnail}
//                 alt="Thumbnail"
//             />

//             <Link href={"/home"}>
//                 <div className=" absolute z-3 w-[100px] h-[40px] mt-[20px] ml-[20px] flex justify-center items-center border-[1px] rounded-[10px] bg-[#fecfef] hover:opacity-">
//                     <i className="bi bi-house-door-fill text-[#2a5298]"></i>
//                     <p className="ml-[5px] text-[#2a5298]">Home</p>
//                 </div>
//             </Link>

//             <div className="absolute">{children}</div>
//             {/* absolute z-2 w-[100%] h-[100%] mt-[100px] md:mt-[0px] */}
//         </div>
//     );
// }

import Image from "next/image";
import thumbnail from "../../../../public/thumbnail_auth.jpg";
import Link from "next/link";

export default function LayoutAuth({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div
            className="relative w-[100vw] min-h-screen flex flex-col items-center justify-center bg-cover bg-center"
            style={{ backgroundImage: `url(${thumbnail.src})` }}
        >
            <div className="w-full flex justify-start p-5">
                <Link href={"/home"}>
                    <div className="w-[100px] h-[40px] flex justify-center items-center border rounded-lg bg-pink-200 hover:opacity-90">
                        <i className="bi bi-house-door-fill text-blue-800"></i>
                        <p className="ml-1 text-blue-800">Home</p>
                    </div>
                </Link>
            </div>

            <div className="flex-grow flex items-center justify-center w-[100%] ">
                {children}
            </div>
        </div>
    );
}
