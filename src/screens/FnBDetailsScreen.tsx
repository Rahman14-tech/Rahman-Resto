import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootType } from "../type/RootType";
import { View, Text, Image, StyleSheet, TouchableOpacity,KeyboardAvoidingView, ScrollView, Alert } from "react-native";
import { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import Header from "../components/Header";
import { useFonts } from "expo-font";
import * as SplashScreen from 'expo-splash-screen';
import { Button, TextInput } from "react-native-paper";
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { collection, doc, getDocs, query, updateDoc } from "firebase/firestore";
import { FIRESTORE_DB } from "../../FirebaseConfig";
//@ts-ignore 
import loadingImage from "../../assets/loading.gif";

type Props = NativeStackScreenProps<RootType,"FnBDetails">

const TheOrderQuery = async () =>{
    let tempOrder : Array<any> = []
    const q = query(collection(FIRESTORE_DB, 'AdminOrder'))
    const querySnapShotOrder = await getDocs(q)
    querySnapShotOrder.forEach((doc) =>{
        tempOrder.push({...doc.data(),id:doc.id})
    })
    return tempOrder
}

const FnBDetailsScreen = ({navigation, route}: Props) =>{
    const {FnBId} = route.params
    const { ProductsLength, Products } = useSelector((store:any) => store.ProductRedux)
    const { UserId } = useSelector((store: any) => store.UserRedux)
    const [Amount,AmountHandler] = useState('1')
    const [Note,NoteHandler] = useState('')
    const [TheOrder, TheOrderHandler]: any= useState()
    const [Orders,OrdersHandler]: any = useState()
    const [SubPrice,SubPriceHandler] = useState('1')
    const [isExist, isExistHandler] = useState(false)
    const [isLoading,isLoadingHandler] = useState(true)
    const fetchOrder = async () => {
        const res = await TheOrderQuery()
        const resLen = res.length
        let TempOrders: any = []
        for(let i = 0 ; i < resLen ; i++ ){
            if(res[i].FKUserID === UserId && !res[i].Finished){
                TempOrders = [...res[i].Order]
                OrdersHandler(res[i])
                console.log(res[i])
                break
            }   
        }
        const orLen = TempOrders.length
        console.log(TempOrders)
        for(let i = 0 ; i < orLen ; i++){
            if(TempOrders[i].FnBId === FnBId){
                isExistHandler(true)
                TheOrderHandler(TempOrders[i])
                AmountHandler(String(TempOrders[i].Quantity))
                NoteHandler(String(TempOrders[i].Note))
                SubPriceHandler(String(TempOrders[i].SubPrice))
                break
            }
        }
        isLoadingHandler(false)
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
    if (!isLoaded) {
        return null;
    }
    const IncreaseQuantity = (tempPrice: string) =>{
        const tempQuan = parseInt(Amount)
        const thePrice = parseFloat(tempPrice)
        const tempRes = tempQuan + 1
        const theSubNow = thePrice * tempRes
        SubPriceHandler(String(theSubNow.toFixed(2)))
        AmountHandler(String(tempRes))
    }
    const DecreaseQuantity = (tempPrice: string) =>{
        const tempQuan = parseInt(Amount)
        let tempRes = tempQuan - 1
        const thePrice = parseFloat(tempPrice)
        if(tempRes <= 1){
            tempRes = 1
            AmountHandler(String(1))
        }else{
            AmountHandler(String(tempRes))
        }
        const theSubNow = thePrice * tempRes
        SubPriceHandler(String(theSubNow.toFixed(2)))
    }
    const UpdateOrder =  async () =>{
        let isSuc = false
        try{
            await updateDoc(doc(collection(FIRESTORE_DB,"AdminOrder"),Orders.id),{
                Order: Orders.Order
            })
            isSuc = true
        }catch(error){
            Alert.alert("Warning",String(error),[{
                text:'Proceed',
            }])
            console.log(error)
        }finally{
            if(isSuc){
                Alert.alert("Success","Successfully added to cart",[{
                text:'Proceed',
            }])
            }
        }
    }
    const AddToCart = () =>{
        console.log('no hesitation 2', isExist)
        if(isExist){
            console.log(TheOrder)
            TheOrder.Quantity = parseInt(Amount)
            TheOrder.SubPrice = parseFloat(SubPrice)
            TheOrder.Note = Note
            const OrLen = Orders.Order.length
            for(let i = 0 ; i < OrLen ; i++){
                if(FnBId === Orders.Order[i].FnBId){
                    Orders.Order[i] = TheOrder
                    break
                }
            }
        }else{
            let tempTheOrder = {}
            for(let i = 0 ; i < ProductsLength ; i++){
                if(Products[i].id === FnBId){
                    tempTheOrder = {
                        FnBId,
                        FnBName: Products[i].Name,
                        Note,
                        FnBPrice: Products[i].Price,
                        Quantity: parseInt(Amount),
                        SubPrice: parseFloat(SubPrice)
                    }
                    Orders.Order.push(tempTheOrder)
                    break
                }
            }
        }
        UpdateOrder()
    }
    if(isLoading){
        return <View>
            <Image source={loadingImage} style={{height: 100, width: 100,alignSelf:'center', marginTop: '50%'}} />
        </View>
    }
    console.log(SubPrice,'afk')
    return (<ScrollView onLayout={handleOnLayout}>
        <Header Nav = {navigation}></Header>
        {
            Products.map((Product:any) =>{
                if(Product.id === FnBId){
                    if(SubPrice === '1'){
                        SubPriceHandler(Product.Price)
                    }
                    return (
                        <View key={Product.id}>
                            <KeyboardAvoidingView behavior="padding"></KeyboardAvoidingView>
                            <Image source={{uri: Product.ImageReference}} style={styles.ProdImage} />
                            <View style={{flexDirection:'row'}}>
                                <Text style={{fontFamily: 'Monseratt-Bold', fontSize: 25, marginTop: 10, color:'#2B411C'}}>{Product.Name}</Text>
                                <Text style={{fontFamily: 'Monseratt-Bold', fontSize: 25, marginTop: 10, marginLeft:10, color:'#FEBE00'}}>${Product.Price}</Text>
                            </View>
                            <Text style={{fontFamily: 'Monseratt-Medium', fontSize: 15, marginTop: 5}}>{Product.Description}</Text>
                            <View style={{flexDirection:'row', alignSelf:'center'}}>
                                <TouchableOpacity style={{alignSelf:'center', top: 15,right:15}}onPress={() => DecreaseQuantity(Product.Price)}>
                                    <FontAwesome name="minus" size={30} color="#FEBE00" />
                                </TouchableOpacity>
                                <TextInput
                                value={Amount}
                                style={styles.EmailInput}
                                activeUnderlineColor="#2B411C"
                                underlineColor="#FEBE00"
                                disabled
                                ></TextInput>
                                <TouchableOpacity style={{alignSelf:'center', top: 15, left:15}}onPress={() => IncreaseQuantity(Product.Price)}>
                                    <Entypo name="plus" size={30} color="#FEBE00" />
                                </TouchableOpacity>
                            </View>
                                <TextInput
                                value={Note}
                                style={styles.NoteInput}
                                onChangeText={(newText) => NoteHandler(newText)}
                                activeUnderlineColor="#2B411C"
                                underlineColor="#FEBE00"
                                placeholder="Leave a note (optional)"
                                ></TextInput>
                            <TouchableOpacity style={styles.AddToCartButton} onPress={() => AddToCart()}>
                                <Text style={styles.AddToCartText}>Add to Cart - ${SubPrice}</Text>
                            </TouchableOpacity>
                        </View>
                    )
                }
            })
        }
    </ScrollView>)
}

const styles = StyleSheet.create({
    ProdImage:{
        height: 200,
        width: '100%',
    },
    EmailInput:{
        height:40,
        width:'20%',
        borderColor: "black",
        backgroundColor:'white',
        alignSelf:"center",
        marginTop:30,
        textAlign:'center',
        textAlignVertical:'center'
    },
    AddToCartText:{
      textAlign:"center",
      fontFamily:"Monseratt-Bold",
      color:"#2B411C"
    },
    AddToCartButton:{
      padding: 10,
      marginTop:30,
      backgroundColor:'white',
      width:'90%',
      alignSelf:"center",
      borderWidth:0.7,
      borderColor:"#2B411C",
    },
    NoteInput: {
        borderWidth: 0.2,
        borderRadius: 1,
        height:40,
        width:'80%',
        borderColor: "black",
        backgroundColor:'white',
        alignSelf:"center",
        marginTop:30,
    }
})
export default FnBDetailsScreen