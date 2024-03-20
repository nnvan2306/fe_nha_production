"use client";

import className from "classnames/bind";
import styles from "./RatingDetail.module.scss";
import { getRatingAction } from "@/action/ratingAction";
import { handleSortRating } from "@/helpers/handleSort";
import { IListResult, IMatch, IRating, IResult } from "@/utils/interface";
import Image from "next/image";
import { memo, useEffect, useState } from "react";

const cx: Function = className.bind(styles);

const PageTableRating = ({ params: { id } }: { params: { id: number } }) => {
    const [listRating, setListRating] = useState<IRating[]>([]);
    const [listResult, setListResult] = useState<IListResult[]>([]);

    useEffect(() => {
        const fetch = async () => {
            const res = await getRatingAction(id);
            if (res.errorCode === 0) {
                let arrSort = handleSortRating(res.data);
                // setListRating(arrSort);

                arrSort.forEach((item: IRating) => {
                    //sort lay ra 5 tran gan nhat
                    item.Team?.Matches.sort((a: IMatch, b: IMatch) => {
                        let timeA = new Date(a.date).getTime();
                        let timeB = new Date(b.date).getTime();
                        return timeB - timeA;
                    });
                });

                arrSort.forEach((item: IRating) => {
                    // gan gia tri cho result
                    let arrResult = item.Team?.Matches.map(
                        (itemChild: IMatch) => {
                            let result: number;
                            if (item.Team?.id === itemChild.hostId) {
                                if (
                                    itemChild.hostGoal === itemChild.guestGoal
                                ) {
                                    result = 1;
                                } else if (
                                    itemChild.hostGoal < itemChild.guestId
                                ) {
                                    result = 0;
                                } else {
                                    result = 2;
                                }
                            } else {
                                if (
                                    itemChild.guestGoal === itemChild.hostGoal
                                ) {
                                    result = 1;
                                } else if (
                                    itemChild.guestGoal < itemChild.hostGoal
                                ) {
                                    result = 0;
                                } else {
                                    result = 2;
                                }
                            }

                            return {
                                result: result,
                            };
                        }
                    );

                    setListResult((prev) => [...prev, { arr: arrResult }]);
                });
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
                                            <div className="w-[3px] h-[30px] bg-[blue]"></div>
                                        ) : index === 4 ? (
                                            <div className="w-[3px] h-[30px] bg-[orange]"></div>
                                        ) : index >= 16 ? (
                                            <div className="w-[3px] h-[30px] bg-[red]"></div>
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
                                    <td className="w-[20%%] text-center flex justify-end items-center pr-[40px]">
                                        {listResult[index].arr &&
                                            listResult[index].arr.length > 0 &&
                                            listResult[index].arr.map(
                                                (
                                                    itemChild: IResult,
                                                    indexChild: number
                                                ) => {
                                                    if (indexChild < 5) {
                                                        return (
                                                            <div
                                                                className={cx(
                                                                    itemChild.result ===
                                                                        0
                                                                        ? "bg-[red]"
                                                                        : itemChild.result ===
                                                                          1
                                                                        ? "bg-[#bbb]"
                                                                        : "bg-[green]",
                                                                    "w-[15px] h-[16px] m-[5px] rounded-full overflow-hidden  flex items-center justify-center "
                                                                )}
                                                                key={indexChild}
                                                            >
                                                                {itemChild.result ===
                                                                0 ? (
                                                                    <i className="bi bi-x text-[#fff] text-[12px]"></i>
                                                                ) : itemChild.result ===
                                                                  1 ? (
                                                                    <i className="bi bi-dash text-[#fff] text-[12px]"></i>
                                                                ) : (
                                                                    <i className="bi bi-check-lg text-[#fff] text-[12px]"></i>
                                                                )}
                                                            </div>
                                                        );
                                                    }
                                                }
                                            )}
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
