import { View, FlatList, Text, StyleSheet, TouchableOpacity } from "react-native"

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
    },
]

type MenuProps = {
    name:string
}
const Item = ({name}:MenuProps) =>(
    <View>
        <TouchableOpacity style={styles.MenuBox}>
            <Text style={styles.OurMenuText}>{name}</Text>
        </TouchableOpacity>
    </View>
)

const OurMenuSlide = () =>{
    return (<View>
        <FlatList
        showsHorizontalScrollIndicator = {false}
        horizontal
        data={MenusShow}
        renderItem={({item}) => <Item name={item.name} />}
        keyExtractor={item => item.id as any}
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
