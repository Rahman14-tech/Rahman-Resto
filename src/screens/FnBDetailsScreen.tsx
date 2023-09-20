import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootType } from "../type/RootType";
import { View } from "react-native";

type Props = NativeStackScreenProps<RootType,"FnBDetails">

const FnBDetailsScreen = ({navigation, route}: Props) =>{
    const {FnBId} = route.params
    return (<View>
        {FnBId}
    </View>)
}