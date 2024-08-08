// import { getRatingAction } from "@/action/ratingAction";
// import PageDetailRating from "@/components/Rating/PageDetailRating";
// import { handleSortRating } from "@/helpers/handleSort";
// import { IListResult, IMatch, IRating } from "@/utils/interface";
// import { Suspense, memo } from "react";

// interface IParams {
//     params: {
//         id: number;
//     };
// }

// const returnListResult = (prev: IListResult[] | [], arrResult: any): any[] => {
//     return [...prev, { arr: arrResult }];
// };

// export async function HandleData({ id }: { id: number }) {
//     const res = await getRatingAction(id);

//     let listResult: IListResult[] | [] = [];
//     let listRating: IRating[] | [] = [];

//     if (res.errorCode === 0) {
//         if (res.errorCode === 0) {
//             let arrSort = handleSortRating(res.data);

//             arrSort.forEach((item: IRating) => {
//                 //sort lay ra 5 tran gan nhat
//                 item.Team?.Matches.sort((a: IMatch, b: IMatch) => {
//                     let timeA = new Date(a.date).getTime();
//                     let timeB = new Date(b.date).getTime();
//                     return timeB - timeA;
//                 });
//             });

//             arrSort.forEach((item: IRating) => {
//                 // gan gia tri cho result
//                 let arrResult = item.Team?.Matches.map((itemChild: IMatch) => {
//                     let result: number;

//                     if (item.Team?.id === itemChild.hostId) {
//                         if (itemChild.hostGoal === itemChild.guestGoal) {
//                             result = 1;
//                         } else if (itemChild.hostGoal < itemChild.guestId) {
//                             result = 0;
//                         } else {
//                             result = 2;
//                         }
//                     } else {
//                         if (itemChild.guestGoal === itemChild.hostGoal) {
//                             result = 1;
//                         } else if (itemChild.guestGoal < itemChild.hostGoal) {
//                             result = 0;
//                         } else {
//                             result = 2;
//                         }
//                     }

//                     return {
//                         result: result,
//                     };
//                 });

//                 listResult = returnListResult(listResult, arrResult);
//             });
//             listRating = arrSort;
//         }
//         return (
//             <div className="w-[100%]">
//                 <PageDetailRating
//                     listRating={listRating}
//                     listResult={listResult}
//                 />
//             </div>
//         );
//     }

//     return <div>Error fetching data</div>;
// }

// const DetailRating = async ({ params: { id } }: IParams) => {
//     return (
//         <div>
//             <Suspense fallback={<div>Loading.....</div>}>
//                 <div>
//                     <HandleData id={id} />
//                 </div>
//             </Suspense>
//         </div>
//     );
// };

// export default memo(DetailRating);

import { getRatingAction } from "@/action/ratingAction";
import PageDetailRating from "@/components/Rating/PageDetailRating";
import { handleSortRating } from "@/helpers/handleSort";
import { IListResult, IMatch, IRating } from "@/utils/interface";
import { Suspense, memo } from "react";

interface IParams {
    params: {
        id: number;
    };
}

const returnListResult = (prev: IListResult[] | [], arrResult: any): any[] => {
    return [...prev, { arr: arrResult }];
};

const HandleData = async (id: number) => {
    const res = await getRatingAction(id);

    let listResult: IListResult[] | [] = [];
    let listRating: IRating[] | [] = [];

    if (res.errorCode === 0) {
        if (res.errorCode === 0) {
            let arrSort = handleSortRating(res.data);

            arrSort.forEach((item: IRating) => {
                //sort lay ra 5 tran gan nhat
                item.Team?.Matches.sort((a: IMatch, b: IMatch) => {
                    let timeA = new Date(a.date).getTime();
                    let timeB = new Date(b.date).getTime();
                    return timeB - timeA;
                });
            });

            arrSort.forEach((item: IRating) => {
                // gan gia tri cho result
                let arrResult = item.Team?.Matches.map((itemChild: IMatch) => {
                    let result: number;

                    if (item.Team?.id === itemChild.hostId) {
                        if (itemChild.hostGoal === itemChild.guestGoal) {
                            result = 1;
                        } else if (itemChild.hostGoal < itemChild.guestId) {
                            result = 0;
                        } else {
                            result = 2;
                        }
                    } else {
                        if (itemChild.guestGoal === itemChild.hostGoal) {
                            result = 1;
                        } else if (itemChild.guestGoal < itemChild.hostGoal) {
                            result = 0;
                        } else {
                            result = 2;
                        }
                    }

                    return {
                        result: result,
                    };
                });

                listResult = returnListResult(listResult, arrResult);
            });
            listRating = arrSort;
        }
        return {
            listRating: listRating,
            listResult: listResult,
        };
    }

    throw new Error("Error fetch data");
};

const DetailRating = async ({ params: { id } }: IParams) => {
    let res;
    try {
        res = await HandleData(id);
    } catch (error) {
        console.log(error);
        return <div className="">Error fetch data</div>;
    }
    return (
        <div>
            <Suspense fallback={<div>Loading.....</div>}>
                <div>
                    <div className="w-[100%]">
                        <PageDetailRating
                            listRating={res.listRating}
                            listResult={res.listResult}
                        />
                    </div>
                </div>
            </Suspense>
        </div>
    );
};

export default memo(DetailRating);
