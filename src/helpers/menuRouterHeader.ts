import { GroupRoute } from "@/utils/interface";

export const routes : GroupRoute  ={
    match:{
        label:'match',
        url:'/home/detail/match',
    },
    blog:{
        label:'blog',
        url:'/home/detail/blog',
    },
    rank:{
        label:'rank',
        url:'/home/detail/rank',
    },
    statistic:{
        label:'statistic',
        url:'/home/detail/statistic'
    },
    player:{
        label:'player',
        url:'/home/detail/player',
    },
    booking:{
        label:'booking',
        url:'/home/detail/booking',
    }
}