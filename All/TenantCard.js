import { StyleSheet, Text, View,Image,TouchableOpacity} from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
const TenantCard = ({data}) => {
    const navigation=useNavigation();
    const { 
        id,
        firstName,
        lastName,
        genderType,
        phoneNumber,
        emailAddress,
        images,address } = data;
        const addressData = address[0];
        country=addressData.country;
        state=addressData.state;
        city=addressData.city;
  return (
    <TouchableOpacity onPress={()=>navigation.navigate("UpdateTenant",{
        id,
        firstName,
        lastName,
        genderType,
        phoneNumber,
        emailAddress,
        images})}
        activeOpacity={1}
        >
    <View style={styles.card}>
   <Image
        source={{uri:images[0]}}
   style={styles.cardImage}
    />
   <View style={styles.cardBody}>
    <View style={styles.row}>
    <Text style={styles.headingText}>{firstName}</Text>
    <Text style={styles.cardType}>{lastName}</Text>
     </View>
     <Text style={styles.cardDescription}>{emailAddress}</Text>
     <Text style={styles.cardAddress}>{country},{state}</Text>
     <Text style={styles.cardAddress}>{city}</Text>
     <Text style={styles.PhoneNumber}>{phoneNumber}</Text>
    </View>
    </View>
    </TouchableOpacity>
  )
}

export default TenantCard

const styles = StyleSheet.create({
  card:{
        width:400,
        height:150,
        borderRadius:15,
        marginVertical:5,
        marginHorizontal:5,
        flexDirection:"row",
        backgroundColor:"#FFFFFF",
        elevation:1,
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
        alignItems:"flex-start"
    },
    headingText:{
        fontSize:15,
        fontWeight:"bold",
        paddingBottom:2,
        paddingRight:5
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
    PhoneNumber:{
    backgroundColor:"#34ebd8",
    color:"#555555",
    paddingHorizontal:30,
    borderRadius:15,
    position:"absolute",
    bottom:10,
    right:30,
    fontSize:15
    },
    cardDescription:{
        fontSize:15,
        paddingBottom:2,
          color:"#A9A9A9",
          marginBottom:10
    },
   
})