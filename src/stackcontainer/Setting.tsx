import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { RootType } from "../type/RootType"

const Stack = createNativeStackNavigator<RootType>()
const Settings = () =>{
    return(
        <Stack.Navigator>
            <Stack.Screen name="Settings" component={Settings} initialParams={{UserId: 0}}></Stack.Screen>
        </Stack.Navigator>
    )
}