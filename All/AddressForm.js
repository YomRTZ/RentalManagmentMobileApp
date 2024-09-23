import React, { useContext} from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity} from 'react-native';
import { GlobalContextApi } from '../contexts/GlobalContext';

const AddressForm = ({navigation}) => {
const{address,setAddress}=useContext(GlobalContextApi);
const handleInputChange = (name, value) => {
  setAddress((prevState) => ({
    ...prevState,
    [name]: value,
  }));
};
const handleSave=()=>{
 navigation.goBack();
}
  const handleDelete = () => {
setAddress({
  country:"",
  state:"",
  city:"",
  addressLine:""
})
  };

  return (
    <View style={styles.container}>
    
        <View style={styles.modal}>
         <View style={styles.inputContainer}>
         <Text style={styles.input}>Country</Text>
         <TextInput
          placeholder='Country'
          value={address.country}
          onChangeText={(value)=>{handleInputChange("country",value)}}
         />
         </View>
          
          <View style={styles.inputContainer}>
          <Text style={styles.input}>State</Text>
          <TextInput
             placeholder='State'
             value={address.state}
             onChangeText={(value)=>{handleInputChange("state",value)}}
          />
          </View>
          
          <View style={styles.inputContainer}>
          <Text style={styles.input}>City</Text>
        <TextInput
          placeholder='City'
             value={address.city}
             onChangeText={(value)=>{handleInputChange("city",value)}}
        />
          </View>
 <View style={[styles.inputContainer, styles.addressFiled]}> 
         <Text style={styles.label}>Address Line</Text>
          <TextInput
            style={styles.addressInput}
            placeholder="Enter address line"
            value={address.addressLine}
            onChangeText={(value)=>{handleInputChange("addressLine",value)}}
          />
         </View>
        
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={handleSave}>
                <Text style={styles.buttonText}>GoBack</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.redButton} onPress={handleDelete}>
                <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
        </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderColor: 'transparent',
 backgroundColor:"#EFEFEF",
 marginTop:20,
  },
  button:{
backgroundColor:"#34ebd8",
borderRadius:10,
paddingHorizontal:20
 },
 redButton:{
    backgroundColor:"red",
    borderRadius:10,
    paddingHorizontal:20
     },
 buttonText:{
color:"white",
fontSize:18,
padding:5,
    fontSize:17,
    paddingVertical:10
 },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  picker: {
    height: 50,
    width: 150,
  },
  addressFiled:{
    flexDirection:"column",
    padding:0
  },
  input:{
    paddingLeft:10,
    fontSize:17,
    paddingVertical:10
     },
  addressInput: {
    border:"none",
    padding:5,
    marginBottom: 15,
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
});

export default AddressForm;
