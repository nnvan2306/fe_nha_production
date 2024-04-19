"use client";

import {
    handleGetCommentAction,
    handleLikeAction,
} from "@/action/commentAction";
import { getMatchDetailAction } from "@/action/matchAction";
import { getScoredAction } from "@/action/scoredAction";
import { routes } from "@/helpers/menuRouterHeader";
import { RootState } from "@/store/store";
import { IComment, IMatch, IScored } from "@/utils/interface";
import { Tooltip } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { comment } from "postcss";
import { memo, useEffect, useState } from "react";
import { useSelector } from "react-redux";

const PageMatchDetail = ({
    params: { matchId },
}: {
    params: { matchId: number };
}) => {
    const [infoMatch, setInfoMatch] = useState<IMatch | null>(null);
    const [listScored, setListScored] = useState<IScored[]>([]);
    const [listComment, setListComment] = useState<IComment[]>([]);
    const [isFirstActionLike, setIsFirstActionLike] = useState<boolean>(false);

    const isLogin = useSelector((state: RootState) => state.auth.isLogin);
    const nameUser = useSelector((state: RootState) => state.auth.name);
    const color = useSelector((state: RootState) => state.auth.color);

    const router = useRouter();

    useEffect(() => {
        const fetch = async () => {
            const res = await getMatchDetailAction(matchId);
            const scored = await getScoredAction(matchId);
            const comment = await handleGetCommentAction();
            if (
                res.errorCode === 0 &&
                scored.errorCode === 0 &&
                comment.errorCode === 0
            ) {
                setInfoMatch(res.data);
                setListScored(scored.data);
                setListComment(comment.data);
            }
        };
        fetch();
    }, [matchId]);

    const handleBack = () => {
        router.push(`${routes.match.url}`);
    };

    const handleActionLike = (isLike: boolean) => {};

    return (
        <div className=" w-[100%] relative pb-[50px]">
            <div className="w-[10%] absolute mt-[10px] ml-[10px]">
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
            <div className="w-[60%] h-[100%] ml-[50%] translate-x-[-50%] ">
                <div className="w-[100%] flex pt-[20px]">
                    <div className="w-[45%] flex justify-end">
                        <div className=" text-center">
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
                            <p className="text-[25px] font-[500] mr-[20px] mb-[10px] capitalize">
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
                                                className="text-start"
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
                            <p className="text-[25px] font-[500] mb-[10px] capitalize">
                                {infoMatch?.guestId === infoMatch?.Teams[0].id
                                    ? infoMatch?.Teams[0].name
                                    : infoMatch?.Teams[1].name}
                            </p>
                            {listScored &&
                                listScored.length > 0 &&
                                listScored.map(
                                    (item: IScored, index: number) => {
                                        return (
                                            <p key={index} className="text-end">
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

                <div className="w-[100%] mt-[30px]">
                    <video
                        className="w-[100%] rounded-[10px] shadow-sm"
                        src={`${process.env.NEXT_PUBLIC_BASE_URL}${infoMatch?.match_url}`}
                        controls
                    ></video>
                    <div className="mt-[10px] w-[100%]">
                        <span className="text-[20px] font-[600] uppercase">
                            {infoMatch?.title}
                        </span>
                        <span className="text-[20px] mx-[10px]">|</span>
                        <span className="text-[20px] font-[600] uppercase">
                            {infoMatch?.meta}
                        </span>
                        <span className="text-[20px] mx-[10px]">|</span>
                        <br />
                        <span className="text-[20px] font-[600] uppercase">
                            ngoại hang anh <span>{infoMatch?.Season.name}</span>
                        </span>
                    </div>
                </div>

                <div className="w-[100%] border-[1px] border-[#ccc] border-solid rounded-[10px] shadow-md mt-[20px] py-[30px]">
                    <table className="w-[100%]">
                        <thead>
                            <tr>
                                <td className="w-[10%] text-center py-[10px]">
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
                                    SỐ LIỆU THÔNG KÊ VỀ ĐỘI TUYỂN
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

                {/*  */}
                {/* write comment */}

                <div className="mt-[40px] w-[100%]  flex justify-center ">
                    <div
                        className={`${
                            color < 3
                                ? "bg-[pink]"
                                : color < 6
                                ? "bg-[green]"
                                : "bg-[orange]"
                        }  w-[40px] h-[40px] rounded-full flex justify-center items-center border-solid border-[1px] border-[#fff]`}
                    >
                        <p className="text-[20px] font-[500]">
                            {nameUser.slice(0, 1).toUpperCase()}
                        </p>
                    </div>
                    <div className="w-[95%] pl-[10px]">
                        <input
                            type="text"
                            placeholder=" Viết bình luận ..."
                            className="w-[100%] border-[1px] border-solid border-[#fff] border-b-[#ccc] p-[10px] focus:rounded-[10px] focus:border-solid focus:border-[1px] focus:border-[#fff] focus:border-b-[#ccc] "
                        />
                        <div className="flex justify-end items-center mt-[10px]">
                            <button className="border-none rounded-full py-[10px] px-[25px] mr-[10px] bg-[#fff] hover:bg-[#ddd] font-[600]">
                                Hủy
                            </button>
                            <button className="border-none rounded-full p-[10px] opacity-[0.7]">
                                Bình luận
                            </button>
                        </div>
                    </div>
                </div>

                {/*  */}
                {/* list comment */}
                <div className="">
                    {listComment &&
                        listComment.length > 0 &&
                        listComment.map((item: IComment, index: number) => {
                            return (
                                <div
                                    key={index}
                                    className="flex  justify-center"
                                >
                                    <div
                                        className={`${
                                            color < 3
                                                ? "bg-[pink]"
                                                : color < 6
                                                ? "bg-[green]"
                                                : "bg-[orange]"
                                        }  w-[35px] h-[35px] rounded-full flex justify-center items-center border-solid border-[1px] border-[#fff]`}
                                    >
                                        <p className="text-[16px] font-[500]">
                                            {nameUser.slice(0, 1).toUpperCase()}
                                        </p>
                                    </div>
                                    <div className="w-[95%] pl-[10px]">
                                        <p className="text-[14px] font-[600]">
                                            {item.User.name}
                                        </p>
                                        <p className="text-[16px] my-[10px]">
                                            {item.content}
                                        </p>
                                        <div className="flex justify-start items-center">
                                            <div className="">
                                                <Tooltip
                                                    placement="bottom"
                                                    className=" w-[100px]"
                                                    title={
                                                        <div className="w-[50px] flex justify-center items-center">
                                                            <p>Thích</p>
                                                        </div>
                                                    }
                                                >
                                                    <i
                                                        className="bi bi-hand-thumbs-up hover:opacity-[0.5] cursor-pointer"
                                                        onClick={() =>
                                                            handleActionLike(
                                                                true
                                                            )
                                                        }
                                                    ></i>
                                                </Tooltip>
                                                <span className="ml-[10px]">
                                                    {item.like}
                                                </span>
                                            </div>

                                            <div className="mx-[20px]">
                                                <Tooltip
                                                    placement="bottom"
                                                    className=" w-[100px]"
                                                    title={
                                                        <div className="w-[50px] flex justify-center items-center">
                                                            <p>Thích</p>
                                                        </div>
                                                    }
                                                >
                                                    <i
                                                        className="bi bi-hand-thumbs-down hover:opacity-[0.5] cursor-pointer"
                                                        onClick={() =>
                                                            handleActionLike(
                                                                false
                                                            )
                                                        }
                                                    ></i>
                                                </Tooltip>
                                                <span className="ml-[10px]">
                                                    {item.disLike}
                                                </span>
                                            </div>

                                            <button className="border-none rounded-full p-[10px] bg-[#fff] hover:bg-[#ddd]">
                                                Phản hồi
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                </div>
            </div>
        </div>
    );
};

export default memo(PageMatchDetail);
