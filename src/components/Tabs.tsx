import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { AntDesign } from '@expo/vector-icons';
import Home from "../stackcontainer/Home";
import { RootType } from "../type/RootType";
import Stacks from "./Stacks";
import History from "../stackcontainer/History";
import { MaterialIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from "react-redux";
import { store } from "../../store";
import { useEffect,useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { FIRESTORE_DB } from "../../FirebaseConfig";
import AdminScreenFnB from "../screens/AdminScreenFnB";
import OrderAdminScreen from "../screens/OrderAdminScreen";
import AdminHomeScreen from "../screens/AdminHomeScreen";
import AdminHome from "../stackcontainer/AdminHome";
import AdminFnBScreenAdd from "../screens/AdminFnBScreenAdd";
import { Ionicons } from '@expo/vector-icons';
import Settings from "../stackcontainer/Setting";
const Tab = createBottomTabNavigator<RootType>()

const Tabs = () =>{
    const dispatch = useDispatch()
    const {isLogin,IsAdmin,} = useSelector((store : any) => store.UserRedux)
    if(IsAdmin){
        return(
            <Tab.Navigator screenOptions={{headerShown:false}} initialRouteName="AdminHome">
                <Tab.Screen name="AdminHome" component={AdminHome} options={{tabBarIcon: () => (<MaterialIcons name="admin-panel-settings" size={24} color="black" />)}}></Tab.Screen>
                <Tab.Screen name="Order" component={OrderAdminScreen} options={{tabBarIcon: () =>(<MaterialIcons name="border-color" size={24} color="black" />)}}></Tab.Screen>
                <Tab.Screen name="AdminScreenFnBAdd" component={AdminFnBScreenAdd} options={{tabBarIcon: () => (<MaterialIcons name="playlist-add" size={24} color="black" />)}}></Tab.Screen>
                <Tab.Screen name="Settings" component={Settings} options={{tabBarIcon: () => (<Ionicons name="settings-outline" size={24} color="black" />)}}></Tab.Screen>
            </Tab.Navigator>
        )
    }
    return(
        <Tab.Navigator screenOptions={{headerShown:false}} initialRouteName="Home">
            <Tab.Screen name="Home" component={Home} options={{tabBarIcon: () => (<AntDesign name="home" size={24} color="black" />)}}></Tab.Screen>
            <Tab.Screen name="History" component={History} options={{tabBarIcon: () =>(<MaterialIcons name="border-color" size={24} color="black" />)}}></Tab.Screen>
            <Tab.Screen name="Settings" component={Settings} options={{tabBarIcon: () => (<Ionicons name="settings-outline" size={24} color="black" />)}}></Tab.Screen>
        </Tab.Navigator>
    )
}

export default Tabs