import { handleGetCommentAction } from "@/action/commentAction";
import { getMatchDetailAction } from "@/action/matchAction";
import { getScoredAction } from "@/action/scoredAction";
import PageComment from "@/components/Match/PageComment";
import PageDetailMatch from "@/components/Match/PageDetailMatch";
import { IComment, IListLimit, IMatch, IRes, IScored } from "@/utils/interface";
import { Suspense } from "react";

import { io } from "socket.io-client";
// const socket = io("ws://localhost:8081");
const socket = io("wss://api.nha.vandev.top");

interface IParams {
    params: {
        matchId: number;
    };
}

const HandleData = async (matchId: number) => {
    const resMatch: IRes<IMatch> = await getMatchDetailAction(matchId);
    const resScored: IRes<IScored[]> = await getScoredAction(matchId);
    const resComment: IRes<IListLimit<IComment>> = await handleGetCommentAction(
        {
            page: 1,
            pageSize: 10,
            matchId: matchId,
        }
    );

    if (
        resMatch.errorCode === 0 &&
        resScored.errorCode === 0 &&
        resComment.errorCode === 0
    ) {
        socket.on("revalue", (arg) => {
            console.log("a");
            console.log(arg);
        });
        return {
            resMatch: resMatch.data,
            resScored: resScored.data,
            resComment: resComment.data,
        };
    }
    throw new Error("Error fetch data");
};

export default async function Page({ params: { matchId } }: IParams) {
    let res;

    try {
        res = await HandleData(matchId);
    } catch (error) {
        console.log(error);
        return <div>Error fetch data</div>;
    }
    return (
        <div>
            <Suspense fallback={<div>Loading.....</div>}>
                <div>
                    <div className="w-[100%]">
                        <div className="md:w-[80%] w-[100%] ml-[50%] translate-x-[-50%]">
                            <PageDetailMatch
                                infoMatch={res.resMatch}
                                listScored={res.resScored}
                            />
                        </div>

                        <div className="w-[100%]">
                            <PageComment
                                listComment={res.resComment}
                                matchId={matchId}
                            />
                        </div>
                    </div>
                </div>
            </Suspense>
        </div>
    );
}
