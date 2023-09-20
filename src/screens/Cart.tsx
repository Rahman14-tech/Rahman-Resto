import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { RootType } from "../type/RootType"
import { View, Text } from "react-native"

type Props = NativeStackScreenProps<RootType, "Cart">

const Cart = ({route,navigation}: Props) =>{
    const {UserId}= route.params
    return(
        <View>
            <Text>{UserId}</Text>
        </View>
    )
}
export default Cart