"use client";

import { useRouter } from "next/router";

export default function PlayerDetail({
    params: { playerId },
}: {
    params: { playerId: number };
}) {
    const router = useRouter();
    const data = router.query;
    console.log(data);
    return <div className="">page player detail</div>;
}
