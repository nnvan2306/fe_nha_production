"use client";

import { getMatchDetailAction } from "@/action/matchAction";
import { routes } from "@/helpers/menuRouterHeader";
import { IMatch } from "@/utils/interface";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { memo, useEffect, useState } from "react";

const PageMatchDetail = ({
    params: { matchId },
}: {
    params: { matchId: number };
}) => {
    const [infoMatch, setInfoMatch] = useState<IMatch | null>(null);

    const router = useRouter();

    useEffect(() => {
        const fetch = async () => {
            const res = await getMatchDetailAction(matchId);
            if (res.errorCode === 0) {
                setInfoMatch(res.data);
            }
        };
        fetch();
    }, [matchId]);

    const handleBack = () => {
        router.push(`${routes.match.url}`);
    };

    console.log(infoMatch);

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
            <div className="w-[60%] h-[100%] ml-[50%] translate-x-[-50%] ">
                <div className="w-[100%] flex pt-[20px]">
                    <div className="w-[45%] h-[100px] flex justify-end">
                        <div className=" text-center">
                            <Image
                                className="mr-[20px]"
                                src={
                                    infoMatch?.hostId === infoMatch?.Teams[0].id
                                        ? `${process.env.NEXT_PUBLIC_BASE_URL}${infoMatch?.Teams[0].logo_url}`
                                        : `${process.env.NEXT_PUBLIC_BASE_URL}${infoMatch?.Teams[1].logo_url}`
                                }
                                alt="logo"
                                height={50}
                                width={50}
                            />
                            <p className="text-[25px] font-[400] mr-[20px]">
                                {infoMatch?.hostId === infoMatch?.Teams[0].id
                                    ? infoMatch?.Teams[0].name
                                    : infoMatch?.Teams[1].name}
                            </p>
                        </div>
                        <p className="text-[30px] font-[500]">
                            {infoMatch?.hostId === infoMatch?.Teams[0].id
                                ? infoMatch?.hostGoal
                                : infoMatch?.guestGoal}
                        </p>
                    </div>

                    <div className="w-[10%] flex justify-center ">
                        <p className="text-[30px]">-</p>
                    </div>

                    <div className="w-[45%] flex  justify-start">
                        <p className="text-[30px] font-[500] mr-[20px]">
                            {infoMatch?.guestId === infoMatch?.Teams[0].id
                                ? infoMatch?.guestId
                                : infoMatch?.hostId}
                        </p>
                        <div className="text-center">
                            <Image
                                className="mr-[20px]"
                                src={
                                    infoMatch?.guestId ===
                                    infoMatch?.Teams[0].id
                                        ? `${process.env.NEXT_PUBLIC_BASE_URL}${infoMatch?.Teams[0].logo_url}`
                                        : `${process.env.NEXT_PUBLIC_BASE_URL}${infoMatch?.Teams[1].logo_url}`
                                }
                                alt="logo"
                                height={50}
                                width={50}
                            />
                            <p className="text-[25px] font-[500]">
                                {infoMatch?.guestId === infoMatch?.Teams[0].id
                                    ? infoMatch?.Teams[0].name
                                    : infoMatch?.Teams[1].name}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="w-[100%]">
                    <video
                        className="w-[100%] rounded-[10px] shadow-sm"
                        src={`${process.env.NEXT_PUBLIC_BASE_URL}${infoMatch?.match_url}`}
                        controls
                    ></video>
                </div>

                <div className="w-[95%] ml-[50%] translate-x-[-50%] border-[1px] border-[#ccc] border-solid rounded-[10px] shadow-md">
                    <table className="w-[100%]">
                        <thead>
                            <tr>
                                <td className="w-[10%] text-center">
                                    <Image
                                        src={
                                            infoMatch?.hostId ===
                                            infoMatch?.Teams[0].id
                                                ? `${process.env.NEXT_PUBLIC_BASE_URL}${infoMatch?.Teams[0].logo_url}`
                                                : `${process.env.NEXT_PUBLIC_BASE_URL}${infoMatch?.Teams[1].logo_url}`
                                        }
                                        alt="logo"
                                        height={30}
                                        width={30}
                                    />{" "}
                                </td>
                                <td className="w-[80%] text-center">
                                    SỐ LIỆU THÔNG KÊ VỀ ĐỘI TUYỂN
                                </td>
                                <td className="w-[10%] text-center">
                                    <Image
                                        src={
                                            infoMatch?.guestId ===
                                            infoMatch?.Teams[0].id
                                                ? `${process.env.NEXT_PUBLIC_BASE_URL}${infoMatch?.Teams[0].logo_url}`
                                                : `${process.env.NEXT_PUBLIC_BASE_URL}${infoMatch?.Teams[1].logo_url}`
                                        }
                                        alt="logo"
                                        height={30}
                                        width={30}
                                    />
                                </td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="text-center">
                                    {/* {infoMatch?.hostId === infoMatch?.Teams[0].id ? infoMatch.} */}
                                </td>
                                <td className="text-center">Số lần sút</td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default memo(PageMatchDetail);
