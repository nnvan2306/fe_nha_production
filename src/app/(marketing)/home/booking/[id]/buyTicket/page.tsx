"use client";

import { Col, Layout, Row } from "antd";
import React from "react";

export default function page({
    searchParams,
}: {
    searchParams: { id: number };
}) {
    return (
        <div className="h-[100vh] pt-[30px] w-[80%] ml-[50%] translate-x-[-50%]">
            <Row className="w-[100%]">
                <Col span={14}>
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

                    <div className="flex w-[100%] mb-[30px]">
                        <div className="w-[50%] mx-[20px]">
                            <label htmlFor="">
                                Email Address{" "}
                                <span className="text-[red]">*</span>
                            </label>
                            <br />
                            <input
                                type="email"
                                className="w-[100%] p-[8px] mt-[10px] border-[1px] border-solid border-[#ccc] rounded-[10px] shadow-md"
                            />
                        </div>

                        <div className="w-[50%] mx-[20px]">
                            <label htmlFor="">
                                Confirm Email Address{" "}
                                <span className="text-[red]">*</span>
                            </label>
                            <br />
                            <input
                                type="email"
                                className="w-[100%] p-[8px] mt-[10px] border-[1px] border-solid border-[#ccc] rounded-[10px] shadow-md"
                            />
                        </div>
                    </div>

                    <div className="w-[45%] mx-[20px]">
                        <label htmlFor="">
                            Mobile Phone <span className="text-[red]">*</span>
                        </label>
                        <br />
                        <input
                            type="tel"
                            className="w-[100%] p-[8px] mt-[10px] border-[1px] border-solid border-[#ccc] rounded-[10px] shadow-md"
                        />
                    </div>
                </Col>
                <Col span={10}></Col>
            </Row>
        </div>
    );
}
