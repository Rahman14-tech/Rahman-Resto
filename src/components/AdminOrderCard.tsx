import {Card} from 'react-native-paper'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
const AdminOrderCard = () =>{
    return (
        <View>
            <TouchableOpacity>
                <Card style={styles.CardStyle}>
                    <Card.Content>
                        <Text>
                            Order ID: ajkjakbgkjaebgjkabsgjkab
                        </Text>
                        <Text>
                            Customer Name: Muhammad Akbar Rahman
                        </Text>
                        <Text>
                            Status: Pending
                        </Text>
                    </Card.Content>
                </Card>
            </TouchableOpacity>
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

export default AdminOrderCard