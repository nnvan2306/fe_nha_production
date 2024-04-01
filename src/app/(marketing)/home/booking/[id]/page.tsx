"use client";

import { getAllTicket } from "@/action/ticketAction";
import { IListTicketSort, ITicket } from "@/utils/interface";
import { useEffect, useState } from "react";

export default function PageTicket({
    params: { id },
}: {
    params: { id: number };
}) {
    const [listTicket, setListTicket] = useState<ITicket[]>([]);
    const [listTicketSort, setListTicketSort] = useState<
        IListTicketSort<ITicket>[]
    >([]);

    useEffect(() => {
        const fetch = async () => {
            const res = await getAllTicket(id);
            if (res.errorCode === 0) {
                setListTicket(res.data);
            }
        };
        fetch();
    }, [id]);

    return <div></div>;
}
