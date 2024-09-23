import React, { useContext } from 'react';
import { View, Text, Image, StyleSheet, FlatList } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Feather from '@expo/vector-icons/Feather';
import Entypo from '@expo/vector-icons/Entypo';
import { GlobalContextApi } from '../contexts/GlobalContext';
const ImageUpload = () => {
const{
  images, setImages,
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
      setImages([...images, ...selectedImages]);
    }
  };

const removeImage = (uri) => {
  setImages(images.filter(image => image !== uri));
};

const renderItem = ({ item }) => (
  <View style={styles.imageItem}>
    <Image source={{ uri: item }} style={styles.selectedImage} />
    <TouchableOpacity onPress={() => removeImage(item)} style={styles.deleteButton}>
    <Entypo name="cross" size={17} color="black" />
    </TouchableOpacity>
  </View>
);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.imageContainer}
        onPress={pickImage} >
        <Feather name="plus-circle" size={24} color="black" />
        <Text>Add Image</Text>
        </TouchableOpacity>
        {images.length > 0 && (
        <FlatList
          data={images}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          horizontal={true}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
   marginVertical:20,
   flexDirection:"row"
  },
  image: {
    width: 200,
    height: 200,
    marginVertical: 20,
  },
  imageContainer:{
    marginLeft:10,
    borderColor:"#34ebd8",
    width:120,
    borderWidth:2,
    padding:20,
    borderRadius:10,
   alignItems:"center"
  },
  imageItem: {
    position: 'relative',
    marginRight: 10,
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
    width:50,
    height:50
  }
});

export default ImageUpload;
