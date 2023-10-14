import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Tabs from './src/components/Tabs';
import Stacks from './src/components/Stacks';
import { useEffect, useState } from 'react';
import { Provider, useDispatch } from "react-redux"
import { store } from "./store"
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootType } from './src/type/RootType';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';

const Stack = createNativeStackNavigator<RootType>()

export default function App() {
  return (
    <Provider store={store}>
       <NavigationContainer >
        <Stack.Navigator initialRouteName="Login" screenOptions={{headerShown:false}}>
          <Stack.Screen name='IndexTab' component={Tabs}></Stack.Screen>
          <Stack.Screen name='Login' component={LoginScreen}></Stack.Screen>
          <Stack.Screen name='Register' component={RegisterScreen}></Stack.Screen>
        </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
