import React, { useContext } from 'react';
import { View, Text, Image, StyleSheet, FlatList } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Feather from '@expo/vector-icons/Feather';
import Entypo from '@expo/vector-icons/Entypo';
import { GlobalContextApi } from '../contexts/GlobalContext';
const UpdateImage = () => {
const{
  updatedImages, setupdatedImages,
} = useContext(GlobalContextApi)
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      // allowsEditing:true,
      aspect:[4,4],
      allowsMultipleSelection: true,
      quality: 1,
    });

    if (!result.canceled) {
      const selectedImages = result.assets.map(asset => asset.uri);
      setupdatedImages([...updatedImages, ...selectedImages]);
    }
  };

const removeImage = (uri) => {
  setupdatedImages(updatedImages.filter(image => image !== uri));
};
  return (
    <View style={styles.container}>
    <Image source={{ uri: updatedImages[0] }} style={styles.selectedImage} />
    <TouchableOpacity onPress={pickImage}style={styles.imagePicker}>
    <Entypo name="folder-images" size={30} style={styles.addImageIcon}/>
     {/* <TouchableOpacity onPress={() => removeImage(updatedImages[0])} style={styles.deleteButton}>
    <Entypo name="cross" size={17} color="black" />
    </TouchableOpacity> */}
    </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
   flexDirection:"row"
  },
  deleteButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: 'red',
    borderRadius: 12,
  },
  selectedImage:{
    margin:10,
    width:30,
    height:30
  },
  imagePicker:{
    position:"absolute",
  }
});

export default UpdateImage;
