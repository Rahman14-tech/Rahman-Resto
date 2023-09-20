import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { RootType } from "../type/RootType"
import { View } from "react-native"
import HistoryScreen from "../screens/HistoryScreen"
const Stack = createNativeStackNavigator<RootType>()
const History = () =>{
    return(<Stack.Navigator initialRouteName="History">
        <Stack.Screen name="History" component={HistoryScreen} initialParams={{UserId: 0}}></Stack.Screen>
    </Stack.Navigator>)
}

export default History