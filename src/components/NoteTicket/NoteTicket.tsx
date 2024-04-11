import React from "react";

export default function NoteTicket() {
    return (
        <div className="mx-[15px]">
            <div className="flex  mb-[10px] ">
                <i className="bi bi-phone opacity-[0.5] mr-[10px]"></i>
                <div className="mb-[10px]">
                    <h6 className="opacity-[0.5] mb-[5px]">Mobile tickets</h6>
                    <p className="opacity-[0.5]">
                        Can be opened on a phone and will be sent digitally,
                        always in time for the event.
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
                        Can be opened on a phone and will be sent digitally,
                        always in time for the event.
                    </p>
                </div>
            </div>

            <p className="opacity-[0.5] mb-[10px]">
                <i className="bi bi-people mr-[10px]"></i> Seats: Connecting
                Seats
            </p>

            <p className="opacity-[0.5] mb-[10px]">
                <i className="bi bi-check-circle mr-[10px] text-[green]"></i>
                No restrictions
            </p>
        </div>
    );
}
