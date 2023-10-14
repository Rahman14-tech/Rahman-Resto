import { configureStore } from "@reduxjs/toolkit";
import UserReduxReducer from "./src/reduxstate/UserRedux"
import ProductRedux from "./src/reduxstate/ProductRedux";
import HistoryRedux from "./src/reduxstate/HistoryRedux";
export const store = configureStore({
    reducer:{
        UserRedux: UserReduxReducer,
        ProductRedux: ProductRedux,
        HistoryRedux: HistoryRedux,
    },
})