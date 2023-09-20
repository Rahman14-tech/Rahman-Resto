import { createSlice } from "@reduxjs/toolkit"

type itemType = {
    Description: string,
    ImageReference: string,
    Name: string,
    Price: number,
    Recommendation: boolean
}
export type ProductType = {
    Products: Array<any>,
    RecommendedProducts: Array<any>,
    ChoosenProduct: string,
    FilterChoosen: string
}
const initialState = {
    Products: [],
    RecommendedProducts: [],
    ChoosenProduct: '',
    FilterChoosen: 'All Menu'
}

const ProductSlice = createSlice({
    name:"ProductRedux",
    initialState,
    reducers:{
        SetProducts: (state,actions) => {
            const {tempFnB} = actions.payload
            console.log("Hello im underwater", tempFnB)
            state.Products = tempFnB
        },
        SetRecommendation:(state) =>{
            const tempRes = state.Products.filter((item: itemType) => item.Recommendation === true)
            state.RecommendedProducts = tempRes
        }
    }
})

export const {SetProducts, SetRecommendation}:any = ProductSlice.actions
export default ProductSlice.reducer