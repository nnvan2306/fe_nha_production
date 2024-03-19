"use client";
import className from "classnames/bind";
import styles from "./Match.module.scss";

const cx: Function = className.bind(styles);

export default function LayoutMatch({
    children,
}: {
    children: React.ReactNode;
}) {
    return <div className="">{children}</div>;
}
