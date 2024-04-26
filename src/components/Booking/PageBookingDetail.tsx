import { checkBankingAction } from "@/action/apiBanking";
import { CreateBillAction, deleteBillAction } from "@/action/billAction";
import { handleSendEmailAction } from "@/action/mailAction";
import { bookingTicketAction } from "@/action/ticketAction";
import { isValidEmail } from "@/helpers/handleCheckTypeEmail";
import { ITicket } from "@/utils/interface";
import { Col, Row } from "antd";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { v4 as uuidv4 } from "uuid";
import PhoneInput from "react-phone-number-input/input";
import Image from "next/image";
import buyTicket from "../../../public/buyTicket.png";
import NoteTicket from "./NoteTicket";
import moment from "moment";

export default function PageBookingDetail() {
    const [infoTicket, setInfoTicket] = useState<ITicket | null>(null);
    const [email, setEmail] = useState<string>("");
    const [reEmail, setReEmail] = useState<string>("");
    const [phoneNumber, setPhoneNumber] = useState<any>("");
    const [isPersonal, setIsPersonal] = useState<boolean>(true);
    const [company, setCompany] = useState<string>("");
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [address, setAddress] = useState<string>("");
    const [city, setCity] = useState<string>("");
    const [country, setCountry] = useState<string>("");
    const [isTerms, setIsTerms] = useState<boolean>(false);
    const [totalTicketBuy, setTotalTicketBuy] = useState<number>(1);
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const [price, setPrice] = useState<number>(0);
    const [isPayment, setIsPayment] = useState<boolean>(false);
    const [uuid, setUuid] = useState<string>("");
    const [countdown, setCountdown] = useState<number>(600);
    const [revalueInfoTicket, setRevalueInfoTicket] = useState(false);

    const handleONChange = (value: number) => {
        if (value) {
            setIsPersonal(true);
            return;
        }

        setIsPersonal(false);
    };

    const handleRevalue = () => {
        setEmail("");
        setReEmail("");
        setPhoneNumber("");
        setFirstName("");
        setLastName("");
        setAddress("");
        setCity("");
        setCountry("");
        setIsTerms(false);
        setTotalTicketBuy(1);
        setTotalPrice(price * 1);
        setCountdown(600);
    };

    const handleChooseTotalTicket = (ticketNumber: number) => {
        setTotalTicketBuy(ticketNumber);
        setTotalPrice(ticketNumber * price);
    };

    const handleValidateContinute = (): boolean => {
        if (
            !email ||
            !reEmail ||
            !phoneNumber ||
            !firstName ||
            !lastName ||
            !address ||
            !city ||
            !country ||
            !isTerms ||
            !totalTicketBuy ||
            !totalPrice ||
            (!isPersonal && !company)
        ) {
            Swal.fire({
                icon: "warning",
                title: "Please enter infomation !",
            });
            return false;
        }

        if (!isValidEmail(email) || !isValidEmail(reEmail)) {
            Swal.fire({
                icon: "warning",
                title: "Email or reEmail invalidate (...@gmail.com)",
            });
            return false;
        }

        if (email !== reEmail) {
            Swal.fire({
                icon: "warning",
                title: "email and reEmail must be the same",
            });
            return false;
        }

        if (
            infoTicket?.totalTicket &&
            totalTicketBuy > infoTicket?.totalTicket
        ) {
            Swal.fire({
                icon: "warning",
                title: `This row of seats only has ${infoTicket.totalTicket} tickets left`,
            });
            return false;
        }
        return true;
    };

    const handleContinue = async () => {
        let check = handleValidateContinute();
        let createUuid = uuidv4();

        if (!check) {
            return;
        }

        let dataBuider = {
            uuid: createUuid,
            ticketId: infoTicket?.id,
            totalTicket: totalTicketBuy,
            email: email,
            phoneNumber: phoneNumber,
            firstName: firstName,
            lastName: lastName,
            address: address,
            city: city,
            country: country,
        };

        let res = await CreateBillAction(dataBuider);

        if (res.errorCode !== 0) {
            Swal.fire({
                icon: "warning",
                title: "err from server please try again !",
            });
            return;
        }
        setIsPayment(true);
        setUuid(createUuid);
    };

    useEffect(() => {
        if (isPayment) {
            let intervalId: NodeJS.Timeout;

            const handleCountdown = async () => {
                if (countdown > 0) {
                    setCountdown((prevCount) => prevCount - 1);
                } else {
                    clearInterval(intervalId);
                    Swal.fire({
                        icon: "warning",
                        title: "Time up",
                    });
                    setIsPayment(false);
                    await deleteBillAction(uuid);
                    setUuid("");
                    setCountdown(600);
                }
            };

            intervalId = setInterval(handleCountdown, 1000);

            return () => clearInterval(intervalId);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isPayment]);

    useEffect(() => {
        if (isPayment) {
            let intervalBankId: NodeJS.Timeout;

            const handleGetBank = async () => {
                const res = await checkBankingAction();

                if (res.data && res.data.length > 0) {
                    res.data.forEach(async (item: any, index: number) => {
                        if (
                            item["Mô tả"].includes(uuid.replace(/-/g, "")) &&
                            item["Giá trị"] === totalPrice
                        ) {
                            let data = {
                                email: email,
                            };
                            let dataUpdateTicket = {
                                id: infoTicket?.id,
                                totalTicketBooking: totalTicketBuy,
                            };

                            clearInterval(intervalBankId);
                            Swal.fire({
                                icon: "success",
                                title: "Payment success",
                            });

                            setIsPayment(false);
                            handleRevalue();
                            setUuid("");
                            setCountdown(600);
                            await handleSendEmailAction(data);
                            await bookingTicketAction(dataUpdateTicket);
                            setRevalueInfoTicket(!revalueInfoTicket);
                        }
                    });
                }
            };

            intervalBankId = setInterval(handleGetBank, 7000);

            return () => clearInterval(intervalBankId);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isPayment]);

    const handleBack = async () => {
        Swal.fire({
            title: `If you BACK , the transaction will be canceled CANCELED and NO REFUND WILL BE ISSUED ?`,
            showCancelButton: true,
            confirmButtonText: "Yes",
        }).then((result) => {
            if (result.isConfirmed) {
                const _fetch = async () => {
                    await deleteBillAction(uuid);
                    setIsTerms(false);
                    setIsPayment(false);
                    setUuid("");
                    setCountdown(600);
                };
                _fetch();
            }
        });
    };

    return (
        <div className="h-[100%] pt-[30px] w-[80%] ml-[50%] translate-x-[-50%] ">
            <Row className="w-[100%] ">
                <Col span={14} className="pr-[20px]">
                    <div className="flex justify-center items-center w-[100%]">
                        <div
                            className={`w-[30px] h-[30px] border-[2px] border-solid   rounded-full flex justify-center items-center ${
                                isPayment
                                    ? "bg-[green] border-[green]"
                                    : "border-[#000]"
                            }`}
                        >
                            {isPayment ? (
                                <i className="bi bi-check text-[#fff] text-[20px] "></i>
                            ) : (
                                <p className="font-[500]">1</p>
                            )}
                        </div>
                        <div
                            className={`w-[70%] h-[3px] bg-[#ccc] ${
                                isPayment ? "bg-[#000]" : "bg-[#ccc]"
                            }`}
                        ></div>

                        <div
                            className={`w-[30px] h-[30px] border-[2px] border-solid flex justify-center items-center ${
                                isPayment ? "border-[#000]" : "border-[#ccc]"
                            }  rounded-full`}
                        >
                            <p
                                className={`font-[500] ${
                                    isPayment ? "" : "opacity-[0.5]"
                                }`}
                            >
                                2
                            </p>
                        </div>
                    </div>

                    <div className="flex justify-center items-center w-[100%] mt-[20px]">
                        <p className="">your detail</p>
                        <div className="w-[65%] h-[3px] "></div>
                        <p className="">Payment</p>
                    </div>

                    <div className="my-[20px] p-[10px] border-solid border-[1px] border-[#ccc] rounded-[10px] pl-[20px] shadow-sm">
                        <p className="my-[0px] text-[16px] uppercase">
                            remaining tickets :{" "}
                            <span
                                className={`${
                                    infoTicket?.totalTicket
                                        ? "text-[green]"
                                        : "text-[red]"
                                } text-[20px] font-[600]`}
                            >
                                {infoTicket?.totalTicket}
                            </span>
                        </p>
                    </div>

                    {!isPayment ? (
                        <>
                            <p className="mt-[50px] mb-[30px] text-[20px]">
                                Your Deatil
                            </p>

                            <Row>
                                <Col span={12} className="pr-[20px]">
                                    <div className="w-[100%] ">
                                        <label htmlFor="email">
                                            Email Address{" "}
                                            <span className="text-[red]">
                                                *
                                            </span>
                                        </label>
                                        <br />
                                        <input
                                            type="email"
                                            id="email"
                                            required
                                            className="w-[100%] p-[10px] mt-[10px] border-[1px] border-solid border-[#ccc] rounded-[10px] shadow-md"
                                            value={email}
                                            onChange={(e) =>
                                                setEmail(e.target.value)
                                            }
                                        />
                                    </div>
                                    <div className="w-[100%]  mt-[30px]">
                                        <label htmlFor="phoneNumber">
                                            Mobile Phone{" "}
                                            <span className="text-[red]">
                                                *
                                            </span>
                                        </label>
                                        <br />

                                        <PhoneInput
                                            required
                                            className="w-[100%] p-[10px] mt-[10px] border-[1px] border-solid border-[#ccc] rounded-[10px] shadow-md"
                                            country="VN"
                                            value={phoneNumber}
                                            onChange={setPhoneNumber}
                                        />
                                    </div>
                                </Col>
                                <Col span={12} className="pl-[20px]">
                                    <div className="w-[100%] ">
                                        <label htmlFor="reEmail">
                                            Confirm Email Address{" "}
                                            <span className="text-[red]">
                                                *
                                            </span>
                                        </label>
                                        <br />
                                        <input
                                            id="reEmail"
                                            type="email"
                                            required
                                            className="w-[100%] p-[10px] mt-[10px] border-[1px] border-solid border-[#ccc] rounded-[10px] shadow-md"
                                            value={reEmail}
                                            onChange={(e) =>
                                                setReEmail(e.target.value)
                                            }
                                        />
                                    </div>
                                </Col>
                            </Row>

                            <p className="mt-[50px] mb-[30px] text-[20px]">
                                Billing Address
                            </p>

                            <Row>
                                <div className="flex w-[100%] mb-[20px]">
                                    <div className="flex mr-[20px]">
                                        <input
                                            defaultChecked
                                            name="isPerson"
                                            type="radio"
                                            className="mr-[10px] p-[10px]"
                                            value={1}
                                            onChange={(e) =>
                                                handleONChange(+e.target.value)
                                            }
                                        />
                                        <p>Personal</p>
                                    </div>

                                    <div className="flex">
                                        <input
                                            name="isPerson"
                                            type="radio"
                                            className="mr-[10px]"
                                            value={0}
                                            onChange={(e) =>
                                                handleONChange(+e.target.value)
                                            }
                                        />
                                        <p>Business</p>
                                    </div>
                                </div>
                                {isPersonal ? (
                                    <></>
                                ) : (
                                    <Col span={24} className="">
                                        <label
                                            htmlFor="company"
                                            className="mb-[10px]"
                                        >
                                            Company{" "}
                                            <span className="text-[red]">
                                                *
                                            </span>
                                        </label>
                                        <br />

                                        <input
                                            id="company"
                                            type="text"
                                            className="w-[100%] p-[10px] border-solid border-[1px] border-[#ccc] rounded-[10px] mb-[20px]"
                                            value={company}
                                            onChange={(e) =>
                                                setCompany(e.target.value)
                                            }
                                        />
                                    </Col>
                                )}

                                <Col span={12} className="pr-[20px]">
                                    <div className="w-[100%] ">
                                        <label htmlFor="firstName">
                                            First Name
                                            <span className="text-[red]">
                                                *
                                            </span>
                                        </label>
                                        <br />

                                        <input
                                            type="text"
                                            id="firstName"
                                            required
                                            className="w-[100%] p-[10px] mt-[10px] border-[1px] border-solid border-[#ccc] rounded-[10px] shadow-md mb-[20px]"
                                            value={firstName}
                                            onChange={(e) =>
                                                setFirstName(e.target.value)
                                            }
                                        />
                                    </div>
                                    <div className="w-[100%] ">
                                        <label htmlFor="address">
                                            Address
                                            <span className="text-[red]">
                                                *
                                            </span>
                                        </label>
                                        <br />

                                        <input
                                            type="text"
                                            id="address"
                                            required
                                            className="w-[100%] p-[10px] mt-[10px] border-[1px] border-solid border-[#ccc] rounded-[10px] shadow-md mb-[20px]"
                                            value={address}
                                            onChange={(e) =>
                                                setAddress(e.target.value)
                                            }
                                        />
                                    </div>

                                    <div className="w-[100%] ">
                                        <label htmlFor="country">
                                            Country
                                            <span className="text-[red]">
                                                *
                                            </span>
                                        </label>
                                        <br />

                                        <input
                                            type="text"
                                            id="country"
                                            required
                                            className="w-[100%] p-[10px] mt-[10px] border-[1px] border-solid border-[#ccc] rounded-[10px] shadow-md mb-[20px]"
                                            value={country}
                                            onChange={(e) =>
                                                setCountry(e.target.value)
                                            }
                                        />
                                    </div>
                                </Col>

                                <Col span={12} className="pl-[20px]">
                                    <div className="w-[100%] ">
                                        <label htmlFor="lastName">
                                            Last Name
                                            <span className="text-[red]">
                                                *
                                            </span>
                                        </label>
                                        <br />

                                        <input
                                            type="text"
                                            id="lastName"
                                            required
                                            className="w-[100%] p-[10px] mt-[10px] border-[1px] border-solid border-[#ccc] rounded-[10px] shadow-md mb-[20px]"
                                            value={lastName}
                                            onChange={(e) =>
                                                setLastName(e.target.value)
                                            }
                                        />
                                    </div>

                                    <div className="w-[100%] ">
                                        <label htmlFor="city">
                                            City
                                            <span className="text-[red]">
                                                *
                                            </span>
                                        </label>
                                        <br />

                                        <input
                                            type="text"
                                            id="city"
                                            required
                                            className="w-[100%] p-[10px] mt-[10px] border-[1px] border-solid border-[#ccc] rounded-[10px] shadow-md mb-[20px]"
                                            value={city}
                                            onChange={(e) =>
                                                setCity(e.target.value)
                                            }
                                        />
                                    </div>
                                </Col>
                            </Row>

                            <div className="flex">
                                <input
                                    type="checkbox"
                                    name="checkbox"
                                    className="mr-[20px] p-[10px]"
                                    onChange={() => setIsTerms(!isTerms)}
                                />

                                <p>
                                    I have read and agree to the Terms and
                                    Conditions & Privacy Policy
                                </p>
                            </div>

                            <button
                                className="mt-[30px] w-[40%] py-[8px] px-[32px] bg-[green] text-[#fff] rounded-full border-none "
                                onClick={() => handleContinue()}
                            >
                                Continue
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                className="py-[8px] px-[20px] border-none rounded-full mt-[10px] text-[#fff] bg-[green]"
                                onClick={() => handleBack()}
                            >
                                <i className="bi bi-chevron-left"></i>
                                Back
                            </button>

                            <div className="w-[100%] my-[20px] h-[50px] bg-[#ddd] border-solid border-[1px] border-[#ccc] rounded-[10px] flex justify-center items-center">
                                <p>
                                    The tickets are reserved for you.{" "}
                                    <span className="font-[700] mx-[5px] text-[red]">
                                        {countdown} s
                                    </span>
                                    remaining to finish your order.
                                </p>
                            </div>

                            <div className="">
                                <Image
                                    width={500}
                                    height={500}
                                    className="ml-[50%] translate-x-[-50%]"
                                    src={`${process.env.NEXT_PUBLIC_QR__URL}${process.env.NEXT_PUBLIC_BANK_ID}-${process.env.NEXT_PUBLIC_BANK_ACCOUNT_NO}-${process.env.NEXT_PUBLIC_BANK_TEMPLATE}.png?amount=${totalPrice}&addInfo=${uuid}`}
                                    alt="QR"
                                />
                            </div>
                        </>
                    )}
                </Col>

                <Col span={10} className="pl-[20px]">
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

                        <NoteTicket />

                        <div className="w-[100%] h-[0.5px] bg-[#ccc] my-[20px] "></div>

                        <div className="mx-[15px] flex justify-between items-center">
                            <div className="">
                                <label htmlFor="">Total Ticket buy</label>
                                <br />
                                {isPayment ? (
                                    <div className="p-[10px] w-[50%] border-solid boredr-[1px] border-[#ccc] rounded-[10px]">
                                        <p className="text-center">
                                            {totalTicketBuy}
                                        </p>
                                    </div>
                                ) : (
                                    <input
                                        type="number"
                                        className="p-[10px] w-[40%] rounded-[10px] border-solid border-[1px] border-[#ccc] mt-[10px]"
                                        value={totalTicketBuy}
                                        onChange={(e) =>
                                            handleChooseTotalTicket(
                                                +e.target.value
                                            )
                                        }
                                    />
                                )}
                            </div>

                            <div className="">
                                <h6>£ {infoTicket?.price}.00</h6>

                                <p className="opacity-[0.5]">Per ticket</p>
                            </div>
                        </div>

                        <div className="w-[100%] h-[0.5px] bg-[#ccc] my-[20px] "></div>

                        <div className="mx-[15px] flex justify-between items-center mb-[30px]">
                            <h5>Total</h5>

                            <h5>£ {totalPrice}.00</h5>
                        </div>
                    </div>
                </Col>
            </Row>

            {/* <TermsAndCondition /> */}
        </div>
    );
}
