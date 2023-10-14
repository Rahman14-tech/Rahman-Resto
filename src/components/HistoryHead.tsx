import { View, Text, TouchableOpacity} from 'react-native'
import { useDispatch } from 'react-redux'
import { SetHistory } from '../reduxstate/HistoryRedux'

const HistoryHead = () =>{
    const dispatch = useDispatch()
    return(
        <View style={{padding: 20, marginTop:30, flexDirection: 'row', justifyContent: 'space-around'}}>
            <TouchableOpacity onPress={() => dispatch(SetHistory("On-Progress"))}>
                <Text>On-Progress</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => dispatch(SetHistory("Completed"))}>
                <Text>Completed</Text>
            </TouchableOpacity>
        </View> 
    )
}

export default HistoryHead