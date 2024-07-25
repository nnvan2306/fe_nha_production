"use server";

import { IRes, IUser } from "@/utils/interface";

export const handleRegisterAction = async ({
    email,
    name,
    password,
    rePassword,
}: {
    email: string;
    name: string;
    password: string;
    rePassword: string;
}): Promise<IRes<[]>> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/register`, {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },

        body: JSON.stringify({
            email: email,
            name: name,
            password: password,
            rePassword: rePassword,
        }),
        cache: "no-store",
    });
    const data = await res.json();
    return data;
};

export const handleLoginAction = async ({
    email,
    password,
}: {
    email: string;
    password: string;
}): Promise<IRes<IUser>> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/login`, {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },

        body: JSON.stringify({ email: email, password: password }),
        cache: "no-store",
    });
    const data = await res.json();
    return data;
};
