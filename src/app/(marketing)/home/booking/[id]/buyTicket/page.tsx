"use client";

import { handleGetOneTicket } from "@/action/ticketAction";
import { ITicket } from "@/utils/interface";
import { Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import buyTicket from "../../../../../../../public/buyTicket.png";
import Image from "next/image";
import moment from "moment";

export default function PageInfoBuyTicket({
    searchParams,
}: {
    searchParams: { id: number };
}) {
    const [infoTicket, setInfoTicket] = useState<ITicket | null>(null);
    const [email, setEmail] = useState<string>("");
    const [reEmail, setReEmail] = useState<string>("");
    const [phoneNumber, setPhoneNumber] = useState<number>(0);
    const [isPersonal, setIsPersonal] = useState<boolean>(true);
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [address, setAddress] = useState<String>("");
    const [city, setCity] = useState<string>("");
    const [Country, setCountry] = useState<string>("");
    const [isTerms, setIsTerms] = useState<string>("");

    useEffect(() => {
        const fetch = async () => {
            const res = await handleGetOneTicket(searchParams.id);
            if (res.errorCode === 0) {
                setInfoTicket(res.data);
            }
        };

        fetch();
    }, [searchParams.id]);

    console.log(infoTicket);

    return (
        <div className="h-[100%] pt-[30px] w-[80%] ml-[50%] translate-x-[-50%] ">
            <Row className="w-[100%] ">
                <Col span={14} className="pr-[20px]">
                    <div className="flex justify-center items-center w-[100%]">
                        <div className="w-[30px] h-[30px] border-[1px] border-solid border-[#000] rounded-full">
                            <p className="text-center leading-[30px]">1</p>
                        </div>
                        <div className="w-[70%] h-[3px] bg-[#ccc]"></div>
                        <div className="w-[30px] h-[30px] border-[1px] border-solid border-[#000] rounded-full">
                            <p className="text-center leading-[30px]">2</p>
                        </div>
                    </div>

                    <div className="flex justify-center items-center w-[100%] mt-[20px]">
                        <p className="">your detail</p>
                        <div className="w-[65%] h-[3px] "></div>
                        <p className="">Payment</p>
                    </div>

                    <p className="mt-[50px] mb-[30px] text-[20px]">
                        Your Deatil
                    </p>

                    <Row>
                        <Col span={12} className="pr-[20px]">
                            <div className="w-[100%] ">
                                <label htmlFor="email">
                                    Email Address{" "}
                                    <span className="text-[red]">*</span>
                                </label>
                                <br />
                                <input
                                    type="email"
                                    id="email"
                                    className="w-[100%] p-[10px] mt-[10px] border-[1px] border-solid border-[#ccc] rounded-[10px] shadow-md"
                                />
                            </div>
                            <div className="w-[100%]  mt-[30px]">
                                <label htmlFor="phoneNumber">
                                    Mobile Phone{" "}
                                    <span className="text-[red]">*</span>
                                </label>
                                <br />
                                <input
                                    id="phoneNumber"
                                    type="tel"
                                    className="w-[100%] p-[10px] mt-[10px] border-[1px] border-solid border-[#ccc] rounded-[10px] shadow-md"
                                />
                            </div>
                        </Col>
                        <Col span={12} className="pl-[20px]">
                            <div className="w-[100%] ">
                                <label htmlFor="reEmail">
                                    Confirm Email Address{" "}
                                    <span className="text-[red]">*</span>
                                </label>
                                <br />
                                <input
                                    id="reEmail"
                                    type="email"
                                    className="w-[100%] p-[10px] mt-[10px] border-[1px] border-solid border-[#ccc] rounded-[10px] shadow-md"
                                />
                            </div>
                        </Col>
                    </Row>

                    <p className="mt-[50px] mb-[30px] text-[20px]">
                        Billing Address
                    </p>

                    <Row>
                        <div className="flex">
                            <div className="flex mr-[20px]">
                                <input
                                    type="radio"
                                    className="mr-[10px] p-[10px]"
                                />
                                <p>Personal</p>
                            </div>

                            <div className="flex">
                                <input type="radio" className="mr-[10px]" />
                                <p>Business</p>
                            </div>
                        </div>
                        {!isPersonal ? (
                            <></>
                        ) : (
                            <Col span={24} className="mt-[20px]">
                                <label htmlFor="company" className="mb-[10px]">
                                    Company{" "}
                                    <span className="text-[red]">*</span>
                                </label>
                                <br />

                                <input
                                    id="company"
                                    type="text"
                                    className="w-[100%] p-[10px] border-solid border-[1px] border-[#ccc] rounded-[10px] mb-[20px]"
                                />
                            </Col>
                        )}

                        <Col span={12} className="pr-[20px]">
                            <div className="w-[100%] ">
                                <label htmlFor="firstName">
                                    First Name
                                    <span className="text-[red]">*</span>
                                </label>
                                <br />

                                <input
                                    type="text"
                                    id="firstName"
                                    className="w-[100%] p-[10px] mt-[10px] border-[1px] border-solid border-[#ccc] rounded-[10px] shadow-md mb-[20px]"
                                />
                            </div>
                            <div className="w-[100%] ">
                                <label htmlFor="address">
                                    Address
                                    <span className="text-[red]">*</span>
                                </label>
                                <br />

                                <input
                                    type="text"
                                    id="address"
                                    className="w-[100%] p-[10px] mt-[10px] border-[1px] border-solid border-[#ccc] rounded-[10px] shadow-md mb-[20px]"
                                />
                            </div>

                            <div className="w-[100%] ">
                                <label htmlFor="country">
                                    Country
                                    <span className="text-[red]">*</span>
                                </label>
                                <br />

                                <input
                                    type="text"
                                    id="country"
                                    className="w-[100%] p-[10px] mt-[10px] border-[1px] border-solid border-[#ccc] rounded-[10px] shadow-md mb-[20px]"
                                />
                            </div>
                        </Col>

                        <Col span={12} className="pl-[20px]">
                            <div className="w-[100%] ">
                                <label htmlFor="lastName">
                                    Last Name
                                    <span className="text-[red]">*</span>
                                </label>
                                <br />

                                <input
                                    type="text"
                                    id="lastName"
                                    className="w-[100%] p-[10px] mt-[10px] border-[1px] border-solid border-[#ccc] rounded-[10px] shadow-md mb-[20px]"
                                />
                            </div>

                            <div className="w-[100%] ">
                                <label htmlFor="city">
                                    City
                                    <span className="text-[red]">*</span>
                                </label>
                                <br />

                                <input
                                    type="text"
                                    id="city"
                                    className="w-[100%] p-[10px] mt-[10px] border-[1px] border-solid border-[#ccc] rounded-[10px] shadow-md mb-[20px]"
                                />
                            </div>
                        </Col>
                    </Row>

                    <div className="flex">
                        <input
                            type="checkbox"
                            name=""
                            id=""
                            className="mr-[20px] p-[10px]"
                        />
                        <p>
                            I have read and agree to the Terms and Conditions &
                            Privacy Policy
                        </p>
                    </div>

                    <button className="mt-[30px] w-[40%] py-[8px] px-[32px] bg-[green] text-[#fff] rounded-full border-none ">
                        Continue
                    </button>
                </Col>

                <Col span={10}>
                    <div className="w-[100%] shadow-md rounded-[10px] overflow-hidden">
                        <Image
                            src={buyTicket}
                            alt="anh"
                            className="w-[100%] h-[144px] object-cover"
                        />
                        <div className="m-[15px]">
                            <h4 className="capitalize mb-[20px]">
                                {infoTicket?.Calendar.Teams[0].name} Vs{" "}
                                {infoTicket?.Calendar?.Teams[1].name}
                            </h4>

                            <p className="opacity-[0.5] mb-[10px]">
                                <i className="bi bi-calendar3 mr-[10px]"></i>
                                {moment(infoTicket?.Calendar.date).format(
                                    "dddd, D MMMM YYYY"
                                )}{" "}
                                <span>| {infoTicket?.Calendar.hour}</span>
                            </p>

                            <p className="opacity-[0.5]">
                                <i className="bi bi-geo-alt mr-[10px]"></i>
                                {infoTicket?.Calendar.Stadium.name} ,{" "}
                                {infoTicket?.Calendar.Stadium.location}
                            </p>
                            {}
                        </div>

                        <div className="w-[100%] h-[0.5px] bg-[#ccc] my-[20px] "></div>

                        <div className="mx-[15px]">
                            <div className="flex  mb-[10px] ">
                                <i className="bi bi-phone opacity-[0.5] mr-[10px]"></i>
                                <div className="mb-[10px]">
                                    <h6 className="opacity-[0.5] mb-[5px]">
                                        Mobile tickets
                                    </h6>
                                    <p className="opacity-[0.5]">
                                        Can be opened on a phone and will be
                                        sent digitally, always in time for the
                                        event.
                                    </p>
                                </div>
                            </div>

                            <div className="flex mb-[10px]">
                                <i className="bi bi-flag opacity-[0.5] mr-[10px]"></i>
                                <div className="">
                                    <p className="opacity-[0.5]">
                                        Section: LONGSIDE UPPER TIER
                                    </p>
                                    <p className="opacity-[0.5]">
                                        Can be opened on a phone and will be
                                        sent digitally, always in time for the
                                        event.
                                    </p>
                                </div>
                            </div>

                            <p className="opacity-[0.5] mb-[10px]">
                                <i className="bi bi-people mr-[10px]"></i>{" "}
                                Seats: Connecting Seats
                            </p>

                            <p className="opacity-[0.5] mb-[10px]">
                                <i className="bi bi-check-circle mr-[10px] text-[green]"></i>
                                No restrictions
                            </p>
                        </div>

                        <div className="w-[100%] h-[0.5px] bg-[#ccc] my-[20px] "></div>

                        <div className="mx-[15px] flex justify-between items-center">
                            <div className="">
                                <label htmlFor="">Total Ticket buy</label>
                                <br />
                                <input
                                    type="number"
                                    className="p-[10px] w-[40%] rounded-[10px] border-solid border-[1px] border-[#ccc] mt-[10px]"
                                />
                            </div>

                            <div className="">
                                <h6>£ {infoTicket?.price}.00</h6>

                                <p className="opacity-[0.5]">Per ticket</p>
                            </div>
                        </div>

                        <div className="w-[100%] h-[0.5px] bg-[#ccc] my-[20px] "></div>

                        <div className="mx-[15px] flex justify-between items-center mb-[30px]">
                            <h5>Total</h5>

                            <h5>£ {infoTicket?.price}.00</h5>
                        </div>
                    </div>
                </Col>
            </Row>

            {/* <TermsAndCondition /> */}
        </div>
    );
}
