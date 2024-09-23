import { StyleSheet, Text, View,TouchableOpacity,ActivityIndicator,TextInput } from 'react-native'
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import React,{ useContext, useEffect,useState} from 'react'
import Feather from '@expo/vector-icons/Feather';
import  {firestore,auth}  from '../../firebaseConfig';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { ScrollView } from 'react-native-gesture-handler';
import { GlobalContextApi } from '../../contexts/GlobalContext';
import { collection,getDocs,doc} from 'firebase/firestore';
import * as FirebaseService from '../../components/Data/FirebaseService';
const AddRental = ({navigation}) => {
  const [documentList, setDocumentList] = useState([]);
  const [tenantDocumentList, setTenantDocumentList] = useState([]);
const[loading,setLoading]=useState(false)
const{rentalData,setRentalData,showBillingCyclePicker,
  setShowBillingCyclePicker,showLeaseEndPicker,setShowLeaseEndPicker,
  showLeaseStartPicker,setShowLeaseStartPicker} = useContext(GlobalContextApi);

    const fetchData = async () => {
      try {
        const ownerId = auth.currentUser.uid;
        const ownerRef = doc(firestore, 'users', ownerId);
        const querySnapshot = await getDocs(collection(ownerRef, 'assets'));
        const docs = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(), 
        }));
        setDocumentList(docs);
      } catch (error) {
        console.error('Error fetching document IDs: ', error);
      }
      try {
        const ownerId = auth.currentUser.uid;
        const ownerRef = doc(firestore, 'users', ownerId);
        const querySnapshot = await getDocs(collection(ownerRef, 'Tenant'));
        const docs = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(), 
        }));
        setTenantDocumentList(docs);
      } catch (error) {
        console.error('Error fetching document IDs: ', error);
      }
    };
  
    useEffect(() => {
      fetchData();
    }, []);

  const SaveRental=async() => { 

    try {
      setLoading(true);
      await FirebaseService.addRental(rentalData);
     setRentalData({
      selectedAsset:"",
      selectedTenant:"",
      rentalFrequency:"Daily",
      amount:"",
      rentalDescription:"",
      duration:"",
      leaseStart: new Date(),
      leaseEnd: new Date(),
      billingCycle: new Date(),
     });
     navigation.navigate("RentalScreen")
    } catch (error) {
      console.log(error);
    }finally{
      setLoading(false);
    }
  };
  const handleInputChange = (name, value) => {
    console.log(`Updating ${name} to ${value}`); 
    setRentalData(prevState => ({
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
    <ScrollView style={styles.container}>
    <Text style={styles.title}>Rental</Text>

    <View style={styles.inputContainer}>
      <Text style={styles.input}>Asset</Text>
       <Picker 
       style={styles.picker}
       selectedValue={rentalData.selectedAsset}
       onValueChange={(value)=>{handleInputChange('selectedAsset',value)}}>
        <Picker.Item label="Choose" />
            {documentList.map(asset => <Picker.Item key={asset.id} label={asset.assetName} value={asset.id} />)}
          </Picker>
    </View>

    <View style={styles.inputContainer}>
      <Text style={styles.input}>Tenant</Text>
       <Picker 
       style={styles.picker} 
       selectedValue={rentalData.selectedTenant}
       onValueChange={(value)=>{handleInputChange('selectedTenant',value)}}>
        <Picker.Item label="Choose" />
            {tenantDocumentList.map(tenant => <Picker.Item key={tenant.id} label={`${tenant.firstName} ${tenant.lastName}`}  value={tenant.id} />)}
          </Picker>
    </View>

 <View style={styles.inputContainer}>
<Text style={styles.input}>Lease Start Date</Text>
<View style={styles.datePicker}>
<TextInput
          style={[styles.dateinput,styles.input]}
          value={formatDate(rentalData.leaseStart)}
          editable={false}
          pointerEvents="none"
        />
        <TouchableOpacity
          style={styles.dropdownButton}
          onPress={() => setShowLeaseStartPicker(true)}
        >
          <MaterialIcons name="arrow-drop-down" size={24} color="black" />
        </TouchableOpacity>
        {showLeaseStartPicker && (
          <DateTimePicker
            value={rentalData.leaseStart}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              setShowLeaseStartPicker(false);
              handleInputChange("leaseStart", selectedDate || rentalData.leaseStart);
            }}
          />
        )}
        </View>
</View>

   <View style={styles.inputContainer}>
   <Text style={styles.input}>Lease End Date</Text>
<View style={styles.datePicker}>
<TextInput
          style={[styles.dateinput,styles.input]}
          value={formatDate(rentalData.leaseEnd )}
          editable={false}
          pointerEvents="none"
        />
        <TouchableOpacity onPress={() => setShowLeaseEndPicker(true)} style={styles.dropdownButton} >
        <MaterialIcons name="arrow-drop-down" size={24} color="black" />
        </TouchableOpacity>
        {showLeaseEndPicker && (
          <DateTimePicker
            value={rentalData.leaseEnd }
            mode="date"
            display="default"
            onChange={(event, selectedDate ) => {
              setShowLeaseEndPicker(false);
             handleInputChange("leaseEnd",selectedDate || rentalData.leaseEnd );
            }}
          />
        )}
        </View>
</View>
   <View style={styles.inputContainer}>
<Text style={styles.input}>Billing Cycle Date</Text>
<View style={styles.datePicker}>
<TextInput
          style={[styles.dateinput,styles.input]}
          value={formatDate(rentalData.billingCycle)}
          editable={false}
          pointerEvents="none"
        />
      <TouchableOpacity onPress={() => setShowBillingCyclePicker(true)} style={styles.dropdownButton}>
      <MaterialIcons name="arrow-drop-down" size={24} color="black" />
      </TouchableOpacity>
        {showBillingCyclePicker && (
          <DateTimePicker
            value={rentalData.billingCycle}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              setShowBillingCyclePicker(false);
              handleInputChange("billingCycle",selectedDate || rentalData.billingCycle );
            }}
          />
        )}
        </View>
</View>
<View style={styles.inputContainer}>
  <Text style={styles.input}>Duration</Text>
  <View style={styles.duration}>
  <TextInput style={styles.input}
  placeholder='Duration'
  value={rentalData.duration}
  onChangeText={(value)=>{handleInputChange('duration',value)}}
/>
    <Feather name="clock" size={24} color="black" style={styles.icon}/>
  </View>
</View>
<View style={styles.inputContainer}>
<Text style={styles.input}>Rental Frequency</Text>
        <Picker
        style={styles.picker}
        
          onValueChange={(Value) => handleInputChange('rentalFrequency',Value)}
          selectedValue={rentalData.rentalFrequency}
        >
          <Picker.Item label="Daily" value="Daily"/>
          <Picker.Item label="weekly" value="weekly" />
          <Picker.Item label="Monthly" value="Monthly" />
          <Picker.Item label="Quarterly" value="Quarterly" />
          <Picker.Item label="Annually" value="Annually" />
        </Picker>
</View>

<View style={styles.inputContainer}>
<Text style={styles.input}>Amount</Text>
<View style={styles.rightsidewrapper}>
<TextInput style={styles.input}
  placeholder='0.00'
  value={rentalData.amount}
  onChangeText={(value)=>{handleInputChange('amount',value)}}
/>
<MaterialIcons name="currency-exchange" size={15} color="#34ebd8" style={styles.iconCurrency}/>
</View>
</View>
 <TextInput style={[styles.inputContainer,styles.input]}
          placeholder='Remarke'
          multiline
          numberOfLines={4}
          value={rentalData.rentalDescription}
          onChangeText={(value)=>{handleInputChange('rentalDescription',value)}}
        />
         <TouchableOpacity style={[styles.button,styles.saveButton]} onPress={SaveRental}>
          {loading ? (<ActivityIndicator size="large" color="#0000ff" />):(<Text>Save Rental</Text>)}
         </TouchableOpacity>
   </ScrollView>
  )
}

export default AddRental;

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
  borderRadius:15
 }
})