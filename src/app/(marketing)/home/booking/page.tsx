"use client";

import { getCalendarAction } from "@/action/calendarAction";
import { getAllTeamAction } from "@/action/teamAction";
import { ICalendar, ITeam } from "@/utils/interface";
import { Button } from "antd";
import { useEffect, useState } from "react";

export default function PageBooking() {
    const [loadings, setLoadings] = useState<boolean>(false);
    const [listTeam, setListTeam] = useState<ITeam[]>([]);
    const [listCalendar, setListCalendar] = useState<ICalendar[]>([]);
    const [hostId, setHostId] = useState<number>(0);
    const [guestId, setGuestId] = useState<number>(0);

    useEffect(() => {
        try {
            const fetch = async () => {
                const res = await getAllTeamAction();
                if (res.errorCode === 0) {
                    setListTeam(res.data);
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

    return (
        <div className="w-[60%] h-[100%] ml-[50%] translate-x-[-50%] ">
            <div className=" w-[100%] h-[80px] flex justify-around mt-[10px]">
                <select
                    className="w-[25%] h-[60%]  rounded-[10px] border-[1px] border-[#ccc] shadow-sm "
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
                    className="w-[25%] h-[60%]  rounded-[10px] border-[1px] border-[#ccc] shadow-sm "
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

            <div className="">
                {listCalendar &&
                    listCalendar.length > 0 &&
                    listCalendar.map((item: ICalendar, index: number) => {
                        return <div className="" key={index}></div>;
                    })}
            </div>
        </div>
    );
}
