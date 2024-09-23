import { StyleSheet, Text, View,TouchableOpacity,Button,TextInput } from 'react-native'
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import React,{useEffect,useState} from 'react'
import  {firestore,auth}  from '../firebaseConfig';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { ScrollView } from 'react-native-gesture-handler';
import { collection,getDocs,doc} from 'firebase/firestore';
import * as FirebaseService from '../components/Data/FirebaseService';
import AntDesign from '@expo/vector-icons/AntDesign';
import { printToFileAsync } from 'expo-print';
import { shareAsync } from 'expo-sharing';
const ReportScreen = () => {
  const [documentList, setDocumentList] = useState([]);
  const [tenantDocumentList, setTenantDocumentList] = useState([]);
  const [reportDisplay,setReportDisplay]=useState()
  const [reportData,setReportData]=useState({
    selectedAsset:"",
    selectedTenant:"",
    reportType:"",
    reportStartDate:new Date(),
    reportEndDate:new Date(),
  });
  const [showStartDate, setShowStartPicker] = useState(false);
  const [showEndDate, setShowEndPicker] = useState(false);
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
// to generate the pdf
const html= `
<html>
  <body>
    <h1> ${reportData.reportType}</h1>
    <h1> ${reportData.selectedAsset}</h1>
    <h1> ${reportData.selectedTenant}</h1>
     <h1> ${reportData.reportStartDate}</h1>
      <h1> ${reportData.reportEndDate}</h1>
  </body>
</html>
`;
const generatePdf=async()=>{
  const file= await printToFileAsync({
    html:html,
    base64:false
  });
  const reportDisplay = file.uri;
  console.log(reportDisplay);
  setReportDisplay(reportDisplay);
}
  const saveReport=async() => { 
    try {
      await FirebaseService.addReport(reportData);
      // setReportData({
      //   selectedAsset: "",
      //   selectedTenant: "",
      //   reportType: "",
      //   reportStartDate: new Date(),
      //   reportEndDate: new Date(),
      // });
      generatePdf();
    } catch (error) {
      console.log(error);
    }
  };
  const handleInputChange = (name, value) => {
    console.log(`Updating ${name} to ${value}`); 
   setReportData(prevState => ({
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
   <View style={styles.container}>
      <ScrollView>
    <Text style={styles.title}>Report Type</Text>
{/* type */}
<View style={styles.inputContainer}>
<Text style={styles.input}>Generate Report</Text>
        <Picker
        style={styles.picker}
        selectedValue={reportData.reportType}
          onValueChange={(value)=>handleInputChange('reportType',value)}
        >
          <Picker.Item label="Rent Receipt" value="Rent Receipt"/>
          <Picker.Item label="Tenant Report" value="Tenant Report" />
          <Picker.Item label="Asset Report" value="Asset Report" />
          <Picker.Item label="Expense Report" value="Expense Report" />
          <Picker.Item label="Profit & Loss Report" value="Profit & Loss Report" />
        </Picker>
</View>
{/* asset picker */}
    <View style={styles.inputContainer}>
      <Text style={styles.input}>Tenant</Text>
       <Picker 
       style={styles.picker}
       selectedValue={reportData.selectedTenant}
       onValueChange={(value)=>{handleInputChange('selectedTenant',value)}}>
        <Picker.Item label="Choose" value='' />
            {tenantDocumentList.map(tenant => <Picker.Item key={tenant.id} label={tenant.firstName} value={tenant.id} />)}
          </Picker>
    </View>
{/* tenant picker */}
    <View style={styles.inputContainer}>
      <Text style={styles.input}>Asset</Text>
       <Picker 
       style={styles.picker} 
       selectedValue={reportData.selectedAsset}
       onValueChange={(value)=>{handleInputChange('selectedAsset',value)}}>
        <Picker.Item label="Choose" value=''/>
            {documentList.map(asset => <Picker.Item key={asset.id} label={asset.assetName} value={asset.id} />)}
          </Picker>
    </View>
 <View style={styles.inputContainer}>
<Text style={styles.input}>Start Date</Text>
<View style={styles.datePicker}>
<TextInput
          style={[styles.dateinput,styles.input]}
          value={formatDate(reportData.reportStartDate)}
          editable={false}
          pointerEvents="none"
        />
        <TouchableOpacity
          style={styles.dropdownButton}
          onPress={() => setShowStartPicker(true)}
        >
         <MaterialIcons name="arrow-drop-down" size={24} color="black" />
        </TouchableOpacity>
        {showStartDate && (
          <DateTimePicker
            value={reportData.reportStartDate}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              setShowStartPicker(false);
              handleInputChange("reportStartDate", selectedDate || reportData.reportStartDate);
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
          value={formatDate(reportData.reportEndDate )}
          editable={false}
          pointerEvents="none"
        />
        <TouchableOpacity onPress={() => setShowEndPicker(true)} style={styles.dropdownButton} >
        <MaterialIcons name="arrow-drop-down" size={24} color="black" />
        </TouchableOpacity>
        {showEndDate && (
          <DateTimePicker
            value={reportData.reportEndDate}
            mode="date"
            display="default"
            onChange={(event, selectedDate ) => {
              setShowEndPicker(false);
             handleInputChange("reportEndDate",selectedDate || reportData.reportEndDate );
            }}
          />
        )}
        </View>
        
</View>
 <View>
  <Text style={styles.anouncement}>This rent receipt acknowledges the payment but does not implies verification of the actual receipt of funds.</Text>
 </View>
 <Text style={styles.lastGenerated}>Last  Generated  Rent Receipt</Text>
 <View style={styles.viewReport}>
  <TextInput 
        value={reportDisplay}
        multiline
        placeholder='View Report'
        editable={false}
 />
  <TouchableOpacity onPress={()=>shareAsync(reportDisplay)} style={styles.viewReportstyle}><AntDesign name="sharealt" size={24} color="black" /></TouchableOpacity>
 </View>
</ScrollView>
<TouchableOpacity onPress={saveReport} style={styles.screenButton}>
        <Text style={styles.buttonText}>Generate</Text>
    </TouchableOpacity>
    </View>
  )
}

export default ReportScreen;

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
    paddingVertical:10,
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
screenButton:{
  backgroundColor:"#34ebd8",
  position:"absolute",
  bottom:50,
  paddingVertical:12,
  paddingHorizontal:50,
  elevation:3,
  borderRadius:20,
alignSelf:"center",
},
buttonText:{
  fontSize:17,
  fontWeight:"500"
},
saveButton:{
  alignItems:"center",
  padding:10,
  borderRadius:15
 },
 anouncement:{
  marginTop:25,
  marginHorizontal:15,
  fontSize:15,
  color:"gray"
 },
 lastGenerated:{
  marginTop:10,
  alignSelf:"center",
  fontSize:15,
  color:"gray"
 },
 viewReport:{
borderColor: 'transparent',
 backgroundColor:"white",
 borderWidth:2,
 borderRadius:10,
 marginVertical:5,
 marginHorizontal:5,
 elevation:3,
 marginTop:20,
 padding:15,
 flexDirection:"row",
 justifyContent:"space-between"
 },
 viewReportstyle:{
position:"absolute",
alignSelf:"center",
right:15,
 }
})