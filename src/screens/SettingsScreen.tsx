import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { View, Text } from "react-native"
import { RootType } from "../type/RootType"

type Props = NativeStackScreenProps<RootType, "SettingsScreen">
const SettingsScreen = ({route,navigation} : Props) =>{
    const {UserId} = route.params
    return(
        <View>
            <Text>{UserId}</Text>
        </View>
    )
}
export default SettingsScreen