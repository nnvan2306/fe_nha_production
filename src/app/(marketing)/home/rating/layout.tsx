// import { getAllSeasonAction } from "@/action/seasonAction";
// import NoteRating from "@/components/NoteRating/NoteRating";
// import PageSelectSeason from "@/components/Rating/PageSelectSeason";
// import { Suspense } from "react";

// export async function HandleData({ detail }: { detail: React.ReactNode }) {
//     const res = await getAllSeasonAction();

//     if (res.errorCode === 0) {
//         let listSeasonAwap = res?.data.map((item) => {
//             return {
//                 value: item?.id,
//                 label: item?.name,
//             };
//         });
//         return (
//             <div className="w-[100%] ml-[50%] translate-x-[-50%]">
//                 <PageSelectSeason
//                     listSeason={listSeasonAwap}
//                     seasonId={res?.data[0]?.id}
//                 />

//                 <div className="">{detail}</div>

//                 <NoteRating />
//             </div>
//         );
//     }

//     return <div>Error fetching data</div>;
// }

// export default async function PageSelect({
//     children,
// }: {
//     children: React.ReactNode;
// }) {
//     return (
//         <div>
//             <Suspense fallback={<div>Loading.....</div>}>
//                 <div>
//                     <HandleData detail={children} />
//                 </div>
//             </Suspense>
//         </div>
//     );
// }

import { getAllSeasonAction } from "@/action/seasonAction";
import NoteRating from "@/components/NoteRating/NoteRating";
import PageSelectSeason from "@/components/Rating/PageSelectSeason";
import { Suspense } from "react";

const HandleData = async () => {
    const res = await getAllSeasonAction();

    if (res.errorCode === 0) {
        let listSeasonSwap = res?.data.map((item) => {
            return {
                value: item?.id,
                label: item?.name,
            };
        });
        return {
            listSeasonSwap: listSeasonSwap,
            idDefault: res?.data[0]?.id,
        };
    }

    throw new Error("Error fetch data");
};

export default async function PageSelect({
    children,
}: {
    children: React.ReactNode;
}) {
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
                    <div className="w-[100%] ml-[50%] translate-x-[-50%]">
                        <PageSelectSeason
                            listSeason={res.listSeasonSwap}
                            seasonId={res.idDefault}
                        />

                        <div className="">{children}</div>

                        <NoteRating />
                    </div>
                </div>
            </Suspense>
        </div>
    );
}
