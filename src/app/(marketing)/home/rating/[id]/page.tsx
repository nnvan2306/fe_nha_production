"use client";

import { getRatingAction } from "@/action/ratingAction";
import { handleSortRating } from "@/helpers/handleSort";
import { IRating, ITeam } from "@/utils/interface";
import Image from "next/image";
import { memo, useEffect, useState } from "react";

const PageTableRating = ({ params: { id } }: { params: { id: number } }) => {
    const [listRating, setListRating] = useState<IRating[]>([]);
    useEffect(() => {
        const fetch = async () => {
            const res = await getRatingAction(id);
            if (res.errorCode === 0) {
                let arrSort = handleSortRating(res.data);
                setListRating(arrSort);
            }
        };
        fetch();
    }, [id]);

    return (
        <div className="w-[100%] mt-[20px]">
            <table className="w-[100%] shadow-sm">
                <thead className="w-[100%]">
                    <tr className="w-[100%]">
                        <td className="w-[40%]">Câu lạc bộ</td>
                        <td className="w-[5%] text-center">ĐĐ</td>
                        <td className="w-[5%] text-center">Thắng</td>
                        <td className="w-[5%] text-center">Hòa</td>
                        <td className="w-[5%] text-center">Thua</td>
                        <td className="w-[5%] text-center">BT</td>
                        <td className="w-[5%] text-center">SBT</td>
                        <td className="w-[5%] text-center">HS</td>
                        <td className="w-[5%] text-center font-[700]">Đ</td>
                        <td className="w-[20%%] text-center">
                            5 trận gần nhất
                        </td>
                    </tr>
                </thead>
                <tbody>
                    {listRating &&
                        listRating.length > 0 &&
                        listRating.map((item: IRating, index: number) => {
                            return (
                                <tr
                                    key={index}
                                    className="border-b-[1px] border-b-[#ccc] mt-[10px]"
                                >
                                    <td className="w-[100%] flex py-[5px]">
                                        {index < 4 ? (
                                            <div className="border-l-[4px] border-l-[blue]"></div>
                                        ) : (
                                            <></>
                                        )}
                                        {index === 4 ? (
                                            <div className="border-l-[4px] border-l-[orange]"></div>
                                        ) : (
                                            <></>
                                        )}

                                        {index >= 16 ? (
                                            <div className="border-l-[4px] border-l-[red]"></div>
                                        ) : (
                                            <></>
                                        )}
                                        <span className="ml-[30px]">
                                            {index + 1}
                                        </span>
                                        <Image
                                            className="mx-[15px]"
                                            width={30}
                                            height={30}
                                            src={`${process.env.NEXT_PUBLIC_BASE_URL}${item.Team?.logo_url}`}
                                            alt=""
                                        />
                                        <p className="ml-[20px]">
                                            {item.Team?.name}
                                        </p>
                                    </td>
                                    <td className="w-[5%] text-center">
                                        {item.win + item.lose + item.draw}
                                    </td>
                                    <td className="w-[5%] text-center">
                                        {item.win}
                                    </td>
                                    <td className="w-[5%] text-center">
                                        {item.draw}
                                    </td>
                                    <td className="w-[5%] text-center">
                                        {item.lose}
                                    </td>
                                    <td className="w-[5%] text-center">
                                        {item.totalGoal}
                                    </td>
                                    <td className="w-[5%] text-center">
                                        {item.totalLostGoal}
                                    </td>
                                    <td className="w-[5%] text-center">
                                        {item.totalGoal - item.totalLostGoal}
                                    </td>
                                    <td className="w-[5%] text-center font-[700]">
                                        {item.win * 3 + item.draw}
                                    </td>
                                    <td className="w-[20%%] text-center">
                                        5 trận gần nhất
                                    </td>
                                </tr>
                            );
                        })}
                </tbody>
            </table>
        </div>
    );
};

export default memo(PageTableRating);
