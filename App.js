import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreens from './screens/LoginScreens';
import SignUpScreen from './screens/SignUpScreen';
import Navigator from './Navigators/Navigator';
import AddRental from './AdminPages/Add/AddRental';
import AddAsset from './AdminPages/Add/AddAsset';
import AddTenant from "./AdminPages/Add/AddTenant";
import { GlobalContextApiProvider}  from './contexts/GlobalContext';
import Card from './All/Card';
import UpdateAsset from './AdminPages/updates/UpdateAsset';
import AddExpense from './AdminPages/Add/AddExpense';
import AddPayment from './AdminPages/Add/AddPayment';
import UpdateTenant from './AdminPages/updates/UpdateTenant';
import ResetPassword  from "./screens/PasswordReset";
import AddressForm from './All/AddressForm';
const Stack = createStackNavigator();

export default function App() {
  return (
    <GlobalContextApiProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen name="AddRental" component={AddRental} />
        <Stack.Screen name ="AddAsset" component={AddAsset}/>
        <Stack.Screen name ="AddExpense" component={AddExpense}/>
        <Stack.Screen name ="AddPayment" component={AddPayment}/>
        <Stack.Screen name ="UpdateAsset" component={UpdateAsset}/>
        <Stack.Screen name ="UpdateTenant" component={UpdateTenant}/>
        <Stack.Screen name ="ResetPassword" component={ResetPassword}/>
        <Stack.Screen name ="AddressForm" component={AddressForm}/>
        <Stack.Screen name ="Card" component={Card}/>
         <Stack.Screen name ="AddTenant" component={AddTenant}/>
         <Stack.Screen name="Home" component={Navigator} options={{ headerShown: false }} /> 
          <Stack.Screen options={{headerShown:false}} name="Login" component={LoginScreens} />
          <Stack.Screen options={{headerShown:false}} name="SignUp" component={SignUpScreen} /> 
      </Stack.Navigator>
    </NavigationContainer>
  </GlobalContextApiProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});