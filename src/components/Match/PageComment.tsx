"use client";

import className from "classnames/bind";
import styles from "./PageComment.module.scss";
import { handlebackground } from "@/helpers/HandleBackground";
import { routes } from "@/helpers/menuRouterHeader";
import { RootState } from "@/store/store";
import { IComment, IFeedback, IListLimit } from "@/utils/interface";
import { Tooltip } from "antd";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import React, { memo, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { io } from "socket.io-client";
import Image from "next/image";
import { Socket } from "socket.io";
import {
    connected,
    ioHandleCreateFeedback,
    ioHandleDeleteComment,
    ioHandleDeleteFeedback,
    ioHandleDislikeComment,
    ioHandleDislikeFeedback,
    ioHandleLikeComment,
    ioHandleLikeFeedback,
    ioHandlerCreateComment,
} from "@/helpers/Io";
import { handleSetListComments } from "@/helpers/handleSetListComment";

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
    const [listViewFeedback, setListViewFeedback] = useState<number[]>([]);
    const [listCommentNew, setListCommentNew] = useState<IComment[]>(
        handleSetListComments(listComment, listViewFeedback)
    );
    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(() => {
        connected(io, "http://localhost:8080", setSocket);
    }, []);

    useEffect(() => {
        if (!socket) return;

        // data nhận đc sau khi create comment success

        socket.on("reply_suc", (data: any) => {
            setListCommentNew(
                handleSetListComments(data.data, listViewFeedback)
            );
            setTextComment("");
        });

        // data nhận được sau khi like comment success

        socket.on("likeCommentSuccess", (data: any) => {
            setListCommentNew(
                handleSetListComments(data.data, listViewFeedback)
            );
        });

        //data nhận được sau khi dislike comment success

        socket.on("dislikeCommentSuccess", (data: any) => {
            setListCommentNew(
                handleSetListComments(data.data, listViewFeedback)
            );
        });

        //data nhận được sau khi delete comment success

        socket.on("deleteCommentSuccess", (data: any) => {
            setListCommentNew(
                handleSetListComments(data.data, listViewFeedback)
            );
        });

        // data nhận được sau khi create feedback success

        socket.on("createFeedbackSuccess", (data: any) => {
            setListCommentNew(
                handleSetListComments(data.data, listViewFeedback)
            );
            setTextFeedback("");
        });

        //data nhận được sau khi delete feedback success

        socket.on("deleteFeedbackSuccess", (data: any) => {
            setListCommentNew(
                handleSetListComments(data.data, listViewFeedback)
            );
        });

        // data nhận được sau khi like feedback success

        socket.on("likeFeedbackSuccess", (data: any) => {
            setListCommentNew(
                handleSetListComments(data.data, listViewFeedback)
            );
        });

        // data nhận được sau khi dislike feedback success

        socket.on("dislikeFeedbackSuccess", (data: any) => {
            setListCommentNew(
                handleSetListComments(data.data, listViewFeedback)
            );
        });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [socket]);

    const isLogin = useSelector((state: RootState) => state.auth.isLogin);
    const nameUser = useSelector((state: RootState) => state.auth.name);
    const userId = useSelector((state: RootState) => state.auth.userId);
    const color = useSelector((state: RootState) => state.auth.color);
    const avatar = useSelector((state: RootState) => state.auth.avatar);

    const router: AppRouterInstance = useRouter();

    // validate login

    const handleCheckLogin = (): boolean => {
        if (!isLogin) {
            router.push(routes.login.url);
            return false;
        }
        return true;
    };

    // create comment

    const handleComment = async () => {
        const check = handleCheckLogin();
        if (!check) {
            return;
        }

        if (!textComment) {
            Swal.fire({
                icon: "warning",
                title: "please enter comment !",
            });
            return;
        }

        let dataBuider = {
            content: textComment,
            matchId: matchId,
            userId: userId,
        };

        await ioHandlerCreateComment(dataBuider, socket);
    };

    // delete comment

    const handleDeleteComment = async (commentId: number) => {
        const check = handleCheckLogin();
        if (!check) {
            return;
        }

        let dataBuider = { commentId: commentId, matchId: matchId };

        await ioHandleDeleteComment(dataBuider, socket);
    };

    // like comment

    const handleActionLike = async (commentId: number) => {
        const check = handleCheckLogin();
        if (!check) {
            return;
        }

        let dataBuider = {
            commentId: commentId,
            userId: userId,
            matchId: matchId,
        };

        await ioHandleLikeComment(dataBuider, socket);
    };

    // dislike comment

    const handleActionDislike = async (commentId: number) => {
        const check = handleCheckLogin();
        if (!check) {
            return;
        }

        let dataBuider = {
            commentId: commentId,
            userId: userId,
            matchId: matchId,
        };

        await ioHandleDislikeComment(dataBuider, socket);
    };

    // create feedback

    const handleCreateFeedback = async (commentId: number) => {
        const check = handleCheckLogin();
        if (!check) {
            return;
        }

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
            matchId: matchId,
        };

        await ioHandleCreateFeedback(dataBuider, socket);

        setIdWriteFeedback(0);
    };

    // delete feedback

    const handleDeleteFeedback = async (feedbackId: number) => {
        const check = handleCheckLogin();
        if (!check) {
            return;
        }

        let dataBuider = { feedbackId: feedbackId, matchId: matchId };

        await ioHandleDeleteFeedback(dataBuider, socket);
    };

    // like feedback

    const handleActionLikeFeedback = async (feedbackId: number) => {
        const check = handleCheckLogin();
        if (!check) {
            return;
        }

        let dataBuider = {
            feedbackId: feedbackId,
            userId: userId,
            matchId: matchId,
        };

        await ioHandleLikeFeedback(dataBuider, socket);
    };

    // dislike feedback
    const handleActionDislikeFeedback = async (feedbackId: number) => {
        const check = handleCheckLogin();
        if (!check) {
            return;
        }

        let dataBuider = {
            feedbackId: feedbackId,
            userId: userId,
            matchId: matchId,
        };

        await ioHandleDislikeFeedback(dataBuider, socket);
    };

    const handleSetListViewFeedback = (id: number) => {
        if (listViewFeedback.includes(id)) {
            setListViewFeedback(
                listViewFeedback.filter((item: number) => item !== id)
            );
            return;
        }
        setListViewFeedback((prev) => [...prev, id]);
    };

    return (
        <div className="w-[70%] ml-[50%] translate-x-[-50%]">
            <div className="mt-[40px] w-[100%] flex justify-center ">
                <div
                    className={`${handlebackground(
                        color
                    )}  w-[40px] h-[40px] rounded-full flex justify-center items-center border-solid border-[1px] border-[#fff]`}
                >
                    {avatar ? (
                        <Image
                            width={40}
                            height={40}
                            src={`${process.env.NEXT_PUBLIC_BASE_URL}${avatar}`}
                            alt="avatar"
                            className="rounded-full"
                        />
                    ) : (
                        <p className="text-[20px] font-[500] text-[#fff]">
                            {nameUser.slice(0, 1).toUpperCase()}
                        </p>
                    )}
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
                            onClick={() => {
                                setTextComment("");
                            }}
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
                            <div
                                key={index}
                                className="flex justify-center mt-[20px]"
                            >
                                <div
                                    className={`${handlebackground(
                                        item.User.id === userId
                                            ? color
                                            : Math.floor(Math.random() * 10)
                                    )}  w-[35px] h-[35px] rounded-full flex justify-center items-center border-solid border-[1px] border-[#fff]`}
                                >
                                    {item.User.avatar_url ? (
                                        <Image
                                            width={40}
                                            height={40}
                                            src={`${process.env.NEXT_PUBLIC_BASE_URL}${item.User.avatar_url}`}
                                            alt="avatar"
                                            className="rounded-full"
                                        />
                                    ) : (
                                        <p className="text-[16px] font-[500] text-[#fff]">
                                            {item.User.name
                                                .slice(0, 1)
                                                .toUpperCase()}
                                        </p>
                                    )}
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

                                        {item.User.id === userId ? (
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
                                        ) : (
                                            <></>
                                        )}
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
                                                            item.id
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
                                                            item.id
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
                                                {avatar ? (
                                                    <Image
                                                        src={`${process.env.NEXT_PUBLIC_BASE_URL}${avatar}`}
                                                        alt="avatar"
                                                        width={25}
                                                        height={25}
                                                    />
                                                ) : (
                                                    <p className="text-[16px] font-[500] text-[#fff]">
                                                        {nameUser
                                                            .slice(0, 1)
                                                            .toUpperCase()}
                                                    </p>
                                                )}
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
                                        <div className="w-[100%]">
                                            <button
                                                className="w-[150px] py-[6px] border-none rounded-[100px] bg-[#fff] text-[#065fd4] hover:bg-[#def1ff]"
                                                onClick={() =>
                                                    handleSetListViewFeedback(
                                                        item.id
                                                    )
                                                }
                                            >
                                                {listViewFeedback.includes(
                                                    item.id
                                                ) ? (
                                                    <i className="bi bi-caret-up-fill mr-[10px]"></i>
                                                ) : (
                                                    <i className="bi bi-caret-down-fill mr-[10px]"></i>
                                                )}
                                                {item.Feedbacks.length} phản hồi
                                            </button>

                                            {listViewFeedback.includes(
                                                item.id
                                            ) ? (
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
                                                                        className="flex mt-[10px]"
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
                                                                            {itemFeed
                                                                                .User
                                                                                .avatar_url ? (
                                                                                <Image
                                                                                    src={`${process.env.NEXT_PUBLIC_BASE_URL}${itemFeed.User.avatar_url}`}
                                                                                    alt="avatar"
                                                                                    width={
                                                                                        30
                                                                                    }
                                                                                    height={
                                                                                        30
                                                                                    }
                                                                                />
                                                                            ) : (
                                                                                <p className="text-[16px] font-[500] text-[#fff]">
                                                                                    {itemFeed.User.name
                                                                                        .slice(
                                                                                            0,
                                                                                            1
                                                                                        )
                                                                                        .toUpperCase()}
                                                                                </p>
                                                                            )}
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

                                                                                {itemFeed
                                                                                    .User
                                                                                    .id ===
                                                                                userId ? (
                                                                                    <div className="w-[10%] py-[10px]">
                                                                                        <Tooltip
                                                                                            title={
                                                                                                <div
                                                                                                    className="h-[50px] w-[100px] bg-[#fff] p-[5px] rounded-[5px] flex justify-center items-center hover:cursor-pointer"
                                                                                                    onClick={() =>
                                                                                                        handleDeleteFeedback(
                                                                                                            itemFeed.id
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
                                                                                ) : (
                                                                                    <>

                                                                                    </>
                                                                                )}
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
                                                                                                    itemFeed.id
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
                                                                                                    itemFeed.id
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
                                            ) : (
                                                <></>
                                            )}
                                        </div>
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
