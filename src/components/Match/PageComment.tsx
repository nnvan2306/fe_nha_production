"use client";

import { RootState } from "@/store/store";
import { IComment } from "@/utils/interface";
import { Tooltip } from "antd";
import React, { memo } from "react";
import { useSelector } from "react-redux";

const PageComment = ({ listComment }: { listComment: IComment[] }) => {
    const isLogin = useSelector((state: RootState) => state.auth.isLogin);
    const nameUser = useSelector((state: RootState) => state.auth.name);
    const color = useSelector((state: RootState) => state.auth.color);

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
            <div className="w-[100%]">
                {listComment &&
                    listComment.length > 0 &&
                    listComment.map((item: IComment, index: number) => {
                        return (
                            <div key={index} className="flex  justify-center">
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
                                                    <div className="w-[50px] flex justify-center items-center">
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
                                </div>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
};

export default memo(PageComment);
