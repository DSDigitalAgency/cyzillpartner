import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/user/userSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialIcons } from "@expo/vector-icons";

const LogOut = ({ navigation }) => {
  const dispatch = useDispatch();

  const onLogout = async () => {
    // Assuming you store user data in AsyncStorage
    try {
      // Clear user data from storage
      await AsyncStorage.removeItem("userData");

      // Dispatch the logout action to update Redux state
      dispatch(logout());

      // Navigate the user back to the login screen
      navigation.navigate("Login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <TouchableOpacity
      className="flex-row items-center justify-center p-2 w-2/4 rounded-lg self-center bg-gray-600"
      onPress={onLogout}
    >
      <MaterialIcons name="logout" size={24} className="mr-2" />
      <Text className="text-base">Logout</Text>
    </TouchableOpacity>
  );
};

export default LogOut;
