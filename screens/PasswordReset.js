import { StyleSheet, Text, View,TextInput,TouchableOpacity } from 'react-native'
import React,{useState} from 'react'
import { GlobalContextApi } from '../contexts/GlobalContext';
import Icon from 'react-native-vector-icons/FontAwesome';
import { resetPassword } from '../components/Auth/auth';
const PasswordReset = ({navigation}) => {
  const{error,setError}=useContext(GlobalContextApi);
  const{success,setSuccess}=useContext(GlobalContextApi);
    const passwordHandle=async()=>{
        try{
          await resetPassword(email)
          setSuccess("Success.");
          navigation.navigate('Login');
        }catch(error){
          let errorMessage;
          if (error.message.includes('network problem')) {
              errorMessage = 'Network problem, please try again.';
          } else if (error.message.includes('invalid credentials')) {
              errorMessage = ' incorrect username/email. Please use the correct username/email.';
          } else {
              errorMessage = error.message; 
          }
          setError(errorMessage);
        }
            }
  return (
    <View style={styles.conatiner}>
    {error ? <Text style={{ color: 'red' }}>{error}</Text> : null}
    {success ? <Text style={{ color: 'green' }}>{success}</Text> : null}
    <Text style={styles.info}>Receive an email to reset your password </Text>
        <View style={styles.inputContainer}>
      <Icon name="envelope" size={20} color="#000" style={styles.icon}/>
        <TextInput placeholder="Enter email"
              value={ email}
            onChangeText={setEmail}
            style={styles.input}
        />
        </View>
        <TouchableOpacity onPress={passwordHandle} style={styles.verifyButton}><Text style={styles.buttonText}>Verify Email</Text></TouchableOpacity>
    </View>
  )
}

export default PasswordReset

const styles = StyleSheet.create({
  conatiner:{
    flex:1,
  marginTop:150
  },
  icon:{
  padding:5,
  paddingVertical:15
},
    inputContainer:{
        padding:5,
        borderColor: 'transparent',
        backgroundColor:"#EFEFEF",
        borderWidth:2,
        borderRadius:10,
        marginVertical:5,
        marginHorizontal:10,
        elevation: 10,
        flexDirection:"row",
       },
       verifyButton:{
        marginHorizontal:30,
        backgroundColor:"#A9A9A9",
        padding:10,
       borderRadius:10,
       marginTop:10
       },
       input:{
    paddingLeft:10,
    fontSize:17,
    paddingVertical:10
     },
     info:{
      alignSelf:"center",
      color:"gray",
      fontSize:15,
      fontWeight:"500",
      marginBottom:10
     },
     buttonText:{
       alignSelf:"center",
       fontSize:15,
       fontWeight:"500",
       color:"white"
     }
})