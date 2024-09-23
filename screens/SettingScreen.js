import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import{auth,firestore} from "../firebaseConfig"
import {doc, getDoc} from "firebase/firestore"
import { TouchableOpacity } from 'react-native-gesture-handler'
const SettingScreen = ({navigation}) => {
  const[userDetails,setUserDetails]=useState()
  const ownerEmail = auth.currentUser.email;
  // const fetchUserData=async()=>{
  //   auth.onAuthStateChanged(async(user)=>{
  //     console.log(user);
  //     const docRef=doc(firestore,"users",user.uid)
  //   });
  // };
  // useEffect(()=>{
  //   fetchUserData()
  // },[]);
const LogOut=async()=>{
try{
await auth.signOut();
navigation.navigate('Login');
}catch(error){
console.error("error logging out:", error.message);
}
  }
  return (
   <View style={styles.container}>
   
     <View>
     <View>
     
     <Image source={{uri:"https://img.freepik.com/free-vector/mysterious-mafia-man-smoking-cigarette_52683-34828.jpg"}} style={styles.image}/>
     </View>
    <View style={styles.row}> 
    <Text style={styles.welcome}>Welcome("_")</Text>
    <Text style={styles.email}>{ownerEmail}</Text>
    </View>
      <TouchableOpacity onPress={LogOut}>
        <Text style={styles.button}>LogOut</Text>
      </TouchableOpacity>
       </View>
    
   </View>
    
  )
}
export default SettingScreen
const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:"center",
        marginTop:20,
    },
    image:{
      width:200,
      height:200,
      borderRadius:100,
      overflow:"hidden",
      marginLeft:30
    },
    row:{
      flexDirection:"row",
      marginVertical:10,
    },
    welcome:{
      fontSize:20,
      marginRight:10,
    },
    email:{
      fontSize:20,
      color:"#34ebd8",
      fontWeight:"500"
    },
    button:{
      backgroundColor:"#34ebd8",
      paddingVertical:12,
      paddingHorizontal:50,
      marginTop:10,
      elevation:3,
      borderRadius:20,
    alignSelf:"center",
    }
})