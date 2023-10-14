import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { RootType } from "../type/RootType"
import SettingsScreen from "../screens/SettingsScreen"
import { useSelector } from "react-redux"
import Cart from "../screens/Cart"

const Stack = createNativeStackNavigator<RootType>()
const Settings = () =>{
    const {UserId} = useSelector((store: any) => store.UserRedux)
    return(
        <Stack.Navigator initialRouteName="SettingsScreen">
            <Stack.Screen name="SettingsScreen" component={SettingsScreen} initialParams={{UserId}}></Stack.Screen>
            <Stack.Screen name='Cart' component={Cart}></Stack.Screen>
        </Stack.Navigator>
    )
}

export default Settings