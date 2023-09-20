import { useFonts } from "expo-font"
import { useCallback, useState } from "react"
import { Alert,View,ScrollView,TouchableOpacity, StyleSheet, Platform, StatusBar, KeyboardAvoidingView, Text, Button, Image} from "react-native"
import { TextInput, RadioButton } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context"
import * as SplashScreen from 'expo-splash-screen';
import * as ImagePicker from 'expo-image-picker';
import { getDownloadURL, getStorage, ref, uploadBytes} from 'firebase/storage'
import { FIREBASE_STORAGE, FIRESTORE_DB } from "../../FirebaseConfig";
import { uriToBlob } from "../function/uritoblob";
import { addDoc, collection } from "firebase/firestore";

const AdminFnBScreenAdd = () =>{
    const [Description, DescriptionHandler] = useState('')
    const [Name, NameHandler] = useState('')
    const [Price, PriceHandler] = useState('')
    const [Recommendation, RecommendationHandler] = useState('Yes')
    const [image, setImage]: any = useState(null);
    const pickImage = async () => {
    let result: any = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
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
  const SubmitFnB = async () =>{
      const randString = Math.random().toString(36).substring(2,100);
      const refs = ref(FIREBASE_STORAGE,`/FnB Images/${randString}`)
      console.log('Hallo',refs)
      let tempBlob: any = null
      let TheUploadedURL: any = null
      const res = uriToBlob(image)
      if(Name !== '' && Price !== '' && Recommendation !== '' && Description !== ''){
        try{
            tempBlob = await res
            await uploadBytes(refs,tempBlob)
            TheUploadedURL = await getDownloadURL(refs)
        }catch(err){
          console.log(err)
        }
      }else{
        Alert.alert('Warning', 'All forms must be filled',[{
            text:'OK'
        }])
      }
      if(TheUploadedURL !== null && Name !== '' && Price !== '' && Recommendation !== '' && Description !== ''){
        let RecommendationTrue = false
        let uploadSuccess = false
        if(Description === 'Yes'){
          RecommendationTrue = true
        }
        try{
          await addDoc(collection(FIRESTORE_DB,"FnBs"),{
            Description: Description,
            ImageReference: TheUploadedURL,
            Name: Name,
            Price: parseFloat(Price),
            Recommendation:RecommendationTrue,
          })
          uploadSuccess = true
        }catch(error) {
          console.log(error)
        }finally{
          if(uploadSuccess){
            Alert.alert('Sucess', 'Data sucessfully submitted',[{
                text:'Proceed'
            }])
          }
        }
      }else{
        Alert.alert('Warning', 'All forms must be filled',[{
            text:'OK'
        }])
      }
  }

    return(<ScrollView onLayout={handleOnLayout}>
        <KeyboardAvoidingView behavior="padding"></KeyboardAvoidingView>
        <TextInput
            value={Name}
            onChangeText={newText => NameHandler(newText)}
            placeholder="Name"
            style={styles.EmailInput}
            underlineColor="#FEBE00"
            activeUnderlineColor="#2B411C"
            ></TextInput>
            <TextInput
            value={Description}
            onChangeText={newText => DescriptionHandler(newText)}
            placeholder="Description"
            style={styles.DescInput}
            activeUnderlineColor="#2B411C"
            underlineColor="#FEBE00"
            >
            </TextInput>
              <TextInput
            value={Price}
            onChangeText={newText => PriceHandler(newText)}
            placeholder="Price (eg: 25.99 or 30)"
            style={styles.PasswordInput}
            activeUnderlineColor="#2B411C"
            underlineColor="#FEBE00"
            ></TextInput>
            <Text style={{left: 55, marginTop:20}}>Set as Recommendation?</Text>
            <RadioButton.Group onValueChange={value => RecommendationHandler(value)} value={Recommendation}>
            <View style={{flexDirection:'row', left: 54}}>
                <RadioButton
                  value="Yes"
                  status={ Recommendation === 'Yes' ? 'checked' : 'unchecked' }
                />
                <Text style={{marginTop:8}}>Yes</Text>
            </View>
            <View style={{flexDirection:'row', left: 54}}>
              <RadioButton
                value="No"
                status={ Recommendation === 'No' ? 'checked' : 'unchecked' }
              />
              <Text style={{marginTop:8}}>No</Text>
            </View>
            </RadioButton.Group>
          <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
                  {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
            <Button title="Pick an image" onPress={pickImage} />
            <TouchableOpacity style={styles.LoginButton} onPress={SubmitFnB}>
              <Text style={styles.LoginText}>Submit</Text>
            </TouchableOpacity>
          </View>
    </ScrollView>)
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
      marginTop:90
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
    DescInput:{
      width:'73%',
      height: 150,
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
    },
})

export default AdminFnBScreenAdd;