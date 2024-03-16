"use client";

import { getPlayerAction } from "@/action/playerAction";
import { IPlayer } from "@/utils/interface";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function PagePlayer() {
    const [listPlayer, setListPlayer] = useState<IPlayer[]>([]);

    useEffect(() => {
        const fetch = async () => {
            const res = await getPlayerAction();
            if (res.errorCode === 0) {
                console.log(res.data);
                setListPlayer(res.data);
            }
        };
        fetch();
    }, []);

    return (
        <div className="w-[0%] ml-[50%] translate-x-[-50%] gird grid-cols-7 gap-3">
            {listPlayer &&
                listPlayer.length > 0 &&
                listPlayer.map((item: IPlayer, index: number) => {
                    return (
                        <div
                            className="w-[100px] h-[200px] border-[1px] border-[#ccc] border-solid rounded-[5px]"
                            key={index}
                        >
                            <div className="w-[100%] h-[40%]">
                                <Image
                                    className="w-[100%] h-[100%] object-cover"
                                    src={`${process.env.NEXT_PUBLIC_BASE_URL}${item.avatar_url}`}
                                    alt="avatar"
                                    width={100}
                                    height={100}
                                />
                            </div>
                            <div className="w-[100%] h-[60%] p-[5px]">
                                <p className="font-[500] mb-[10px]">
                                    {item.name}
                                </p>
                                <p>
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
                                <div className="flex items-center">
                                    <Image
                                        // className="w-[20px] h-[20px]"
                                        src={`${process.env.NEXT_PUBLIC_BASE_URL}${item.Team.logo_url}`}
                                        alt="logo"
                                        width={20}
                                        height={20}
                                    />
                                    <p className="ml-[5px]">{item.Team.name}</p>
                                </div>
                            </div>
                        </div>
                    );
                })}
        </div>
    );
}
