import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import LogOut from "../components/auth/LogOut";

const Profile = ({ navigation }) => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const [username, setUsername] = useState(currentUser?.username);
  const [email, setEmail] = useState(
    currentUser?.email || currentUser?.others?.email
  );
  const [phoneNumber, setPhoneNumber] = useState(
    currentUser?.phoneNumber || currentUser?.others?.phoneNumber
  );
  const [photo, setPhoto] = useState(
    currentUser?.others?.photo || currentUser?.photo
  );

  useEffect(() => {
    // Fetch user profile when the component mounts
  }, [dispatch]);

  const handleUpdateProfile = () => {
    // Handle update logic here
    // You can dispatch the updateProfile action with updated data
    // dispatch(updateProfile({ username, email, photo }));
    console.log("Update profile logic here");
  };

  const changeprofile = () => {
    console.log("Changed Press");
    // Implement logic to change profile picture
  };

  return (
    <ScrollView className="flex-1">
      <View className="p-4 mb-16">
        <View className="items-center mb-4">
          {photo ? (
            <Image className="w-28 h-28 rounded-full" source={{ uri: photo }} />
          ) : (
            <Text>No Photo Available</Text>
          )}
          <TouchableOpacity
            onPress={changeprofile}
            className="px-3 py-5 rounded-lg items-center"
          >
            <Text>Change Picture</Text>
          </TouchableOpacity>
          <View className="mt-4 w-full">
            <View className="flex-row justify-start mb-4 p-4 rounded-lg">
              <Text className="font-bold">Username:</Text>
              <Text className="ml-2">{username}</Text>
            </View>
            <View className="flex-row justify-start mb-4 p-4 rounded-lg">
              <Text className="font-bold">Email:</Text>
              <Text className="ml-2">{email}</Text>
            </View>
            <View className="flex-row justify-start mb-4 p-4 rounded-lg">
              <Text className="font-bold">Phone:</Text>
              <Text className="ml-2">{phoneNumber}</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity
          onPress={handleUpdateProfile}
          className="px-3 rounded-lg mt-4 items-center"
        >
          <Text>Update Profile</Text>
        </TouchableOpacity>
      </View>

      <LogOut navigation={navigation} />
    </ScrollView>
  );
};

export default Profile;
