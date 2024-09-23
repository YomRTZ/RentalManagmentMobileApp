import { StyleSheet, Text, View,TouchableOpacity,ScrollView } from 'react-native'
import React,{useEffect,useContext}from 'react'

import { onSnapshot,collection,doc } from 'firebase/firestore';
import { firestore } from '../firebaseConfig';
import TenantCard from "../All/TenantCard";
import { GlobalContextApi } from '../contexts/GlobalContext';
import { auth } from '../firebaseConfig';
const  TenantScreen = ({navigation}) => {
  const {tenants, setTenants}=useContext(GlobalContextApi);
  useEffect(() => {
    const fetchTenants = () => {
      try { 
        const ownerId = auth.currentUser.uid;
        const ownerRef = doc(firestore, 'users', ownerId);
        const tenantCollectionRef = collection(ownerRef, 'Tenant');
        const unsubscribe = onSnapshot(
          tenantCollectionRef, 
          (snapshot) => {
            const tenantList = snapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data(),
            }));
            setTenants(tenantList); 
          },
          (error) => {
            console.error('Error fetching tenants:', error);
          }
        );
        return () => unsubscribe();
      } catch (error) {
        console.error("Error fetching tenants: ", error);
      }
    };
    fetchTenants(); 
  }, []); 
  const handleButton=()=>{
    navigation.navigate('AddTenant');
  }
  return (
    <View style={styles.container}>
     <ScrollView>
        {tenants.map((item) => (
          <TenantCard key={item.id} data={item} />
        ))}
      </ScrollView>
     <TouchableOpacity onPress={handleButton} style={styles. screenButton}>
        <Text style={styles.buttonText}>Add Tenant</Text>
    </TouchableOpacity>
    </View>
  )
}

export default TenantScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
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
    }
})