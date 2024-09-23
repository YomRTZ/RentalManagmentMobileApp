import React from 'react'
import { useState } from 'react';
import { ScrollView,Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import { registerUser } from '../components/Auth/auth';
const SignUpScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [passwordSecureTextEntry, setPasswordSecureTextEntry] = useState(true);
  const [confirmSecureTextEntry, setConfirmSecureTextEntry] = useState(true);
  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    try {
      await registerUser(email, password);
      setSuccess('Registration successful. Please check your email for verification.');
      navigation.navigate('Login');
    } catch (error) {
      setError(error.message);
    }
  };
  
 
 
  return (
        <ScrollView style={styles.container}>
        <View style={styles.wrapper}>
          <View style={styles.ImageContainer}>
            <Image source={require("../assets/images/logo.jpg")} style={styles.logo}/>
          </View>
          <Text style={{fontSize:25,alignSelf:"center",marginVertical:10,fontWeight:"700", color:"#808080"}}>Rent Management System</Text>
          <View style={styles.inputContainer}>
          <Icon name="envelope" size={20} color="#000"/>
            <TextInput placeholder="Enter email"
                  value={email }
                onChangeText={setEmail}
                style={styles.input}
            />
            </View>
            <View style={styles.inputContainer}>
            <Icon name="unlock" size={25} color="#000"/>
             <TextInput placeholder="Enter passwored"
                  value={password}
                onChangeText={setPassword}
                style={styles.input}
                secureTextEntry={passwordSecureTextEntry} 
            />
           <TouchableOpacity style={styles.rightSideIcons} onPress={()=>{setPasswordSecureTextEntry(!passwordSecureTextEntry)}}>
       <Icon name="eye" size={25} color="#000" />
       </TouchableOpacity>
          </View>
          <View style={styles.inputContainer}>
            <Icon name="lock" size={25} color="#000"/>
             <TextInput placeholder="Confirm passwored"
                  value={confirmPassword}
                onChangeText={setConfirmPassword}
                style={styles.input}
               secureTextEntry={confirmSecureTextEntry} 
            />
           <TouchableOpacity style={styles.rightSideIcons} onPress={()=>{setConfirmSecureTextEntry(!confirmSecureTextEntry)}}>
       <Icon name="eye" size={25} color="#000" />
       </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>

           <TouchableOpacity onPress={handleSignUp}
           style={styles.button}>
    <Text style={styles.buttonText}>Sign Up</Text>
           </TouchableOpacity>
           {error ? <Text>{error}</Text> : null}
    <View style={styles.signup}>
    <Text>Already have an account?</Text>
    {error ? <Text style={{ color: 'red' }}>{error}</Text> : null}
    {success ? <Text style={{ color: 'green' }}>{success}</Text> : null}
           <TouchableOpacity onPress={()=>navigation.navigate('Login')}>
    <Text style={styles.buttonOutLineText}>Login</Text>
           </TouchableOpacity>
    </View>
    </View>
          </View>
        </ScrollView>
      
  )
}

export default SignUpScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
       alignContent:"center",
        marginTop:150,
        marginHorizontal:10,
        marginVertical:20
    },
    inputContainer:{
      padding:10,
      borderColor: 'transparent',
      backgroundColor:"#EFEFEF",
      borderWidth:2,
      borderRadius:10,
      marginVertical:5,
      marginHorizontal:10,
      elevation: 10,
      flexDirection:"row",
     },
     input:{
    paddingLeft:10,
    fontSize:20,
     },
 
     signup:{
         flexDirection:"row",
        justifyContent:"center",
     marginVertical:20,
     },
     rightSideIcons:{
         position:"absolute",
         top:10,
         right:5,
     },
     forgotePasswored:{
        position:"absolute",
        top:15,
        right:20,
     },
     button:{
 backgroundColor:"#A9A9A9",
 marginTop:50,
 padding:10,
 alignItems:"center",
 marginHorizontal:10,
 borderRadius:10
     },
     buttonOutLineText:{
 color:"#34ebd8",
 fontSize:15,
 paddingLeft:5
     },
     buttonText:{
 color:"white",
 fontSize:20,
     },
     ImageContainer:{
 alignItems:"center"
     },
     logo:{
       marginTop:20,
      width:100,
      height:100,
      borderRadius:20
     },
 })