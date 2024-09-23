import { StyleSheet, Text,Image,View , ScrollView,TextInput, TouchableOpacity} from 'react-native'
import React,{ useContext, useEffect,useState } from 'react'
import { Picker } from '@react-native-picker/picker';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { GlobalContextApi } from '../../contexts/GlobalContext';
import SwitchToggleButton from '../../All/SwitchToggleButton';
import * as FirebaseService from '../../components/Data/FirebaseService';
import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from '@expo/vector-icons/AntDesign';
import UpdateImage from '../../All/UpdateImage';
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
const storage = getStorage();
const UpdateTenant =({navigation,route}) => {
  const {id,
    firstName,
    lastName,
    phoneNumber,
    genderType,
    emailAddress,
    images}=route.params;
    const [error, setError] = useState('');
  const { tenantData, setTenantData,setImages} = useContext(GlobalContextApi);
  const{
    updatedImages, setupdatedImages,
  } = useContext(GlobalContextApi)
  useEffect(()=>{
  setTenantData({
    firstName:firstName || "",
    lastName:lastName || "",
    phoneNumber:phoneNumber || "",
    genderType:genderType || "",
    emailAddress:emailAddress || "",
    images:images || ""
  })
  },[firstName,lastName,phoneNumber,genderType,emailAddress,images]);
  const updateTenant = async (id) => {
    try {
      const resp = await fetch(updatedImages[0]); 
      const blob = await resp.blob();
  
      const storageRef = ref(storage, 'TenantImages/' + Date.now() + ".jpg");
      await uploadBytes(storageRef, blob);
      
      const downloadUrl = await getDownloadURL(storageRef);
      console.log('Image URL:', downloadUrl);
  
      
      await FirebaseService.updateTenant(tenantData, id, [downloadUrl]); 
      setTenantData({
        firstName: "",
        lastName: "",
        genderType: "",
        phoneNumber: "",
        emailAddress: "",
      });
      setupdatedImages([]); 
      navigation.navigate('TenantScreen');
    } catch (error) {
      console.error("Error updating tenant:", error);
      setError('An error occurred. Please try again.');
    }
  };
  const handleDeleteImage = async (imageUrl) => {
    try {
      await FirebaseService.deleteImageFromStorage(imageUrl);
      await FirebaseService.removeImageUrlFromFirestore(id, [imageUrl]);
      setupdatedImages(updatedImages.filter(url => url !== imageUrl));
    } catch (error) {
      console.error('Error handling image deletion:', error);
      setError('An error occurred. Please try again.');
    }
  };
const deleteData=async(id)=>{
  try{
      await FirebaseService.deleteTenant(id)
     navigation.navigate("TenantScreen")
  }catch (error) {
    console.error("Error delete tenant:", error);
    setError('An error occured. Please try again.');
  }
}
  const handleInputChange = (name, value) => {
    setTenantData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <View style={styles.container}>
   
    <ScrollView>
    {error ? <Text style={styles.error}>{error}</Text> : null}
    <View style={styles.imagesContainer}>
    <Image source={{uri:images[0]}} style={styles.images}/>
   <View style={styles.imageButtons} >
   <UpdateImage />
   <TouchableOpacity onPress={()=>{}}>
       <AntDesign name="delete" size={30} style={styles.deleteIcon} />
    </TouchableOpacity>
    </View>
     </View>
    <View style={styles.inputContainer}>
    <View style={styles.inputFiled}>
<Text style={styles.input}>First Name: </Text>
<TextInput style={styles.input}
  placeholder="First Name"
  value={tenantData.firstName}
  onChangeText={(value)=>{handleInputChange('firstName',value)}}
/>
</View>
</View>
<View style={styles.inputContainer}>
<View style={styles.inputFiled}>
<Text style={styles.input}>Last Name: </Text>
<TextInput style={styles.input}
  placeholder="Last Name"
  value={tenantData.lastName}
  onChangeText={(value)=>{handleInputChange('lastName',value)}}
/>
</View>
</View>
 <View style={styles.inputContainer}>
<Text style={styles.input}>Gender: </Text>
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
<View style={styles.inputFiled}>
<Text style={styles.input}>+251 </Text>
<TextInput style={styles.input}
  placeholder="Phone Number"
   keyboardType='numeric'
   maxLength={10} 
   value={tenantData.phoneNumber}
   onChangeText={(value)=>{handleInputChange('phoneNumber',value)}}
/>
</View>
</View>
<View style={styles.inputContainer}>
<View style={styles.inputFiled}>
<Text style={styles.input}>Email: </Text>
<TextInput style={styles.input}
  placeholder="Email"
  value={tenantData.emailAddress}
  onChangeText={(value)=>{handleInputChange('emailAddress',value)}}
/>
</View>
</View>
   <TouchableOpacity style={styles.inputContainer} onPress={()=>{}}>
        <Text style={styles.input}>Address</Text>
        <FontAwesome5 name="address-book" size={24} style={styles.icon} />
      </TouchableOpacity>
      {/* is active or not button  */}
      <View style={styles.inputContainer}>
<Text style={styles.input}>Is Active</Text>
<SwitchToggleButton/>
</View>
 </ScrollView>
      <View style={styles.saveAndDeletbutton}>
         <TouchableOpacity  onPress={()=>updateTenant(id) } style={styles.saveButton} >
          <Text>Save Tenant</Text>
         </TouchableOpacity>
         <TouchableOpacity  onPress={()=>deleteData(id)} style={styles.deleteButton} >
          <Text>Delete Tenant</Text>
         </TouchableOpacity></View>
   </View>
  )
}

export default UpdateTenant;

const styles = StyleSheet.create({
    container:{
    flex:1,
   marginVertical:10,
   marginHorizontal:5
},
picker: {
    width: 150,
  },
 
title:{
  fontSize:15,
  marginBottom:10,
  marginLeft:10
},
imageButtons:{
  flex:1,
  flexDirection:"row",
  justifyContent:"space-between"
},

icon:{
  padding:10,
  paddingVertical:10
},

input:{
    paddingLeft:10,
    fontSize:17,
    paddingVertical:10
     },

saveButton:{
  alignItems:"center",
  padding:10,
  borderRadius:15,
  backgroundColor:"#34ebd8"
 },
inputContainer:{
 borderColor: 'transparent',
 backgroundColor:"#EFEFEF",
 borderWidth:2,
 borderRadius:10,
 marginVertical:5,
 marginHorizontal:5,
 elevation: 3,
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
 deleteButton:{
  alignItems:"center",
padding:10,
borderRadius:15,
backgroundColor:"red"
},
images:{
  flex:1,
  width:"100%",
  height: 200,
},
deleteIcon:{
  position:"absolute",
  color:"red",
  bottom:20,
  right:20
},
addImageIcon:{
  color:"#34ebd8",
  position:"absolute",
  bottom:0,
  left:20
},
saveAndDeletbutton:{
flexDirection:"row",
justifyContent:"space-between",
marginTop:20,
marginHorizontal:20
 },
 inputFiled:{
  flex:1,
   flexDirection:"row",
justifyContent:"space-between",

     },
     error: {
      color: 'red',
      fontSize: 16,
      marginHorizontal: 10,
      marginTop: 10,
    },
})