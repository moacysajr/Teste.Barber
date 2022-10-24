import React, {useState, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import  AsyncStorage  from '@react-native-async-storage/async-storage';

import { UserContext } from '../contexts/UserContext';
import { 
  Container,
  InputArea,
  CustomButton,
  CustomButtonText,
  SingMenssageButton,
  SingMenssageButtonText,
  SingMenssageButtonTextBold,
 } from './styles';

import SingInput from '../components/SingInput';
import Api from '../Api'; 
import BarberLogo from "../assests/barber.svg";
import EmailIcon from '../assests/email.svg';
import LockIcon from '../assests/lock.svg';

export default function SingIn() {

   const {dispatch: userDispatch } = useContext(UserContext);
const navigation = useNavigation();
   
 const [emailField, setEmailField] = useState('');
 const [passwordlField, setPasswordField] = useState ('');
 
  const handleSingClick = async ()=>{

   
   if(emailField != '' && passwordlField !=''){

         let json = await Api.singIn(emailField,passwordlField);
         if(json.token){

            await AsyncStorage.setItem('token' ,json.token);


            userDispatch({
                type:'setAvatar',
                payload:{
                  avatar: json.data.avatar
                }

            });

            navigation.reset({
               routes:[{name:'MainTab'}]
            });

         }else{
            alert('E-mail e/ou senha errados!');
         }
      }else{
         alert("Preencha os campos")
      }
  }

 const handleMessageButtonClick =()=>{
   navigation.reset({
      routes: [{name:'SingUp'}]
   })
 }
   return (
   
   <Container>
     <BarberLogo width="100%" height="160" > </BarberLogo>

      <InputArea>

      <SingInput IconSvg={EmailIcon}
      placeholder="Digite seu Email"
      value={emailField}
      onChangeText={t=>setEmailField(t)}
      />

      <SingInput IconSvg={LockIcon}
      placeholder="Digite sua Senha"
      value={passwordlField}
      onChangeText={t=>setPasswordField(t)}
      password={true}
      />

 

         <CustomButton onPress={handleSingClick} >
            <CustomButtonText> LOGIN </CustomButtonText>
         </CustomButton>

      </InputArea>

      <SingMenssageButton onPress={handleMessageButtonClick}>
     <SingMenssageButtonText> Ainda não possui uma conta?</SingMenssageButtonText>
     <SingMenssageButtonTextBold> Cadastre-se</SingMenssageButtonTextBold>

      </SingMenssageButton>

   </Container>
  );
}

