import { StyleSheet, Text, View , ScrollView,TextInput, TouchableOpacity, Modal,ActivityIndicator} from 'react-native'
import React,{ useContext, useState } from 'react'
import { Picker } from '@react-native-picker/picker';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import ImageUpload from '../../All/ImageUpload';
import AddressForm from '../../All/AddressForm';
import Ionicons from '@expo/vector-icons/Ionicons';
import SwitchToggleButton from '../../All/SwitchToggleButton';
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { GlobalContextApi } from '../../contexts/GlobalContext';
import * as FirebaseService from '../../components/Data/FirebaseService';
const AddAsset = ({navigation}) => {
  const storage = getStorage();
  const[modalVisible, setModalVisible ]=useState(false)
  const [loading, setLoading] = useState(false);
const {assetData,setAssetData,images,isActive,setImages,setIsActive,address,setAddress} = useContext(GlobalContextApi)
const addAsset =async({navigation})=>{
const resp=await fetch(images)
const blob=await resp.blob();
const storageRef=ref(storage,'AssetImage/'+Date.now()+".jpg");
await uploadBytes(storageRef,blob).then((snapshot) => {
  console.log("uploaded a blob or file");
}).then((resp)=>{
  getDownloadURL(storageRef).then(async(downloadUrl)=>{
    console.log(downloadUrl);
    images=downloadUrl;
  })
});
try {
  setLoading(true);
    await FirebaseService.addAsset(assetData,images,isActive,[address]);
    setAssetData({
      assetType:"",
      assetName:"", 
      assetDescription:"",
      productStatuse:"",
      rentalDateType:"",
      rentalDefaultAmount:"",  
    });
    setImages([]);
    setIsActive("");
    setAddress([]);
    navigation.navigate("AssetScreen");
  } catch (error) {
    console.log(error);
  }finally{
    setLoading(false);
  }
}
const handleInputChange = (name, value) => {
  setAssetData(prevState => ({
    ...prevState,
    [name]: value,
  }));
};
  return (
    <ScrollView style={styles.container}>
    <Text style={styles.title}>Details</Text>
    <View style={styles.inputContainer}>
<Text style={styles.input}>Type</Text>
        <Picker 
        style={styles.picker}
          selectedValue={assetData.assetType}
          onValueChange={(value) => handleInputChange('assetType', value)}
        >
          <Picker.Item label="House" value="House" />
          <Picker.Item label="Car" value="Car" />
          <Picker.Item label="Shop" value="Shop" />
          <Picker.Item label="TownHouse" value="TownHouse" />
          <Picker.Item label="Other" value="Other" />
        </Picker>
</View>
<View style={styles.inputContainer}>
<View style={styles.inputFiled}>
<Text style={styles.input}>AssetName:</Text>
<TextInput style={styles.input}
  placeholder="Identifier"
  value={assetData.assetName}
  onChangeText={(value) => handleInputChange('assetName', value)}
/>
</View>
</View>
      <View style={styles.inputContainer}>
        <Text style={styles.input}>Address</Text>
<TouchableOpacity onPress={()=>{navigation.navigate('AddressForm')}}>
<FontAwesome5 name="address-book" size={24} style={styles.icon} />
</TouchableOpacity>
      </View>
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
  value={assetData.rentalDefaultAmount}
  onChangeText={(value) => handleInputChange('rentalDefaultAmount', value)}
/>
<MaterialIcons name="currency-exchange" size={15} color="#34ebd8" style={styles.iconCurrency}/>
</View>
</View>
    <ImageUpload/>
         <TouchableOpacity  onPress={addAsset} style={[styles.button,styles.saveButton]} >
          {  loading ?
            (<ActivityIndicator size="large" color="#0000ff" />):(
              <Text>Save Asset</Text>
            )
          }
         </TouchableOpacity>
   </ScrollView>
  )
}
export default AddAsset
const styles = StyleSheet.create({
    container:{
    flex:1,
   marginVertical:10,
   marginHorizontal:5
},
dateinput:{
marginHorizontal:20
},
picker: {
    height: 50,
    width: 200,
  },
  list: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 100,
    maxHeight: '50%',
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
 },
  closeButton: {
    marginTop: 20,
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
})