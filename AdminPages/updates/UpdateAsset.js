import { StyleSheet, Text, View , ScrollView,TextInput, TouchableOpacity,Image, Modal} from 'react-native'
import React,{ useContext, useEffect, useState } from 'react'
import { Picker } from '@react-native-picker/picker';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import AddressForm from '../../All/AddressForm';
import Ionicons from '@expo/vector-icons/Ionicons';
import SwitchToggleButton from '../../All/SwitchToggleButton';
import { GlobalContextApi } from '../../contexts/GlobalContext';
import * as FirebaseService from "../../components/Data/FirebaseService";
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
import UpdateImage from '../../All/UpdateImage';
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
const storage = getStorage();
const UpdateAsset = ({navigation,route}) => {
  const {id,assetType, assetName, assetDescription,productStatuse, rentalDateType, rentalDefaultAmount,images}=route.params;
  const[modalVisible, setModalVisible]=useState(false)
const {assetData,setAssetData} = useContext(GlobalContextApi)
const[error,setError]=useState();
const{
  updatedImages, setupdatedImages,
} = useContext(GlobalContextApi)
useEffect(()=>{
  setAssetData({
    assetType:assetType || "",
     assetName:assetName  || "", 
     assetDescription:assetDescription  || "",
     productStatuse:productStatuse  || "", 
     rentalDateType:rentalDateType  || "", 
     rentalDefaultAmount:rentalDefaultAmount  || "",
     images:images  || ""
  })
  },[assetType,assetName,assetDescription,productStatuse,rentalDateType,rentalDefaultAmount,images])
const updateAsset =async(id)=>{
try {
  const resp = await fetch(updatedImages[0]); 
      const blob = await resp.blob();
      const storageRef = ref(storage, 'AssetImage/' + Date.now() + ".jpg");
      await uploadBytes(storageRef, blob);
      const downloadUrl = await getDownloadURL(storageRef);
      console.log('Image URL:', downloadUrl);
    await FirebaseService.updateAsset(id,assetData,[downloadUrl]);
    setAssetData({
      assetType:"",
      assetName:"",
      assetDescription:"",
      productStatuse:"",
      rentalDateType:"",
      rentalDefaultAmount:""
    })
    setupdatedImages([]);
    navigation.navigate("AssetScreen");
  } catch (error) {
    console.log("error update image", error);
  }
}
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
      await FirebaseService.deleteAsset(id)
      setAssetData({
        firstName:"",
        lastName:"",
        genderType:"",
        phoneNumber:"",
        emailAddress:"",
      });
     navigation.navigate("AssetScreen")
  }catch (error) {
    console.log("Error delete asset:", error);
  }
}
const handleInputChange = (name, value) => {
  setAssetData(prevState => ({
    ...prevState,
    [name]: value,
  }));
};
  return (
    <View style={styles.container}>
     <ScrollView>
   {error ?<Text style={styles.error}>{error}</Text>:null}
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
<Text style={styles.input}>Type</Text>
        <Picker
        style={styles.picker}
          selectedValue={assetData.assetType}
          onValueChange={(value) => handleInputChange('assetType', value)}
        >
          <Picker.Item label="House" value="House"/>
          <Picker.Item label="Car" value="Car" />
          <Picker.Item label="Shop" value="Shop" />
          <Picker.Item label="TownHouse" value="TownHouse" />
          <Picker.Item label="Other" value="Other" />
        </Picker>
</View>
<View style={styles.inputContainer}>
<View style={styles.inputFiled}>
<Text style={styles.input}>Asset Name</Text>
<TextInput 
  placeholder="Identifier"
  value={assetData.assetName}
  onChangeText={(value) => handleInputChange('assetName', value)}
/>
</View>
</View>
      <TouchableOpacity style={styles.inputContainer} onPress={() => setModalVisible(true)} >
        <Text style={styles.input}>Address</Text>
        <FontAwesome5 name="address-book" size={24} style={styles.icon} />
      </TouchableOpacity>
<Modal
animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
>
 <AddressForm />
 <TouchableOpacity onPress={() =>  setModalVisible(false)}>
 <Ionicons name="return-up-back" size={30} color="black" />
      </TouchableOpacity>
</Modal>
     <View style={styles.inputContainer}>
<Text style={styles.input}>Is Active</Text>
<SwitchToggleButton
/>
</View>
   <View>
      <Text>Description</Text>
 <TextInput style={[styles.inputContainer,styles.input]}
          label="Description"
          placeholder='Make,Model,Plate number,etc'
          multiline
          value={assetData.assetDescription}
          onChangeText={(value) => handleInputChange('assetDescription', value)}
        />
  </View>
          <View style={styles.inputContainer}>
<Text style={styles.input}>Status</Text>
        <Picker
        style={styles.picker}
        selectedValue={assetData.productStatuse}
        onValueChange={(value) => handleInputChange('productStatuse', value)}
        >
          <Picker.Item label="Available" value="Available"/>
          <Picker.Item label="Under Service" value="Under Service" />
          <Picker.Item label="Unavailable" value="Unavailable" />
          <Picker.Item label="Sold Out" value="Sold Out" />
        </Picker>
</View>
  <View style={styles.inputContainer}>
<Text style={styles.input}>Rental</Text>
        <Picker
        style={styles.picker}
        selectedValue={assetData.rentalDateType}
        onValueChange={(value) => handleInputChange('rentalDateType', value)}
        >
         <Picker.Item label="Daily" value="Daily"/>
          <Picker.Item label="weekly" value="weekly" />
          <Picker.Item label="Monthly" value="Monthly" />
          <Picker.Item label="Quarterly" value="Quarterly" />
          <Picker.Item label="Annually" value="Annually" />
        </Picker>
</View>
<View style={styles.inputContainer}>
<Text style={styles.input}>Default Rent</Text>
<View style={styles.rightsidewrapper}>
<TextInput style={styles.input}
  placeholder='0.00'
  value={rentalDefaultAmount}
  onChangeText={(value) => handleInputChange('rentalDefaultAmount', value)}
/>
<MaterialIcons name="currency-exchange" size={15} color="#34ebd8" style={styles.iconCurrency}/>
</View>
</View>
   </ScrollView>
   <View style={styles.saveAndDeletbutton}>
         <TouchableOpacity  onPress={()=>updateAsset(id)} style={styles.saveButton} >
          <Text>Save Asset</Text>
         </TouchableOpacity>
         <TouchableOpacity  onPress={()=>deleteData(id)} style={styles.deleteButton} >
          <Text>Delete Asset</Text>
         </TouchableOpacity></View>
         </View>
  )
}
export default UpdateAsset
const styles = StyleSheet.create({
    container:{
    flex:1,
   marginVertical:10,
   marginHorizontal:5
},
dateinput:{
  flex:1,
marginHorizontal:20
},
picker: {
    height: 50,
    width: 200,
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
    paddingLeft:10,
    fontSize:17,
    paddingVertical:10,
    paddingRight:20
     },
     inputFiled:{
      
   flexDirection:"row",
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
 backgroundColor:"white",
 borderWidth:2,
 borderRadius:10,
 marginVertical:5,
 marginHorizontal:5,
 elevation: 10,
 flexDirection:"row",
 justifyContent:"space-between",
},
saveAndDeletbutton:{
flexDirection:"row",
justifyContent:"space-between",
marginTop:20,
marginHorizontal:20

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
  borderRadius:15,
  backgroundColor:"#34ebd8"
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
  imageButtons:{
    // backgroundColor:"red"

  }
})