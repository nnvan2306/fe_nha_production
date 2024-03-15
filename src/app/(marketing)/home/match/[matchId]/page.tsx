"use client";

import { routes } from "@/helpers/menuRouterHeader";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { memo } from "react";

const PageMatchDetail = ({
    params: matchId,
}: {
    params: { matchId: number };
}) => {
    const router = useRouter();
    const handleBack = () => {
        router.push(`${routes.match.url}`);
    };
    return (
        <div className=" w-[100%] relative">
            <div className="w-[10%] absolute mt-[10px] ml-[10px]">
                <Link
                    href={{
                        pathname: `${routes.match.url}`,
                        query: { id: 1 },
                    }}
                >
                    <button
                        className="w-[100%] h-[50px] border-[1px] border-[#ccc] rounded-full text-[#fff] bg-[#3333cf]"
                        onClick={handleBack}
                    >
                        <i className="bi bi-chevron-left"></i> Back
                    </button>
                </Link>
            </div>
            <div className="w-[60%] h-[100%] ml-[50%] translate-x-[-50%]">
                match detail
            </div>
        </div>
    );
};

export default memo(PageMatchDetail);
