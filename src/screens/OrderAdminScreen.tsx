import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { RootType } from "../type/RootType"
import { View } from "react-native"
import AdminOrderCard from "../components/AdminOrderCard"
import { SafeAreaView } from "react-native-safe-area-context"
import { StyleSheet } from "react-native"
import { Platform } from "react-native"
import { StatusBar } from "react-native"

type Props = NativeStackScreenProps<RootType,"Order">

const OrderAdminScreen = () =>{
    return (<SafeAreaView style={styles.AndroidSafeArea}>
        <AdminOrderCard></AdminOrderCard>
    </SafeAreaView>)
}

const styles = StyleSheet.create({
    AndroidSafeArea: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
})
export default OrderAdminScreen