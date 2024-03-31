import { SafeAreaView } from "react-native";
import React from "react";
import LoginSection from "../components/auth/LoginSection";

const Login = ({ navigation }) => {
  return (
    <SafeAreaView className="flex-1">
      <LoginSection navigation={navigation} />
    </SafeAreaView>
  );
};

export default Login;
