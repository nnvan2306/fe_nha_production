"use client";

import { routes } from "@/helpers/menuRouterHeader";
import { logout } from "@/store/feauture/authSlice";
import { RootState } from "@/store/store";
import Link from "next/link";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Tooltip } from "antd";

export default function ControlAuth() {
    const isLogin = useSelector((state: RootState) => state.auth.isLogin);
    const nameUser = useSelector((state: RootState) => state.auth.name);
    const color = useSelector((state: RootState) => state.auth.color);

    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <div className=" flex justify-center items-center h-[100%] w-[100%]">
            {isLogin ? (
                <>
                    <div className="flex justify-end items-center w-[100%]">
                        <Tooltip
                            className="bg-[#fff] p-[0]"
                            trigger="click"
                            title={
                                <div className="h-[100px] w-[100px] bg-[#fff] p-[5px]">
                                    <button
                                        className="w-[100%] h-[30px] border-none mt-[10px] rounded-[5px]"
                                        onClick={handleLogout}
                                    >
                                        <i className="bi bi-box-arrow-left mr-[5px]"></i>{" "}
                                        Logout
                                    </button>

                                    <button className="w-[100%] h-[30px] border-none mt-[10px] rounded-[5px]">
                                        <i className="bi bi-gear mr-[5px]"></i>
                                        settings
                                    </button>
                                </div>
                            }
                        >
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
                        </Tooltip>

                        <p className="text-[20px] ml-[20px] text-[#fff] mr-[40px]">
                            {nameUser}
                        </p>
                    </div>
                </>
            ) : (
                <>
                    <Link href={routes.login.url}>
                        <button className="bg-[#3F1052] w-[100px] h-[40px] mt-[20px] p-[10px] text-[#fff] border-[1px] border-[#fff] rounded-[5px] mx-[10px] hover:bg-[#fff] hover:text-[#000]">
                            Đăng Nhập
                        </button>
                    </Link>

                    <Link href={routes.register.url}>
                        <button className=" bg-[#3F1052] w-[100px] h-[40px] mt-[20px] p-[10px] text-[#fff] border-[1px] border-[#fff] rounded-[5px] mx-[10px] hover:bg-[#fff] hover:text-[#000]">
                            Đăng Ký
                        </button>
                    </Link>
                </>
            )}
        </div>
    );
}
