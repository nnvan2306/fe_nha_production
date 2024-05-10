import { Col, Row } from "antd";
import React from "react";

export default function NoteRating() {
    return (
        <div className="w-[100%] px-[10px]">
            <div className="w-[100%] md:w-[70%] ml-[50%] translate-x-[-50%] mt-[20px]  rounded-[10px] shadow-sm bg-[#ddd]">
                <Row>
                    <Col span={12} className="p-[20px]">
                        <p className="font-[700] mb-[10px] md:h-[20px] h-[40px]">
                            Hạng trên / Hạng dưới
                        </p>
                        <div className="w-[100%] flex items-center mb-[5px]">
                            <div className="w-[10px] h-[10px] bg-[blue] mr-[10px]"></div>
                            <p className="w-[85%]">
                                Vòng bảng Vô địch các CLB Châu Âu
                            </p>
                        </div>

                        <div className="w-[100%] flex items-center mb-[5px]">
                            <div className="w-[10px] h-[10px] bg-[orange] mr-[10px]"></div>
                            <p className="w-[85%]">Vòng bảng UEFA Eoropa</p>
                        </div>

                        <div className="w-[100%] flex items-center">
                            <div className="w-[10px] h-[10px] bg-[red] mr-[10px]"></div>
                            <p className="w-[85%]">Xuống hạng</p>
                        </div>
                    </Col>

                    <Col span={12} className="p-[20px]">
                        <p className="font-[700] mb-[10px] md:h-[20px] h-[40px]">
                            5 Trận gần nhất
                        </p>

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
}
