import { StyleSheet, Text, View} from 'react-native'
import React, { useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native'
import { firestore,auth} from '../firebaseConfig';  
import { doc,getDoc } from 'firebase/firestore';
import { format } from 'date-fns';

const RentalCard = ({data}) => {
    const {
      id,
    selectedAsset,
    selectedTenant,
    rentalFrequency,
    amount,
    leaseStart,
    leaseEnd,
      } = data;
      const  leaseStartDateFormat= format(leaseStart.toDate(), 'MMMM dd, yyyy');
      const  leaseEndDateFormat= format(leaseEnd.toDate(), 'MMMM dd, yyyy');
      const[assetName, setAssetName]=useState();
      const[tenantFirstName, setTenantFirstName]=useState();
      const[tenantLastName, setTenantLastName]=useState();
      const[selectedTenantPhoneNumber,setSelectedTenantPhoneNumber]=useState();
 const navigation=useNavigation();
const addExpense=()=>{
navigation.navigate("AddExpense", {selectedAsset,id})
}
const addPayment=()=>{
  navigation.navigate("AddPayment", {id})
  }
// const formatDate = (date) => {
//   if (!date) return '';
//   const day = date.getDate().toString().padStart(2, '0');
//   const month = (date.getMonth() + 1).toString().padStart(2, '0');
//   const year = date.getFullYear();
//   return `${month}/${day}/${year}`;
// };
const getAssetNameById = async (selectedAsset, selectedTenant) => {
    try {
      const ownerId = auth.currentUser.uid;
     const ownerRef = doc(firestore, 'users', ownerId);
     const assetRef = doc(ownerRef, 'assets',selectedAsset);
      const docSnap = await getDoc(assetRef); 
      if (docSnap.exists()) {
        const assetData = docSnap.data();
        const selectedAssetName = assetData.assetName;
        console.log(selectedAssetName) 
        setAssetName(selectedAssetName);
      } else {
        console.error('No such document!');
        return null;
      }
    } catch (error) {
      console.error('Error fetching asset name:', error);
      return null;
    }
    try {
      const ownerId = auth.currentUser.uid;
  const ownerRef = doc(firestore, 'users', ownerId);
  const tenantRef = doc(ownerRef, 'Tenant',selectedTenant);
      const docSnap = await getDoc(tenantRef); 
      if (docSnap.exists()) {
        const tenantData = docSnap.data();
        
        const selectedTenantFirstName = tenantData.firstName;
        const selectedTenantLastName = tenantData.lastName;
        const tenantPhoneNumber = tenantData.phoneNumber;
        setTenantFirstName(selectedTenantFirstName);
        setTenantLastName(selectedTenantLastName);
        setSelectedTenantPhoneNumber(tenantPhoneNumber)
      } else {
        console.error('No such document!');
        return null;
      }
    } catch (error) {
      console.error('Error fetching asset name:', error);
      return null;
    }
  };
  useEffect(() => {
    console.log(selectedAsset)
    if (selectedAsset&&selectedTenant) {
      getAssetNameById(selectedAsset,selectedTenant);
    }
  }, [selectedAsset])
  return (
    <View style={styles.card}>
   <View style={styles.cardBody}>
  <View style={styles.bodyRow}>
  <View>
   <View>
    <Text style={styles.headingText}>{assetName}</Text>
    <Text style={styles.cardType}>{tenantFirstName} {tenantLastName}</Text>
   </View>
    <View style={styles.row}>
    <Text style={styles.cardType}>{amount}</Text>
       <Text style={styles.cardDuration}>{rentalFrequency}</Text>
     </View>
    </View>
    <View style={styles.date}>
        <Text>StartDate: {leaseStartDateFormat}</Text>
        <Text>EndDate: {leaseEndDateFormat}</Text>
     </View>
     </View>
    <View><Text style={styles.cardType}>Phone {selectedTenantPhoneNumber}</Text></View>
    <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.expense} onPress={addExpense}><Text style={styles.buttonText}>Add Expense</Text></TouchableOpacity>
        <TouchableOpacity style={styles.payment} onPress={addPayment}><Text style={styles.buttonText}>Add Payment</Text></TouchableOpacity>
    </View>

    </View>
    </View>
  )
}

export default RentalCard;

const styles = StyleSheet.create({
    card:{
      width:400,
      height:150,
      borderRadius:15,
      marginVertical:5,
      // marginHorizontal:5,
      flexDirection:"row",
      backgroundColor:"#FFFFFF",
      elevation:3,
    },
    cardImage:{
        height:100,
        width:120,
        marginTop:10,
        marginHorizontal:10
    },
    cardBody:{
      flex:1,
        marginVertical:5,
        alignItems:"flex-start",
        marginHorizontal:15,
    },
    headingText:{
        fontSize:15,
        fontWeight:"bold",
        paddingBottom:2
    },
    row:{
        flexDirection:"row",
    },
    cardType:{
        fontSize:15,
        fontWeight:"400",
        paddingRight:10,
        fontWeight:"500"
    },
    cardDuration:{
        fontSize:15,
        fontWeight:"500"
    },
    cardAddress:{
        fontSize:15,
        paddingBottom:2,
        color:"#A9A9A9"
    },
    cardAmount:{
        backgroundColor:"#34ebd8",
        color:"#555555",
        paddingHorizontal:15,
        fontSize:15

    },
    cardStatus:{
    backgroundColor:"#34ebd8",
    color:"#555555",
    paddingHorizontal:15,
    borderRadius:15,
    marginRight:50,
    fontSize:15
    },
    cardDescription:{
        fontSize:15,
        paddingBottom:2,
          color:"#A9A9A9",
          marginBottom:10
    },
    buttonRow:{
        position:"absolute",
        bottom:10,
        width:"100%",
        flexDirection:"row",
        justifyContent:"space-between",
    },
    expense:{
        paddingHorizontal:15,
        backgroundColor:"#FFDB58",
        paddingVertical:3,
        borderRadius:5
    },
    payment:{
        paddingHorizontal:15,
        backgroundColor:"#34ebd8",
        paddingVertical:3,
        borderRadius:5
    },
    buttonText:{
        color:"white",
        fontSize:13,
    },
    bodyRow:{
        width:"100%",
        flexDirection:"row",
        justifyContent:"space-between"
    },
    date:{
        alignItems:"flex-end"
    }
})