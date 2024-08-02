// import { getOnePlayerAction } from "@/action/playerAction";
// import { handleGetStatisticPlayer } from "@/action/statisticAction";
// import PageDetailPlayer from "@/components/Player/PageDetailPlayer";
// import { IStatistic } from "@/utils/interface";
// import { Suspense, memo } from "react";

// interface IParams {
//     params: { playerId: number };
// }

// export async function HandleData({ playerId }: { playerId: number }) {
//     const res = await getOnePlayerAction(playerId);
//     const resStatistic = await handleGetStatisticPlayer(playerId);
//     if (res.errorCode === 0 && resStatistic.errorCode === 0) {
//         let listSort = resStatistic.data.sort(
//             (a: IStatistic, b: IStatistic) => {
//                 let first = a.seasonId;
//                 let end = b.seasonId;
//                 return first - end;
//             }
//         );
//         return (
//             <PageDetailPlayer infoPlayer={res.data} listStatistic={listSort} />
//         );
//     }

//     return <div>Error fetching data</div>;
// }

// const PageDetail = async ({ params: { playerId } }: IParams) => {
//     return (
//         <div>
//             <Suspense fallback={<div>Loading.....</div>}>
//                 <div>
//                     <HandleData playerId={playerId} />
//                 </div>
//             </Suspense>
//         </div>
//     );
// };

// export default memo(PageDetail);

import { getOnePlayerAction } from "@/action/playerAction";
import { handleGetStatisticPlayer } from "@/action/statisticAction";
import PageDetailPlayer from "@/components/Player/PageDetailPlayer";
import { IStatistic } from "@/utils/interface";
import { Suspense, memo } from "react";

interface IParams {
    params: { playerId: number };
}

const HandleData = async (playerId: number) => {
    const res = await getOnePlayerAction(playerId);
    const resStatistic = await handleGetStatisticPlayer(playerId);
    if (res.errorCode === 0 && resStatistic.errorCode === 0) {
        let listSort = resStatistic.data.sort(
            (a: IStatistic, b: IStatistic) => {
                let first = a.seasonId;
                let end = b.seasonId;
                return first - end;
            }
        );
        return {
            data: res.data,
            listSort: listSort,
        };
    }

    throw new Error("Error fetching data");
};

const PageDetail = async ({ params: { playerId } }: IParams) => {
    let res;
    try {
        res = await HandleData(playerId);
    } catch (error) {
        console.log(error);
        return <div className="">Error fetching data</div>;
    }
    return (
        <div>
            <Suspense fallback={<div>Loading.....</div>}>
                <div>
                    <PageDetailPlayer
                        infoPlayer={res.data}
                        listStatistic={res.listSort}
                    />
                </div>
            </Suspense>
        </div>
    );
};

export default memo(PageDetail);
