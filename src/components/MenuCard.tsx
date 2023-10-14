import { StyleSheet, View, Text, FlatList, TouchableOpacity } from "react-native"
import { Card } from "react-native-paper"
import { useSelector } from "react-redux"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { RootType } from "../type/RootType"
import { useEffect, useState } from 'react'

type MenusProps = {
    FnBId: string,
    name:string,
    price:number,
    Image:any,
    IsAdmin: boolean,
    Nav: any
}


const MenuCard = ({FnBId,name,price,Image, IsAdmin, Nav}: MenusProps) =>{
    return (<View>
        <TouchableOpacity key={FnBId} onPress={IsAdmin ?() => Nav.navigate("AdminScreenFnB",{FnBId}) :() => Nav.navigate("FnBDetails",{FnBId})}>
            <Card style={styles.CardStyle}>
                <Card.Cover source={{uri:Image}} style={styles.CardImageStyle}></Card.Cover>
                <Card.Content>
                    <Text style={styles.nameText}>{name}</Text>
                    <Text style={styles.priceText}>${price}</Text>
                </Card.Content>
            </Card>
        </TouchableOpacity>
    </View>)
}

const ListMenuCards = ({Nav}: any) =>{
    const {Products,FilterChoosen,ProductsLength} = useSelector((store: any) => store.ProductRedux)
    const {IsAdmin} = useSelector((store: any) => store.UserRedux)
    const [FinalProducts,FinalProductsHandler]:any = useState([])
    useEffect(() =>{
        if(FilterChoosen === 'All Menu'){
            FinalProductsHandler(Products)
        }else{
            let tempProduct: Array<any> = []
            for(let i = 0 ; i < ProductsLength ; i++){
                if(Products[i].Category === FilterChoosen){
                    console.log(FilterChoosen)
                    tempProduct.push(Products[i])
                }
            }
            if(tempProduct.length !== 0){
                FinalProductsHandler(tempProduct)
            }
        }
    },[FilterChoosen])
    if(IsAdmin){
        type Props = NativeStackScreenProps<RootType,'HomeScreen'>
    }else{
        type Props = NativeStackScreenProps<RootType,'AdminHomeScreen'>
    }
    console.log(FinalProducts)
    return (<View>
        <FlatList
        numColumns={2}
        showsVerticalScrollIndicator={false}
        data={FinalProducts}
        renderItem={({item}) => <MenuCard FnBId={item.id} name={item.Name} price={item.Price} Image = {item.ImageReference} IsAdmin = {IsAdmin} Nav = {Nav}/> }
        keyExtractor={item => item.id as any}
        nestedScrollEnabled
        />
    </View>)
}

const styles = StyleSheet.create({
    CardStyle:{
        left:10,
        top:7,
        width:170,
        margin: 10,
    },
    CardImageStyle: {
        height: 160,
        width: 170
    },
    nameText: {
        marginTop: 5,
        fontFamily: 'Monseratt-Bold',
        color: '#2B411C'
    },
    priceText:{
        marginTop: 2,
        fontFamily: 'Monseratt-Bold',
        color: 'black'
    }
})
export default ListMenuCards