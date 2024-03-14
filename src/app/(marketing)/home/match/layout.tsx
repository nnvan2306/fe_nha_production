"use client";
import className from "classnames/bind";
import styles from "./Match.module.scss";
import { useEffect, useState } from "react";
import { getAllSeasonAction } from "@/action/seasonAction";
import { IDataSearchMatch, IList, IMatch, ISeason } from "@/utils/interface";
import { getAllTeamAction } from "@/action/teamAction";
import { useRouter } from "next/navigation";
import { Button, Empty } from "antd";
import { getMatchAction } from "@/action/matchAction";
import Image from "next/image";
import poster from "../../../../../public/poster.png";
import { routes } from "@/helpers/menuRouterHeader";

const cx: Function = className.bind(styles);

export default function LayoutMatch({
    children,
}: {
    children: React.ReactNode;
}) {
    return <div className="">{children}</div>;
}
