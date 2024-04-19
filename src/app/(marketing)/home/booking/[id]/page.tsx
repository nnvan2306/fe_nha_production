import { getAllTicket } from "@/action/ticketAction";
import PageListTicket from "@/components/Booking/PageListTicket";
import { NextPage } from "next";
import { Suspense } from "react";

interface IParams {
    params: {
        id: number;
    };
}

export async function HandleData({ id }: { id: number }) {
    const res = await getAllTicket(id);

    if (res.errorCode === 0) {
        let arrFindMinPrice = res.data.map((item) => item.price);
        let min = Math.min(...arrFindMinPrice);
        return (
            <PageListTicket
                listTicket={res.data}
                minPrice={min}
                idCalendar={id}
            />
        );
    }
}

export default async function PageTicket({ params: { id } }: IParams) {
    return (
        <div>
            <Suspense fallback={<div>Loading.....</div>}>
                <div>
                    <HandleData id={id} />
                </div>
            </Suspense>
        </div>
    );
}
