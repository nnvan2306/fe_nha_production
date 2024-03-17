"use client";

import { getPlayerAction } from "@/action/playerAction";
import { routes } from "@/helpers/menuRouterHeader";
import { IPlayer } from "@/utils/interface";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function PagePlayer() {
    const [listPlayer, setListPlayer] = useState<IPlayer[]>([]);

    useEffect(() => {
        const fetch = async () => {
            const res = await getPlayerAction();
            if (res.errorCode === 0) {
                setListPlayer(res.data);
            }
        };
        fetch();
    }, []);

    return (
        <div className=" ml-[50%] translate-x-[-50%] grid grid-cols-7 gap-[1]">
            {listPlayer &&
                listPlayer.length > 0 &&
                listPlayer.map((item: IPlayer, index: number) => {
                    return (
                        <Link
                            key={index}
                            href={{
                                pathname: `${routes.player.url}/${item.id}`,
                                query: item,
                            }}
                        >
                            <div
                                className="w-[100px] h-[200px] border-[1px] border-[#ccc] border-solid rounded-[5px] p-[5px] mt-[10px]"
                                // key={index}
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
                                        {item.location === 1
                                            ? "thủ môn"
                                            : item.location === 2
                                            ? "trung vệ"
                                            : item.location === 3
                                            ? " hậu vệ"
                                            : item.location === 4
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
                        </Link>
                    );
                })}
        </div>
    );
}
