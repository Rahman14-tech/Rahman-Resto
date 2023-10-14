import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { StyleSheet, ScrollView, Text, View, TouchableOpacity, Image} from "react-native"
import { RootType } from "../type/RootType"
import HistoryHead from "../components/HistoryHead"
import { collection, getDocs, query } from "firebase/firestore"
import { FIRESTORE_DB } from "../../FirebaseConfig"
import { useEffect, useState, } from "react"
import { useSelector } from "react-redux"
import { DataTable, Card } from "react-native-paper"
//@ts-ignore 
import loadingImage from "../../assets/loading.gif";

type Props = NativeStackScreenProps<RootType,"HistoryScreen">

const TheOrderQuery = async () =>{
    let tempOrder : Array<any> = []
    const q = query(collection(FIRESTORE_DB,'AdminOrder'))
    const querySnapShotOrder = await getDocs(q)
    querySnapShotOrder.forEach((doc) => {
        tempOrder.push({...doc.data(), id: doc.id})
    })
    return tempOrder
}
const HistoryScreen = ({route,navigation}:Props) =>{
    const {UserId} = route.params
    const { HistoryChoosen } = useSelector((store:any) => store.HistoryRedux)
    const [Orders,OrdersHandler]: any = useState([])
    const [filterOrders, filterOrdersHandler]:any = useState([])
    const [Total,TotalHandler] = useState(0.0)
    const [isLoading,isLoadingHandler] = useState(true)
    const fetchOrder = async () =>{
        const res = await TheOrderQuery()
        const resLen = res.length
        let tempOrder: any = []
        for(let i = 0 ; i < resLen ; i++ ){
            console.log('ANJAY')
            if(res[i].FKUserID === UserId && res[i].Finished){
                tempOrder.push(res[i])
                console.log('ANJASMUB',res[i])
            }   
        }
        OrdersHandler(tempOrder)
        filterOrdersHandler(tempOrder)
        isLoadingHandler(false)
    }
    const filterOrder = () =>{
        const tempFilt = []
        const OrLen = Orders.length
        for(let i = 0 ; i < OrLen ; i++){
            if(Orders[i].Status === HistoryChoosen){
                tempFilt.push(Orders[i])
            }
        }
        filterOrdersHandler(tempFilt)
    }
    useEffect(() => {
        fetchOrder()
    },[])
    useEffect(() => {
        filterOrder()
    },[HistoryChoosen])
    console.log("BOI",filterOrders)
    if(isLoading){
        return <View>
            <Image source={loadingImage} style={{height: 100, width: 100,alignSelf:'center', marginTop: '50%'}} />
        </View>
    }
    return(
        <View>
            <HistoryHead></HistoryHead>
            <ScrollView>
                {
                    filterOrders.map((datum: any) => {
                        <TouchableOpacity>
                            <Card style={styles.CardStyle}>
                                <Card.Content>
                                    <Text>
                                        {datum.id}
                                    </Text>
                                    <Text>
                                        Here's the admin is able to add some new menu.
                                    </Text>
                                </Card.Content>
                            </Card>
                        </TouchableOpacity>
                    })
                }
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    CardStyle:{
        left:10,
        top:7,
        width:'90%',
        margin: 10,
        backgroundColor:'white'
    },
})
export default HistoryScreen