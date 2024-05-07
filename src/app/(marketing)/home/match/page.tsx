import { getAllSeasonAction } from "@/action/seasonAction";
import { getAllTeamAction } from "@/action/teamAction";
import PageSelectMatch from "@/components/Match/PageSelectMatch";
import { Suspense } from "react";

export async function HandleData() {
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

        return (
            <div className="w-[100%] md:w-[70%] md:ml-[50%] md:translate-x-[-50%]">
                <PageSelectMatch listSeason={listSeason} listTeam={listTeam} />
            </div>
        );
    }
}

export default async function Page() {
    return (
        <div>
            <Suspense fallback={<div>Loading.....</div>}>
                <div>
                    <HandleData />
                </div>
            </Suspense>
        </div>
    );
}
