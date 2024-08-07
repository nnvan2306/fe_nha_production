"use client";

import { Col, Row, Menu } from "antd";
import type { MenuProps } from "antd";
import Image from "next/image";
import logo from "../../../public/logo_header.png";
import { memo, useState } from "react";
import Link from "next/link";
import { routes } from "@/helpers/menuRouterHeader";
import ControlAuth from "../ControlAuth/ControlAuth";
import { useRouter } from "next/navigation";

const menu: MenuProps["items"] = [
    {
        label: <Link href={routes.match.url}>TRẬN ĐẤU</Link>,
        key: routes.match.label,
    },

    {
        label: <Link href={routes.rank.url}>BẢNG XẾP HẠNG</Link>,
        key: routes.rank.label,
    },
    {
        label: <Link href={routes.statistic.url}>SỐ LIỆU THỐNG KÊ</Link>,
        key: routes.statistic.label,
    },
    {
        label: <Link href={routes.player.url}>CẦU THỦ</Link>,
        key: routes.player.label,
    },
    {
        label: <Link href={routes.booking.url}>BOOKING</Link>,
        key: routes.booking.label,
    },
];

const Header: React.FC = () => {
    const [isViewSibar, setIsViewSibar] = useState<boolean>(false);

    const router = useRouter();

    const handleNavigate = (cate: string) => {
        setIsViewSibar(false);
        router.push(
            cate === "match"
                ? routes.match.url
                : cate === "rating"
                ? routes.rank.url
                : cate === "statistic"
                ? routes.statistic.url
                : cate === "player"
                ? routes.player.url
                : routes.booking.url
        );
    };
    return (
        <div className="w-[100%]  bg-[#3F1052]">
            <Row>
                <Col
                    md={5}
                    span={16}
                    className="h-[var(--height-header)] flex items-center"
                >
                    <div className="ml-[20px] w-[var(--height-header)]  h-[var(--height-header)] flex items-center overflow-hidden rounded-full">
                        <Image
                            className="w-[70%] h-[70%] object-cover"
                            src={logo}
                            alt="logo_nha"
                            // objectFit="cover"
                        ></Image>
                    </div>
                    <p className="md:text-[25px] text-[20px] text-[#fff] leading-[var(--height-header)] ml-[10px]">
                        Premier League
                    </p>
                </Col>
                <Col md={14} span={4} className="flex items-end">
                    <div className="md:w-[100%] md:h-[65%] md:block hidden">
                        <Menu
                            theme="dark"
                            mode="horizontal"
                            items={menu}
                            className="bg-[#3F1052] text-[#fff]"
                        />
                    </div>

                    <div className="md:hidden w-[100%] h-[100%] flex items-center justify-center relative">
                        {isViewSibar ? (
                            <i
                                className="bi bi-x-lg text-[#fff] text-[20px]"
                                onClick={() => setIsViewSibar(false)}
                            ></i>
                        ) : (
                            <i
                                className="bi bi-list text-[#fff] text-[20px]"
                                onClick={() => setIsViewSibar(true)}
                            ></i>
                        )}
                    </div>
                </Col>
                <Col md={5} span={4}>
                    <ControlAuth />
                </Col>
            </Row>

            {isViewSibar ? (
                <div className="w-[100%] h-[100vh] bg-[#fff] px-[20px] pt-[40px] absolute z-[10]">
                    <p
                        className="hover:cursor-pointer hover:text-[blue]"
                        onClick={() => handleNavigate("match")}
                    >
                        TRẬN ĐẤU
                    </p>

                    <p
                        className="hover:cursor-pointer hover:text-[blue] mt-[40px]"
                        onClick={() => handleNavigate("rating")}
                    >
                        BẢNG XẾP HẠNG
                    </p>
                    <p
                        className="hover:cursor-pointer hover:text-[blue] mt-[40px]"
                        onClick={() => handleNavigate("statistic")}
                    >
                        SỐ LIỆU THỐNG KÊ
                    </p>
                    <p
                        className="hover:cursor-pointer hover:text-[blue] mt-[40px]"
                        onClick={() => handleNavigate("player")}
                    >
                        CẦU THỦ
                    </p>
                    <p
                        className="hover:cursor-pointer hover:text-[blue] mt-[40px]"
                        onClick={() => handleNavigate("booking")}
                    >
                        MUA VÉ
                    </p>
                </div>
            ) : (
                <></>
            )}
        </div>
    );
};

export default memo(Header);
