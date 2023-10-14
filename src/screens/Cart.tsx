import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { RootType } from "../type/RootType"
import { Alert, View, Text, SafeAreaView, StyleSheet, Platform, StatusBar, Image, TouchableOpacity, ScrollView } from "react-native"
import { collection, getDocs, query, updateDoc, doc, addDoc } from "firebase/firestore"
import { FIRESTORE_DB } from "../../FirebaseConfig"
import { useCallback, useEffect, useState, } from "react"
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from "expo-font"
//@ts-ignore 
import loadingImage from "../../assets/loading.gif";
import { DataTable } from "react-native-paper"
type Props = NativeStackScreenProps<RootType, "Cart">

const TheOrderQuery = async () =>{
    let tempOrder : Array<any> = []
    const q = query(collection(FIRESTORE_DB, 'AdminOrder'))
    const querySnapShotOrder = await getDocs(q)
    querySnapShotOrder.forEach((doc) =>{
        tempOrder.push({...doc.data(),id:doc.id})
    })
    return tempOrder
}


const Cart = ({route,navigation}: Props) =>{
    const {UserId}= route.params
    const [Orders,OrdersHandler]: any = useState()
    const [isLoading,isLoadingHandler] = useState(true)
    const [Total,TotalHandler] = useState(0.0)
    const fetchOrder = async () => {
        const res = await TheOrderQuery()
        const resLen = res.length
        let tempOrder: any = {}
        for(let i = 0 ; i < resLen ; i++ ){
            console.log('ANJAY')
            if(res[i].FKUserID === UserId && !res[i].Finished){
                OrdersHandler(res[i])
                tempOrder = res[i]
                console.log('ANJASMUB',res[i])
                break
            }   
        }
        const tempOLen = tempOrder.Order.length
        let tempTotal = 0.0
        for(let i = 0 ; i < tempOLen ; i++){
            tempTotal += parseFloat(tempOrder.Order[i].SubPrice)
        }
        TotalHandler(tempTotal)
        isLoadingHandler(false)

    }
    const FinishOrder = async () =>{
        isLoadingHandler(true)
        let isSuc = true
        try{
            await updateDoc(doc(collection(FIRESTORE_DB,"AdminOrder"),Orders.id),{
                Finished: true
            })
            await addDoc(collection(FIRESTORE_DB,"AdminOrder"),{
                        FKUserID: UserId,
                        Finished: false,
                        Order: [],
                        Status: "Pending"
            })
        }catch(error){
            console.log(error)
            isSuc = false
        }finally{
            if(isSuc){
                isLoadingHandler(false)
                Alert.alert('Success',"Order has been sent",[{
                    text:'Proceed'
                }])
            }
        }
    }
    useEffect(() =>{
        fetchOrder()
    },[])
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
    if(isLoading){
        return <View>
            <Image source={loadingImage} style={{height: 100, width: 100,alignSelf:'center', marginTop: '50%'}} />
        </View>
    }
    return(
        <SafeAreaView style={styles.AndroidSafeArea}>
            <ScrollView style={{flex:0.9}}>
                <DataTable style={{marginTop:10}}>
                 <DataTable.Row style={{flex:1}}>
                    <DataTable.Cell style={{flex:0.2}}>Quan</DataTable.Cell>
                    <DataTable.Cell>
                        <View>
                            <Text style={{fontFamily:'Monseratt-Medium'}}>FnB (Price)</Text>
                        </View>
                    </DataTable.Cell>
                    <DataTable.Cell style={{flex:0.2}}><Text style={{fontFamily:'Monseratt-Medium', marginTop:10, left:10 }}>Sub</Text></DataTable.Cell>
                </DataTable.Row>
                {
                    Orders.Order.map((datum: any) =>{
                        return (
                            <DataTable.Row key={datum.FnBId} style={{flex:1}}>
                                <DataTable.Cell style={{flex:0.2}}>{datum.Quantity}</DataTable.Cell>
                                <DataTable.Cell>
                                    <View>
                                        <Text style={{fontFamily:'Monseratt-Medium'}}>{datum.FnBName} (${datum.FnBPrice}) </Text>
                                        <TouchableOpacity onPress={() => navigation.push('FnBDetails',{FnBId: datum.FnBId})}>
                                            <Text style={{fontFamily:'Monseratt-Medium', marginTop:5, color:'#FEBE00'}}>Edit</Text>
                                        </TouchableOpacity>
                                    </View>
                                </DataTable.Cell>
                                <DataTable.Cell style={{flex:0.2}}><Text style={{fontFamily:'Monseratt-Medium', marginTop:10, left:10 }}> ${datum.SubPrice}</Text></DataTable.Cell>
                            </DataTable.Row>
                        )
                    })
                }
                </DataTable>
            </ScrollView>
            {
                    Orders.Order.length !== 0 ? 
                        <View style={{padding:20, flex:0.1}}>
                            <TouchableOpacity style={styles.CheckoutButton} onPress={() => FinishOrder()}>
                                <Text style={styles.CheckOutText}>Check Out - ${Total}</Text>
                            </TouchableOpacity>
                        </View>
                    : ''
                }
        </SafeAreaView>
        
    )
}

const styles = StyleSheet.create({
    AndroidSafeArea: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    CheckoutButton: {
        padding: 10,
        backgroundColor:'white',
        width:'90%',
        alignSelf:"center",
        borderWidth:0.7,
        borderColor:"#2B411C",
    },
    CheckOutText:{
        textAlign:"center",
        fontFamily:"Monseratt-Bold",
        color:"#2B411C"
    },
})
export default Cart