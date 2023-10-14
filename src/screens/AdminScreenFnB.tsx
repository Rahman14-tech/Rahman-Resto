import { SafeAreaView } from "react-native-safe-area-context"
import {StyleSheet, Platform, StatusBar, View, Text} from 'react-native'
import AdminFnBChoice from "../components/AdminFnBChoice"
import Header from "../components/Header"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { RootType } from "../type/RootType"

type Props = NativeStackScreenProps<RootType,"AdminScreenFnB">

const AdminScreenFnB = ({navigation,route }: Props) =>{
    const {FnBId} = route.params
    return (
        <View>
            <Header></Header>
            <AdminFnBChoice></AdminFnBChoice>
        </View>
    )
}

const styles = StyleSheet.create({
    AndroidSafeArea: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
})
export default AdminScreenFnB