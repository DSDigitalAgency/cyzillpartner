import React from "react";
import { View, Image, Video } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";

export const MediaItem = ({ file, index, removeFile }) => {
  return (
    <View key={index} style={{ marginBottom: 10, position: "relative" }}>
      {file.type === "images" ? (
        <Image
          source={{ uri: file.url }}
          style={{ width: "100%", height: 200 }}
          resizeMode="cover"
        />
      ) : (
        <Video
          source={{ uri: file.url }}
          style={{ width: "100%", height: 200 }}
          resizeMode="cover"
          useNativeControls
        />
      )}
      <TouchableOpacity
        onPress={() => removeFile(index)}
        style={{
          position: "absolute",
          top: 5,
          right: 5,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          padding: 5,
          borderRadius: 15,
          zIndex: 1,
        }}
      >
        <MaterialIcons name="close" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};
