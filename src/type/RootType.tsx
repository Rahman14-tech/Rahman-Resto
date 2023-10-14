export type RootType = {
    IndexTab: undefined,
    Home: undefined,
    HomeScreen: undefined,
    HistoryScreen: {
        UserId: number
    },
    History: undefined,
    Cart: {
        UserId: number
    },
    Profile: {
        UserId: number
    },
    HistoryDetail:{
        TransId:number
    },
    SettingsScreen: {
        UserId:string,
    },
    Settings:undefined,
    Login: undefined,
    Register: undefined,
    AdminScreenFnB: {
        FnBId: string
    },
    AdminScreenFnBAdd: undefined,
    AdminScreenFnBUpdate: undefined,
    AdminScreenFnBDelete: undefined,
    Order: undefined,
    FnBDetails: {
        FnBId: string,
    }
    AdminHome: undefined
    AdminHomeScreen: undefined
}