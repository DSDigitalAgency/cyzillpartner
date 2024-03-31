import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";

const OauthLogin = () => {
  const handleLoginGoogle = () => {
    console.log("Google login button pressed");
  };
  const handleLogineApple = () => {
    console.log("Apple login button pressed");
  };
  const handleLoginFacebook = () => {
    console.log("Facebook login button pressed");
  };

  return (
    <View className="flex-row justify-between my-3">
      <TouchableOpacity
        onPress={handleLoginGoogle}
        className="flex-1 justify-center items-center py-3 rounded-md border-x border-y border-gray-500 mx-1"
      >
        <Image
          source={require("../../../assets/images/googleicon.png")}
          className="w-5 h-5"
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleLogineApple}
        className="flex-1 justify-center items-center px-3 rounded-md border-x border-y border-gray-500 mx-1"
      >
        <Image
          source={require("../../../assets/images/facebookicon.png")}
          className="w-5 h-5"
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleLoginFacebook}
        className="flex-1 justify-center items-center px-3 rounded-md border-x border-y border-gray-500 mx-1"
      >
        <Image
          source={require("../../../assets/images/appleicon.png")}
          className="w-5 h-5"
        />
      </TouchableOpacity>
    </View>
  );
};

export default OauthLogin;
