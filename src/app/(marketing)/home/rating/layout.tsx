"use client";

import { getAllSeasonAction } from "@/action/seasonAction";
import { IList } from "@/utils/interface";
import { Col, Row } from "antd";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const PageTableRating = ({ children }: { children: React.ReactNode }) => {
    const [listSeason, setListSeason] = useState<IList[]>([]);
    const [seasonId, setSeasonId] = useState<number>(0);

    const router: AppRouterInstance = useRouter();

    useEffect(() => {
        const fetch = async () => {
            const res = await getAllSeasonAction();
            if (res.errorCode === 0) {
                setListSeason(
                    res?.data.map((item) => {
                        return {
                            value: item?.id,
                            label: item?.name,
                        };
                    })
                );
            }
        };
        fetch();
    }, []);

    const handleChangeSeason = (id: number) => {
        setSeasonId(id);
        router.push(`/home/rating/${id}`);
    };
    return (
        <div className="w-[70%] ml-[50%] translate-x-[-50%]">
            <div className="w-[100%] mt-[20px]">
                <select
                    className="w-[20%] py-[10px] px-[15px] border-[1px] border-solid border-[#ccc] rounded-[10px] shadow-md"
                    value={seasonId}
                    onChange={(e) => handleChangeSeason(+e.target.value)}
                >
                    <option value={0}>Choose season</option>
                    {listSeason &&
                        listSeason.length > 0 &&
                        listSeason.map((item: IList, index: number) => {
                            return (
                                <option key={index} value={item.value}>
                                    {item.label}
                                </option>
                            );
                        })}
                </select>
            </div>

            <div className="">{children}</div>

            <div className="w-[100%] h-[150px] mt-[20px]  rounded-[10px] shadow-sm bg-[#ddd]">
                <Row>
                    <Col span={12} className="p-[20px]">
                        <p className="font-[700] mb-[10px]">
                            Hạng trên / Hạng dưới
                        </p>
                        <div className="w-[100%] flex items-center mb-[5px]">
                            <div className="w-[10px] h-[10px] bg-[blue] mr-[10px]"></div>
                            <p>Vòng bảng Vô địch các CLB Châu Âu</p>
                        </div>
                        <div className="w-[100%] flex items-center mb-[5px]">
                            <div className="w-[10px] h-[10px] bg-[orange] mr-[10px]"></div>
                            <p>Vòng bảng UEFA Eoropa</p>
                        </div>
                        <div className="w-[100%] flex items-center">
                            <div className="w-[10px] h-[10px] bg-[red] mr-[10px]"></div>
                            <p>Xuống hạng</p>
                        </div>
                    </Col>

                    <Col span={12} className="p-[20px]">
                        <p className="font-[700] mb-[10px]">5 Trận gần nhất</p>

                        <div className="w-[100%] flex items-center mb-[5px]">
                            <div className="w-[15px] h-[15px] mr-[10px] rounded-full bg-[green]">
                                <i className="bi bi-check-lg text-[#fff] text-[10px] text-center line-clamp-[15px]"></i>
                            </div>
                            <p>Thắng</p>
                        </div>

                        <div className="w-[100%] flex items-center mb-[5px]">
                            <div className="w-[15px] h-[15px] bg-[#ccc] mr-[10px] rounded-full">
                                <i className="bi bi-dash text-[#fff] text-[10px] text-center line-clamp-[15px]"></i>
                            </div>
                            <p>Hòa</p>
                        </div>

                        <div className="w-[100%] flex items-center">
                            <div className="w-[15px] h-[15px] rounded-full bg-[red] mr-[10px]">
                                <i className="bi bi-x text-[#fff] text-[10px] text-center line-clamp-[15px]"></i>
                            </div>
                            <p>Thua</p>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default PageTableRating;
