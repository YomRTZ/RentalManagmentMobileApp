import { ScrollView,Image, StyleSheet, Text, TextInput,ActivityIndicator,TouchableOpacity, View } from 'react-native'
import React, { useState,useContext, useEffect} from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import { signInUser } from '../components/Auth/auth';
import { GlobalContextApi } from '../contexts/GlobalContext';

const LoginScreens = ({navigation}) => {
  const [loading, setLoading] = useState(false);
    const [email, setEmail]=useState('');
    const [password, setPassword]=useState('');
    const{error,setError}=useContext(GlobalContextApi);
    const{success,setSuccess}=useContext(GlobalContextApi);
    
    const [secureTextEntry, setSecureTextEntry] = useState(true);

    const handleSignIn = async () => {
      setLoading(true);
      try {
        await signInUser(email, password);
        navigation.navigate('Home');
      } catch (error) {
        let errorMessage;
        if (error.message.includes('network problem')) {
            errorMessage = 'Network problem, please try again.';
        } else if (error.message.includes('invalid credentials')) {
            errorMessage = 'Either username or password is incorrect. Please use the correct username and password.';
        } else {
            errorMessage = error.message; 
        }
        setError(errorMessage);
      }finally {
        setLoading(false); 
      }
    };
    
  return (
    <ScrollView style={styles.container}>
    <View style={styles.wrapper}>
      <View style={styles.ImageContainer}>
        <Image source={require("../assets/images/logo.jpg")} style={styles.logo}/>
      </View>
      <Text style={{fontSize:20,alignSelf:"center",marginVertical:10,fontWeight:"700", color:"#808080"}}>Rent Management System</Text>
      <View style={styles.inputContainer}>
      <Icon name="envelope" size={20} color="#000"/>
        <TextInput placeholder="Enter email"
              value={ email}
            onChangeText={setEmail}
            style={styles.input}
        />
        </View>
        <View style={styles.inputContainer}>
        <Icon name="lock" size={25} color="#000"/>
         <TextInput placeholder="Enter passwored"
              value={ password}
            onChangeText={setPassword}
            style={styles.input}
           secureTextEntry={secureTextEntry} 
        />
       <TouchableOpacity style={styles.rightSideIcons} onPress={()=>{setSecureTextEntry(!secureTextEntry)}}>
       <Icon name="eye" size={25} color="#000" />
       </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>


      <View style={styles.forgotePasswored}>
       <TouchableOpacity onPress={()=>navigation.navigate("ResetPassword")}>
       <Text>Forgot Password</Text>
       </TouchableOpacity>
      </View>

       <TouchableOpacity onPress={handleSignIn}
       style={styles.button}>
       {loading ?(<ActivityIndicator size="large" color="#0000ff" />):(
        <Text style={styles.buttonText}>LogIn</Text>
       )
       }
       </TouchableOpacity>
       {error ? <Text style={{ color: 'red' }}>{error}</Text> : null}
       {success ? <Text style={{ color: 'green' }}>{success}</Text> : null}
<View style={styles.signup}>
<Text>Don't have an account?</Text>
       <TouchableOpacity onPress={()=>{navigation.navigate("SignUp")}}
    //    style={[styles.button, styles.buttonOutline]}>
    >
<Text style={styles.buttonOutLineText}>SignUp</Text>
       </TouchableOpacity>
</View>
<Text style={{alignSelf:"center", paddingBottom:10}}>------------------------------------OR------------------------------------</Text>
<Text style={{alignSelf:"center", paddingBottom:10}}>Log in With</Text>
    
<TouchableOpacity onPress={()=>{}}
       style={styles.googleButton}>
       <Icon name="google" size={35} color="#000"/>
<Text style={styles.googleButtonText}>Sign in With Google</Text>
       </TouchableOpacity>
    
      </View>
      <View style={{alignItems:"center"}}>
        <Text>
            By creating an account, you are agreeing to our 
        </Text>
        <Text style={{color:"#34ebd8", fontSize:15,fontWeight:"700"}}>
            Terms & Conditions, Privacy Policy!
        </Text>
      </View>
               {/* languge sections start */}
               {/*languge section end*/}
      </View>
    </ScrollView>
  )
}

export default LoginScreens;

const styles = StyleSheet.create({
    container:{
        flex:1,
        marginTop:100,
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
    googleButton:{
        flexDirection:"row",
        padding:5,
        borderColor: 'transparent',
        backgroundColor:"white",
        borderWidth:2,
        borderRadius:20,
        elevation: 10,
        alignItems:"center",
        justifyContent:"center",
        marginHorizontal:10,
        marginVertical:15
    },
    googleButtonText:{
       paddingHorizontal:10,
       fontSize:17,
       color:"#1C1C1C",
       fontWeight:"700"
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
marginTop:100,
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