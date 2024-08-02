// import { getNearestCalendarAction } from "@/action/calendarAction";
// import { getAllTeamAction } from "@/action/teamAction";
// import PageListCalendar from "@/components/Booking/PageListCalendar";
// import { Suspense } from "react";

// export async function HandleData() {
//     const res = await getAllTeamAction();
//     const resDefaultCalendar = await getNearestCalendarAction();

//     if (res.errorCode === 0 && resDefaultCalendar.errorCode === 0) {
//         return (
//             <PageListCalendar
//                 listTeam={res.data}
//                 listCalendarDefault={resDefaultCalendar.data}
//             />
//         );
//     }
//     return <div>Error fetching data</div>;
// }

// export default async function PageCalendar() {
//     return (
//         <div>
//             <Suspense fallback={<div>Loading.....</div>}>
//                 <div>
//                     <HandleData />
//                 </div>
//             </Suspense>
//         </div>
//     );
// }

import { getNearestCalendarAction } from "@/action/calendarAction";
import { getAllTeamAction } from "@/action/teamAction";
import PageListCalendar from "@/components/Booking/PageListCalendar";
import { Suspense } from "react";

const HandleData = async () => {
    const res = await getAllTeamAction();
    const resDefaultCalendar = await getNearestCalendarAction();

    if (res.errorCode === 0 && resDefaultCalendar.errorCode === 0) {
        return {
            res: res.data,
            resDefaultCalendar: resDefaultCalendar.data,
        };
    }

    throw new Error("Error fetching data");
};

export default async function PageCalendar() {
    let res;
    try {
        res = await HandleData();
    } catch (error) {
        console.log(error);
        return <div> Error fetch data</div>;
    }

    return (
        <div>
            <Suspense fallback={<div>Loading.....</div>}>
                <div>
                    return (
                    <PageListCalendar
                        listTeam={res.res}
                        listCalendarDefault={res.resDefaultCalendar}
                    />
                    );
                </div>
            </Suspense>
        </div>
    );
}
