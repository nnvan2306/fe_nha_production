// import { getPlayerAction } from "@/action/playerAction";
// import PageListPlayer from "@/components/Player/PageListPlayer";
// import { Suspense } from "react";

// export async function HandleData() {
//     let res = await getPlayerAction();
//     if (res.errorCode === 0) {
//         return <PageListPlayer listPlayer={res.data} />;
//     }

//     return <div>Error fetching data</div>;
// }

// export default async function PagePlayer() {
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

import { getPlayerAction } from "@/action/playerAction";
import PageListPlayer from "@/components/Player/PageListPlayer";
import { Suspense } from "react";

const HandleData = async () => {
    let res = await getPlayerAction();
    if (res.errorCode === 0) {
        return res.data;
    }

    throw new Error("Error fetching data");
};

export default async function PagePlayer() {
    let res;

    try {
        res = await HandleData();
    } catch (error) {
        console.log(error);
        return <div className="">Error fetching data</div>;
    }

    return (
        <div>
            <Suspense fallback={<div>Loading.....</div>}>
                <div>
                    <PageListPlayer listPlayer={res} />;
                </div>
            </Suspense>
        </div>
    );
}
