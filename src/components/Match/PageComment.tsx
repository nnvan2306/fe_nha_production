"use client";

import { handleCreateComment } from "@/action/commentAction";
import { routes } from "@/helpers/menuRouterHeader";
import { RootState } from "@/store/store";
import { IComment, IFeedback, IListLimit } from "@/utils/interface";
import { Tooltip } from "antd";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import React, { memo, useState } from "react";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

const PageComment = ({
    listComment,
    matchId,
}: {
    listComment: IListLimit<IComment>;
    matchId: number;
}) => {
    const [textComment, setTextComment] = useState<string>("");
    const [listCommentNew, setListCommentNew] = useState<IComment[]>(
        listComment.items.map((item: IComment) => {
            return { ...item, isViewFeedback: false };
        })
    );

    const isLogin = useSelector((state: RootState) => state.auth.isLogin);
    const nameUser = useSelector((state: RootState) => state.auth.name);
    const userId = useSelector((state: RootState) => state.auth.userId);
    const color = useSelector((state: RootState) => state.auth.color);

    const router: AppRouterInstance = useRouter();

    const handleValidateComment = (): boolean => {
        if (!isLogin) {
            router.push(routes.login.url);
            return false;
        }

        if (!textComment) {
            Swal.fire({
                icon: "warning",
                title: "please enter comment !",
            });
            return false;
        }

        return true;
    };

    const handleComment = async () => {
        const check = handleValidateComment();
        if (!check) {
            return;
        }

        let dataBuider = {
            content: textComment,
            matchId: matchId,
            userId: userId,
        };

        let res = await handleCreateComment(dataBuider);
        if (res.errorCode === 0) {
            setTextComment("");
        }
    };

    const handleActionLike = (isLike: boolean) => {};

    return (
        <div className="w-[70%] ml-[50%] translate-x-[-50%]">
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
                        value={textComment}
                        onChange={(e) => setTextComment(e.target.value)}
                    />
                    <div className="flex justify-end items-center mt-[10px]">
                        <button
                            className="border-none rounded-full py-[10px] px-[25px] mr-[10px] bg-[#fff] hover:bg-[#ddd] font-[600]"
                            onClick={() => setTextComment("")}
                        >
                            Hủy
                        </button>
                        <button
                            className="border-none rounded-full p-[10px] opacity-[0.7]"
                            onClick={() => handleComment()}
                        >
                            Bình luận
                        </button>
                    </div>
                </div>
            </div>

            {/*  */}
            {/* list comment */}
            <div className="w-[100%]">
                {listCommentNew &&
                    listCommentNew.length > 0 &&
                    listCommentNew.map((item: IComment, index: number) => {
                        return (
                            <div key={index} className="flex justify-center">
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
                                    <p className="text-[16px] my-[5px]">
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
                                                        handleActionLike(true)
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
                                                    <div className="w-[100%] flex justify-center items-center">
                                                        <p> không Thích</p>
                                                    </div>
                                                }
                                            >
                                                <i
                                                    className="bi bi-hand-thumbs-down hover:opacity-[0.5] cursor-pointer"
                                                    onClick={() =>
                                                        handleActionLike(false)
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

                                    <div className="">
                                        {item.isViewFeedback ? (
                                            <div className="w-[100%]">
                                                <button
                                                    className="w-[150px] py-[6px] border-none rounded-[100px] bg-[#fff] text-[#065fd4] hover:bg-[#def1ff]"
                                                    onClick={() =>
                                                        setListCommentNew(
                                                            listCommentNew.map(
                                                                (
                                                                    itemChild,
                                                                    indexChild
                                                                ) => {
                                                                    if (
                                                                        indexChild ===
                                                                        index
                                                                    ) {
                                                                        itemChild.isViewFeedback =
                                                                            false;
                                                                    }
                                                                    return itemChild;
                                                                }
                                                            )
                                                        )
                                                    }
                                                >
                                                    <i className="bi bi-caret-up-fill mr-[10px]"></i>
                                                    {item.Feedbacks.length} phản
                                                    hồi
                                                </button>

                                                <div className="w-[100%] ml-[10px] mt-[10px]">
                                                    {item.Feedbacks.length >
                                                        0 &&
                                                        item.Feedbacks.map(
                                                            (
                                                                itemFeed: IFeedback,
                                                                indexFeed: number
                                                            ) => {
                                                                return (
                                                                    <div
                                                                        className="flex"
                                                                        key={
                                                                            indexFeed
                                                                        }
                                                                    >
                                                                        <div
                                                                            className={`${
                                                                                color <
                                                                                3
                                                                                    ? "bg-[pink]"
                                                                                    : color <
                                                                                      6
                                                                                    ? "bg-[green]"
                                                                                    : "bg-[orange]"
                                                                            }  w-[30px] h-[30px] rounded-full flex justify-center items-center border-solid border-[1px] border-[#fff] mr-[10px]`}
                                                                        >
                                                                            <p className="text-[16px] font-[500]">
                                                                                {itemFeed.User.name
                                                                                    .slice(
                                                                                        0,
                                                                                        1
                                                                                    )
                                                                                    .toUpperCase()}
                                                                            </p>
                                                                        </div>

                                                                        <div className="">
                                                                            <p className="text-[14px] font-[600]">
                                                                                {
                                                                                    itemFeed
                                                                                        .User
                                                                                        .name
                                                                                }
                                                                            </p>
                                                                            <p className="text-[16px] ">
                                                                                {
                                                                                    itemFeed.content
                                                                                }
                                                                            </p>
                                                                            <div className="flex justify-start items-center">
                                                                                <div className="">
                                                                                    <Tooltip
                                                                                        placement="bottom"
                                                                                        className=" w-[100px]"
                                                                                        title={
                                                                                            <div className="w-[100%] flex justify-center items-center">
                                                                                                <p>
                                                                                                    Thích
                                                                                                </p>
                                                                                            </div>
                                                                                        }
                                                                                    >
                                                                                        <i className="bi bi-hand-thumbs-up hover:opacity-[0.5] cursor-pointer"></i>
                                                                                    </Tooltip>
                                                                                    <span className="ml-[10px]">
                                                                                        {
                                                                                            item.like
                                                                                        }
                                                                                    </span>
                                                                                </div>

                                                                                <div className="mx-[20px]">
                                                                                    <Tooltip
                                                                                        placement="bottom"
                                                                                        className=" w-[100px]"
                                                                                        title={
                                                                                            <div className="w-[100%] flex justify-center items-center">
                                                                                                <p>
                                                                                                    {" "}
                                                                                                    không
                                                                                                    Thích
                                                                                                </p>
                                                                                            </div>
                                                                                        }
                                                                                    >
                                                                                        <i className="bi bi-hand-thumbs-down hover:opacity-[0.5] cursor-pointer"></i>
                                                                                    </Tooltip>
                                                                                    <span className="ml-[10px]">
                                                                                        {
                                                                                            item.disLike
                                                                                        }
                                                                                    </span>
                                                                                </div>

                                                                                <button className="border-none rounded-full p-[10px] bg-[#fff] hover:bg-[#ddd]">
                                                                                    Phản
                                                                                    hồi
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                );
                                                            }
                                                        )}
                                                </div>
                                            </div>
                                        ) : (
                                            <button
                                                className="w-[150px] py-[6px] border-none rounded-[100px] bg-[#fff] text-[#065fd4] hover:bg-[#def1ff]"
                                                onClick={() =>
                                                    setListCommentNew(
                                                        listCommentNew.map(
                                                            (
                                                                itemChild,
                                                                indexChild
                                                            ) => {
                                                                if (
                                                                    indexChild ===
                                                                    index
                                                                ) {
                                                                    itemChild.isViewFeedback =
                                                                        true;
                                                                }
                                                                return itemChild;
                                                            }
                                                        )
                                                    )
                                                }
                                            >
                                                <i className="bi bi-caret-down-fill mr-[10px]"></i>
                                                {item.Feedbacks.length} phản hồi
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
};

export default memo(PageComment);
