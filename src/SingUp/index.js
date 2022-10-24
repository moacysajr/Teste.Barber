import React, {useState,useContext} from 'react';
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
import PersonIcon from '../assests/person.svg';
import EmailIcon from '../assests/email.svg';
import LockIcon from '../assests/lock.svg';

export default function SingIn() {
 

   const {dispatch: userDispatch } = useContext(UserContext);  
const navigation = useNavigation();
 

const [nameField, setNameField] = useState('');
 const [emailField, setEmailField] = useState('');
 const [passwordlField, setPasswordField] = useState ('');
 
  const handleSingClick = async()=>{
   if(nameField !='' && emailField != '' && passwordlField != ''){
      let res = await Api.singUp(nameField, emailField, passwordlField);
    
     
      if(res.token) {
      
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
         alert ("Erro: "+res.error);
      }

   }else {
      alert ("Preencha os campos");
   }

  }
 const handleMessageButtonClick =()=>{
   navigation.reset({
      routes: [{name:'SingIn'}]
   })
 }
   return (
   
   <Container>
     <BarberLogo width="100%" height="160" > </BarberLogo>

      <InputArea>

      <SingInput IconSvg={PersonIcon}
      placeholder="Digite seu Nome"
      value={nameField}
      onChangeText={t=>setNameField(t)}
      />

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
            <CustomButtonText> CADASTRAR </CustomButtonText>
         </CustomButton>

      </InputArea>

      <SingMenssageButton onPress={handleMessageButtonClick}>
     <SingMenssageButtonText>Já possui uma conta?</SingMenssageButtonText>
     <SingMenssageButtonTextBold> Faça Login</SingMenssageButtonTextBold>

      </SingMenssageButton>

   </Container>
  );
}

