import { getPlayerAction } from "@/action/playerAction";
import PageListPlayer from "@/components/Player/PageListPlayer";
import { Suspense } from "react";

export async function HandleData() {
    let res = await getPlayerAction();
    if (res.errorCode === 0) {
        return <PageListPlayer listPlayer={res.data} />;
    }
}

export default async function PagePlayer() {
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
