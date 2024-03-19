export interface IGroupRoute {
    match: {
        label:string,
        url:string
    },
    blog: {
        label:string,
        url:string
    },
    rank: {
        label:string,
        url:string
    },
    statistic: {
        label:string,
        url:string
    },
    player: {
        label:string,
        url:string
    },
    booking: {
        label:string,
        url:string
    },
    login:{
        label:string,
        url:string,
    },
    register:{
        label:string,
        url:string,
    }
}


export interface IDataLogin {
    email:string,
    password:string,
}

export interface IDataRegister {
    email:string,
    name:string,
    password:string,
    rePassword:string,
}

export interface IRes<T> {
    message:string,
    errorCode:number,
    data:T,
}

export interface ISeason {
    id:number,
    index:number,
    name:string,
    description:string,
    des_text:string,
}

export interface IList {
    value:number ,
    label:string,
}

export interface IRating{
    id:number,
    win:number,
    lose:number,
    draw:number,
    totalGoal:number,
    totalLostGoal:number,
    seasonId:number,
    teamId:number,
    Team:ITeam |undefined,
    
}

export interface ITeam {
    id:number,
    code:number,
    name:string,
    logo_url:string,
    description:string,
    des_text:string,
    Matches :IMatch[],
}

export interface IMatch {
    id:number,
    title:string,
    meta:string,
    date:string,
    hour:string,
    match_url:string,
    hostGoal:number,
    guestGoal:number,
    hostId:number,
    guestId:number,
    seasonId:number,
    Teams:ITeam[],
}

export interface IPlayer {
    id:number,
    name:string,
    code:number,
    avatar_url:string,
    nationality:string,
    height:number,
    weight:number,
    birthday:Date,
    teamId:number,
    description:string,
    des_text:string,
    location:string,
    Team:ITeam,
}

export interface IDataSearchMatch {
    seasonId:number,
    hostId:number,
    guestId:number,
}


export interface IStatistic{
    id:number,
    goal:number,
    assist:number,
    yellowCard:number,
    redCard:number,
    pA:number,
    seasonName:string,
    seasonId:number,
    playerId:number,
    createdAt:string,
    updatedAt:string,
    PlayerId:number,
    SeasonId:number,
    rank:number,
    Season:{
        index:number,
        name:string,
    },
    Player:{
        name:string ,
        avatar_url:string,
        Team:{
            name:string ,
            logo_url:string,
        }
    }
}
