import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { View, Text,StyleSheet, TouchableOpacity, Platform, StatusBar, ScrollView } from "react-native"
import { RootType } from "../type/RootType"
import { SafeAreaView } from "react-native-safe-area-context"
import MyCarousel from "../components/MyCarousel"
import Header from "../components/Header"
import { useFonts } from "expo-font"
import { useCallback, useState, useEffect } from "react"
import * as SplashScreen from 'expo-splash-screen';
import OurMenuSlide from "../components/OurMenuSlide"
import ListMenuCards from "../components/MenuCard"
import {useSelector} from "react-redux"
import { collection, getDocs } from "firebase/firestore"
import { FIRESTORE_DB } from "../../FirebaseConfig"
type Props = NativeStackScreenProps<RootType,"HomeScreen">
{/* <Text>Hello World </Text>
            <TouchableOpacity onPress={() => {
                navigation.navigate('Cart',{UserId: 3})
            }} style={styles.TestButt}>
            </TouchableOpacity> */}
const HomeScreen = ({navigation} : Props) =>{
    const [isLoaded] = useFonts({
    "Snell-bold": require("../../assets/fonts/SnellBT-Bold.otf"),
    "Snell-regular": require("../../assets/fonts/SnellBT-Regular.otf"),
    "Snell-blackscript": require("../../assets/fonts/SnellRoundhand-BlackScript.otf"),
    "Monseratt-Bold":require("../../assets/fonts/Montserrat-Bold.ttf"),
    "Monseratt-Medium":require("../../assets/fonts/Montserrat-Medium.ttf"),
  });
    const handleOnLayout = useCallback(async () => {
    if (isLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [isLoaded]);
   if (!isLoaded) {
    return null;
  }
    return(
        <ScrollView  onLayout={handleOnLayout}>
            <Header></Header>
            <Text style={styles.ourSpecialText}>Recommendations</Text>
            <View style={styles.carouselHome}>
                <MyCarousel></MyCarousel>
            </View>
            <Text style={styles.ourMenuText}>
                Our Menu
            </Text>
            <OurMenuSlide></OurMenuSlide>
            <ListMenuCards Nav = {navigation}></ListMenuCards>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    AndroidSafeArea: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
    TestButt : {
        padding: 5,
        color: "blue"
    },
    carouselHome: {
        marginTop: 30
    },
    ourSpecialText: {
        fontSize:23,
        fontFamily:'Monseratt-Bold',
        left:15,
        top:10,
    },
    ourMenuText: {
        fontSize:19,
        fontFamily:'Monseratt-Bold',
        left:15,
        top:17,
    },
    MenuCardsStyle :{
        flexDirection: 'row'
    }
})

export default HomeScreen