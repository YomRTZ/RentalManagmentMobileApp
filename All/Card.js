import { StyleSheet, Text, View,Image} from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native'

const Card = ({data}) => {
    const { id,assetType, assetName, assetDescription,productStatuse, rentalDateType, rentalDefaultAmount,images,address } = data;
    const addressData = address[0];
        country=addressData.country;
        state=addressData.state;
        city=addressData.city;
   const navigation=useNavigation();

    return (
   <TouchableOpacity onPress={()=> navigation.navigate("UpdateAsset",{id,assetType, assetName, assetDescription,productStatuse,rentalDateType, rentalDefaultAmount,images})}
    activeOpacity={1}
   >
     <View style={styles.card}>
   <Image
        source={{uri:images[0]}}
   style={styles.cardImage}
    />
   <View style={styles.cardBody}>
   <View>
    <Text style={styles.headingText}>{assetName}</Text>
   </View>
    <View style={styles.row}>
       <Text style={styles.cardType}>{assetType}</Text>
       <Text style={styles.cardDuration}>{rentalDateType}</Text>
     </View>
   
     <Text style={styles.cardAddress}>{country},{state}</Text>
     <Text style={styles.cardAddress}>{city}</Text>
     <Text style={styles.cardDescription}>{assetDescription}</Text>
    <View style={styles.row}>
        <Text style={styles.cardStatus}>{productStatuse}</Text>
        <Text style={styles.cardAmount}>{rentalDefaultAmount}</Text>
    </View>
    </View>
    </View>
   </TouchableOpacity>
  )
}

export default Card

const styles = StyleSheet.create({
    card:{
        width:400,
        height:150,
        borderRadius:15,
        marginVertical:5,
        marginHorizontal:5,
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
        alignItems:"flex-start"
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
   
})