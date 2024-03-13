import { IGroupRoute } from "@/utils/interface";

export const routes : IGroupRoute  ={
    match:{
        label:'match',
        url:'/home/match',
    },
    blog:{
        label:'blog',
        url:'/home/detail/blog',
    },
    rank:{
        label:'rank',
        url:'/home/rating',
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
    },
    login:{
        label:'login',
        url:'/auth/login',
    },
    register:{
        label:'register',
        url:'/auth/register',
    }
}