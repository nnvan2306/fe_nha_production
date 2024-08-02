// import { getAllSeasonAction } from "@/action/seasonAction";
// import Statistic from "@/components/Statistic/Statistic";
// import { ISeason } from "@/utils/interface";
// import { Suspense } from "react";

// export async function HandleData({ detail }: { detail: React.ReactNode }) {
//     const res = await getAllSeasonAction();

//     if (res.errorCode === 0) {
//         let listSort = res.data.sort((a: ISeason, b: ISeason) => {
//             let idFirst = a.id;
//             let idSeacon = b.id;
//             return idFirst - idSeacon;
//         });

//         return (
//             <div className="w-[100%]">
//                 <Statistic
//                     listseason={listSort}
//                     seasonCurrent={listSort[0]?.id}
//                 />
//                 <div className="">{detail}</div>
//             </div>
//         );
//     }

//     return <div>Error fetching data</div>;
// }

// export default async function PageStatistic({
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
import Statistic from "@/components/Statistic/Statistic";
import { ISeason } from "@/utils/interface";
import { Suspense } from "react";

const HandleData = async () => {
    const res = await getAllSeasonAction();

    if (res.errorCode === 0) {
        let listSort = res.data.sort((a: ISeason, b: ISeason) => {
            let idFirst = a.id;
            let idSeacon = b.id;
            return idFirst - idSeacon;
        });

        return {
            listSort: listSort,
            seasonCurrent: listSort[0]?.id,
        };
    }
    throw new Error("Error fetch data");
};

export default async function PageStatistic({
    children,
}: {
    children: React.ReactNode;
}) {
    let res;
    try {
        res = await HandleData();
    } catch (error) {
        console.log(error);
        return <div>Error fetching data</div>;
    }
    return (
        <div>
            <Suspense fallback={<div>Loading.....</div>}>
                <div>
                    <div className="w-[100%]">
                        <Statistic
                            listseason={res.listSort}
                            seasonCurrent={res.seasonCurrent}
                        />
                        <div className="">{children}</div>
                    </div>
                </div>
            </Suspense>
        </div>
    );
}
