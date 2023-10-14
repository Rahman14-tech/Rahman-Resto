import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import { User } from "firebase/auth"
import { collection, getDocs } from "firebase/firestore"
import { FIRESTORE_DB } from "../../FirebaseConfig"
import { async } from "@firebase/util"
import { original } from 'immer'
export type stateType = {
    UserId: string,
    isLogin: boolean,
    FullName: string,
    IsAdmin: boolean,
    IsCartAvail: boolean
}
const initialState: stateType = {
    UserId:'',
    isLogin: false,
    FullName: '',
    IsAdmin: false,
    IsCartAvail: false,
}
const UserReduxSlice = createSlice({
    name:"UserRedux",
    initialState,
    reducers:{
        LoginSuccess:(state, actions) =>{
            const {FullName, IsAdmin,UserId} = actions.payload
            state.FullName = FullName
            state.IsAdmin = IsAdmin
            state.UserId = UserId
            state.isLogin = true
        },
        CartIsAvail: (state) =>{
            state.IsCartAvail = true
        }
    }
})
export const {LoginSuccess, CartIsAvail}:any = UserReduxSlice.actions 
export default UserReduxSlice.reducer