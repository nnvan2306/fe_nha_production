import { Col, Row, Menu } from "antd";
import type { MenuProps } from "antd";
import Image from "next/image";
import logo from "../../../public/logo_header.png";
import { memo } from "react";
import Link from "next/link";
import { routes } from "@/helpers/menuRouterHeader";

const menu: MenuProps["items"] = [
    {
        label: <Link href={routes.match.url}>TRẬN ĐẤU</Link>,
        key: routes.match.label,
    },
    {
        label: <Link href={routes.blog.url}>TIN TỨC</Link>,
        key: routes.blog.label,
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
    return (
        <div className="w-[100%] h-[100%] bg-[#3F1052]">
            <Row>
                <Col span={5} className="flex">
                    <div className="ml-[20px] w-[var(--height-header)] h-[var(--height-header)] object-cover overflow-hidden rounded-full">
                        <Image
                            className="w-[100%] h-[100%]"
                            src={logo}
                            alt="logo_nha"
                            objectFit="cover"
                        ></Image>
                    </div>
                    <p className="text-[25px] text-[#fff] leading-[var(--height-header)] ml-[10px]">
                        Premier League
                    </p>
                </Col>
                <Col span={14} className="flex items-end">
                    <div className="w-[100%] h-[65%]">
                        <Menu
                            theme="dark"
                            mode="horizontal"
                            items={menu}
                            className="bg-[#3F1052] text-[#fff]"
                        />
                        ;
                    </div>
                </Col>
                <Col span={5}>
                    <div className="text-[#fff] flex justify-center items-center">
                        <Link href={routes.login.url}>
                            <button className="w-[100px] h-[40px] mt-[20px] p-[10px] border-[1px] border-[#fff] rounded-[5px] mx-[10px] hover:bg-[#fff] hover:text-[#000]">
                                Đăng Nhập
                            </button>
                        </Link>

                        <Link href={routes.register.url}>
                            <button className="w-[100px] h-[40px] mt-[20px] p-[10px] border-[1px] border-[#fff] rounded-[5px] mx-[10px] hover:bg-[#fff] hover:text-[#000]">
                                Đăng Ký
                            </button>
                        </Link>
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default memo(Header);
