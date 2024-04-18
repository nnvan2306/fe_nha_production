"use client";

import { routes } from "@/helpers/menuRouterHeader";
import { logout } from "@/store/feauture/authSlice";
import { RootState } from "@/store/store";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

export default function ControlAuth() {
    const isLogin = useSelector((state: RootState) => state.auth.isLogin);
    const nameUser = useSelector((state: RootState) => state.auth.name);

    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
    };

    console.log(nameUser);

    return (
        <div className=" flex justify-center items-center">
            {isLogin ? (
                <>
                    <div className="flex justify-center items-center">
                        <Image
                            className="rounded-full"
                            src={`https://png.pngtree.com/png-vector/20190909/ourmid/pngtree-outline-user-icon-png-image_1727916.jpg`}
                            alt="user"
                            width={50}
                            height={50}
                        />

                        <p className="text-[20px] ml-[20px] text-[#fff]">
                            {nameUser}
                        </p>

                        <button onClick={handleLogout}>logout</button>
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
