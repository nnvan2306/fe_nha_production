// "use client";

import { handleGetCommentAction } from "@/action/commentAction";
import { getMatchDetailAction } from "@/action/matchAction";
import { getScoredAction } from "@/action/scoredAction";
import PageComment from "@/components/Match/PageComment";
import PageDetailMatch from "@/components/Match/PageDetailMatch";
import { IComment, IListLimit, IMatch, IRes, IScored } from "@/utils/interface";
import { Suspense } from "react";

import { io } from "socket.io-client";
const socket = io("ws://localhost:8081");

interface IParams {
    params: {
        matchId: number;
    };
}

export async function HandleData({ matchId }: { matchId: number }) {
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
        return (
            <div className="w-[100%]">
                <div className="md:w-[80%] w-[100%] ml-[50%] translate-x-[-50%]">
                    <PageDetailMatch
                        infoMatch={resMatch.data}
                        listScored={resScored.data}
                    />
                </div>

                <div className="w-[100%]">
                    <PageComment
                        listComment={resComment.data}
                        matchId={matchId}
                    />
                </div>
            </div>
        );
    }
}

export default async function Page({ params: { matchId } }: IParams) {
    return (
        <div>
            <Suspense fallback={<div>Loading.....</div>}>
                <div>
                    <HandleData matchId={matchId} />
                </div>
            </Suspense>
        </div>
    );
}
