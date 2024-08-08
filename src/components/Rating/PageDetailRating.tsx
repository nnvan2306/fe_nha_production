"use client";

import { IListResult, IRating, IResult } from "@/utils/interface";
import Image from "next/image";
import React from "react";

export default function PageDetailRating({
    listRating,
    listResult,
}: {
    listRating: IRating[];
    listResult: IListResult[];
}) {
    console.log("listRating >>>>>", listRating);
    console.log("listResult >>>>>", listResult);

    return (
        <div className="w-[100%] overflow-auto md:w-[70%] ml-[50%] translate-x-[-50%] mt-[20px]">
            <table className="md:w-[100%] w-[1000px] overflow-auto shadow-sm">
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
                                            src={`${process.env.NEXT_PUBLIC_BASE_URL}${item?.Team?.logo_url}`}
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
                                                                className={`${
                                                                    itemChild.result ===
                                                                    0
                                                                        ? "bg-[red]"
                                                                        : itemChild.result ===
                                                                          1
                                                                        ? "bg-[#bbb]"
                                                                        : "bg-[green]"
                                                                }
                                                            w-[15px] h-[16px] m-[5px] rounded-full overflow-hidden  flex items-center justify-center `}
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
}
