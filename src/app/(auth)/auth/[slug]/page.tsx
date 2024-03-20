"use client";
import className from "classnames/bind";
import styles from "./Login.module.scss";
import { routes } from "@/helpers/menuRouterHeader";
import Link from "next/link";
import { useState } from "react";

const cx: Function = className.bind(styles);

export default function PageLogin({
    params: { slug },
}: {
    params: { slug: string };
}) {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
    console.log(slug);
    return (
        <div
            className={cx(
                "form-login",
                "w-[400px]  bg-[#fff] ml-[50%] translate-x-[-50%] rounded-[10px] shadow-lg pt-[20px] px-[40px] pb-[30px]"
            )}
        >
            <p className="text-center text-[25px] font-[600]">
                {slug === routes.login.label ? "Login" : "Register"}
            </p>

            <div className="mt-[40px] mb-[20px]">
                <label htmlFor="email" className="mb-[5px] ml-[10px]">
                    Email
                </label>
                <br />
                <input
                    type="email"
                    id="email"
                    placeholder="enter your email"
                    className="w-[100%] border-[1px] border-solid border-[#fff] border-b-[#ccc] p-[10px] focus:rounded-[10px] "
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            {slug === routes.register.label ? (
                <div className="mb-[20px]">
                    <label htmlFor="name" className="mb-[5px] ml-[10px]">
                        Name
                    </label>
                    <br />
                    <input
                        type="text"
                        placeholder="Enter your password"
                        id="name"
                        className="w-[100%] border-[1px] border-solid border-[#fff] border-b-[#ccc] p-[10px] focus:rounded-[10px]"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
            ) : (
                <></>
            )}

            <div className="mb-[20px]">
                <label htmlFor="password" className="mb-[5px] ml-[10px]">
                    Password
                </label>
                <br />
                <input
                    type="password"
                    placeholder="Enter your password"
                    id="password"
                    className="w-[100%] border-[1px] border-solid border-[#fff] border-b-[#ccc] p-[10px] focus:rounded-[10px]"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            {slug === routes.register.label ? (
                <div className="mb-[5px]">
                    <label htmlFor="rePassword" className="mb-[5px] ml-[10px]">
                        Re-Password
                    </label>
                    <br />
                    <input
                        type="password"
                        placeholder="Enter your password"
                        id="rePassword"
                        className="w-[100%] border-[1px] border-solid border-[#fff] border-b-[#ccc] p-[10px] focus:rounded-[10px]"
                        value={rePassword}
                        onChange={(e) => setRePassword(e.target.value)}
                    />
                </div>
            ) : (
                <></>
            )}

            <p className="float-right text-[15px] opacity-[0.8] cursor-pointer hover:opacity-[0.5] mb-[20px]">
                Forgot password ?
            </p>

            <div className="mt-[40px] w-[100%]">
                <button className=" w-[80%] py-[8px] ml-[50%] translate-x-[-50%] bg-[#ccc] rounded-full cursor-pointer hover:opacity-[0.6] bg-gradient-to-r from-[#74ebd5] to-[#9face6] border-none text-[#fff]">
                    {slug === routes.login.label ? "Login" : "Register"}
                </button>
            </div>

            <div className="mt-[20px]">
                <Link
                    href={
                        slug === routes.login.label
                            ? routes.register.url
                            : routes.login.url
                    }
                >
                    {slug === routes.login.label
                        ? "You have an account ?"
                        : "You haven't an account ?"}
                </Link>
            </div>
        </div>
    );
}
