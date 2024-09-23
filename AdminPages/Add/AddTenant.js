import { StyleSheet, Text, View , ScrollView,TextInput, TouchableOpacity,ActivityIndicator} from 'react-native'
import React,{ useContext, useState } from 'react'
import { Picker } from '@react-native-picker/picker';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import ImageUpload from '../../All/ImageUpload'
import { GlobalContextApi } from '../../contexts/GlobalContext';
import SwitchToggleButton from '../../All/SwitchToggleButton';
import { getStorage,ref, getDownloadURL, uploadBytes } from "firebase/storage";
import * as FirebaseService from '../../components/Data/FirebaseService';
import AddressForm from '../../All/AddressForm';
const AddTenant =({navigation}) => {
  const { tenantData, setTenantData, images, isActive,setIsActive,setImages,address,setAddress } = useContext(GlobalContextApi);
  const storage = getStorage();
  const[loading,setLoading]=useState(false);
  const AddTenantData = async () => {
    try {
     
      const response = await fetch(images);
      const blob = await response.blob();

      const storageRef = ref(storage,"TenantImages/"+Date.now()+".jpg");

      await uploadBytes(storageRef,blob).then((snapshot) => {
        console.log("uploaded a blob or file");
      }).then((resp)=>{
        getDownloadURL(storageRef).then((downloadUrl)=>{
          console.log(downloadUrl);
          setImages(downloadUrl);
        })
      });
      setLoading(true)
      await FirebaseService.addTenant(tenantData, isActive,images,[address]);
      setTenantData({
        firstName:"",
        lastName:"",
        genderType:"",
        phoneNumber:"",
        emailAddress:"",
      });
      setImages([]);
      setIsActive("");
      setAddress([]);
      navigation.navigate('TenantScreen'); 
    } catch (error) {
      console.error("Error adding tenant:", error);
    }finally{
      setLoading(false)
    }
  };

  const handleInputChange = (name, value) => {
    setTenantData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <ScrollView style={styles.container}>
    <Text style={styles.title}>Add Tenant</Text>
    <View style={styles.inputContainer}>
<View style={styles.inputFiled} >
<Text style={styles.input}>First Name:</Text>
<TextInput style={styles.input}
  placeholder="firstName"
  value={tenantData.firstName}
  onChangeText={(value)=>{handleInputChange('firstName',value)}}
/>
</View>
</View>
<View style={styles.inputContainer}>
<View style={styles.inputFiled}>
<Text style={styles.input}>Last Name:</Text>
<TextInput style={styles.input}
  placeholder="lastName"
  value={tenantData.lastName}
  onChangeText={(value)=>{handleInputChange('lastName',value)}}
/>
</View>
</View>
 <View style={styles.inputContainer}>
<Text style={styles.input}>Gender</Text>
        <Picker
        style={styles.picker}
        selectedValue={tenantData.genderType}
        onValueChange={(Value)=>{handleInputChange('genderType',Value)}}
        >
          <Picker.Item label="Male" value="Male"/>
          <Picker.Item label="Female" value="Female" />
        </Picker>
</View>
<View style={styles.inputContainer}>
<View style={styles.inputFiled} >
<Text style={styles.input}>PhoneNumber:</Text>
<TextInput style={styles.input}
  placeholder="PhoneNumber"
   keyboardType='numeric'
   maxLength={10} 
   value={tenantData.phoneNumber}
   onChangeText={(value)=>{handleInputChange('phoneNumber',value)}}
/>
</View>
</View>
<View style={styles.inputContainer}>
<View style={styles.inputFiled} >
<Text style={styles.input}>Email:</Text>
<TextInput style={styles.input}
  placeholder="Email"
  value={tenantData.emailAddress}
  onChangeText={(value)=>{handleInputChange('emailAddress',value)}}
/>
</View>
</View>
   <View style={styles.inputContainer}>
        <Text style={styles.input}>Address</Text>
<TouchableOpacity onPress={()=>{navigation.navigate('AddressForm')}}>
<FontAwesome5 name="address-book" size={24} style={styles.icon} />
</TouchableOpacity>
      </View>
     
      <View style={styles.inputContainer}>
<Text style={styles.input}>Is Active</Text>
<SwitchToggleButton/>
</View>
      <ImageUpload/>
      <TouchableOpacity  onPress={AddTenantData } style={[styles.button,styles.saveButton]} >
          {loading?(<ActivityIndicator size="large" color="#0000ff" />):(<Text>Save Tenant</Text>)}
         </TouchableOpacity>
    </ScrollView>
  )
}

export default AddTenant

const styles = StyleSheet.create({
    container:{
    flex:1,
    // justifyContent:"center",
    // alignItems:"center",
    // borderColor:"red",
    // borderRadius:5,
   marginVertical:10,
   marginHorizontal:5
},
dateinput:{
marginHorizontal:20
},
inputFiled:{
  flexDirection:"row",
    },
picker: {
    height: 50,
    width: 150,
  },
  datePicker:{
flexDirection:"row",
justifyContent:"space-between"
  },
title:{
  fontSize:15,
  marginBottom:10,
  marginLeft:10
},
amount:{
padding:10,
},
rightsidewrapper:{
flexDirection:"row",
},
icon:{
  padding:10,
  paddingVertical:10
},
duration:{
flexDirection:"row",
},
input:{
    paddingLeft:15,
    fontSize:17,
    paddingVertical:10
     },
wrapper:{
// backgroundColor:"red"
},
iconCurrency:{
paddingVertical:20,
paddingHorizontal:10
},
multiline:{
  padding:25,
  borderColor: 'transparent',
  backgroundColor:"#EFEFEF",
  borderWidth:2,
  borderRadius:10,
  marginVertical:5,
  marginHorizontal:5,
  elevation: 10,
},
inputContainer:{
 borderColor: 'transparent',
 backgroundColor:"#EFEFEF",
 borderWidth:2,
 borderRadius:10,
 marginVertical:5,
 marginHorizontal:5,
 elevation: 10,
 flexDirection:"row",
 justifyContent:"space-between",
},
button:{
backgroundColor:"#34ebd8"
 },
 buttonText:{
color:"white",
fontSize:18,
padding:5,
    fontSize:17,
    paddingVertical:10
 },
 saveButton:{
  alignItems:"center",
  padding:10,
  borderRadius:15
 }
})