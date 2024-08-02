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

//     return <div>Error fetching data</div>;
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

const HandleData = async (id: number) => {
    const res = await handleGetOneTicket(id);

    if (res.errorCode === 0) {
        return {
            data: res.data,
            price: res.data.price,
        };
    }

    throw new Error("Error fetch data");
};

export default async function PageTicket({ params: { id } }: IParams) {
    let res;
    try {
        res = await HandleData(id);
    } catch (error) {
        return <div>Error fetch data</div>;
    }
    return (
        <div>
            <Suspense fallback={<div>Loading.....</div>}>
                <div>
                    <PageBookingDetail
                        infoTicketStart={res.data}
                        totalPriceStart={res.data.price}
                        priceStart={res.data.price}
                    />
                </div>
            </Suspense>
        </div>
    );
}
