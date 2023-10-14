import { View,Text, StyleSheet,Platform,StatusBar, SafeAreaView, Alert, TouchableOpacity, KeyboardAvoidingView, Image } from "react-native"
import { useFonts } from "expo-font";
import {useCallback, useEffect, useState} from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { TextInput } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootType } from "../type/RootType";
import { LoginSuccess } from "../reduxstate/UserRedux";
import { SetProducts, SetRecommendation } from "../reduxstate/ProductRedux";
import {
GoogleSignin,
GoogleSigninButton,
statusCodes,
} from '@react-native-google-signin/google-signin';
import { signInWithCredential, signInWithEmailAndPassword } from "firebase/auth";
import { FIREBASE_AUTH, FIRESTORE_DB } from "../../FirebaseConfig";
import { collection, getDoc, getDocs, query, where } from "firebase/firestore";
//@ts-ignore 
import loadingImage from "../../assets/loading.gif"
type Props = NativeStackScreenProps<RootType,"Login">
const TheUserQuery = async () =>{
    let tempUser: Array<any> = []
    const q = query(collection(FIRESTORE_DB,'Users'))
    const querySnapShotUser = await getDocs(q)
    querySnapShotUser.forEach((doc) =>{
        tempUser.push({...doc.data(),id:doc.id})
    })
    return tempUser
}

const TheFnBQuery = async () =>{
    let tempFnB: Array<any> = []
    const q = query(collection(FIRESTORE_DB,'FnBs'))
    const querySnapShotUser = await getDocs(q)
    querySnapShotUser.forEach((doc) =>{
        tempFnB.push({...doc.data(),id:doc.id})
    })
    return tempFnB
}

const LoginScreen = ({navigation}:Props) =>{
  const [tempUser, tempUserHandler] = useState(Array<any>)
  const [tempFnB, tempFnBHandler] = useState(Array<any>)
  const fetchUser = async () =>{
      const res = await TheUserQuery()
      console.log(res)
      tempUserHandler([...res])
  }
  const fetchFnB = async () =>{
    const res = await TheFnBQuery()
    tempFnBHandler([...res])
  }
  const {isLogin} = useSelector((store : any) => store.UserRedux)
  const dispatch = useDispatch()
  const [tempEmail,tempEmailHandler] = useState('')
  const [tempPassword,tempPasswordHandler] = useState('')
  const [loading,loadingHandler] = useState(false)
  const WEB_CLIENT_ID = process.env["EXPO_PUBLIC_WEB_CLIENT_ID"]
  const auth = FIREBASE_AUTH
//   const _signIn = async () => {
//   try {
//     await GoogleSignin.hasPlayServices();
//     const {accessToken, idToken}: any = await GoogleSignin.signIn();
//     dispatch(LoginSuccess())
//   } catch (error : any) {
//       console.log(error)
//   }
// };
  useEffect(() =>{
    if(isLogin){
      navigation.navigate('IndexTab')
    }
      fetchUser()
      fetchFnB()
  //   GoogleSignin.configure({
  //    scopes: ['email','profile'], // what API you want to access on behalf of the user, default is email and profile
  //    webClientId:
  //      WEB_CLIENT_ID, // client ID of type WEB for your server (needed to verify user ID and offline access)
  //    offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
  //  });

  },[isLogin])
    const [isLoaded] = useFonts({
    "Snell-bold": require("../../assets/fonts/SnellBT-Bold.otf"),
    "Snell-regular": require("../../assets/fonts/SnellBT-Regular.otf"),
    "Snell-blackscript": require("../../assets/fonts/SnellRoundhand-BlackScript.otf"),
    "Monseratt-Bold":require("../../assets/fonts/Montserrat-Bold.ttf"),
    "Monseratt-Medium":require("../../assets/fonts/Montserrat-Medium.ttf"),
  });
  const LogIn = async () =>{
    loadingHandler(true)
    let successcheck = false
    try{
      const response = await signInWithEmailAndPassword(auth, tempEmail, tempPassword)
      successcheck = true
    }catch(error : any){
      console.log(error)
      Alert.alert('Warning',String(error.message),[{
        text:'OK',
      }])
      successcheck = false
    }finally{
      loadingHandler(false)
      if(successcheck){
        console.log("ASHIAP")
        const tempUserlogin = tempUser.find((data) =>{
          return data.Email === tempEmail
        } )
        console.log(tempUserlogin)
        dispatch(SetProducts({tempFnB}))
        dispatch(SetRecommendation())
        dispatch(LoginSuccess({FullName: tempUserlogin.FullName, IsAdmin: tempUserlogin.IsAdmin, UserId: tempUserlogin.id}))
        navigation.navigate('IndexTab')
      }
    }
  }
  const LoginManual = () =>{
    if(tempEmail !== '' && tempPassword !== ''){
      LogIn()
    }else{
      Alert.alert('Warning','All form must be filled',[
        {
          text:'OK'
        }
      ])
    }
  }
    const [hidePass, setHidePass] = useState(true);
    const handleOnLayout = useCallback(async () => {
    if (isLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [isLoaded]);
   if (!isLoaded) {
    return null;
  }
  if(loading){
    return <View>
      <Image source={loadingImage} style={{height: 100, width: 100,alignSelf:'center', marginTop: '50%'}} />
    </View>
  }
    return (
        <SafeAreaView onLayout={handleOnLayout} style={styles.AndroidSafeArea}>
          <KeyboardAvoidingView behavior="padding"></KeyboardAvoidingView>
            <Text style={styles.RestoLogo}>
                Rahman Resto
            </Text>
            <TextInput
            value={tempEmail}
            onChangeText={newText => tempEmailHandler(newText)}
            placeholder="Email"
            style={styles.EmailInput}
            activeUnderlineColor="#2B411C"
            underlineColor="#FEBE00"
            ></TextInput>
            <View>
            <TextInput
            value={tempPassword}
            onChangeText={newText => tempPasswordHandler(newText)}
            placeholder="Password"
            activeUnderlineColor="#2B411C"
            underlineColor="#FEBE00"
            style={styles.PasswordInput}
            secureTextEntry={hidePass ? true : false}
            >
            </TextInput>
            </View>
            <TouchableOpacity style={styles.LoginButton} onPress={LoginManual}>
              <Text style={styles.LoginText}>Login</Text>
            </TouchableOpacity>
            <View style={styles.RegisterHere}>
              <Text style={{ fontFamily:"Monseratt-Medium", fontSize:13}}>No account?</Text>
              <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                <Text style={{ fontFamily:"Monseratt-Medium", fontSize:13, color:'#FEBE00'}}>
                {" "}Register Here.
                </Text>
                </TouchableOpacity>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 30, width:'75%', left:50}}>
              <View style={{flex: 1, height: 0.5, backgroundColor: 'black'}} />
              <View>
                <Text style={{width: 40, textAlign: 'center'}}>OR</Text>
              </View>
              <View style={{flex: 1, height: 0.5, backgroundColor: 'black'}} />
            </View>
            {/* <GoogleSigninButton
                style={{width: 192, height: 48}}
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Dark}
              /> */}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    AndroidSafeArea: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
    RestoLogo:{
        textAlign:'center',
        fontFamily: 'Snell-blackscript',
        fontSize: 40,
        marginTop:180
    },
    EmailInput:{
      width:'73%',
      borderColor: "black",
      borderWidth: 0.2,
      borderRadius: 1,
      backgroundColor:'white',
      alignSelf:"center",
      marginTop:40
    },
    PasswordInput:{
      width:'73%',
      borderColor: "black",
      borderWidth: 0.2,
      borderRadius: 1,
      backgroundColor:'white',
      alignSelf:"center",
      marginTop:20
    },
    LoginButton:{
      padding: 10,
      marginTop:35,
      backgroundColor:'white',
      width:'73%',
      alignSelf:"center",
      borderWidth:0.7,
      borderColor:"#FEBE00",
    },
    LoginText:{
      textAlign:"center",
      fontFamily:"Monseratt-Bold",
      color:"#FEBE00"
    },
    RegisterHere:{
      flexDirection:'row',
      left:'13%',
      marginTop:30,
    }
})
export default LoginScreen