import { createSlice } from "@reduxjs/toolkit"

type itemType = {
    Description: string,
    ImageReference: string,
    Name: string,
    Price: number,
    Recommendation: boolean,
    Category: string
}
export type ProductType = {
    Products: Array<itemType>,
    ProductsLength: number,
    RecommendedProducts: Array<any>,
    ChoosenProduct: string,
    FilterChoosen: string
}
const initialState: ProductType = {
    Products: [],
    ProductsLength:0,
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
            state.ProductsLength = state.Products.length
        },
        SetRecommendation:(state) =>{
            const tempRes = state.Products.filter((item: itemType) => item.Recommendation === true)
            state.RecommendedProducts = tempRes
        },
        AddProduct: (state,actions) =>{
            const {NewData}: any = actions.payload
            state.Products.push(NewData)
            state.ProductsLength += 1
        },
        ChangeFilter: (state,actions) =>{
            const {Category}: any = actions.payload
            state.FilterChoosen = Category
        }
    }
})

export const {SetProducts, SetRecommendation, AddProduct, ChangeFilter}:any = ProductSlice.actions
export default ProductSlice.reducer