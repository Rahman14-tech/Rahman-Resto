import { configureStore } from "@reduxjs/toolkit";
import UserReduxReducer from "./src/reduxstate/UserRedux"
import ProductRedux from "./src/reduxstate/ProductRedux";
export const store = configureStore({
    reducer:{
        UserRedux: UserReduxReducer,
        ProductRedux: ProductRedux
    },
})