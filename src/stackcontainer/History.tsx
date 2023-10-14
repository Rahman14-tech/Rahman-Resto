import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { RootType } from "../type/RootType"
import { View } from "react-native"
import HistoryScreen from "../screens/HistoryScreen"
import Cart from "../screens/Cart"
import { useSelector } from "react-redux"
const Stack = createNativeStackNavigator<RootType>()
const History = () =>{
    const {UserId} = useSelector((store : any) => store.UserRedux)
    return(<Stack.Navigator initialRouteName="HistoryScreen" screenOptions={{headerShown:false}}>
        <Stack.Screen name="HistoryScreen" component={HistoryScreen} initialParams={{UserId}}></Stack.Screen>
        <Stack.Screen name='Cart' component={Cart}></Stack.Screen>
    </Stack.Navigator>)
}

export default History