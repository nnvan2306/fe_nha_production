import React from "react";

export default function NoteBooking() {
    return (
        <div className=" mt-[20px] bg-[#fff] p-[20px] rounded-[10px]">
            <p className="mb-[10px] font-[600]">What you need to know...</p>
            <p className="mb-[10px]">
                <i className="bi bi-check text-[#3db900] text-[24px] "></i>
                <span className="text-[16px]">
                    Event times are subject to change - so please check with the
                    venue for start times and/or age restrictions.
                </span>
            </p>
            <p className="mb-[10px]">
                <i className="bi bi-check text-[#3db900] text-[24px] "></i>
                <span className="text-[16px]">
                    Your total includes local sales tax and a service fee.
                    Friendly customer service
                </span>
            </p>
            <p className="">
                <i className="bi bi-check text-[#3db900] text-[24px] "></i>
                <span className="text-[16px]">Sales are final.</span>
            </p>
        </div>
    );
}
