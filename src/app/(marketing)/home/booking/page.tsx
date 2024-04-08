"use client";

import {
    getCalendarAction,
    getNearestCalendarAction,
} from "@/action/calendarAction";
import { getAllTeamAction } from "@/action/teamAction";
import BlogChooseMe from "@/components/BlogChooseMe/BlogChooseMe";
import { routes } from "@/helpers/menuRouterHeader";
import { ICalendar, ITeam } from "@/utils/interface";
import { Button, Col, Divider, Row } from "antd";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Empty } from "antd";

export default function PageBooking() {
    const [loadings, setLoadings] = useState<boolean>(false);
    const [listTeam, setListTeam] = useState<ITeam[]>([]);
    const [listCalendar, setListCalendar] = useState<ICalendar[]>([]);
    const [hostId, setHostId] = useState<number>(0);
    const [guestId, setGuestId] = useState<number>(0);

    const router = useRouter();

    useEffect(() => {
        try {
            const fetch = async () => {
                const res = await getAllTeamAction();
                const resCalendarDefault = await getNearestCalendarAction();
                if (res.errorCode === 0) {
                    setListTeam(res.data);
                    setListCalendar(resCalendarDefault.data);
                }
            };
            fetch();
        } catch (err) {
            console.log(err);
        }
    }, []);

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
        <div className="w-[80%] h-[100vh] ml-[50%] translate-x-[-50%] flex justify-center ">
            <div className="w-[75%] h-[100%]">
                <div className=" w-[100%] h-[80px] flex justify-around mt-[10px]">
                    <select
                        className="w-[25%] h-[60%]  rounded-[10px] border-[1px] border-[#ccc] shadow-sm p-[5px]"
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
                        className="w-[25%] h-[60%]  rounded-[10px] border-[1px] border-[#ccc] shadow-sm p-[5px]"
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

                    <div className="w-[20%] h-[60%]">
                        <Button
                            className=" w-[100%] h-[100%] rounded-[10px] border-[1px] border-[#ccc] shadow-sm disabled"
                            loading={loadings}
                            onClick={() => handleGetCalendar()}
                        >
                            Tìm kiếm
                        </Button>
                    </div>
                </div>

                <div className="bg-[#fff] p-[20px] rounded-[10px]">
                    {listCalendar && listCalendar.length > 0 ? (
                        listCalendar.map((item: ICalendar, index: number) => {
                            return (
                                <div className="w-[100%]" key={index}>
                                    <Row
                                        className="mb-[20px] hover:cursor-pointer"
                                        onClick={() => handleToTicket(item.id)}
                                    >
                                        <Col span={4}>
                                            <div className="w-[50%] h-[100%] p-[5px] ml-[50%] translate-x-[-50%] bg-[#fafafa] rounded-[5px] hover:bg-[#fff]">
                                                <p className="text-center font-[500] ">
                                                    {moment(item.date).format(
                                                        "MMMM"
                                                    )}
                                                </p>
                                                <p className="text-center text-[30px] font-[500]">
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
                                            {/* {item.date} */}
                                        </Col>
                                        <Col span={16}>
                                            <p>ENGLISH PREMIER LEAGUE</p>
                                            <p className="text-[20px] font-[500] hover:text-[red]">
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
                                            span={4}
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

            <div className="w-[25%] ml-[30px]">
                <BlogChooseMe />{" "}
            </div>
        </div>
    );
}
