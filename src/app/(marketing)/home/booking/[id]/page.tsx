"use client";

import { getAllTicket } from "@/action/ticketAction";
import { ITicket } from "@/utils/interface";
import { useEffect, useState } from "react";
import moment from "moment";

export default function PageTicket({
    params: { id },
}: {
    params: { id: number };
}) {
    const [listTicket, setListTicket] = useState<ITicket[]>([]);

    useEffect(() => {
        const fetch = async () => {
            const res = await getAllTicket(id);
            if (res.errorCode === 0) {
                setListTicket(res.data);
            }
        };
        fetch();
    }, [id]);

    console.log(listTicket);

    return (
        <div className="">
            <div className="w-[100%] mt-[20px]">
                <p className="text-center font-[700] text-[12px] uppercase opacity-[0.5] mb-[10px]">
                    english premier league
                </p>

                <p className="text-center mb-[10px]">
                    <span className="capitalize mr-[10px] text-[24px] font-[600]">
                        {listTicket[0]?.Calendar.Teams[0].name}
                    </span>
                    VS
                    <span className="capitalize ml-[10px] text-[24px] font-[600]">
                        {listTicket[0]?.Calendar.Teams[1].name}
                    </span>
                </p>

                <p className="text-[red] text-center text-[16px] mb-[10px]">
                    <span>{listTicket[0]?.Calendar.Stadium.name},</span>
                    <span>{listTicket[0]?.Calendar.Stadium.location}</span>
                </p>

                <p className="text-[16px] text-center">
                    <span className="mr-[10px]">
                        {moment(listTicket[0]?.Calendar.date).format(
                            "dddd, D MMMM YYYY"
                        )}
                    </span>
                    <span>|</span>
                    <span className="ml-[10px]">
                        {listTicket[0]?.Calendar.hour}
                    </span>
                </p>

                <div className="ml-[50%] translate-x-[-50%] flex justify-center items-center">
                    <div className="w-[50px] h-[50px] bg-[#fff] rounded-[10px] shadow-md flex justify-center items-center mr-[20px]">
                        {listTicket.reduce(
                            (total, currentValue) =>
                                total + currentValue.totalTicket,
                            0
                        )}
                    </div>
                    <p className="uppercase">tickets available</p>
                </div>
            </div>
        </div>
    );
}
