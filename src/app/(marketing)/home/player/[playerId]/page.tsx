"use client";

import { getOnePlayerAction } from "@/action/playerAction";
import { handleGetStatisticPlayer } from "@/action/statisticAction";
import { routes } from "@/helpers/menuRouterHeader";
import { IPlayer, IStatistic } from "@/utils/interface";
import { Col, Divider, Row } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { memo, useEffect, useState } from "react";

const PlayerDetail = ({
    params: { playerId },
}: {
    params: { playerId: number };
}) => {
    const [info, setInfo] = useState<IPlayer>();
    const [listStatistic, setListStatistic] = useState<IStatistic[]>([]);

    const router = useRouter();

    useEffect(() => {
        const fetch = async () => {
            const res = await getOnePlayerAction(playerId);
            const resStatistic = await handleGetStatisticPlayer(playerId);
            if (res.errorCode === 0 && resStatistic.errorCode === 0) {
                setInfo(res.data);

                let listSort = resStatistic.data.sort(
                    (a: IStatistic, b: IStatistic) => {
                        let first = a.seasonId;
                        let end = b.seasonId;
                        return first - end;
                    }
                );

                setListStatistic(listSort);
            }
        };
        fetch();
    }, [playerId]);

    const handleBack = () => {
        router.push(routes.player.url);
    };
    return (
        <div className="relative">
            <div
                className="w-[80px] h-[40px] mt-[10px] ml-[10px] border-[1px] border-solid border-[#ccc] rounded-[10px] bg-[#fecfef] cursor-pointer flex absolute z-1"
                onClick={handleBack}
            >
                <i className="bi bi-chevron-left mx-[5px] text-[#2a5298] leading-[40px]"></i>
                <p className="text-[#2a5298] leading-[40px]">Back</p>
            </div>

            <div className="absolute z-2 w-[60%] ml-[50%] translate-x-[-50%] mt-[2px]">
                <div className="flex items-center">
                    <Image
                        className="border-[1px] border-[#ccc] border-solid rounded-[10px] overflow-hidden object-contain"
                        src={`${process.env.NEXT_PUBLIC_BASE_URL}${info?.avatar_url}`}
                        alt="avatar"
                        width={100}
                        height={100}
                    />
                    <div className="ml-[20px]">
                        <p className="text-[30px] font-[400]">{info?.name}</p>
                        <p>Cầu thủ bóng đá</p>
                    </div>
                </div>

                <Divider />

                <div className="w-[100] mt-[20px]">
                    <Row>
                        <Col
                            span={12}
                            className="pr-[20px] pb-[20px] border-r-1 border-solid border-r-[#ccc] border-[#fff]"
                        >
                            <div className="-[100%] h-[100%] ">
                                <p className="text-[20px]">
                                    Thống kê{" "}
                                    <i className="bi bi-chevron-right text-[15px]"></i>
                                </p>
                                <table className="w-[100%]">
                                    <thead>
                                        <tr className="border-b-[1px] border-solid border-[#ccc]">
                                            <td className="pb-[10px]">Năm</td>
                                            <td className="text-center pb-[10px]">
                                                Ghi bàn
                                            </td>
                                            <td className="text-center pb-[10px]">
                                                Kiến tạo
                                            </td>
                                            <td className="text-center pb-[10px]">
                                                <div className="w-[10px] h-[15px] bg-[yellow] border-[1px] border-[#ccc] border-solid"></div>
                                            </td>
                                            <td className="text-center pb-[10px]">
                                                <div className="w-[10px] h-[15px] bg-[red] border-[1px] border-[#ccc] border-solid"></div>
                                            </td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {listStatistic &&
                                            listStatistic.length > 0 &&
                                            listStatistic.map(
                                                (
                                                    item: IStatistic,
                                                    index: number
                                                ) => {
                                                    return (
                                                        <tr
                                                            key={index}
                                                            className="border-b-[1px] border-solid border-[#ccc] py-[5px]"
                                                        >
                                                            <td className="py-[10px]">
                                                                {
                                                                    item.seasonName
                                                                }
                                                            </td>
                                                            <td className="text-center">
                                                                {item.goal}
                                                            </td>
                                                            <td className="text-center">
                                                                {item.assist}
                                                            </td>
                                                            <td>
                                                                {
                                                                    item.yellowCard
                                                                }
                                                            </td>
                                                            <td>
                                                                {item.redCard}
                                                            </td>
                                                        </tr>
                                                    );
                                                }
                                            )}
                                    </tbody>
                                </table>
                            </div>
                        </Col>
                        <Col span={12} className="pl-[20px]">
                            <p className="text-[20px]">Giới thiệu</p>
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: info?.description,
                                }}
                            ></div>

                            <Divider />

                            <p className="text-[20px] mb-[20px]">Thông tin</p>

                            <p className="text-[16px] font-[500]">
                                Quốc tịch :{" "}
                                <span className="font-[400]">
                                    {" "}
                                    {info?.nationality}
                                </span>
                            </p>

                            <p className="text-[16px] font-[500]">
                                Sinh nhật :{" "}
                                <span className="font-[400]">
                                    {" "}
                                    {info?.Team.name}
                                </span>
                            </p>

                            <p className="text-[16px] font-[500]">
                                Đội hiện tại :{" "}
                                <span className="font-[400]">
                                    {" "}
                                    {info?.Team.name}
                                </span>
                            </p>

                            <p className="text-[16px] font-[500]">
                                Vị trí :{" "}
                                <span className="font-[400]">
                                    {" "}
                                    {info?.location === "1"
                                        ? "Thủ môn"
                                        : info?.location === "2"
                                        ? "Trung vệ"
                                        : info?.location === "3"
                                        ? "Hậu vệ"
                                        : info?.location === "4"
                                        ? "Tiền vệ"
                                        : "Tiền đạo"}
                                </span>
                            </p>

                            <p className="text-[16px] font-[500]">
                                Chiều cao :{" "}
                                <span className="font-[400]">
                                    {" "}
                                    {info?.height} m
                                </span>{" "}
                            </p>

                            <p className="text-[16px] font-[500]">
                                Cân nặng :{" "}
                                <span className="font-[400]">
                                    {" "}
                                    {info?.weight} kg
                                </span>{" "}
                            </p>
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
    );
};

export default memo(PlayerDetail);
