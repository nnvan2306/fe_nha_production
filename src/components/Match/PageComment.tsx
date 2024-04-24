"use client";

import className from "classnames/bind";
import styles from "./PageComment.module.scss";
import {
    handleCreateComment,
    handleCreateFeedbackAction,
    handleDeleteCommentAction,
    handleDeleteFeedbackAction,
    handleDislikeCommentAction,
    handleDislikeFeedbackAction,
    handleLikeCommentAction,
    handleLikeFeedbackAction,
} from "@/action/commentAction";
import { handlebackground } from "@/helpers/HandleBackground";
import { routes } from "@/helpers/menuRouterHeader";
import { RootState } from "@/store/store";
import {
    IComment,
    IDisLikeFeedback,
    IDislikeComment,
    IFeedback,
    ILikeComment,
    ILikeFeedback,
    IListLimit,
} from "@/utils/interface";
import { Tooltip } from "antd";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import React, { memo, useState } from "react";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

const cx: Function = className.bind(styles);

const PageComment = ({
    listComment,
    matchId,
}: {
    listComment: IListLimit<IComment>;
    matchId: number;
}) => {
    const [textComment, setTextComment] = useState<string>("");
    const [idWriteFeedback, setIdWriteFeedback] = useState<number>(0);
    const [textFeedback, setTextFeedback] = useState<string>("");
    const [listCommentNew, setListCommentNew] = useState<IComment[]>(
        listComment.items.map((item: IComment) => {
            return {
                ...item,
                isViewFeedback: false,
                listUserLike: item.LikeComments.map(
                    (itemChild: ILikeComment) => {
                        return itemChild.userId;
                    }
                ),
                listUserDislike: item.DislikeComments.map(
                    (itemChild: IDislikeComment) => {
                        return itemChild.userId;
                    }
                ),
                Feedbacks: item.Feedbacks.map(
                    (itemC: IFeedback, indexC: number) => {
                        return {
                            ...itemC,
                            listUserLike: itemC.LikeFeedbacks.map(
                                (im: ILikeFeedback) => {
                                    return im.userId;
                                }
                            ),
                            listUserDislike: itemC.DislikeFeedbacks.map(
                                (im: IDisLikeFeedback) => {
                                    return im.userId;
                                }
                            ),
                        };
                    }
                ),
            };
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

    const handleCheckLogin = (): boolean => {
        if (!isLogin) {
            router.push(routes.login.url);
            return false;
        }
        return true;
    };

    const handleActionLike = async (
        commentId: number,
        indexComment: number
    ) => {
        const check = handleCheckLogin();
        if (!check) {
            return;
        }

        let res = await handleLikeCommentAction({
            commentId: commentId,
            userId: userId,
        });
        if (res.errorCode === 0) {
            setListCommentNew(
                listCommentNew.map((item: IComment, index: number) => {
                    if (index === indexComment) {
                        let isCheck: boolean =
                            item.listUserLike.includes(userId);
                        if (isCheck) {
                            item.listUserLike = item.listUserLike.filter(
                                (item) => item !== userId
                            );

                            item.like = item.like - 1;
                        } else {
                            item.listUserLike.push(userId);
                            item.like = item.like + 1;
                            if (item.listUserDislike.includes(userId)) {
                                item.listUserDislike =
                                    item.listUserDislike.filter(
                                        (item: number) => item !== userId
                                    );
                                item.disLike = item.disLike - 1;
                            }
                        }
                    }
                    return item;
                })
            );
        }
    };

    const handleActionDislike = async (
        commentId: number,
        indexComment: number
    ) => {
        const check = handleCheckLogin();
        if (!check) {
            return;
        }

        let res = await handleDislikeCommentAction({
            commentId: commentId,
            userId: userId,
        });

        if (res.errorCode === 0) {
            setListCommentNew(
                listCommentNew.map((item: IComment, index: number) => {
                    if (index === indexComment) {
                        let isCheck: boolean =
                            item.listUserDislike.includes(userId);
                        if (isCheck) {
                            item.listUserDislike = item.listUserDislike.filter(
                                (item) => item !== userId
                            );

                            item.disLike = item.disLike - 1;
                        } else {
                            item.listUserDislike.push(userId);
                            item.disLike = item.disLike + 1;
                            if (item.listUserLike.includes(userId)) {
                                item.listUserLike = item.listUserLike.filter(
                                    (item) => item !== userId
                                );
                                item.like = item.like - 1;
                            }
                        }
                    }
                    return item;
                })
            );
        }
    };

    const handleActionLikeFeedback = async (
        feedbackId: number,
        indexComment: number,
        indexFeedback: number
    ) => {
        const check = handleCheckLogin();
        if (!check) {
            return;
        }

        let res = await handleLikeFeedbackAction({
            feedbackId: feedbackId,
            userId: userId,
        });

        if (res.errorCode === 0) {
            setListCommentNew(
                listCommentNew.map((item: IComment, index: number) => {
                    if (index === indexComment) {
                        item.Feedbacks = item.Feedbacks.map(
                            (itemChild: IFeedback, indexChild: number) => {
                                if (indexChild === indexFeedback) {
                                    if (
                                        itemChild.listUserLike.includes(userId)
                                    ) {
                                        itemChild.listUserLike =
                                            itemChild.listUserLike.filter(
                                                (itemDr) => itemDr !== userId
                                            );

                                        itemChild.like = itemChild.like - 1;
                                    } else {
                                        itemChild.listUserLike.push(userId);
                                        itemChild.like = itemChild.like + 1;
                                        if (
                                            itemChild.listUserDislike.includes(
                                                userId
                                            )
                                        ) {
                                            itemChild.listUserDislike =
                                                itemChild.listUserDislike.filter(
                                                    (itemDr: number) =>
                                                        itemDr !== userId
                                                );
                                            itemChild.disLike =
                                                itemChild.disLike - 1;
                                        }
                                    }
                                }
                                return itemChild;
                            }
                        );
                        item.isViewFeedback = true;
                    }
                    return item;
                })
            );
        }
    };

    const handleActionDislikeFeedback = async (
        feedbackId: number,
        indexComment: number,
        indexFeedback: number
    ) => {
        const check = handleCheckLogin();
        if (!check) {
            return;
        }

        let res = await handleDislikeFeedbackAction({
            feedbackId: feedbackId,
            userId: userId,
        });

        if (res.errorCode === 0) {
            setListCommentNew(
                listCommentNew.map((item: IComment, index: number) => {
                    if (index === indexComment) {
                        item.Feedbacks = item.Feedbacks.map(
                            (itemChild: IFeedback, indexChild: number) => {
                                if (indexChild === indexFeedback) {
                                    if (
                                        itemChild.listUserDislike.includes(
                                            userId
                                        )
                                    ) {
                                        itemChild.listUserDislike =
                                            itemChild.listUserDislike.filter(
                                                (itemDr) => itemDr !== userId
                                            );

                                        itemChild.disLike =
                                            itemChild.disLike - 1;
                                    } else {
                                        itemChild.listUserDislike.push(userId);
                                        itemChild.disLike =
                                            itemChild.disLike + 1;
                                        if (
                                            itemChild.listUserLike.includes(
                                                userId
                                            )
                                        ) {
                                            itemChild.listUserLike =
                                                itemChild.listUserLike.filter(
                                                    (itemDr: number) =>
                                                        itemDr !== userId
                                                );
                                            itemChild.like = itemChild.like - 1;
                                        }
                                    }
                                }
                                return itemChild;
                            }
                        );

                        item.isViewFeedback = true;
                    }
                    return item;
                })
            );
        }
    };

    const handleDeleteComment = async (commentId: number) => {
        let res = await handleDeleteCommentAction({ commentId: commentId });
        console.log(res);
        if (res.errorCode === 0) {
            console.log("a");

            setListCommentNew(
                listCommentNew.filter(
                    (item: IComment, index: number) => item.id !== commentId
                )
            );
        }
    };

    const handleCreateFeedback = async (commentId: number) => {
        if (!textFeedback) {
            Swal.fire({
                icon: "warning",
                title: "please enter feedback !",
            });
            return;
        }

        let dataBuider = {
            content: textFeedback,
            commentId: commentId,
            userId: userId,
        };

        await handleCreateFeedbackAction(dataBuider);
        // if (res.errorCode === 0) {
        //     setListCommentNew(listCommentNew.map((item:IComment ,index:number)=>{

        //     }))
        // }
    };

    const handleDeleteFeedback = async (
        feedbackId: number,
        indexComment: number
    ) => {
        let res = await handleDeleteFeedbackAction({ feedbackId: feedbackId });

        if (res.errorCode === 0) {
            setListCommentNew(
                listCommentNew.map((item: IComment, index: number) => {
                    if (index === indexComment) {
                        item.Feedbacks = item.Feedbacks.filter(
                            (itemChild) => itemChild.id !== feedbackId
                        );
                    }
                    return item;
                })
            );
        }
    };

    return (
        <div className="w-[70%] ml-[50%] translate-x-[-50%]">
            <div className="mt-[40px] w-[100%] flex justify-center ">
                <div
                    className={`${handlebackground(
                        color
                    )}  w-[40px] h-[40px] rounded-full flex justify-center items-center border-solid border-[1px] border-[#fff]`}
                >
                    <p className="text-[20px] font-[500] text-[#fff]">
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
                                    className={`${handlebackground(
                                        item.User.id === userId
                                            ? color
                                            : Math.floor(Math.random() * 10)
                                    )}  w-[35px] h-[35px] rounded-full flex justify-center items-center border-solid border-[1px] border-[#fff]`}
                                >
                                    <p className="text-[16px] font-[500] text-[#fff]">
                                        {item.User.name
                                            .slice(0, 1)
                                            .toUpperCase()}
                                    </p>
                                </div>

                                <div className="w-[95%] pl-[10px]">
                                    <div className="flex w-[100%]">
                                        <div className="w-[90%]">
                                            <p className="text-[14px] font-[600]">
                                                {item.User.name}
                                            </p>
                                            <p className="text-[16px] my-[5px]">
                                                {item.content}
                                            </p>
                                        </div>
                                        <div className="w-[10%] py-[10px]">
                                            <Tooltip
                                                title={
                                                    <div
                                                        className="h-[50px] w-[100px] bg-[#fff] p-[5px] rounded-[5px] flex justify-center items-center hover:cursor-pointer"
                                                        onClick={() =>
                                                            handleDeleteComment(
                                                                item.id
                                                            )
                                                        }
                                                    >
                                                        <p className="text-[#000]">
                                                            <i className="bi bi-trash mr-[10px]"></i>{" "}
                                                            Xóa
                                                        </p>
                                                    </div>
                                                }
                                                placement="bottom"
                                                trigger="click"
                                            >
                                                <i className="bi bi-three-dots-vertical text-[#ccc]"></i>
                                            </Tooltip>
                                        </div>
                                    </div>

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
                                                    className={`bi ${
                                                        item.listUserLike.includes(
                                                            userId
                                                        )
                                                            ? "bi-hand-thumbs-up-fill"
                                                            : "bi-hand-thumbs-up"
                                                    } hover:opacity-[0.5] cursor-pointer`}
                                                    onClick={() =>
                                                        handleActionLike(
                                                            item.id,
                                                            index
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
                                                    <div className="w-[100%] flex justify-center items-center">
                                                        <p> không Thích</p>
                                                    </div>
                                                }
                                            >
                                                <i
                                                    className={`bi ${
                                                        item.listUserDislike.includes(
                                                            userId
                                                        )
                                                            ? "bi-hand-thumbs-down-fill"
                                                            : "bi-hand-thumbs-down"
                                                    } hover:opacity-[0.5] cursor-pointer`}
                                                    onClick={() =>
                                                        handleActionDislike(
                                                            item.id,
                                                            index
                                                        )
                                                    }
                                                ></i>
                                            </Tooltip>
                                            <span className="ml-[10px]">
                                                {item.disLike}
                                            </span>
                                        </div>

                                        <button
                                            className="border-none rounded-full p-[10px] bg-[#fff] hover:bg-[#ddd]"
                                            onClick={() =>
                                                setIdWriteFeedback(
                                                    idWriteFeedback
                                                        ? 0
                                                        : item.id
                                                )
                                            }
                                        >
                                            Phản hồi
                                        </button>
                                    </div>

                                    {idWriteFeedback === item.id ? (
                                        <div className=" w-[100%] flex justify-center">
                                            <div
                                                className={`${handlebackground(
                                                    color
                                                )}  w-[25px] h-[25px] rounded-full flex justify-center items-center border-solid border-[1px] border-[#fff] mt-[10px]`}
                                            >
                                                <p className="text-[16px] font-[500] text-[#fff]">
                                                    {nameUser
                                                        .slice(0, 1)
                                                        .toUpperCase()}
                                                </p>
                                            </div>

                                            <div className="w-[95%] pl-[10px]">
                                                <input
                                                    type="text"
                                                    placeholder=" Viết bình luận ..."
                                                    className="w-[100%] border-[1px] border-solid border-[#fff] border-b-[#ccc] p-[10px] focus:rounded-[10px] focus:border-solid focus:border-[1px] focus:border-[#fff] focus:border-b-[#ccc] "
                                                    value={textFeedback}
                                                    onChange={(e) =>
                                                        setTextFeedback(
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                                <div className="flex justify-end items-center mt-[5px]">
                                                    <button
                                                        className="border-none rounded-full py-[10px] px-[25px] mr-[10px] bg-[#fff] hover:bg-[#ddd] font-[600]"
                                                        onClick={() =>
                                                            setTextFeedback("")
                                                        }
                                                    >
                                                        Hủy
                                                    </button>
                                                    <button
                                                        className="border-none rounded-full p-[10px] opacity-[0.7]"
                                                        onClick={() =>
                                                            handleCreateFeedback(
                                                                item.id
                                                            )
                                                        }
                                                    >
                                                        Bình luận
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <></>
                                    )}

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

                                                <div className="w-[100%] pl-[10px] mt-[10px]">
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
                                                                            className={`${handlebackground(
                                                                                itemFeed
                                                                                    .User
                                                                                    .id ===
                                                                                    userId
                                                                                    ? color
                                                                                    : Math.floor(
                                                                                          Math.random() *
                                                                                              10
                                                                                      )
                                                                            )}  w-[30px] h-[30px] rounded-full flex justify-center items-center border-solid border-[1px] border-[#fff] mr-[10px]`}
                                                                        >
                                                                            <p className="text-[16px] font-[500] text-[#fff]">
                                                                                {itemFeed.User.name
                                                                                    .slice(
                                                                                        0,
                                                                                        1
                                                                                    )
                                                                                    .toUpperCase()}
                                                                            </p>
                                                                        </div>

                                                                        <div className="w-[100%]">
                                                                            <div className="w-[100%] flex">
                                                                                <div className="w-[90%]">
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
                                                                                </div>

                                                                                <div className="w-[10%] py-[10px]">
                                                                                    <Tooltip
                                                                                        title={
                                                                                            <div
                                                                                                className="h-[50px] w-[100px] bg-[#fff] p-[5px] rounded-[5px] flex justify-center items-center hover:cursor-pointer"
                                                                                                onClick={() =>
                                                                                                    handleDeleteFeedback(
                                                                                                        itemFeed.id,
                                                                                                        index
                                                                                                    )
                                                                                                }
                                                                                            >
                                                                                                <p className="text-[#000]">
                                                                                                    <i className="bi bi-trash mr-[10px]"></i>{" "}
                                                                                                    Xóa
                                                                                                </p>
                                                                                            </div>
                                                                                        }
                                                                                        placement="bottom"
                                                                                        trigger="click"
                                                                                    >
                                                                                        <i className="bi bi-three-dots-vertical text-[#000] hover:text-[#ccc]"></i>
                                                                                    </Tooltip>
                                                                                </div>
                                                                            </div>

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
                                                                                        <i
                                                                                            className={`bi ${
                                                                                                itemFeed.listUserLike.includes(
                                                                                                    userId
                                                                                                )
                                                                                                    ? "bi-hand-thumbs-up-fill"
                                                                                                    : "bi-hand-thumbs-up"
                                                                                            } hover:opacity-[0.5] cursor-pointer`}
                                                                                            onClick={() =>
                                                                                                handleActionLikeFeedback(
                                                                                                    itemFeed.id,
                                                                                                    index,
                                                                                                    indexFeed
                                                                                                )
                                                                                            }
                                                                                        ></i>
                                                                                    </Tooltip>
                                                                                    <span className="ml-[10px]">
                                                                                        {
                                                                                            itemFeed.like
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
                                                                                        <i
                                                                                            className={`bi ${
                                                                                                itemFeed.listUserDislike.includes(
                                                                                                    userId
                                                                                                )
                                                                                                    ? "bi-hand-thumbs-down-fill"
                                                                                                    : "bi-hand-thumbs-down"
                                                                                            } hover:opacity-[0.5] cursor-pointer`}
                                                                                            onClick={() =>
                                                                                                handleActionDislikeFeedback(
                                                                                                    itemFeed.id,
                                                                                                    index,
                                                                                                    indexFeed
                                                                                                )
                                                                                            }
                                                                                        ></i>
                                                                                    </Tooltip>
                                                                                    <span className="ml-[10px]">
                                                                                        {
                                                                                            itemFeed.disLike
                                                                                        }
                                                                                    </span>
                                                                                </div>

                                                                                {/* <button className="border-none rounded-full p-[10px] bg-[#fff] hover:bg-[#ddd]">
                                                                                    Phản
                                                                                    hồi
                                                                                </button> */}
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
                                                className="w-[150px] py-[6px] border-none rounded-[100px] bg-[#fff] text-[#065fd4] hover:bg-[#def1ff] mb-[10px]"
                                                onClick={() =>
                                                    setListCommentNew(
                                                        listCommentNew.map(
                                                            (
                                                                itemBtn,
                                                                indexBtn
                                                            ) => {
                                                                if (
                                                                    indexBtn ===
                                                                    index
                                                                ) {
                                                                    itemBtn.isViewFeedback =
                                                                        true;
                                                                }
                                                                return itemBtn;
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
