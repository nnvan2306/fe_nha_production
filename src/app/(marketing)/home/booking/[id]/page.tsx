// import { getAllTicket } from "@/action/ticketAction";
// import PageListTicket from "@/components/Booking/PageListTicket";
// import { NextPage } from "next";
// import { Suspense } from "react";

// interface IParams {
//     params: {
//         id: number;
//     };
// }

// export async function HandleData({ id }: { id: number }) {
//     const res = await getAllTicket(id);

//     if (res.errorCode === 0) {
//         let arrFindMinPrice = res.data.map((item) => item.price);
//         let min = Math.min(...arrFindMinPrice);
//         return (
//             <PageListTicket
//                 listTicket={res.data}
//                 minPrice={min}
//                 idCalendar={id}
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

import { getAllTicket } from "@/action/ticketAction";
import PageListTicket from "@/components/Booking/PageListTicket";
import { Suspense } from "react";

interface IParams {
    params: {
        id: number;
    };
}

const fetchTickets = async (id: number) => {
    const res = await getAllTicket(id);

    if (res.errorCode === 0) {
        console.log(res);
        let arrFindMinPrice = res.data?.map((item) => item.price);
        let min = Math.min(...arrFindMinPrice);
        return { tickets: res.data, minPrice: min };
    }

    throw new Error("Error fetching data");
};

export default async function PageTicket({ params: { id } }: IParams) {
    let data;
    try {
        data = await fetchTickets(id);
    } catch (error) {
        console.log(error);
        return <div>Error fetching data</div>;
    }

    console.log(data.tickets);

    return (
        <div>
            <Suspense fallback={<div>Loading.....</div>}>
                <PageListTicket
                    listTicket={data.tickets}
                    minPrice={data.minPrice}
                    idCalendar={id}
                />
            </Suspense>
        </div>
    );
}
