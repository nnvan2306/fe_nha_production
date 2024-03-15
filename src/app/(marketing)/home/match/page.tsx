"use client";

import className from "classnames/bind";
import styles from "./Match.module.scss";
import { useEffect, useState } from "react";
import { getAllSeasonAction } from "@/action/seasonAction";
import { IDataSearchMatch, IList, IMatch, ISeason } from "@/utils/interface";
import { getAllTeamAction } from "@/action/teamAction";
import { useRouter } from "next/navigation";
import { Button, Empty } from "antd";
import { getMatchAction } from "@/action/matchAction";
import Image from "next/image";
import poster from "../../../../../public/poster.png";
import { routes } from "@/helpers/menuRouterHeader";

const cx: Function = className.bind(styles);

export default function PageMatch() {
    const [listSeasons, setListSeasons] = useState<IList[]>([]);
    const [listTeam, setListTeam] = useState<IList[]>([]);
    const [seasonId, setSeasonId] = useState<number>(0);
    const [hostId, setHostId] = useState<number>(0);
    const [guestId, setGuestId] = useState<number>(0);
    const [loadings, setLoadings] = useState<boolean>(false);
    const [listMatch, setListMatch] = useState<IMatch[]>([]);

    const router = useRouter();

    useEffect(() => {
        const fetch = async () => {
            let resSeasons = await getAllSeasonAction();
            let resTeam = await getAllTeamAction();
            if (resSeasons.errorCode === 0 && resTeam.errorCode === 0) {
                setListSeasons(
                    resSeasons.data.map((item) => {
                        return {
                            value: item?.id,
                            label: item?.name,
                        };
                    })
                );
                setListTeam(
                    resTeam.data.map((item) => {
                        return {
                            value: item?.id,
                            label: item?.name,
                        };
                    })
                );
            }
        };
        fetch();
    }, []);

    const handleValidate = () => {
        let arrValidate = [seasonId, hostId, guestId];
        let count = 0;
        for (let i = 0; i < arrValidate.length; i++) {
            if (!arrValidate[i]) {
                count++;
            }
        }
        if (count === arrValidate.length) {
            return false;
        } else {
            return true;
        }
    };

    const handleGetmatch = async () => {
        setLoadings(true);
        const check = handleValidate();
        if (!check) {
            setLoadings(false);
            return;
        }
        let dataBuider: IDataSearchMatch = {
            seasonId: seasonId,
            hostId: hostId,
            guestId: guestId,
        };

        const res = await getMatchAction(dataBuider);
        if (res.errorCode === 0) {
            let listSortDetalDate = res.data.sort((a: IMatch, b: IMatch) => {
                let dateA = new Date(a.date).getTime();
                let dateB = new Date(b.date).getTime();
                return dateB - dateA;
            });
            setListMatch(listSortDetalDate);
        }

        setLoadings(false);
    };

    const handlePushDetailMatch = async (id: number) => {
        router.push(`${routes.match.url}/${id}`);
    };

    return (
        <div className="w-[60%] h-[100%] ml-[50%] translate-x-[-50%] ">
            <div className=" w-[100%] h-[80px] flex justify-around mt-[10px]">
                <select
                    name=""
                    id=""
                    className="w-[25%] h-[60%]  rounded-[10px] border-[1px] border-[#ccc] shadow-sm "
                    value={seasonId}
                    onChange={(e) => setSeasonId(+e.target.value)}
                >
                    <option value="">choose season</option>
                    {listSeasons &&
                        listSeasons.length > 0 &&
                        listSeasons.map((item: IList, index: number) => {
                            return (
                                <option key={index} value={item.value}>
                                    {item.label}
                                </option>
                            );
                        })}
                </select>

                <select
                    name=""
                    id=""
                    className="w-[25%] h-[60%]  rounded-[10px] border-[1px] border-[#ccc] shadow-sm "
                    value={hostId}
                    onChange={(e) => setHostId(+e.target.value)}
                >
                    <option value="">choose host Team</option>
                    {listTeam &&
                        listTeam.length > 0 &&
                        listTeam.map((item: IList, index: number) => {
                            return (
                                <option key={index} value={item.value}>
                                    {item.label}
                                </option>
                            );
                        })}
                </select>

                <select
                    name=""
                    id=""
                    className="w-[25%] h-[60%]  rounded-[10px] border-[1px] border-[#ccc] shadow-sm "
                    value={guestId}
                    onChange={(e) => setGuestId(+e.target.value)}
                >
                    <option value="">choose guest Team</option>
                    {listTeam &&
                        listTeam.length > 0 &&
                        listTeam.map((item: IList, index: number) => {
                            return (
                                <option key={index} value={item.value}>
                                    {item.label}
                                </option>
                            );
                        })}
                </select>

                <div className="w-[20%] h-[60%]">
                    <Button
                        className=" w-[100%] h-[100%] rounded-[10px] border-[1px] border-[#ccc] shadow-sm disabled"
                        loading={loadings}
                        onClick={() => handleGetmatch()}
                    >
                        Tìm kiếm
                    </Button>
                </div>
            </div>
            {listMatch.length === 0 ? <Empty className="mt-[50px]" /> : <></>}

            <div className="w-[100%] grid grid-cols-2 gap-3">
                {listMatch &&
                    listMatch.length > 0 &&
                    listMatch.map((item: IMatch, index: number) => {
                        return (
                            <div
                                className={cx(
                                    "item-match",
                                    "w-[100%] h-[150px] border-[1px] border-solid border-[#ccc] flex cursor-pointer rounded-[5px]"
                                )}
                                key={index}
                                onClick={() => handlePushDetailMatch(item.id)}
                            >
                                <div className="w-[70%] h-[100%]  flex justify-between">
                                    <div className="w-[80%] mt-[45px]">
                                        <div className="w-[100%] flex items-center">
                                            <Image
                                                className="w-[30%] h-[30px] object-contain"
                                                width={100}
                                                height={100}
                                                src={`${process.env.NEXT_PUBLIC_BASE_URL}${item.Teams[0].logo_url}`}
                                                alt="logo"
                                            ></Image>
                                            <p>{item.Teams[0].name}</p>
                                        </div>
                                        <div className="w-[100%] flex">
                                            <Image
                                                className="w-[30%] h-[30px] object-contain"
                                                width={100}
                                                height={100}
                                                src={`${process.env.NEXT_PUBLIC_BASE_URL}${item.Teams[1].logo_url}`}
                                                alt="logo"
                                            ></Image>
                                            <p>{item.Teams[1].name}</p>
                                        </div>
                                    </div>

                                    <div className="w-[15%] mt-[50px]">
                                        <div className="w-[100%] h-[30px] flex items-center">
                                            <p>
                                                {item.hostGoal}{" "}
                                                {item.hostGoal >
                                                item.guestGoal ? (
                                                    <span className="ml-[10px]">
                                                        <i className="bi bi-caret-left-fill"></i>
                                                    </span>
                                                ) : (
                                                    <></>
                                                )}
                                            </p>
                                        </div>

                                        <div className="w-[100%] h-[50px] flex items-center">
                                            <p>
                                                {item.guestGoal}
                                                {item.hostGoal <
                                                item.guestGoal ? (
                                                    <span>
                                                        <i className="bi bi-caret-left-fill"></i>
                                                    </span>
                                                ) : (
                                                    <></>
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-[30%] h-[100%] border-[1px] border-solid border-[#ccc]">
                                    <p className="mt-[10px] mb-[2px] text-center">
                                        KT
                                    </p>
                                    <p className="text-center mb-[2px]">
                                        {item.date}
                                    </p>
                                    <div className=" w-[100px] h-[80px] ml-[50%] translate-x-[-50%] relative">
                                        <Image
                                            className="w-[100%] h-[100%] object-contain absolute z-1"
                                            src={poster}
                                            alt="poster"
                                        />
                                        <div className="w-[100%] h-[100%] absolute z-2 flex justify-center items-center">
                                            <i className="bi bi-play-circle-fill text-[25px] text-[red]"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
}
