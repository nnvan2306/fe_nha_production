"use client";

import { getAllTicket } from "@/action/ticketAction";
import { ITicket } from "@/utils/interface";
import { useEffect, useState } from "react";
import moment from "moment";
import BlogChooseMe from "@/components/BlogChooseMe/BlogChooseMe";
import Image from "next/image";
import mobile from "../../../../../../public/mobile.png";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { routes } from "@/helpers/menuRouterHeader";
import NoteBooking from "@/components/NoteBooking/NoteBooking";
import BuyingGuide from "@/components/BuyingGuide/BuyingGuide";
import { Col, Divider, Row } from "antd";
import Item from "antd/es/list/Item";

export default function PageTicket({
    params: { id },
}: {
    params: { id: number };
}) {
    const [listTicket, setListTicket] = useState<ITicket[]>([]);
    const [minPrice, setMinPrice] = useState<number>(0);

    const router = useRouter();

    useEffect(() => {
        const fetch = async () => {
            const res = await getAllTicket(id);
            if (res.errorCode === 0) {
                let arrFindMinPrice = res.data.map((item) => item.price);
                let min = Math.min(...arrFindMinPrice);
                setMinPrice(min);
                setListTicket(res.data);
            }
        };
        fetch();
    }, [id]);

    const handleBuyTicket = (infoTicket: ITicket) => {
        if (infoTicket.totalTicket === 0) {
            Swal.fire({
                icon: "warning",
                title: "tickets have been sold out ! ",
            });
            return;
        }

        router.push(
            `${routes.booking.url}/${id}/buyTicket?id=${infoTicket.id}`
        );
    };

    return (
        <div className="w-[100%] ">
            <div className="w-[80%] ml-[50%] translate-x-[-50%]">
                <div className="w-[100%]  flex">
                    <div className="w-[75%] bg-[#fff] mt-[20px] p-[20px] rounded-[10px] shadow-md mb-[50px]">
                        <p className="text-center font-[700] text-[12px] uppercase opacity-[0.5] mb-[10px]">
                            english premier league
                        </p>

                        <p className="text-center mb-[10px]">
                            <span className="capitalize mr-[10px] text-[24px] font-[600]">
                                {listTicket[0]?.Calendar.Teams[0].name}
                            </span>
                            VS
                            <span className=" ml-[10px] text-[24px] font-[600] capitalize">
                                {listTicket[0]?.Calendar.Teams[1].name}
                            </span>
                        </p>

                        <p className="text-[red] text-center text-[16px] mb-[10px]">
                            <span>{listTicket[0]?.Calendar.Stadium.name},</span>
                            <span>
                                {listTicket[0]?.Calendar.Stadium.location}
                            </span>
                        </p>

                        <p className="text-[16px] text-center mb-[20px]">
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

                        <div className="ml-[50%] translate-x-[-50%] flex justify-center items-center mb-[15px]">
                            <div className="w-[50px] h-[50px] bg-[#fff] rounded-[10px] shadow-md flex justify-center items-center mr-[20px]">
                                {listTicket.reduce(
                                    (total, currentValue) =>
                                        total + currentValue.totalTicket,
                                    0
                                )}
                            </div>
                            <p className="uppercase text-[20px] font-[600]">
                                tickets available
                            </p>
                        </div>

                        <p className="text-[13px] text-[#3db900] font-[600] uppercase text-center mb-[10px]">
                            from{" "}
                            <span className="text-[20px]">£ {minPrice}.00</span>
                        </p>

                        <BuyingGuide />
                    </div>

                    <div className="w-[25%] ml-[20px]">
                        <BlogChooseMe />
                    </div>
                </div>
                <div className="">
                    <h5>Available Tickets</h5>
                    <p className="text-[12px] opacity-[0.7]">
                        Tickets are listed and priced by our trusted ticket
                        partners competing with each other to deliver you the
                        best seats and lowest prices.
                    </p>
                    <p className="text-[12px] opacity-[0.7]">
                        Find your seats, select the number of tickets, then
                        click BUY to proceed.
                    </p>

                    <Divider />

                    <div className="">
                        <Row>
                            <Col span={10}>
                                <div className="w-[100] h-[600px] overflow-auto px-[20px]">
                                    {listTicket && listTicket.length > 0 ? (
                                        listTicket.map(
                                            (item: ITicket, index: number) => {
                                                return (
                                                    <div
                                                        className="w-[100%] shadow-md rounded-[10px] flex my-[20px] border-solid border-[1px] border-[#ddd]"
                                                        key={index}
                                                    >
                                                        <div className="w-[70%] p-[20px]">
                                                            <p className="mb-[10px]">
                                                                <i className="bi bi-flag mr-[10px] text-[20px] opacity-[0.7]"></i>
                                                                <span className="font-[600] text-[20px] opacity-[0.7]">
                                                                    Section :{" "}
                                                                    {item.name}
                                                                </span>
                                                            </p>

                                                            <p className="mb-[10px]">
                                                                <i className="bi bi-phone mr-[10px] text-[14px] opacity-[0.7]"></i>
                                                                <span className=" text-[14px] opacity-[0.7]">
                                                                    Mobile
                                                                    tickets
                                                                </span>
                                                            </p>

                                                            <p className="mb-[10px]">
                                                                <i className="bi bi-people mr-[10px] text-[14px] opacity-[0.7]"></i>
                                                                <span className=" text-[14px] opacity-[0.7]">
                                                                    Seats: Up To
                                                                    1 people
                                                                </span>
                                                            </p>

                                                            <p>
                                                                <i className="bi bi-check-circle mr-[10px] text-[#51AF3B] "></i>
                                                                <span className=" text-[14px] opacity-[0.7]">
                                                                    No
                                                                    restrictions
                                                                </span>
                                                            </p>
                                                        </div>

                                                        <div className="w-[30%] border-dashed border-[1px] border-l-[#000] border-t-[#fff] border-r-[#fff] border-b-[#fff] p-[20px]">
                                                            <h6 className="font-[700] text-end">
                                                                £{item.price}
                                                            </h6>
                                                            <p className="text-end opacity-[0.7]">
                                                                per ticket
                                                            </p>

                                                            <button
                                                                className="my-[20px] w-[90%] ml-[50%] translate-x-[-50%] p-[10px] rounded-full border-none text-[#fff] bg-[#51AF3B]"
                                                                onClick={() =>
                                                                    handleBuyTicket(
                                                                        item
                                                                    )
                                                                }
                                                            >
                                                                Buy
                                                            </button>
                                                        </div>
                                                    </div>
                                                );
                                            }
                                        )
                                    ) : (
                                        <p>No Tickets Found</p>
                                    )}
                                </div>
                            </Col>

                            <Col span={14}>
                                <div className="w-[100%] px-[30px]">
                                    <h5 className="uppercase  text-[red]">
                                        {listTicket[0]?.Calendar.Stadium.name}
                                    </h5>

                                    <Image
                                        src={`${process.env.NEXT_PUBLIC_BASE_URL}${listTicket[0]?.Calendar.Stadium.stadiumImage_url}`}
                                        alt="stadium"
                                        width={1000}
                                        height={400}
                                        className="w-[100%] rounded-[10px] "
                                    />
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        </div>
    );
}
