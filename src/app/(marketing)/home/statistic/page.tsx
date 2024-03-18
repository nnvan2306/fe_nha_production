"use client";

import className from "classnames/bind";
import styles from "./Statistic.module.scss";
import { getAllSeasonAction } from "@/action/seasonAction";
import { handleGetStatisticAction } from "@/action/statisticAction";
import { ISeason, IStatistic } from "@/utils/interface";
import { Empty } from "antd";
import Image from "next/image";
import { useEffect, useState } from "react";

const cx: Function = className.bind(styles);

export default function PageStatistic() {
    const [listSeasons, setListSeasons] = useState<ISeason[]>([]);
    const [seasonId, setSeasonId] = useState<number>(0);
    const [listTopGoal, setListTopGoal] = useState<IStatistic[]>([]);
    const [listTopAssist, setListTopAssist] = useState<IStatistic[]>([]);
    const [listTopYellowCard, setListTopYellowCard] = useState<IStatistic[]>(
        []
    );
    const [listTopRedCard, setListTopRedCard] = useState<IStatistic[]>([]);

    useEffect(() => {
        const fetch = async () => {
            const res = await getAllSeasonAction();
            if (res.errorCode === 0) {
                let listSort = res.data.sort((a: ISeason, b: ISeason) => {
                    let idFirst = a.id;
                    let idSeacon = b.id;
                    return idSeacon - idFirst;
                });
                setSeasonId(listSort[0].id);
                setListSeasons(listSort);

                await handleChangeSeason(listSort[1].id);
            }
        };

        fetch();
    }, []);

    const handleTop = (arr: IStatistic[], Case: number) => {
        let arrClone = arr.map((item: IStatistic, index: number) => {
            return {
                ...item,
                rank: index + 1,
            };
        });

        for (let i = 1; i < arrClone.length; i++) {
            if (Case === 1) {
                if (arrClone[i].goal === arrClone[i - 1].goal) {
                    arrClone[i].rank = arrClone[i - 1].rank;
                } else {
                    arrClone[i].rank = arrClone[i - 1].rank + 1;
                }
            } else if (Case === 2) {
                if (arrClone[i].assist === arrClone[i - 1].assist) {
                    arrClone[i].rank = arrClone[i - 1].rank;
                } else {
                    arrClone[i].rank = arrClone[i - 1].rank + 1;
                }
            } else if (Case === 3) {
                if (arrClone[i].yellowCard === arrClone[i - 1].yellowCard) {
                    arrClone[i].rank = arrClone[i - 1].rank;
                } else {
                    arrClone[i].rank = arrClone[i - 1].rank + 1;
                }
            } else if (Case === 4) {
                if (arrClone[i].redCard === arrClone[i - 1].redCard) {
                    arrClone[i].rank = arrClone[i - 1].rank;
                } else {
                    arrClone[i].rank = arrClone[i - 1].rank + 1;
                }
            }
        }

        return arrClone;
    };

    const handleChangeSeason = async (id: number) => {
        const res = await handleGetStatisticAction(id);

        if (res.errorCode === 0) {
            setSeasonId(id);
            let arrTopGoal = res.data
                .sort((a: IStatistic, b: IStatistic) => {
                    return b.goal - a.goal;
                })
                .slice(0, 5);

            let arrTopAssist = res.data
                .sort((a: IStatistic, b: IStatistic) => {
                    return b.assist - a.assist;
                })
                .slice(0, 5);

            let arrTopYellowCard = res.data
                .sort((a: IStatistic, b: IStatistic) => {
                    return b.yellowCard - a.yellowCard;
                })
                .slice(0, 5);

            let arrTopRedCard = res.data
                .sort((a: IStatistic, b: IStatistic) => {
                    return b.redCard - a.redCard;
                })
                .slice(0, 5);

            setListTopGoal(handleTop(arrTopGoal, 1));
            setListTopAssist(handleTop(arrTopAssist, 2));
            setListTopYellowCard(handleTop(arrTopYellowCard, 3));
            setListTopRedCard(handleTop(arrTopRedCard, 4));
        }
    };

    return (
        <div className="w-[60%] ml-[50%] translate-x-[-50%]">
            <select
                className="mt-[20px] w-[25%] p-[10px] border-[1px] border-solid border-[#ccc] rounded-[10px] shadow-sm"
                value={seasonId}
                onChange={(e) => handleChangeSeason(+e.target.value)}
            >
                <option value={0}>Choose season</option>
                {listSeasons &&
                    listSeasons.length > 0 &&
                    listSeasons.map((item: ISeason, index: number) => {
                        return (
                            <option key={index} value={item.id}>
                                {item.name}
                            </option>
                        );
                    })}
            </select>

            <p className="my-[20px]">Số bàn thắng</p>
            <table className="w-[90%] ml-[50%] translate-x-[-50%]">
                <thead>
                    <tr>
                        <td className="p-[10px]">Vận động viên</td>
                        <td className="text-end">Số bàn thắng</td>
                    </tr>
                </thead>
                <tbody>
                    {listTopGoal && listTopGoal.length > 0 ? (
                        listTopGoal.map((item: IStatistic, index: number) => {
                            return (
                                <tr
                                    key={index}
                                    className="border-y-[0.5px] border-solid border-[#ddd]"
                                >
                                    <td className="flex items-center p-[5px]">
                                        <p className="pl-[10px] mr-[20px]">
                                            {item.rank}
                                        </p>
                                        <Image
                                            className="object-contain rounded-[100%] border-[1px] border-solid border-[#ccc] mr-[15px]"
                                            src={`${process.env.NEXT_PUBLIC_BASE_URL}${item.Player.avatar_url}`}
                                            alt="avatar"
                                            width={50}
                                            height={50}
                                        />

                                        <div className="">
                                            <p>{item.Player.name}</p>
                                            <div className="flex">
                                                <Image
                                                    className="object-contain rounded-[100%] mr-[10px]"
                                                    src={`${process.env.NEXT_PUBLIC_BASE_URL}${item.Player.Team.logo_url}`}
                                                    alt="avatar"
                                                    width={20}
                                                    height={20}
                                                />{" "}
                                                <p className="text-[13px] opacity-[0.6]">
                                                    {item.Player.Team.name}
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="text-end pr-[20px]">
                                        {item.goal}
                                    </td>
                                </tr>
                            );
                        })
                    ) : (
                        <tr>
                            <td>
                                <Empty className={cx("form-empty")} />
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            <p className="my-[20px]">Số đường kiến tạo</p>

            <table className="w-[90%] ml-[50%] translate-x-[-50%]">
                <thead>
                    <tr>
                        <td className="p-[10px]">Vận động viên</td>
                        <td className="text-end">Số kiến tạo</td>
                    </tr>
                </thead>
                <tbody>
                    {listTopAssist && listTopAssist.length > 0 ? (
                        listTopAssist.map((item: IStatistic, index: number) => {
                            return (
                                <tr
                                    key={index}
                                    className="border-y-[0.5px] border-solid border-[#ddd]"
                                >
                                    <td className="flex items-center p-[5px]">
                                        <p className="pl-[10px] mr-[20px]">
                                            {item.rank}
                                        </p>
                                        <Image
                                            className="object-contain rounded-[100%] border-[1px] border-solid border-[#ccc] mr-[15px]"
                                            src={`${process.env.NEXT_PUBLIC_BASE_URL}${item.Player.avatar_url}`}
                                            alt="avatar"
                                            width={50}
                                            height={50}
                                        />

                                        <div className="">
                                            <p>{item.Player.name}</p>
                                            <div className="flex">
                                                <Image
                                                    className="object-contain rounded-[100%] mr-[10px]"
                                                    src={`${process.env.NEXT_PUBLIC_BASE_URL}${item.Player.Team.logo_url}`}
                                                    alt="avatar"
                                                    width={20}
                                                    height={20}
                                                />{" "}
                                                <p className="text-[13px] opacity-[0.6]">
                                                    {item.Player.Team.name}
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="text-end pr-[20px]">
                                        {item.assist}
                                    </td>
                                </tr>
                            );
                        })
                    ) : (
                        <tr>
                            <td>
                                <Empty className={cx("form-empty")} />
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            <p className="my-[20px]">Số thẻ vàng </p>

            <table className="w-[90%] ml-[50%] translate-x-[-50%]">
                <thead>
                    <tr>
                        <td className="p-[10px]">Vận động viên</td>
                        <td className="text-end">Số thẻ vàng</td>
                    </tr>
                </thead>
                <tbody>
                    {listTopYellowCard && listTopYellowCard.length > 0 ? (
                        listTopYellowCard.map(
                            (item: IStatistic, index: number) => {
                                return (
                                    <tr
                                        key={index}
                                        className="border-y-[0.5px] border-solid border-[#ddd]"
                                    >
                                        <td className="flex items-center p-[5px]">
                                            <p className="pl-[10px] mr-[20px]">
                                                {item.rank}
                                            </p>
                                            <Image
                                                className="object-contain rounded-[100%] border-[1px] border-solid border-[#ccc] mr-[15px]"
                                                src={`${process.env.NEXT_PUBLIC_BASE_URL}${item.Player.avatar_url}`}
                                                alt="avatar"
                                                width={50}
                                                height={50}
                                            />

                                            <div className="">
                                                <p>{item.Player.name}</p>
                                                <div className="flex">
                                                    <Image
                                                        className="object-contain rounded-[100%] mr-[10px]"
                                                        src={`${process.env.NEXT_PUBLIC_BASE_URL}${item.Player.Team.logo_url}`}
                                                        alt="avatar"
                                                        width={20}
                                                        height={20}
                                                    />{" "}
                                                    <p className="text-[13px] opacity-[0.6]">
                                                        {item.Player.Team.name}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="text-end pr-[20px]">
                                            {item.yellowCard}
                                        </td>
                                    </tr>
                                );
                            }
                        )
                    ) : (
                        <tr>
                            <td>
                                <Empty className={cx("form-empty")} />
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            <p className="my-[20px]">Số thẻ đỏ</p>

            <table className="w-[90%] ml-[50%] translate-x-[-50%]">
                <thead>
                    <tr>
                        <td className="p-[10px]">Vận động viên</td>
                        <td className="text-end">Số thẻ đỏ</td>
                    </tr>
                </thead>
                <tbody>
                    {listTopRedCard && listTopRedCard.length > 0 ? (
                        listTopRedCard.map(
                            (item: IStatistic, index: number) => {
                                return (
                                    <tr
                                        key={index}
                                        className="border-y-[0.5px] border-solid border-[#ddd]"
                                    >
                                        <td className="flex items-center p-[5px]">
                                            <p className="pl-[10px] mr-[20px]">
                                                {item.rank}
                                            </p>
                                            <Image
                                                className="object-contain rounded-[100%] border-[1px] border-solid border-[#ccc] mr-[15px]"
                                                src={`${process.env.NEXT_PUBLIC_BASE_URL}${item.Player.avatar_url}`}
                                                alt="avatar"
                                                width={50}
                                                height={50}
                                            />

                                            <div className="">
                                                <p>{item.Player.name}</p>
                                                <div className="flex">
                                                    <Image
                                                        className="object-contain rounded-[100%] mr-[10px]"
                                                        src={`${process.env.NEXT_PUBLIC_BASE_URL}${item.Player.Team.logo_url}`}
                                                        alt="avatar"
                                                        width={20}
                                                        height={20}
                                                    />{" "}
                                                    <p className="text-[13px] opacity-[0.6]">
                                                        {item.Player.Team.name}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="text-end pr-[20px]">
                                            {item.redCard}
                                        </td>
                                    </tr>
                                );
                            }
                        )
                    ) : (
                        <tr>
                            <td>
                                <Empty className={cx("form-empty")} />
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
