"use client";

import className from "classnames/bind";
import styles from "./StatisticDetail.module.scss";
import { IStatistic } from "@/utils/interface";
import { Empty } from "antd";
import Image from "next/image";
import React from "react";

const cx: Function = className.bind(styles);

export default function StatisticDetail({
    listTopGoal,
    listTopAssist,
    listTopYellowCard,
    listTopRedCard,
}: {
    listTopGoal: IStatistic[];
    listTopAssist: IStatistic[];
    listTopYellowCard: IStatistic[];
    listTopRedCard: IStatistic[];
}) {
    console.log(listTopGoal);
    return (
        <div className="w-[60%] ml-[50%] translate-x-[-50%]">
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
