"use client";

import className from "classnames/bind";
import styles from "./Login.module.scss";
import { routes } from "@/helpers/menuRouterHeader";
import Link from "next/link";
import { useState } from "react";
import Swal from "sweetalert2";
import { handleLoginAction, handleRegisterAction } from "@/action/authAction";
import { useDispatch } from "react-redux";
import { loginSuccess } from "@/store/feauture/authSlice";
import { useRouter } from "next/navigation";

const cx: Function = className.bind(styles);

export default function PageLogin({
    params: { slug },
}: {
    params: { slug: string };
}) {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");

    const dispatch = useDispatch();

    const router = useRouter();

    const handleValidate = (): boolean => {
        if (
            !email ||
            !password ||
            (slug !== routes.login.label && (!name || !rePassword))
        ) {
            Swal.fire({
                icon: "warning",
                title: "Please enter complete information",
            });
            return false;
        }
        return true;
    };

    const handleLogin = async () => {
        setIsLoading(true);
        const check = handleValidate();
        if (!check) {
            setIsLoading(false);
            return;
        }

        let dataBuider: any = {
            email: email,
            password: password,
        };

        let color = Math.floor(Math.random() * 10);

        if (slug !== routes.login.label) {
            color = Math.floor(Math.random() * 10);
            dataBuider.name = name;
            dataBuider.rePassword = rePassword;
        }

        try {
            let res;
            if (slug === routes.login.label) {
                res = await handleLoginAction(dataBuider);
                if (res.errorCode === 0) {
                    dispatch(
                        loginSuccess({
                            isLogin: true,
                            name: res.data.name,
                            userId: res.data.id,
                            avatar: res.data.avatar_url,
                            color: color,
                        })
                    );
                    router.push("/home");
                }
            } else {
                res = await handleRegisterAction(dataBuider);
            }

            if (res.errorCode === 0) {
                Swal.fire({
                    icon: "success",
                    title: `${
                        slug === routes.login.label
                            ? "Login successfully"
                            : "Account successfully created"
                    }`,
                });

                setEmail("");
                setName("");
                setPassword("");
                setRePassword("");
            }

            // let res =
            //     slug === routes.login.label
            //         ? await handleLoginAction(dataBuider)
            //         : await handleRegisterAction(dataBuider);

            // if (res.errorCode === 0) {
            //     Swal.fire({
            //         icon: "success",
            //         title: `${
            //             slug === routes.login.label
            //                 ? "Login successfully"
            //                 : "Account successfully created"
            //         }`,
            //     });

            //     if (slug === routes.login.label) {
            //         dispatch(
            //             loginSuccess({
            //                 isLogin: true,
            //                 name: res.data.name,
            //                 userId: res.data.id,
            //                 avatar: res.data.avatar,
            //                 color: color,
            //             })
            //         );
            //         router.push("/home");
            //     }

            //     setEmail("");
            //     setName("");
            //     setPassword("");
            //     setRePassword("");
            // }
        } catch (err: any) {
            console.log(err);
            Swal.fire({
                icon: "error",
                title: err.response.data.message,
            });
        }

        setIsLoading(false);
    };

    return (
        <div className="w-[100vw] h-[100vh] ">
            <div
                className={cx(
                    "form-login",
                    "w-[90%] bg-[#fff] ml-[50%] translate-x-[-50%] rounded-[10px] shadow-lg pt-[20px] px-[40px] pb-[30px] "
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
                        <label
                            htmlFor="rePassword"
                            className="mb-[5px] ml-[10px]"
                        >
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

                <div className="mt-[40px] w-[100%] flex justify-center items-center">
                    {isLoading ? (
                        <button
                            disabled
                            className="w-[80%] py-[8px] ml-[50%] translate-x-[-50%] bg-[#ccc] rounded-full  hover:opacity-[0.6] bg-gradient-to-r from-[#74ebd5] to-[#9face6] border-none text-[#fff]"
                        >
                            <svg
                                aria-hidden="true"
                                className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                                viewBox="0 0 100 101"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                    fill="currentColor"
                                />
                                <path
                                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                    fill="currentFill"
                                />
                            </svg>
                        </button>
                    ) : (
                        <button
                            className="w-[80%] py-[8px]  bg-[#ccc] rounded-full cursor-pointer hover:opacity-[0.6] bg-gradient-to-r from-[#74ebd5] to-[#9face6] border-none text-[#fff]"
                            onClick={() => handleLogin()}
                        >
                            {slug === routes.login.label ? "Login" : "Register"}
                        </button>
                    )}
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
                            ? "You haven't an account ?"
                            : "You have an account ?"}
                    </Link>
                </div>
            </div>
        </div>
    );
}
