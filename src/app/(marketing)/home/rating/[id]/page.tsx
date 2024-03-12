"use client";

import { getRatingAction } from "@/action/ratingAction";
import { handleSortRating } from "@/helpers/handleSort";
import { IRating } from "@/utils/interface";
import { memo, useEffect, useState } from "react";

const PageTableRating = ({ params: { id } }: { params: { id: number } }) => {
    const [listRating, setListRating] = useState<IRating[]>([]);
    useEffect(() => {
        const fetch = async () => {
            const res = await getRatingAction(id);
            if (res.errorCode === 0) {
                let arrClone = handleSortRating(res.data);
                setListRating(arrClone);
            }
        };
        fetch();
    }, [id]);

    console.log(listRating);

    return (
        <div className="w-[100%] mt-[20px]">
            <table className="w-[100%] shadow-sm">
                <thead>
                    <tr className="">
                        <th className="w-[40%]">Câu lạc bộ</th>
                        <th className="w-[5%] text-center">ĐĐ</th>
                        <th className="w-[5%] text-center">Thắng</th>
                        <th className="w-[5%] text-center">Hòa</th>
                        <th className="w-[5%] text-center">Thua</th>
                        <th className="w-[5%] text-center">BT</th>
                        <th className="w-[5%] text-center">SBT</th>
                        <th className="w-[5%] text-center">HS</th>
                        <th className="w-[5%] text-center">Đ</th>
                        <th className="w-[20%%] text-center">
                            5 trận gần nhất
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {listRating &&
                        listRating.length > 0 &&
                        listRating.map((item: IRating, index: number) => {
                            return (
                                <tr key={index}>
                                    <td className="w-[40%]">Câu lạc bộ</td>
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
                                    <td className="w-[5%] text-center">
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
