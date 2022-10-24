import React  from 'react';
import { View,StyleSheet,ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BarberLogo from '../assests/barber.svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useContext, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../contexts/UserContext';

import Api from '../Api';


export default function PreLoad() {

  const {dispatch: userDispatch } = useContext(UserContext);  
  const navigation = useNavigation();

  useEffect(()=>{
    const checkToken = async () => {

      const token = await AsyncStorage.getItem('token');
      if(token) {
        let res = await Api.checkToken(token);
        if(res.token){

          await AsyncStorage.setItem('token',res.token);


          userDispatch({
              type:'setAvatar',
              payload:{
                avatar: res.data.avatar
              }

          });

          navigation.reset({
             routes:[{name:'MainTab'}]
          });

        }else{
          navigation.navigate('SingIn');
        }
        
      } else {
        navigation.navigate('SingIn');
     
      }

    }
   
   
    checkToken();



  },[]);
  
 
  return (
  <SafeAreaView style={styles.container}>

    <BarberLogo width="100%" height="160" margintop="30"/>
    <View style={[ styles.horizontal]}>
    <ActivityIndicator size="large" />

  </View>


   </SafeAreaView>

   
  );
}

const styles = StyleSheet.create({
    container:{
        
        backgroundColor: '#63c2d1',
        flex:1,
        justifyContent:'center',
        alignItems: 'center',



    },
    horizontal: {
      flexDirection: "row",
      justifyContent: "space-around",
      padding: 30
    }

})