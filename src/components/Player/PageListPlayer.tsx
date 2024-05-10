"use client";

import { routes } from "@/helpers/menuRouterHeader";
import { IPlayer } from "@/utils/interface";
import { Empty } from "antd";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

export default function PageListPlayer({
    listPlayer,
}: {
    listPlayer: IPlayer[];
}) {
    const router: AppRouterInstance = useRouter();

    const handleToDetail = (id: number) => {
        router.push(`${routes.player.url}/${id}`);
    };

    return (
        <>
            <div className="md:w-[70%] w-[95%] ml-[50%] translate-x-[-50%] grid md:grid-cols-7 grid-cols-3 md:gap-1 gap-2">
                {listPlayer &&
                    listPlayer.length > 0 &&
                    listPlayer.map((item: IPlayer, index: number) => {
                        return (
                            <div
                                className="md:w-[100px] h-[200px] border-[1px] border-[#ccc] border-solid rounded-[5px] p-[5px] mt-[10px] cursor-pointer"
                                key={index}
                                onClick={() => handleToDetail(item.id)}
                            >
                                <div className="w-[100%] h-[40%]">
                                    <Image
                                        className="w-[100%] h-[100%] object-contain"
                                        src={`${process.env.NEXT_PUBLIC_BASE_URL}${item.avatar_url}`}
                                        alt="avatar"
                                        width={100}
                                        height={100}
                                    />
                                </div>
                                <div className="w-[100%] h-[60%] p-[5px]">
                                    <p className="font-[400] text-[16px] mb-[15px] h-[30%]">
                                        {item.name}
                                    </p>
                                    <p className="text-[12px] h-[30%] leading-[30px]">
                                        {item.location === "1"
                                            ? "thủ môn"
                                            : item.location === "2"
                                            ? "trung vệ"
                                            : item.location === "3"
                                            ? " hậu vệ"
                                            : item.location === "4"
                                            ? "tiền vệ"
                                            : "tiền đạo"}
                                    </p>
                                    <div className="flex items-center h-[40%] pb-[10px]">
                                        <Image
                                            src={`${process.env.NEXT_PUBLIC_BASE_URL}${item.Team.logo_url}`}
                                            alt="logo"
                                            width={20}
                                            height={20}
                                        />
                                        <p className="ml-[5px] text-[10px]">
                                            {item.Team.name}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
            </div>

            {!listPlayer || listPlayer.length === 0 ? (
                <Empty className="text-center mt-[100px]" />
            ) : (
                <></>
            )}
        </>
    );
}
