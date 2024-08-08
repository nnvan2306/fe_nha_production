"use client";

import { ICalendar, ITeam } from "@/utils/interface";
import { Button, Col, Divider, Empty, Row } from "antd";
import moment from "moment";
import React, { useState } from "react";
import BlogChooseMe from "../BlogChooseMe/BlogChooseMe";
import { getCalendarAction } from "@/action/calendarAction";
import { useRouter } from "next/navigation";
import { routes } from "@/helpers/menuRouterHeader";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export default function PageListCalendar({
    listTeam,
    listCalendarDefault,
}: {
    listTeam: ITeam[];
    listCalendarDefault: ICalendar[];
}) {
    const [loadings, setLoadings] = useState<boolean>(false);
    const [hostId, setHostId] = useState<number>(0);
    const [guestId, setGuestId] = useState<number>(0);
    const [listCalendar, setListCalendar] =
        useState<ICalendar[]>(listCalendarDefault);

    const router: AppRouterInstance = useRouter();

    const handleValidate = (): boolean => {
        if (!hostId && !guestId) {
            return false;
        }
        return true;
    };

    const handleGetCalendar = async () => {
        setLoadings(true);
        let check = handleValidate();
        if (!check) {
            setLoadings(false);
            return;
        }

        let dataBuider = {
            hostId: hostId,
            guestId: guestId,
        };

        try {
            const res = await getCalendarAction({ dataBuider });
            if (res.errorCode === 0) {
                setListCalendar(res.data);
            }
        } catch (err) {
            console.log(err);
        }

        setLoadings(false);
    };

    const handleToTicket = (id: number) => {
        router.push(`${routes.booking.url}/${id}`);
    };
    return (
        <div className="md:w-[80%] w-[100%] h-[100vh] ml-[50%] translate-x-[-50%] flex justify-center">
            <div className="md:w-[75%] w-[100%] h-[100%]">
                <div className="w-[100%] h-[10%] flex justify-around mt-[10px]">
                    <select
                        className="md:w-[25%] w-[40%] h-[60%]  rounded-[10px] border-[1px] border-[#ccc] shadow-sm p-[5px]"
                        value={hostId}
                        onChange={(e) => setHostId(+e.target.value)}
                    >
                        <option value={0}>choose guest Team</option>
                        {listTeam &&
                            listTeam.length > 0 &&
                            listTeam.map((item: ITeam, index: number) => {
                                return (
                                    <option key={index} value={item.id}>
                                        {item.name}
                                    </option>
                                );
                            })}
                    </select>

                    <select
                        className="md:w-[25%] w-[40%] h-[60%]  rounded-[10px] border-[1px] border-[#ccc] shadow-sm p-[5px]"
                        value={guestId}
                        onChange={(e) => setGuestId(+e.target.value)}
                    >
                        <option value={0}>choose host Team</option>
                        {listTeam &&
                            listTeam.length > 0 &&
                            listTeam.map((item: ITeam, index: number) => {
                                return (
                                    <option key={index} value={item.id}>
                                        {item.name}
                                    </option>
                                );
                            })}
                    </select>

                    <div className="w-[15%] h-[60%]">
                        <Button
                            className=" w-[100%] h-[100%] rounded-[10px] border-[1px] border-[#ccc] shadow-sm disabled"
                            loading={loadings}
                            onClick={() => handleGetCalendar()}
                        >
                            <p className="md:block hidden">Tìm kiếm</p>
                            <i className="md:hidden block bi bi-search"></i>
                        </Button>
                    </div>
                </div>

                <div className="bg-[#fff] md:p-[20px] p-[4px] rounded-[10px] h-[90%] overflow-auto">
                    {listCalendar && listCalendar.length > 0 ? (
                        listCalendar.map((item: ICalendar, index: number) => {
                            return (
                                <div className="w-[100%]" key={index}>
                                    <Row
                                        className="mb-[20px] hover:cursor-pointer"
                                        onClick={() => handleToTicket(item.id)}
                                    >
                                        <Col md={4} span={5}>
                                            <div className="md:w-[50%] w-[100%] h-[100%] p-[5px] ml-[50%] translate-x-[-50%] bg-[#fafafa] rounded-[5px] hover:bg-[#fff]">
                                                <p className="text-center font-[500] text-[16px]">
                                                    {moment(item.date).format(
                                                        "MMMM"
                                                    )}
                                                </p>
                                                <p className="text-center md:text-[30px] text-[20px] font-[500]">
                                                    {" "}
                                                    {moment(item.date).format(
                                                        "D"
                                                    )}
                                                </p>
                                                <p className="text-center">
                                                    {" "}
                                                    {moment(item.date).format(
                                                        "Y"
                                                    )}
                                                </p>
                                            </div>
                                        </Col>

                                        <Col md={16} span={14}>
                                            <p className="md:text-[16px] text-[12px]">
                                                ENGLISH PREMIER LEAGUE
                                            </p>
                                            <p className="md:text-[20px] text-[16px] md:font-[500] font-[600] hover:text-[red]">
                                                {item.hostId ===
                                                item.Teams[0].id
                                                    ? item.Teams[0].name
                                                    : item.Teams[1].name}{" "}
                                                FC
                                                {"  "}
                                                <span className="text-[red]">
                                                    Vs
                                                </span>{" "}
                                                {item.guestId ===
                                                item.Teams[0]?.id
                                                    ? item.Teams[0].name
                                                    : item.Teams[1].name}{" "}
                                                FC
                                            </p>
                                            <p className="font-[600]">
                                                {item.hour} -{" "}
                                                <span className="font-[400]">
                                                    {item.Stadium.name} ,{" "}
                                                    {item.Stadium.location}
                                                </span>
                                            </p>
                                        </Col>

                                        <Col
                                            md={4}
                                            span={5}
                                            className="flex items-center"
                                        >
                                            <button className="w-[100%] p-[8px] border-none rounded-[10px] text-[#fff] bg-[#3db900] hover:opacity-[0.6]">
                                                View Ticket
                                            </button>
                                        </Col>
                                    </Row>

                                    <Divider />
                                </div>
                            );
                        })
                    ) : (
                        <Empty className="mt-[50px]" />
                    )}
                </div>
            </div>

            <div className="w-[25%] md:block hidden ml-[30px]">
                <BlogChooseMe />{" "}
            </div>
        </div>
    );
}
