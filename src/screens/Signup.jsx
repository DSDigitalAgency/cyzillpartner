import { SafeAreaView } from "react-native";
import React from "react";
import SignUpSection from "../components/auth/SignUpSection";

const Signup = ({ navigation }) => {
  return (
    <SafeAreaView className="flex-1">
      <SignUpSection navigation={navigation} />
    </SafeAreaView>
  );
};

export default Signup;
