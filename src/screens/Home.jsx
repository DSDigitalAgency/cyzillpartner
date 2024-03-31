import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  BackHandler,
  ToastAndroid,
  Image,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { MaterialIcons } from "@expo/vector-icons";

const Home = ({ navigation }) => {
  const [lastBackPressTime, setLastBackPressTime] = useState(0);
  const dispatch = useDispatch();
  const { currentUser, loading } = useSelector((state) => state.user);
  const [username, setUsername] = useState(currentUser?.username);
  const [photo, setPhoto] = useState(currentUser?.photo);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      handleBackPress
    );

    return () => backHandler.remove();
    // Fetch user profile when the component mounts
  }, [dispatch]);

  useEffect(() => {
    // Update local state when currentUser changes
    if (currentUser && currentUser.others) {
      setUsername(currentUser.others.username || "");
    }
  }, []);

  const listPropertiesPress = () => {
    navigation.navigate("Listed Properties");
  };
  const addpropertyPress = () => {
    navigation.navigate("Add Property");
  };
  const ProfilePress = () => {
    navigation.navigate("Profile");
  };
  const MenuPress = () => {
    navigation.navigate("Menu");
  };

  const handleBackPress = () => {
    const currentTime = new Date().getTime();

    // If less than 2 seconds have passed since the last press, exit the app
    if (currentTime - lastBackPressTime < 4000) {
      BackHandler.exitApp();
      return true;
    } else {
      // Show toast "Press again to exit"
      ToastAndroid.show("Press again to exit", ToastAndroid.SHORT);
      // Update the last press time
      setLastBackPressTime(currentTime); // <-- Update lastBackPressTime
      return true;
    }
  };

  const testtete = () => {
    navigation.navigate("Plans");
  };

  return (
    <View>
      <View className="p-5 border-b border-black flex-row justify-between items-center">
        <View>
          <Text className="text-lg font-bold mb-[2px]">Welcome</Text>
          {loading ? (
            <Text className=" text-2xl font-bold">Loading...</Text>
          ) : (
            <Text className=" text-2xl font-bold">{username}</Text>
          )}
        </View>
        <View>
          {photo ? (
            <Image className="h-12 w-12 rounded-full" source={{ uri: photo }} />
          ) : (
            <Text>No Photo Available</Text>
          )}
        </View>
      </View>
      <View className="p-5">
        <View className="my-5">
          <TouchableOpacity
            onPress={listPropertiesPress}
            className="flex-row items-center justify-between border rounded-2xl p-4 border-sky-500"
          >
            <View className="flex-row">
              <MaterialIcons name="home" size={24} color="black" />
              <Text className="text-base">Your Properties</Text>
            </View>
            <View>
              <MaterialIcons name="chevron-right" size={24} color="black" />
            </View>
          </TouchableOpacity>
        </View>
        <View className="my-5">
          <TouchableOpacity
            onPress={addpropertyPress}
            className="flex-row items-center justify-between border rounded-2xl p-4 border-sky-500"
          >
            <View className="flex-row">
              <MaterialIcons name="add-home" size={24} color="black" />
              <Text className="text-base">Add Property</Text>
            </View>
            <View>
              <MaterialIcons name="chevron-right" size={24} color="black" />
            </View>
          </TouchableOpacity>
        </View>
        <View className="my-5">
          <TouchableOpacity
            onPress={ProfilePress}
            className="flex-row items-center justify-between border rounded-2xl p-4 border-sky-500"
          >
            <View className="flex-row">
              <MaterialIcons name="person" size={24} color="black" />
              <Text className="text-base">Profile</Text>
            </View>
            <View>
              <MaterialIcons name="chevron-right" size={24} color="black" />
            </View>
          </TouchableOpacity>
        </View>
        <View className="my-5">
          <TouchableOpacity
            onPress={MenuPress}
            className="flex-row items-center justify-between border rounded-2xl p-4 border-sky-500"
          >
            <View className="flex-row">
              <MaterialIcons name="menu" size={24} color="black" />
              <Text className="text-base">More</Text>
            </View>
            <View>
              <MaterialIcons name="chevron-right" size={24} color="black" />
            </View>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity onPress={testtete}>
            <Text>Plans</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Home;
