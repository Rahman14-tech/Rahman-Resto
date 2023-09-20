import { NativeStackScreenProps, createNativeStackNavigator } from "@react-navigation/native-stack"
import { RootType } from "../type/RootType"
import AdminHomeScreen from "../screens/AdminHomeScreen"
import AdminScreenFnB from "../screens/AdminScreenFnB";

const Stack = createNativeStackNavigator<RootType>()

const AdminHome = () =>{
    return (
        <Stack.Navigator initialRouteName="AdminHomeScreen" screenOptions={{headerShown:false}}>
            <Stack.Screen name="AdminHomeScreen" component={AdminHomeScreen} />
            <Stack.Screen name="AdminScreenFnB" component={AdminScreenFnB} />
        </Stack.Navigator>
    )
}

export default AdminHome