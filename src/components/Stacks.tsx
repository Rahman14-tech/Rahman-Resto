import { createNativeStackNavigator, NativeStackNavigationProp } from "@react-navigation/native-stack"
import Cart from "../screens/Cart";
import { RootType } from "../type/RootType";
import Home from "../stackcontainer/Home";
const Stack = createNativeStackNavigator<RootType>();

const Stacks = () =>{
    return(
        <Stack.Navigator screenOptions={{headerShown:false}}>
            <Stack.Screen component={Cart} name="Cart" initialParams={{UserId:2}}></Stack.Screen>
        </Stack.Navigator>
    )
}
export default Stacks   