import React, { useState, useCallback, useEffect, useContext } from "react";
import { View, Text, TouchableOpacity, ScrollView, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { uploadMediaAsync, deleteMediaAsync } from "./storage";
import { UserStorageContext } from "../../../../context/UserStorageContext";
import MediaItem from "./MediaItem";
import { useDispatch, useSelector } from "react-redux";

const Media = ({ formData, saveFormData, MAP_API_KEY }) => {
  const [media, setMedia] = useState([]);
  const { storagePermission } = useContext(UserStorageContext);
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const [username, setUsername] = useState(currentUser?.username);

  useEffect(() => {
    // Fetch user profile when the component mounts
  }, [dispatch]);

  const pickImage = useCallback(async () => {
    if (!storagePermission) {
      Alert.alert("Permission to access local storage is required!");
      return;
    }

    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert("Permission to access camera roll is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.cancelled) {
      try {
        const filePath = `users/${username}/media/images/${result.uri}`;
        const url = await uploadMediaAsync(result.uri, filePath);
        setMedia((prevMedia) => [
          ...prevMedia,
          { url, path: filePath, type: "images" },
        ]);
      } catch (error) {
        console.error("Error uploading image:", error.message);
      }
    }
  }, [storagePermission]);

  const removeFile = async (index) => {
    try {
      const file = media[index];
      await deleteMediaAsync(file.path);
      console.log("File deleted successfully");
      const newMedia = media.filter((_, i) => i !== index);
      setMedia(newMedia);
    } catch (error) {
      console.error("Error deleting file:", error.message);
    }
  };

  const handleVideoUpload = async () => {
    // Implement video uploading logic using Expo's VideoPicker or other libraries
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Upload your files</Text>
      <View style={{ marginBottom: 20 }}>
        <Text>Upload Images</Text>
        <TouchableOpacity
          onPress={pickImage}
          style={{
            borderWidth: 1,
            borderColor: "gray",
            borderRadius: 5,
            padding: 10,
          }}
        >
          <Text>Select Image</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{ flexDirection: "row", flexWrap: "wrap", marginBottom: 20 }}
      >
        {media.map((file, index) => (
          <MediaItem
            key={index}
            file={file}
            index={index}
            removeFile={removeFile}
          />
        ))}
      </View>

      <View style={{ marginBottom: 20 }}>
        <Text>Upload Videos</Text>
        <TouchableOpacity
          onPress={handleVideoUpload}
          style={{
            borderWidth: 1,
            borderColor: "gray",
            borderRadius: 5,
            padding: 10,
          }}
        >
          <Text>Select Video</Text>
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
        {/* Render video thumbnails here */}
      </View>
    </ScrollView>
  );
};

export default Media;
