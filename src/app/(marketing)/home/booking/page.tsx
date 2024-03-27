"use client";

import { Button } from "antd";
import { useState } from "react";

export default function PageBooking() {
    const [loadings, setLoadings] = useState<boolean>(false);

    const handleGetCalendar = () => {};

    return (
        <div className="w-[60%] h-[100%] ml-[50%] translate-x-[-50%] ">
            <div className=" w-[100%] h-[80px] flex justify-around mt-[10px]">
                <select
                    name=""
                    id=""
                    className="w-[25%] h-[60%]  rounded-[10px] border-[1px] border-[#ccc] shadow-sm "
                >
                    <option value="">choose season</option>
                </select>

                <select
                    name=""
                    id=""
                    className="w-[25%] h-[60%]  rounded-[10px] border-[1px] border-[#ccc] shadow-sm "
                >
                    <option value="">choose host Team</option>
                </select>

                <div className="w-[20%] h-[60%]">
                    <Button
                        className=" w-[100%] h-[100%] rounded-[10px] border-[1px] border-[#ccc] shadow-sm disabled"
                        loading={loadings}
                        onClick={() => handleGetCalendar()}
                    >
                        Tìm kiếm
                    </Button>
                </div>
            </div>
        </div>
    );
}
