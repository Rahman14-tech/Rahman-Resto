import {StyleSheet, View, Text, TouchableOpacity} from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {useFonts} from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { store } from '../../store';
SplashScreen.preventAutoHideAsync();

const Header = () =>{
    const {IsAdmin} = useSelector((store : any) => store.UserRedux)
    return (
    <View style={[styles.HeaderStyle, styles.shadowProp]}>
        <Text style={styles.RahmanRestoIcon}>RahmanResto</Text>
        {
            IsAdmin ? "":         <TouchableOpacity>
          <MaterialCommunityIcons name="silverware-fork-knife" size={27} color='#FEBE00' style={styles.FoodIcon} />
        </TouchableOpacity>
        }
    </View>
    )
}

const styles = StyleSheet.create({
    HeaderStyle:{
        paddingTop: 50,
        paddingBottom: 15,
        flexDirection:'row',
        flexWrap: 'wrap', 
        backgroundColor: 'white',
        justifyContent: 'space-between'
    },
    shadowProp: {
        shadowColor: '#171717',
        shadowOffset: {width: -10, height: 150},
        shadowOpacity: 0.2,
        shadowRadius: 10,
  },
  RahmanRestoIcon: {
        fontFamily: 'Snell-blackscript',
        fontSize: 18,
        marginStart:10,
        color:'#2B411C'
  },
  FoodIcon:{
        paddingEnd: 10
  }
})
export default Header