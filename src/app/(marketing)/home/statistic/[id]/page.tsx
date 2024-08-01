import { handleGetStatisticAction } from "@/action/statisticAction";
import StatisticDetail from "@/components/Statistic/StatisticDetail";
import { IStatistic } from "@/utils/interface";
import { Suspense, memo } from "react";

const handleTop = (arr: IStatistic[], Case: number) => {
    let arrClone = arr.map((item: IStatistic, index: number) => {
        return {
            ...item,
            rank: index + 1,
        };
    });

    for (let i = 1; i < arrClone.length; i++) {
        if (Case === 1) {
            if (arrClone[i].goal === arrClone[i - 1].goal) {
                arrClone[i].rank = arrClone[i - 1].rank;
            } else {
                arrClone[i].rank = arrClone[i - 1].rank + 1;
            }
        } else if (Case === 2) {
            if (arrClone[i].assist === arrClone[i - 1].assist) {
                arrClone[i].rank = arrClone[i - 1].rank;
            } else {
                arrClone[i].rank = arrClone[i - 1].rank + 1;
            }
        } else if (Case === 3) {
            if (arrClone[i].yellowCard === arrClone[i - 1].yellowCard) {
                arrClone[i].rank = arrClone[i - 1].rank;
            } else {
                arrClone[i].rank = arrClone[i - 1].rank + 1;
            }
        } else if (Case === 4) {
            if (arrClone[i].redCard === arrClone[i - 1].redCard) {
                arrClone[i].rank = arrClone[i - 1].rank;
            } else {
                arrClone[i].rank = arrClone[i - 1].rank + 1;
            }
        }
    }

    return arrClone;
};

interface IParams {
    params: { id: number };
}

export async function HandleData({ id }: { id: number }) {
    const res = await handleGetStatisticAction(id);

    if (res.errorCode === 0) {
        // setListTopGoal(handleTop(arrTopGoal, 1));
        // setListTopAssist(handleTop(arrTopAssist, 2));
        // setListTopYellowCard(handleTop(arrTopYellowCard, 3));
        // setListTopRedCard(handleTop(arrTopRedCard, 4));
        let listTopGoal = handleTop(
            res.data
                .sort((a: IStatistic, b: IStatistic) => {
                    return b.goal - a.goal;
                })
                .slice(0, 5),
            1
        );

        let listTopAssist = handleTop(
            res.data
                .sort((a: IStatistic, b: IStatistic) => {
                    return b.assist - a.assist;
                })
                .slice(0, 5),
            2
        );
        let listTopYellowCard = handleTop(
            res.data
                .sort((a: IStatistic, b: IStatistic) => {
                    return b.yellowCard - a.yellowCard;
                })
                .slice(0, 5),
            3
        );

        let listTopRedCard = handleTop(
            res.data
                .sort((a: IStatistic, b: IStatistic) => {
                    return b.redCard - a.redCard;
                })
                .slice(0, 5),
            4
        );

        return (
            <StatisticDetail
                listTopGoal={listTopGoal}
                listTopAssist={listTopAssist}
                listTopYellowCard={listTopYellowCard}
                listTopRedCard={listTopRedCard}
            />
        );
    }

    return <div>Error fetching data</div>;
}

const PageStatistic = async ({ params: { id } }: IParams) => {
    return (
        <div>
            <Suspense fallback={<div>Loading.....</div>}>
                <div>
                    <HandleData id={id} />
                </div>
            </Suspense>
        </div>
    );
};

export default memo(PageStatistic);
