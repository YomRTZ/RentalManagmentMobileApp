import { StyleSheet, Text, View,TouchableOpacity,TextInput, KeyboardAvoidingView,ActivityIndicator} from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker';
import React,{useState} from 'react'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import * as FirebaseService from '../../components/Data/FirebaseService';
const AddPayment = ({navigation,route}) => {
  const {id}=route.params;
  const [paymentData,setPaymentData]=useState({
    amount:"",
    date:new Date(),
    description:""
  });
  const [showDate, setShowDatePicker] = useState(false);
  const[loading,setLoading]=useState(false);
  const savePayment=async() => { 
    try {
      setLoading(true)
      await FirebaseService.addPayment(paymentData,id);
      setPaymentData({
        amount:"",
        date:new Date(),
        description:""
      });
      navigation.navigate("RentalScreen");
    } catch (error) {
      console.log(error);
    }finally{
      setLoading(false)
    }
  };
  const handleInputChange = (name, value) => {
    console.log(`Updating ${name} to ${value}`); 
   setPaymentData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };
 
  const formatDate = (date) => {
    if (!date) return '';
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };
  return (
   <KeyboardAvoidingView style={styles.container}>
    <Text style={styles.title}>Payment Information</Text>
<View style={styles.inputContainer}>
<Text style={styles.input}>Amount</Text>
<View style={styles.rightsidewrapper}>
<TextInput style={styles.input}
  placeholder='0.00'
  value={paymentData.amount}
  onChangeText={(value)=>{handleInputChange('amount',value)}}
/>
<MaterialIcons name="currency-exchange" size={15} color="#34ebd8" style={styles.iconCurrency}/>
</View>
</View>
 <View style={styles.inputContainer}>
<Text style={styles.input}>Date</Text>
<View style={styles.datePicker}>
<TextInput
          style={[styles.dateinput,styles.input]}
          value={formatDate(paymentData.date)}
          editable={false}
          pointerEvents="none"
        />
        <TouchableOpacity
          style={styles.dropdownButton}
          onPress={() => setShowDatePicker(true)}
        >
         <MaterialIcons name="arrow-drop-down" size={24} color="black" />
        </TouchableOpacity>
        {showDate && (
          <DateTimePicker
            value={paymentData.date}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              setShowDatePicker(false);
              handleInputChange("date", selectedDate || paymentData.date);
            }}
          />
        )}
        </View>
</View>
<Text>Description</Text>
 <TextInput style={[styles.inputContainer,styles.input]}
          placeholder='Remarke'
          multiline
          numberOfLines={4}
          value={paymentData.description}
          onChangeText={(value)=>{handleInputChange('description',value)}}
        />

 <TouchableOpacity style={[styles.button,styles.saveButton]} onPress={savePayment}>
          {loading ? (<ActivityIndicator size="large" color="#0000ff" />):(<Text>Save Payment</Text>)}
         </TouchableOpacity>
    </KeyboardAvoidingView>
  )
}

export default AddPayment;

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
    paddingLeft:10,
    fontSize:17,
    paddingVertical:10
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
dropdownButton:{
alignSelf:"center"
 },
 button:{
  backgroundColor:"#34ebd8",
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
  marginTop:25
 }
})