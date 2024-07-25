import { IGroupRoute } from "@/utils/interface";

export const routes: IGroupRoute = {
    match: {
        label: "match",
        url: "/home/match",
    },
    blog: {
        label: "blog",
        url: "/home/blog",
    },
    rank: {
        label: "rank",
        url: "/home/rating",
    },
    statistic: {
        label: "statistic",
        url: "/home/statistic",
    },
    player: {
        label: "player",
        url: "/home/player",
    },
    booking: {
        label: "booking",
        url: "/home/booking",
    },
    login: {
        label: "login",
        url: "/auth/login",
    },
    register: {
        label: "register",
        url: "/auth/register",
    },
};
