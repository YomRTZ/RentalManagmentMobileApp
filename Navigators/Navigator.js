import { StyleSheet,Pressable } from 'react-native'
import React from 'react'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import Fontisto from '@expo/vector-icons/Fontisto';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import RentalScreen from '../screens/RentalScreen';
import AssetScreen from '../screens/AssetScreen';
import TenantScreen from '../screens/TenantScreen';
import ReportScreen from '../screens/ReportScreen';
import SettingScreen from "../screens/SettingScreen";
    const Tab = createBottomTabNavigator();
    const Stack = createStackNavigator();
    function BottomTabs() {
        return (
            <Tab.Navigator
             screenOptions={{
        headerStyle: { backgroundColor: '#34ebd8', height:120 },
        headerTintColor: '#fff',headerTitleStyle:{fontSize:25},
        headerRight:()=>(
 <Pressable onPress={()=> alert("Menu button pressed")}>
 <AntDesign name="areachart" size={35} color="black" style={styles.chart}  />
 </Pressable> )
        }} >
                <Tab.Screen name="RentalScreen" component={RentalScreen} 
                options={{ tabBarLabel: "Rental",
                 headerShown: true, 
                 tabBarIcon:({focused})=>focused?(
                  <MaterialIcons name="currency-exchange" size={26} color="#34ebd8" />
                 ):(
                  <MaterialIcons name="currency-exchange" size={24} color="black" />
                 )}} />
                  <Tab.Screen name="AssetScreen" component={AssetScreen} 
                options={{ tabBarLabel: "Asset",
                 headerShown: true, 
                 tabBarIcon:({focused})=>focused?(
                    <AntDesign name="home"size={26} color="#34ebd8"/>
                 ):(
                    <AntDesign name="home" size={24} color="black" />
                 )}} />
                  <Tab.Screen name="TenantScreen" component={TenantScreen} 
                options={{ tabBarLabel: "Tenant",
                 headerShown: true, 
                 tabBarIcon:({focused})=>focused?(
                    <Fontisto name="persons" size={26} color="#34ebd8" />
                 ):(
                    <Fontisto name="persons" size={24} color="black" />
                 )}} />
                  <Tab.Screen name="ReportScreen" component={ReportScreen} 
                options={{ tabBarLabel: "Report",
                 headerShown: true, 
                 tabBarIcon:({focused})=>focused?(
                    <MaterialIcons name="report" size={26} color="#34ebd8" />
                 ):(
                    <MaterialIcons name="report" size={24} color="black" />
                 )}} />
                  <Tab.Screen name="SettingScreen" component={SettingScreen} 
                options={{ tabBarLabel: "Setting",
                 headerShown: true, 
                 tabBarIcon:({focused})=>focused?(
                    <Ionicons name="settings"  size={26} color="#34ebd8"/>
                 ):(
                    <Ionicons name="settings" size={24} color="black" />
                 )}} />
            </Tab.Navigator>
            
        )
    }
    const Navigator = () => {
        return (
          <Stack.Navigator>
            <Stack.Screen name="Main" component={BottomTabs} options={{ headerShown: false }} />
          </Stack.Navigator>
        );
}

export default Navigator;

const styles = StyleSheet.create({
   chart:{
      marginRight:25
   }
})