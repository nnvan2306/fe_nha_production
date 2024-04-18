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

export interface IResBanking {
    data:any,
    error:string,
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
    hostConnerKick:number,
    guestConnerKick:number,
    hostRedCard:number,
    guestRedCard:number,
    hostShoot:number,
    guestShoot:number,
    hostTarget:number,
    guestTarget:number,
    hostYellowCard:number,
    guestYellowCard:number,
    hostBallControl:number,
    Teams:ITeam[],
    Season:{
        id:number,
        name:string,
    }
    
}

export interface IPlayer {
    id:number,
    name:string,
    code:number,
    avatar_url:string,
    nationality:string,
    height:number,
    weight:number,
    birthday:string,
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

export interface IResult{
    result:number 
}
export interface IListResult{
    arr:IResult[]
}

export interface IScored{
    id:number,
    namePlayer:string,
    minuteGoal:number,
    isPenalty:boolean,
    matchId:number,
    teamId:number,
}

export interface IStadium {
    id:number,
    name:string ,
    location:string,
    stadiumImage_url:string,
}

export interface ICalendar{
    id:number,
    hostId:number,
    guestId:number,
    date:string ,
    hour:string,
    stadiumId:number,
    Teams:ITeam[],
    Stadium:IStadium,

}

export interface ITicket {
    id:number,
    name:string,
    price:number,
    totalTicket:number,
    isVip:boolean,
    isBooking:boolean,
    calendarId:number,
    Calendar:ICalendar,
    Teams:ITeam[],
}


export interface ICounterState {
    value: number
}

export interface IAuthSlice {
    isLogin : boolean
}