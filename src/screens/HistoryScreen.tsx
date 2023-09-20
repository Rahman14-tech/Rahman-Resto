import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { ScrollView, Text } from "react-native"
import { RootType } from "../type/RootType"

type Props = NativeStackScreenProps<RootType,"History">
const HistoryScreen = ({route,navigation}:Props) =>{
    const {UserId} = route.params
    return(
        <ScrollView>
            <Text>{UserId}</Text>
        </ScrollView>
    )
}
export default HistoryScreen