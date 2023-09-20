import { NativeStackScreenProps, createNativeStackNavigator } from '@react-navigation/native-stack'
import {SafeAreaView, Text, StyleSheet, Platform, StatusBar, TouchableOpacity, View} from 'react-native'
import { RootType } from '../type/RootType'
import HomeScreen from '../screens/HomeScreen'
import Cart from '../screens/Cart'
import LoginScreen from '../screens/LoginScreen'
import { useSelector } from 'react-redux'

const Stack = createNativeStackNavigator<RootType>()

const Home = () =>{
    const {IsAdmin} = useSelector((store : any) => store.UserRedux)
    return (
       <Stack.Navigator initialRouteName="HomeScreen" screenOptions={{headerShown:false}}>
        <Stack.Screen name='HomeScreen' component={HomeScreen}></Stack.Screen>
        <Stack.Screen name='Cart' component={Cart}></Stack.Screen>
       </Stack.Navigator>
    )
}

const homeStyles = StyleSheet.create({
    AndroidSafeArea: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
})
export default Home;