import React from 'react';
import { StyleSheet } from 'react-native';
import {NavigationContainer} from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';

import  UserContextProvider from "./src/contexts/UserContext";

import PreLoad from './src/Preload';
import SingIn from './src/SingIn';
import SingUp from './src/SingUp';
import MainTab from './src/stacks/MainTab';

const Stack = createStackNavigator();

export default function App(){
return (
  
  <UserContextProvider>
  <NavigationContainer parent="Theme.AppCompat.Light.NoActionBar">
    <Stack.Navigator initialRouteName='PreLoad'
     screenOptions={{headerShown: false}}>
   


      <Stack.Screen name="Preload"  component={PreLoad}
      screenOptions={{headerShown: false}}/>
      <Stack.Screen name="SingIn"  component={SingIn}
       screenOptions={{headerShown: false}}/>
      <Stack.Screen name="SingUp"  component={SingUp}
       screenOptions={{headerShown: false}}/>

      <Stack.Screen name="MainTab"  component={MainTab}
       screenOptions={{headerShown: false}}/>
      

    </Stack.Navigator>
  </NavigationContainer>
  </UserContextProvider>
)


} 
const styles = StyleSheet.create({
  container:{

    },


    
    })

