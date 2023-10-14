import { View, FlatList, Text, StyleSheet, TouchableOpacity } from "react-native"
import { useDispatch } from "react-redux"
import { ChangeFilter } from "../reduxstate/ProductRedux"

const MenusShow = [
    {
        id:1,
        name: 'All Menu'
    },
    {
        id:2,
        name: 'Appetizers'
    },{
        id:3,
        name: 'Main Dishes'
    },{
        id:4,
        name: 'Desserts'
    },{
        id:5,
        name: 'Beverages'
    },{
        id:6,
        name: 'Specials'
    },
]

type MenuProps = {
    name:string,
    dispatch:any
}

const Item = ({name,dispatch}:MenuProps) =>(
    <View>
        <TouchableOpacity style={styles.MenuBox} onPress={() => dispatch(ChangeFilter({Category: name}))}>
            <Text style={styles.OurMenuText}>{name}</Text>
        </TouchableOpacity>
    </View>
)

const OurMenuSlide = () =>{
    const dispatch = useDispatch()
    return (<View>
        <FlatList
        showsHorizontalScrollIndicator = {false}
        horizontal
        data={MenusShow}
        renderItem={({item}) => <Item name={item.name} dispatch = {dispatch}/>}
        keyExtractor={item => item.id as any}
        nestedScrollEnabled
        />
    </View>)
}

const styles = StyleSheet.create({
    MenuBox: {
        top: 10,
    },
    OurMenuText:{
        marginTop:20,
        paddingBottom:20,
        paddingHorizontal: 20,
        fontFamily: 'Monseratt-Medium',
        color: '#FCA510',
        textDecorationLine: 'underline',
    }
})
export default OurMenuSlide
