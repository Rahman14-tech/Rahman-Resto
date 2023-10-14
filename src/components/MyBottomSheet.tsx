import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootType } from "../type/RootType";
import { View, Text } from "react-native";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import BottomSheet, {BottomSheetRefProps} from "../components/BottomSheet";


const MyBottomSheet = ({FnBId}:any) =>{
    const ref = useRef<BottomSheetRefProps>(null);
    const { ProductsLength, Products } = useSelector((store:any) => store.ProductRedux)
    const [SelectedItem,SelectedItemHandler] = useState(null)
    useEffect(() => {
        for(let i = 0 ; i < ProductsLength ; i++){
            if(FnBId === Products[i].id){
                SelectedItemHandler(Products[i])
                break
            }
        }
    },[FnBId])
    return (
        <BottomSheet ref={ref}>
          <View style={{ flex: 1, backgroundColor: 'orange' }} />
          <Text>{FnBId}</Text>
        </BottomSheet>
    )
}

export default MyBottomSheet