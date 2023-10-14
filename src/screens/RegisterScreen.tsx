import { View,Text, StyleSheet,Platform,StatusBar, SafeAreaView, Alert, TouchableOpacity, KeyboardAvoidingView, Image } from "react-native"
import { useFonts } from "expo-font";
import {useCallback, useEffect, useState} from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { TextInput } from "react-native-paper";
import { useSelector } from "react-redux";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootType } from "../type/RootType";
import {
GoogleSignUp,
GoogleSignUpButton,
statusCodes,
} from 'react-native-google-SignUp';
import RegisterScreenAnim from "../../assets/RegisterScreenAnim.jpeg"
import { createUserWithEmailAndPassword, SignUpWithEmailAndPassword } from "firebase/auth";
import { FIREBASE_AUTH, FIRESTORE_DB } from "../../FirebaseConfig";
import { addDoc, collection, getDocs, query } from "firebase/firestore";
//@ts-ignore 
import loadingImage from "../../assets/loading.gif"

type Props = NativeStackScreenProps<RootType,"Register">
const TheUserQuery = async () =>{
    let tempUser: Array<any> = []
    const q = query(collection(FIRESTORE_DB,'Users'))
    const querySnapShotUser = await getDocs(q)
    querySnapShotUser.forEach((doc) =>{
        tempUser.push({...doc.data(),id:doc.id})
    })
    return tempUser
}

const RegisterScreen = ({navigation}:Props) =>{
  const [tempUser, tempUserHandler] = useState(Array<any>)
  const [tempEmail,tempEmailHandler] = useState('')
  const [tempPassword,tempPasswordHandler] = useState('')
  const [tempFullName,tempFullNameHandler] = useState('')
  const [loading,loadingHandler] = useState(false)
  const auth = FIREBASE_AUTH
  const fetchUser = async () =>{
      const res = await TheUserQuery()
      tempUserHandler([...res])
  }
  const {isLogin} = useSelector((store : any) => store.UserRedux)
  const [hidePass, hidePassHandler] = useState(true);
      const load = () =>{
    Alert.alert('Success','Successfully Registered',[{
            text:'Proceed',
            onPress:() => navigation.push('Login')
          }])
  }
  const SignUp = async () =>{
    loadingHandler(true)
    try{
      const newDoc = await addDoc(collection(FIRESTORE_DB,"Users"),{
          Email: tempEmail,
          FullName: tempFullName,
          IsAdmin: false,
          IsAuthenticated: false
      })
      const response = await createUserWithEmailAndPassword(auth,tempEmail,tempPassword)
    }catch(error : any){
      console.log(error)
      Alert.alert('Warning',String(error.message),[{
        text:'OK',
      }])
    }finally{
      loadingHandler(false)
      load()
    }
  }
  const RegisterManual = () =>{
    if(tempEmail !== '' && tempFullName !== '' && tempPassword !== ''){
      const tempUserregister = tempUser.find((data) =>{
          return data.Email === tempEmail
        } )
      if(tempUserregister === undefined){
        SignUp()
      }else{
        Alert.alert('Warning','Email has been registered',[{
            text:'Proceed',
            onPress:() => navigation.navigate('Login')
          }])
      }
    }else{
      Alert.alert('Warning','All form must be filled',[
        {
          text:'OK'
        }
      ])
    }
  }
  useEffect(() =>{
    if(isLogin){
      navigation.navigate('IndexTab')
    }
    fetchUser()
  },[isLogin])
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
  if(loading){
    return <View>
      <Image source={loadingImage} style={{height: 100, width: 100,alignSelf:'center', marginTop: '50%'}} />
    </View>
  }
    return (
        <SafeAreaView onLayout={handleOnLayout} style={styles.AndroidSafeArea}>
          <KeyboardAvoidingView behavior="padding"></KeyboardAvoidingView>
            <Text style={styles.RestoLogo}>
                Rahman Resto Register
            </Text>
            <Image source={RegisterScreenAnim} style={{height: 180, width: 300}} />
            <TextInput
            value={tempFullName}
            onChangeText={newText => tempFullNameHandler(newText)}
            placeholder="Full Name"
            activeUnderlineColor="#2B411C"
            underlineColor="#FEBE00"
            style={styles.FullNameInput}>
            </TextInput>
            <TextInput
            value={tempEmail}
            onChangeText={newText => tempEmailHandler(newText)}
            placeholder="Email"
            style={styles.EmailInput}
            activeUnderlineColor="#2B411C"
            underlineColor="#FEBE00"
            ></TextInput>
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
            <TouchableOpacity style={styles.LoginButton} onPress={RegisterManual}>
              <Text style={styles.LoginText}>Register</Text>
            </TouchableOpacity>
            <View style={styles.RegisterHere}>
              <Text style={{ fontFamily:"Monseratt-Medium", fontSize:13}}>Have an account?</Text>
              <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text style={{ fontFamily:"Monseratt-Medium", fontSize:13, color:'#FEBE00'}}>
                {" "}Login Here.
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
        fontSize: 25,
        marginTop:30,
        marginBottom: 20,
    },
    EmailInput:{
      width:'73%',
      borderColor: "black",
      borderWidth: 0.2,
      borderRadius: 1,
      backgroundColor:'white',
      alignSelf:"center",
      marginTop:20
    },
    FullNameInput:{
      width:'73%',
      borderColor: "black",
      borderWidth: 0.2,
      borderRadius: 1,
      backgroundColor:'white',
      alignSelf:"center",
      marginTop:20
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
export default RegisterScreen