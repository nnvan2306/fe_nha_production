"use client";
import className from "classnames/bind";
import styles from "./Match.module.scss";
import { useEffect, useState } from "react";
import { getAllSeasonAction } from "@/action/seasonAction";
import { IList, ISeason } from "@/utils/interface";
import { getAllTeamAction } from "@/action/teamAction";

const cx: Function = className.bind(styles);

export default function PageMatch() {
    const [listSeasons, setListSeasons] = useState<IList[]>([]);
    const [listTeam, setListTeam] = useState<IList[]>([]);
    const [seasonId, setSeasonId] = useState<number>(0);
    const [hostId, setHostId] = useState<number>(0);
    const [guestId, setGuestId] = useState<number>(0);

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

    const handleGetmatch = async () => {};

    return (
        <div className="w-[60%] h-[100%] ml-[50%] translate-x-[-50%] ">
            <div
                className={cx(
                    "form-filter",
                    " w-[100%] h-[80px] flex justify-around mt-[10px]"
                )}
            >
                <select
                    name=""
                    id=""
                    className="w-[30%] h-[60%]  rounded-[10px] border-[1px] border-[#ccc] shadow-sm"
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
                    className="w-[30%] h-[60%]  rounded-[10px] border-[1px] border-[#ccc] shadow-sm"
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
                    className="w-[30%] h-[60%]  rounded-[10px] border-[1px] border-[#ccc] shadow-sm"
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
            </div>

            <div className="overflow-auto"></div>
        </div>
    );
}
