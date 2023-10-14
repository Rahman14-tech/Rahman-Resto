import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    HistoryChoosen: 'Pending'
}

const HistorySlice = createSlice({
    name:"HistorySlice",
    initialState,
    reducers:{
        SetHistory: (state,actions) =>{
            const {histchoose} = actions.payload
            state.HistoryChoosen = histchoose
        }
    }
})

export const { SetHistory }: any = HistorySlice.actions
export default HistorySlice.reducer