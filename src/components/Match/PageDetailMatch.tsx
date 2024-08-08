"use client";

import { routes } from "@/helpers/menuRouterHeader";
import { IMatch, IScored } from "@/utils/interface";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { memo } from "react";

const PageDetailMatch = ({
    infoMatch,
    listScored,
}: {
    infoMatch: IMatch;
    listScored: IScored[];
}) => {
    const router: AppRouterInstance = useRouter();

    const handleBack = () => {
        router.push(`${routes.match.url}`);
    };

    return (
        <div className=" w-[100%] md:relative pb-[50px]">
            <div className="w-[25%] md:w-[10%] md:absolute mt-[10px] ml-[10px]">
                <Link
                    href={{
                        pathname: `${routes.match.url}`,
                        query: { id: 1 },
                    }}
                >
                    <button
                        className="w-[100%] h-[50px] border-[1px] border-[#ccc] rounded-full text-[#fff] bg-[#3333cf]"
                        onClick={handleBack}
                    >
                        <i className="bi bi-chevron-left"></i> Back
                    </button>
                </Link>
            </div>

            <div className="md:w-[70%] w-[100%] h-[100%] md:ml-[50%] md:translate-x-[-50%]">
                <div className="w-[100%] flex pt-[20px]">
                    <div className="w-[45%] flex justify-end">
                        <div className="text-center">
                            <Image
                                className="mr-[20px]"
                                src={
                                    infoMatch?.hostId === infoMatch?.Teams[0].id
                                        ? `${process.env.NEXT_PUBLIC_BASE_URL}${infoMatch?.Teams[0].logo_url}`
                                        : `${process.env.NEXT_PUBLIC_BASE_URL}${infoMatch?.Teams[1].logo_url}`
                                }
                                alt="logo"
                                height={50}
                                width={50}
                            />
                            <p className="md:text-[25px] text-[16px] font-[600] mr-[20px] mb-[10px] capitalize">
                                {infoMatch?.hostId === infoMatch?.Teams[0].id
                                    ? infoMatch?.Teams[0].name
                                    : infoMatch?.Teams[1].name}
                            </p>
                            {listScored &&
                                listScored.length > 0 &&
                                listScored.map(
                                    (item: IScored, index: number) => {
                                        return (
                                            <p
                                                key={index}
                                                className="text-start ml-[15px]"
                                            >
                                                {item.teamId ===
                                                infoMatch?.hostId
                                                    ? `${item.namePlayer} ${
                                                          item.minuteGoal
                                                      }' ${
                                                          item.isPenalty
                                                              ? "(P)"
                                                              : ""
                                                      }`
                                                    : null}
                                            </p>
                                        );
                                    }
                                )}
                        </div>
                        <p className="text-[30px] font-[500]">
                            {infoMatch?.hostId === infoMatch?.Teams[0].id
                                ? infoMatch?.hostGoal
                                : infoMatch?.guestGoal}
                        </p>
                    </div>

                    <div className="w-[10%] flex justify-center ">
                        <p className="text-[30px]">-</p>
                    </div>

                    <div className="w-[45%] flex  justify-start">
                        <p className="text-[30px] font-[500] mr-[20px]">
                            {infoMatch?.guestId === infoMatch?.Teams[0].id
                                ? infoMatch?.hostGoal
                                : infoMatch?.guestGoal}
                        </p>
                        <div className="text-center">
                            <Image
                                className="mr-[20px]"
                                src={
                                    infoMatch?.guestId ===
                                    infoMatch?.Teams[0].id
                                        ? `${process.env.NEXT_PUBLIC_BASE_URL}${infoMatch?.Teams[0].logo_url}`
                                        : `${process.env.NEXT_PUBLIC_BASE_URL}${infoMatch?.Teams[1].logo_url}`
                                }
                                alt="logo"
                                height={50}
                                width={50}
                            />
                            <p className="md:text-[25px] text-[16px] font-[600] mb-[10px] capitalize">
                                {infoMatch?.guestId === infoMatch?.Teams[0].id
                                    ? infoMatch?.Teams[0].name
                                    : infoMatch?.Teams[1].name}
                            </p>
                            {listScored &&
                                listScored.length > 0 &&
                                listScored.map(
                                    (item: IScored, index: number) => {
                                        return (
                                            <p
                                                key={index}
                                                className="text-end mr-[15px]"
                                            >
                                                {item.teamId ===
                                                infoMatch?.guestId
                                                    ? `${item.namePlayer} ${
                                                          item.minuteGoal
                                                      }' ${
                                                          item.isPenalty
                                                              ? "(P)"
                                                              : ""
                                                      }`
                                                    : null}
                                            </p>
                                        );
                                    }
                                )}
                        </div>
                    </div>
                </div>

                <div className="md:w-[100%] w-[90%] ml-[50%] translate-x-[-50%] mt-[30px]">
                    <video
                        className="w-[100%] rounded-[10px] shadow-sm"
                        src={`${process.env.NEXT_PUBLIC_BASE_URL}${infoMatch?.match_url}`}
                        controls
                    ></video>
                    <div className="mt-[10px] w-[100%]">
                        <span className="md:text-[20px] text-[16px] font-[600] uppercase">
                            {infoMatch?.title}
                        </span>
                        <span className="md:text-[20px] text-[16px] mx-[10px]">
                            |
                        </span>
                        <span className="md:text-[20px] text-[16px] font-[600] uppercase">
                            {infoMatch?.meta}
                        </span>
                        <span className="md:text-[20px] text-[16px] mx-[10px]">
                            |
                        </span>
                        <span className="md:text-[20px] text-[16px] font-[600] uppercase">
                            ngoại hang anh <span>{infoMatch?.Season.name}</span>
                        </span>
                    </div>
                </div>

                <div className="md:w-[100%] w-[90%] ml-[50%] translate-x-[-50%] border-[1px] border-[#ccc] border-solid rounded-[10px] shadow-md mt-[20px] py-[30px]">
                    <table className="w-[100%]">
                        <thead>
                            <tr>
                                <td className="w-[10%] text-center py-[10px] px-[10px]">
                                    <Image
                                        className="object-contain"
                                        src={
                                            infoMatch?.hostId ===
                                            infoMatch?.Teams[0].id
                                                ? `${process.env.NEXT_PUBLIC_BASE_URL}${infoMatch?.Teams[0].logo_url}`
                                                : `${process.env.NEXT_PUBLIC_BASE_URL}${infoMatch?.Teams[1].logo_url}`
                                        }
                                        alt="logo"
                                        height={30}
                                        width={30}
                                    />{" "}
                                </td>
                                <td className="w-[80%] text-center">
                                    SỐ LIỆU THÔNG KÊ
                                </td>
                                <td className="w-[10%] text-center">
                                    <Image
                                        className="object-contain"
                                        src={
                                            infoMatch?.guestId ===
                                            infoMatch?.Teams[0].id
                                                ? `${process.env.NEXT_PUBLIC_BASE_URL}${infoMatch?.Teams[0].logo_url}`
                                                : `${process.env.NEXT_PUBLIC_BASE_URL}${infoMatch?.Teams[1].logo_url}`
                                        }
                                        alt="logo"
                                        height={30}
                                        width={30}
                                    />
                                </td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="text-center">
                                    {infoMatch?.hostId ===
                                    infoMatch?.Teams[0].id
                                        ? infoMatch?.hostShoot
                                        : infoMatch?.guestShoot}
                                </td>
                                <td className="text-center p-[10px]">
                                    Số lần sút
                                </td>
                                <td className="text-center">
                                    {infoMatch?.guestId ===
                                    infoMatch?.Teams[0].id
                                        ? infoMatch?.hostShoot
                                        : infoMatch?.guestShoot}
                                </td>
                            </tr>

                            <tr>
                                <td className="text-center">
                                    {infoMatch?.hostId ===
                                    infoMatch?.Teams[0].id
                                        ? infoMatch?.hostTarget
                                        : infoMatch?.guestTarget}
                                </td>
                                <td className="text-center p-[10px]">
                                    Sút trúng đích
                                </td>
                                <td className="text-center">
                                    {infoMatch?.guestId ===
                                    infoMatch?.Teams[0].id
                                        ? infoMatch?.hostTarget
                                        : infoMatch?.guestTarget}
                                </td>
                            </tr>

                            <tr>
                                <td className="text-center">
                                    {infoMatch?.hostId ===
                                    infoMatch?.Teams[0].id
                                        ? infoMatch?.hostBallControl
                                        : infoMatch?.hostBallControl
                                        ? 100 - infoMatch?.hostBallControl
                                        : infoMatch?.hostBallControl}
                                </td>
                                <td className="text-center p-[10px]">
                                    Kiểm soát bóng
                                </td>
                                <td className="text-center">
                                    {infoMatch?.guestId ===
                                    infoMatch?.Teams[0].id
                                        ? infoMatch?.hostBallControl
                                        : infoMatch?.hostBallControl
                                        ? 100 - infoMatch?.hostBallControl
                                        : infoMatch?.hostBallControl}
                                </td>
                            </tr>

                            <tr>
                                <td className="text-center">
                                    {infoMatch?.hostId ===
                                    infoMatch?.Teams[0].id
                                        ? infoMatch?.hostYellowCard
                                        : infoMatch?.guestYellowCard}
                                </td>
                                <td className="text-center p-[10px]">
                                    Thẻ vàng
                                </td>
                                <td className="text-center">
                                    {infoMatch?.guestId ===
                                    infoMatch?.Teams[0].id
                                        ? infoMatch?.hostYellowCard
                                        : infoMatch?.guestYellowCard}
                                </td>
                            </tr>

                            <tr>
                                <td className="text-center">
                                    {infoMatch?.hostId ===
                                    infoMatch?.Teams[0].id
                                        ? infoMatch?.hostRedCard
                                        : infoMatch?.guestRedCard}
                                </td>
                                <td className="text-center p-[10px]">Thẻ đỏ</td>
                                <td className="text-center">
                                    {infoMatch?.guestId ===
                                    infoMatch?.Teams[0].id
                                        ? infoMatch?.hostRedCard
                                        : infoMatch?.guestRedCard}
                                </td>
                            </tr>

                            <tr>
                                <td className="text-center">
                                    {infoMatch?.hostId ===
                                    infoMatch?.Teams[0].id
                                        ? infoMatch?.hostConnerKick
                                        : infoMatch?.guestConnerKick}
                                </td>
                                <td className="text-center p-[10px]">
                                    Phạt góc
                                </td>
                                <td className="text-center">
                                    {infoMatch?.guestId ===
                                    infoMatch?.Teams[0].id
                                        ? infoMatch?.hostConnerKick
                                        : infoMatch?.guestConnerKick}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default memo(PageDetailMatch);
