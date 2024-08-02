// import { getAllSeasonAction } from "@/action/seasonAction";
// import { getAllTeamAction } from "@/action/teamAction";
// import PageSelectMatch from "@/components/Match/PageSelectMatch";
// import { Suspense } from "react";

// export async function HandleData() {
//     let resSeasons = await getAllSeasonAction();
//     let resTeam = await getAllTeamAction();

//     if (resTeam.errorCode === 0 && resSeasons.errorCode === 0) {
//         let listSeason = resSeasons.data.map((item) => {
//             return {
//                 value: item?.id,
//                 label: item?.name,
//             };
//         });

//         let listTeam = resTeam.data.map((item) => {
//             return {
//                 value: item?.id,
//                 label: item?.name,
//             };
//         });

//         return (
//             <div className="w-[100%] md:w-[70%] md:ml-[50%] md:translate-x-[-50%]">
//                 <PageSelectMatch listSeason={listSeason} listTeam={listTeam} />
//             </div>
//         );
//     }

//     return <div>Error fetching data</div>;
// }

// export default async function Page() {
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

import { getAllSeasonAction } from "@/action/seasonAction";
import { getAllTeamAction } from "@/action/teamAction";
import PageSelectMatch from "@/components/Match/PageSelectMatch";
import { Suspense } from "react";

const HandleData = async () => {
    let resSeasons = await getAllSeasonAction();
    let resTeam = await getAllTeamAction();

    if (resTeam.errorCode === 0 && resSeasons.errorCode === 0) {
        let listSeason = resSeasons.data.map((item) => {
            return {
                value: item?.id,
                label: item?.name,
            };
        });

        let listTeam = resTeam.data.map((item) => {
            return {
                value: item?.id,
                label: item?.name,
            };
        });

        return {
            listSeason: listSeason,
            listTeam: listTeam,
        };
    }

    throw new Error("Error fetch data");
};

export default async function Page() {
    let res;
    try {
        res = await HandleData();
    } catch (error) {
        console.log(error);
        return <div className="">Error fetch data</div>;
    }
    return (
        <div>
            <Suspense fallback={<div>Loading.....</div>}>
                <div>
                    <div className="w-[100%] md:w-[70%] md:ml-[50%] md:translate-x-[-50%]">
                        <PageSelectMatch
                            listSeason={res.listSeason}
                            listTeam={res.listTeam}
                        />
                    </div>
                </div>
            </Suspense>
        </div>
    );
}
