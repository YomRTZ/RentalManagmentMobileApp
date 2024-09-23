import { StyleSheet, Text, View, Switch} from 'react-native'
import React,{ useContext,useEffect }from 'react'
import { GlobalContextApi } from '../contexts/GlobalContext';

const SwitchToggleButton = () => {
    const{
      isActive,setIsActive
    } = useContext(GlobalContextApi)

    const toggleSwitch =()=>{
      setIsActive((prevState)=>(!prevState));
      console.log(isActive);
    };
    // useEffect(() => {
    //   console.log('isActive:', isActive); // Log the updated state
    // }, [isActive]);
  return (
    <View style={styles.container}>
   <View style={styles.switchText}>
<Text style={styles.statusText}>{isActive ? 'Yes' : 'No'}</Text>
   <Switch
      value={isActive}
    onValueChange={toggleSwitch}
      style={styles.switch}
    />
   </View>
  </View>
  )
}

export default SwitchToggleButton

const styles = StyleSheet.create({
    container: {
       
      },
      statusText: {
        fontSize: 20,
        marginTop:10,
        marginHorizontal:15,
      },
      switchText:{
flexDirection:"row",
borderRadius:15,
paddingHorizontal:10
      },
      switch: {
        transform: [{ scaleX: 1.7 }, { scaleY: 1.4 }],
        marginRight:15
      },
})