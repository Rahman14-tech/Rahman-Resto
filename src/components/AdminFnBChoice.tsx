import {Card} from 'react-native-paper'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
const AdminFnBChoice = () =>{
    return (
        <View>
            <TouchableOpacity>
                <Card style={styles.CardStyle}>
                    <Card.Content>
                        <Text>
                            Add Menu
                        </Text>
                        <Text>
                            Here's the admin is able to add some new menu.
                        </Text>
                    </Card.Content>
                </Card>
            </TouchableOpacity>
            <TouchableOpacity>
                <Card style={styles.CardStyle}>
                <Card.Content>
                    <Text>
                        Update Menu
                    </Text>
                    <Text>
                        Here's the admin is able to update a menu. The admin able to update the menu like prices, title, or even the image.
                    </Text>
                </Card.Content>
            </Card>
            </TouchableOpacity>
            <TouchableOpacity>
            <Card style={styles.CardStyle}>
                <Card.Content>
                    <Text>
                        Delete Menu
                    </Text>
                    <Text>
                        Here's the admin is able to delete a menu.
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

export default AdminFnBChoice