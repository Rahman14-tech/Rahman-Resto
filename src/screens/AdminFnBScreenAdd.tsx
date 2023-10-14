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
import DropDownPicker from "react-native-dropdown-picker";
import { AddProduct } from "../reduxstate/ProductRedux";
import { useDispatch } from "react-redux";
//@ts-ignore 
import loadingImage from "../../assets/loading.gif"

const AdminFnBScreenAdd = () =>{
    const dispatch = useDispatch()
    const [Description, DescriptionHandler] = useState('')
    const [Name, NameHandler] = useState('')
    const [Price, PriceHandler] = useState('')
    const [Recommendation, RecommendationHandler] = useState('Yes')
    const [image, setImage]: any = useState(null);
    const [categoryOpen,categoryOpenHandler] = useState(false)
    const [categoryValue, categoryValueHandler]: any = useState(null);
    const [categoryData, CategoryDataHandler] = useState([
    { label: "Appetizer", value: "Appetizers" },
    { label: "Main Dish", value: "Main Dishes" },
    { label: "Dessert", value: "Desserts" },
    { label: "Beverage", value: "Beverages" },
    { label: "Special", value: "Specials" }
  ]);
  const onCategoryOpen = useCallback(() => {
    categoryOpenHandler(!categoryOpen);
  }, []);
  const [loading,loadingHandler] = useState(false)
  console.log('Bonjour',categoryValue)
    const [loadingCat, setLoading] = useState(false);
    const pickImage = async () => {
    let result: any = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    const {type} = result.assets[0]
    if(type === 'image'){
      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    }else{
      Alert.alert('Warning','The file must be an image',[{
        text:'OK'
      }])
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
      loadingHandler(true)
      if(categoryValue !== null && Name !== '' && Price !== '' && Recommendation !== '' && Description !== ''){
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
      if(categoryValue !== null && TheUploadedURL !== null && Name !== '' && Price !== '' && Recommendation !== '' && Description !== ''){
        let RecommendationTrue = false
        let uploadSuccess = false
        if(Description === 'Yes'){
          RecommendationTrue = true
        }
        const NewData = {
            Description: Description,
            ImageReference: TheUploadedURL,
            Name: Name,
            Price: parseFloat(Price),
            Recommendation:RecommendationTrue,
            Category: categoryValue
          }
        try{
          await addDoc(collection(FIRESTORE_DB,"FnBs"),NewData)
          uploadSuccess = true
        }catch(error) {
          console.log(error)
        }finally{
          loadingHandler(false)
          if(uploadSuccess){
            DescriptionHandler('')
            NameHandler('')
            PriceHandler('')
            setImage(null)
            categoryValueHandler(null)
            dispatch(AddProduct({NewData}))
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
    if(loading){
      return <View>
        <Image source={loadingImage} style={{height: 100, width: 100,alignSelf:'center', marginTop: '50%'}} />
      </View>
    }
    return(
      <SafeAreaView>
        <ScrollView onLayout={handleOnLayout}>
        <Text style={{fontFamily:'Snell-blackscript', fontSize: 35, textAlign:'center', marginTop:10}}>Add Menu</Text>
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
            <DropDownPicker
              style={styles.dropdown}
              open={categoryOpen}
              value={categoryValue} //companyValue
              items={categoryData}
              setOpen={categoryOpenHandler}
              setValue={categoryValueHandler}
              setItems={CategoryDataHandler}
              placeholder="Select Category"
              loading={loadingCat}
              activityIndicatorColor="#5188E3"
              searchable={true}
              searchPlaceholder="Search your category here..."
              onOpen={onCategoryOpen}
              placeholderStyle={styles.placeholderDropStyles}
              onChangeValue={newVal => categoryValueHandler(newVal)}
              zIndex={1000}
              zIndexInverse={3000} 
              listMode="SCROLLVIEW"/>
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
          </View>
          <TouchableOpacity style={styles.LoginButton} onPress={SubmitFnB}>
              <Text style={styles.LoginText}>Submit</Text>
            </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    AndroidSafeArea: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  placeholderDropStyles: {
    color: "grey",
  },
    RestoLogo:{
        textAlign:'center',
        fontFamily: 'Snell-blackscript',
        fontSize: 40,
        marginTop:180
    },
    dropdown: {
    borderColor: "#FEBE00",
    height: 50,
    width:'73%',
    marginTop:20,
    alignSelf:"center",
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
      paddingVertical:10,
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
      marginBottom:30,
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