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

export interface IRaking {
    message:string,
    errorCode:number,
    data:[]
}