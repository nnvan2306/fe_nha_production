// import { handleGetOneTicket } from "@/action/ticketAction";
// import PageBookingDetail from "@/components/Booking/PageBookingDetail";
// import { Suspense } from "react";

// interface IParams {
//     params: {
//         id: number;
//     };
// }

// async function HandleData({ id }: { id: number }) {
//     const res = await handleGetOneTicket(id);

//     if (res.errorCode === 0) {
//         return (
//             <PageBookingDetail
//                 infoTicketStart={res.data}
//                 totalPriceStart={res.data.price}
//                 priceStart={res.data.price}
//             />
//         );
//     }
// }

// export default async function PageTicket({ params: { id } }: IParams) {
//     return (
//         <div>
//             <Suspense fallback={<div>Loading.....</div>}>
//                 <div>
//                     <HandleData id={id} />
//                 </div>
//             </Suspense>
//         </div>
//     );
// }

import { handleGetOneTicket } from "@/action/ticketAction";
import PageBookingDetail from "@/components/Booking/PageBookingDetail";
import { Suspense } from "react";

interface IParams {
    params: {
        id: number;
    };
}

interface TicketData {
    id: number;
    price: number;
    // Các thuộc tính khác của ticketData nếu có
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
    } else {
        return <div>Error loading data</div>;
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
