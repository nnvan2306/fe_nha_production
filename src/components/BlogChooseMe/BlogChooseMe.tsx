"use client";
import { Button, Modal } from "antd";
import generic from "../../../public/generic-icon.png";
import Image from "next/image";
import { useState } from "react";

export default function BlogChooseMe() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <div className="w-[100%] ">
            <Image
                src={generic}
                alt="generic"
                className="w-[100px] h-[100px] rounded-[100%] object-cover ml-[50%] translate-x-[-50%]"
            />
            <p className="text-center font-[600] text-[20px] uppercase">
                {" "}
                premier league tickets
            </p>

            <div className="w-[100%] bg-[#fff] p-[10px] mt-[20px] rounded-[10px]">
                <p className="text-center font-[600] text-[16px] text-[red] uppercase mt-[10px]">
                    why book with us ?
                </p>

                <div className="h-[1px] w-[100%] bg-[#ddd] my-[10px]"></div>

                <p className="flex items-center">
                    <i className="bi bi-check text-[#3db900] text-[24px] "></i>
                    <span className="text-[16px]">
                        150% money-back guarantee
                    </span>
                </p>

                <p className="flex items-center">
                    <i className="bi bi-check text-[#3db900] text-[24px] "></i>
                    <span className="text-[16px]">Real-time inventory</span>
                </p>

                <p className="flex items-center">
                    <i className="bi bi-check text-[#3db900] text-[24px] "></i>
                    <span className="text-[16px]">
                        Friendly customer service
                    </span>
                </p>

                <p className="flex items-center">
                    <i className="bi bi-check text-[#3db900] text-[24px] "></i>
                    <span className="text-[16px]">Secure payment</span>
                </p>

                <p className="flex items-center">
                    <i className="bi bi-check text-[#3db900] text-[24px] "></i>
                    <span className="text-[16px]">Last minute bookings</span>
                </p>

                <p className="flex items-center">
                    <i className="bi bi-check text-[#3db900] text-[24px] "></i>
                    <span className="text-[16px]">
                        16 years online serving fans
                    </span>
                </p>

                <div className=" ml-[50%] translate-x-[-50%] w-50% h-[40px] my-[20px]">
                    <Button
                        className="bg-[#3db900]  text-[#fff] w-[100%] h-[100%]"
                        onClick={showModal}
                    >
                        learn more
                    </Button>
                    <Modal
                        width={800}
                        open={isModalOpen}
                        onOk={handleOk}
                        onCancel={handleCancel}
                    >
                        <p className="text-center font-[600] text-[16px] text-[red] uppercase mt-[10px]">
                            why book with us ?
                        </p>
                        <div className="h-[1px] w-[100%] bg-[#ddd] my-[10px]"></div>

                        <p className="mb-[10px]">
                            <i className="bi bi-check text-[#3db900] text-[24px] "></i>
                            <span className="text-[16px]">
                                150% Money-Back Guarantee - In the highly
                                unlikely case you do not receive the tickets you
                                ordered in time for the match, we will refund
                                100% of your money back, plus we will offer you
                                a credit worth 50% of your original purchase
                                towards another match.
                            </span>
                        </p>

                        <p className="mb-[10px]">
                            <i className="bi bi-check text-[#3db900] text-[24px] "></i>
                            <span className="text-[16px]">
                                Real-Time Inventory - What you see on this
                                website is what is available to purchase right
                                now.
                            </span>
                        </p>

                        <p className="mb-[10px]">
                            <i className="bi bi-check text-[#3db900] text-[24px] "></i>
                            <span className="text-[16px]">
                                Friendly Customer Service - we treat every
                                customer with respect.
                            </span>
                        </p>

                        <p className="mb-[10px]">
                            <i className="bi bi-check text-[#3db900] text-[24px] "></i>
                            <span className="text-[16px]">
                                Secure Payment - Our website is completely
                                secure and safe to purchase from. In fact we
                                have the highest level of security certificates
                                (128 bit secure server) for our checkout process
                                so your details remain encrypted from beginning
                                to end.
                            </span>
                        </p>

                        <p className="mb-[10px]">
                            <i className="bi bi-check text-[#3db900] text-[24px] "></i>
                            <span className="text-[16px]">
                                Last Minute Bookings – We take bookings even
                                during the match day*
                            </span>
                        </p>

                        <p className="mb-[10px]">
                            <i className="bi bi-check text-[#3db900] text-[24px] "></i>
                            <span className="text-[16px]">
                                16 Years Online Serving Fans Like You – We have
                                been online since 2006 serving football fans
                                from all over the world.
                            </span>
                        </p>

                        <p>* Subject to availabilitys</p>
                    </Modal>
                </div>
            </div>
        </div>
    );
}
