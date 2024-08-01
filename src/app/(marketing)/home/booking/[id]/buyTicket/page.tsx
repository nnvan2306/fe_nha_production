import { handleGetOneTicket } from "@/action/ticketAction";
import PageBookingDetail from "@/components/Booking/PageBookingDetail";
import { Suspense } from "react";

interface IParams {
    params: {
        id: number;
    };
}

async function HandleData({ id }: { id: number }) {
    const res = await handleGetOneTicket(id);

    if (res.errorCode === 0) {
        return (
            <PageBookingDetail
                infoTicketStart={res.data}
                totalPriceStart={res.data.price}
                priceStart={res.data.price}
            />
        );
    }

    return <div>Error fetching data</div>;
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
