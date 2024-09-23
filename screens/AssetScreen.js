import { StyleSheet, Text, View,TouchableOpacity,ScrollView } from 'react-native'
import React,{useEffect,useContext}from 'react'
import { onSnapshot,collection,doc } from 'firebase/firestore';
import { firestore,auth } from '../firebaseConfig';
import { GlobalContextApi } from '../contexts/GlobalContext';
import Card from "../All/Card"
const AssetScreen = ({navigation}) => {
    const {assets, setAssets}=useContext(GlobalContextApi);
    useEffect(() => {
      const fetchAssets = () => {
        try { 
          const ownerId = auth.currentUser.uid;
          const ownerRef = doc(firestore, 'users', ownerId);
          const assetCollectionRef = collection(ownerRef, 'assets');
          const unsubscribe = onSnapshot(
            assetCollectionRef, 
            (snapshot) => {
              const assetList = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
              }));
              setAssets(assetList); 
            },
            (error) => {
              console.error('Error fetching assets:', error);
            }
          );
          return () => unsubscribe();
        } catch (error) {
          console.error("Error fetching assets: ", error);
        }
      };
      fetchAssets(); 
    }, [ [auth.currentUser?.uid]]);
  const handleButton=()=>{
    navigation.navigate('AddAsset');
  }
  return (
    <View style={styles.container}>
     <ScrollView>
        {assets.map((item) => (
          <Card key={item.id} data={item} />
        ))}
      </ScrollView>
    <TouchableOpacity onPress={handleButton} style={styles.screenButton}>
        <Text style={styles.buttonText}>Add Asset</Text>
    </TouchableOpacity>
    </View>
  )
}

export default AssetScreen

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