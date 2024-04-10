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

        console.log(infoTicket);
        router.push(
            `${routes.booking.url}/${id}/buyTicket?id=${infoTicket.id}`
        );
    };

    return (
        <div className="w-[100%] h-[100%]">
            <div className="w-[80%] ml-[50%] translate-x-[-50%] flex">
                <div className="w-[75%] bg-[#fff] mt-[20px] p-[20px] rounded-[10px]">
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

                    <p className="text-[13px] mb-[10px]">
                        Find your seats, select the number of tickets, then
                        click <span className="uppercase font-[600]">buy</span>{" "}
                        to proceed.
                    </p>

                    <p className="font-[600] text-[12px] ">
                        Whose tickets are listed below?
                    </p>
                    <p className="text-[13px]">
                        All the tickets are listed and priced by approved ticket
                        specialists.
                    </p>
                    <p className="text-[13px]">
                        Each ticket specialist competes with one another to
                        provide you the lowest prices & the largest selection on
                        the internet.
                    </p>
                </div>

                <div className="w-[25%] ml-[20px]">
                    <BlogChooseMe />
                </div>
            </div>

            <div className="w-[80%] ml-[50%] translate-x-[-50%] flex mt-[20px]">
                <div className="w-[40%] mr-[20px]">
                    <div className="w-[100%] bg-[#fff]  p-[20px] rounded-[10px]">
                        <p className="uppercase text-[20px] font-[600] text-[red]">
                            {listTicket[0]?.Calendar.Stadium.name}
                        </p>

                        <div className="my-[10px] w-[100%] h-[1px] bg-[#ccc]"></div>

                        <Image
                            src={`${process.env.NEXT_PUBLIC_BASE_URL}${listTicket[0]?.Calendar.Stadium.stadiumImage_url}`}
                            alt="stadium"
                            width={1000}
                            height={300}
                            className="w-[100%] rounded-[10px] "
                        />
                    </div>

                    <div className=" mt-[20px] bg-[#fff] p-[20px] rounded-[10px]">
                        <p className="mb-[10px] font-[600]">
                            What you need to know...
                        </p>
                        <p className="mb-[10px]">
                            <i className="bi bi-check text-[#3db900] text-[24px] "></i>
                            <span className="text-[16px]">
                                Event times are subject to change - so please
                                check with the venue for start times and/or age
                                restrictions.
                            </span>
                        </p>
                        <p className="mb-[10px]">
                            <i className="bi bi-check text-[#3db900] text-[24px] "></i>
                            <span className="text-[16px]">
                                Your total includes local sales tax and a
                                service fee. Friendly customer service
                            </span>
                        </p>
                        <p className="">
                            <i className="bi bi-check text-[#3db900] text-[24px] "></i>
                            <span className="text-[16px]">
                                Sales are final.
                            </span>
                        </p>
                    </div>
                </div>

                <div className="w-[60%] bg-[#fff] rounded-[10px] p-[20px]">
                    <p className="text-[red] uppercase font-[600] text-[20px]">
                        {" "}
                        available tickets
                    </p>
                    <div className="my-[10px] w-[100%] h-[1px] bg-[#ccc]"></div>

                    <div className="h-[100vh] overflow-auto">
                        {listTicket && listTicket.length > 0 ? (
                            listTicket.map((item, index) => {
                                return (
                                    <div className="" key={index}>
                                        <div className="w-[100%] flex justify-between bg-[#fff] hover:bg-[#eaeaea] rounded-[10px] p-[10px]">
                                            <div className="">
                                                <p className="text-[20px] font-[500] text-[#3db900] ml-[10px] mb-[10px]">
                                                    {item.name}
                                                </p>
                                                <p>tickets</p>
                                                <div className="flex justify-center items-center">
                                                    <div className="w-[50px] h-[40px] bg-[#EAEAEA] rounded-[10px] mr-[10px]">
                                                        <p className="text-center leading-[40px] font-[500]">
                                                            {item.totalTicket}
                                                        </p>
                                                    </div>

                                                    <Image
                                                        src={mobile}
                                                        alt="mobile"
                                                        objectFit="cover"
                                                    />
                                                </div>
                                            </div>

                                            <div className="flex items-end">
                                                <p className="mr-[10px]">
                                                    <span className="text-[20px] font-[500] mr-[5px] uppercase">
                                                        {" "}
                                                        £ {item.price}
                                                    </span>
                                                    <span className="text-[12px]">
                                                        per ticket
                                                    </span>
                                                </p>

                                                {/* <Link
                                                    href={{
                                                        pathname: `${routes.booking.url}/${id}/buyTicket`,
                                                        query: {
                                                            name:item.name,
                                                            id:item.id,
                                                        },
                                                    }}
                                                >
                                                </Link> */}
                                                <button
                                                    className="uppercase bg-[#3db900] px-[16px] py-[8px] border-none text-[#fff] rounded-[10px]"
                                                    onClick={() =>
                                                        handleBuyTicket(item)
                                                    }
                                                >
                                                    buy
                                                </button>
                                            </div>
                                        </div>

                                        <div className="w-[100%] h-[0.5px] bg-[#ccc] my-[10px]"></div>
                                    </div>
                                );
                            })
                        ) : (
                            <p>No Tickets Found</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
