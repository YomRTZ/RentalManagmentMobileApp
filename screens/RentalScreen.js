import { StyleSheet, Text, View,TouchableOpacity,ScrollView } from 'react-native'
import RentalCard from "../All/RentalCard"
import React,{useEffect,useContext}from 'react'
import { onSnapshot,collection,doc} from 'firebase/firestore';
import { firestore,auth } from '../firebaseConfig';
import { GlobalContextApi } from '../contexts/GlobalContext';
const RentalScreen = ({navigation}) => {
  const {rentals, setRentals}=useContext(GlobalContextApi);
    useEffect(() => {
      const fetchRentals = () => {
        try { 
          const ownerId = auth.currentUser.uid;
          const ownerRef = doc(firestore, 'users', ownerId);
          const rentalCollectionRef = collection(ownerRef, 'rental');
          const unsubscribe = onSnapshot(
            rentalCollectionRef, 
            (snapshot) => {
              const rentalList = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
              }));
              setRentals(rentalList); 
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
      fetchRentals();
    }, []);


  const handleButton=()=>{
    navigation.navigate('AddRental');
  }
 
  return (
    <View style={styles.container}>
    <View style={styles.topBar}>
    <View><Text style={styles.leble}>Earnings</Text>
    <Text style={styles.earnings}>${rentals.map((item)=>(item.totalPayment))}</Text>
    </View>
    <View><Text style={styles.leble}>Expense</Text>
    <Text style={styles.expense}>${rentals.map((item)=>(item.totalExpenses))}</Text>
    </View>
    <View><Text style={styles.leble}>Advance</Text>
    <Text style={styles.dues}>$30000</Text>
    </View>
    <View><Text style={styles.leble}>Deposits</Text>
    <Text style={styles.deposits}>$30000</Text>
    </View>
    </View>
    <View style={styles.bottomBar}>
    <TouchableOpacity><Text>Past Rentals</Text></TouchableOpacity>
    <TouchableOpacity><Text>Active Rentals</Text></TouchableOpacity>
    <TouchableOpacity><Text>Expense</Text></TouchableOpacity>
    <TouchableOpacity><Text>Payment</Text></TouchableOpacity>
    </View>
       <ScrollView>
        {rentals.map((item) => (
          <RentalCard key={item.id} data={item} />
        ))}
        </ScrollView>
     <TouchableOpacity onPress={handleButton} style={styles.screenButton}>
        <Text style={styles.buttonText}>Add Rental</Text>
    </TouchableOpacity>

    </View>
  )
}

export default RentalScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        marginHorizontal:10
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
    topBar:{
      width:"100%",
      flexDirection:"row",
      justifyContent:"space-between",
      flexWrap:"wrap",
      marginTop:10,
      borderBottomColor:"gray",
      borderBottomWidth:1,
    },
    leble:{
      fontSize:15,
      paddingBottom:5
    },
    earnings:{
     color:"green",
     fontSize:15,
     paddingBottom:5
    },
    expense:{
      color:"#34ebd8",
      fontSize:15,
    },
    dues:{
      color:"red",
      fontSize:15,
    },
    deposits:{
      color:"#DAA520",
      fontSize:15,
    },
    bottomBar:{
      flexDirection:"row",
      paddingVertical:5,
      justifyContent:"space-between",
      backgroundColor:"#DCDCDC",
      elevation:3,
      marginTop:10,
      borderRadius:5,
      paddingLeft:10,
      paddingRight:10
    }
})