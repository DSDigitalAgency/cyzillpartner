import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import OauthLogin from "./OauthLogin";
import BASE_URL from "../../config";
import {
  loginStart,
  loginSuccess,
  loginFailure,
} from "../../redux/user/userSlice";
import axios from "axios";

const LoginSection = ({ navigation }) => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    if (currentUser) {
      navigation.navigate("Home");
    }
  }, [currentUser, navigation]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!identifier || !password) {
      setError("Please provide both email/phone number and password.");
      return;
    }

    try {
      setLoading(true);
      dispatch(loginStart());

      const response = await axios.post(`${BASE_URL}/api/auth/login`, {
        identifier,
        password,
      });

      const { data } = response;

      if (response.status === 200) {
        dispatch(loginSuccess(data));
        navigation.navigate("Home");
      } else {
        // Handle different failure scenarios
        if (response.status === 401) {
          setError("Invalid email/phone number or password. Please try again.");
        } else if (response.status === 404) {
          setError("User not found. Please sign up if you are a new user.");
        } else {
          setError(`Login failed: ${data.message || "Unknown error"}`);
        }
        dispatch(loginFailure(data));
      }
    } catch (error) {
      console.error("Login failed:", error);
      setError("Login failed. Please try again later.");
      dispatch(
        loginFailure({ message: "Login failed. Please try again later." })
      );
    } finally {
      setLoading(false);
    }
  };

  const signuppressed = () => {
    navigation.navigate("SignUp");
  };

  const resetpressed = () => {
    console.log("Reset is pressed");
  };

  return (
    <ScrollView
      className="flex-1 px-5 mt-10"
      keyboardShouldPersistTaps={"always"}
    >
      <View className="items-center mb-5">
        <Image
          source={require("../../../assets/images/logo.png")}
          className="w-40 h-40 mb-5"
        />
      </View>
      <View className="p-5 rounded-2xl shadow-lg">
        <Text className="text-xl font-bold mb-3">Log in to your account</Text>
        <View className="flex-row items-center mt-2">
          <Text>Don't have an account?</Text>
          <TouchableOpacity onPress={signuppressed}>
            <View className="ml-1">
              <Text className="align-middle font-bold text-sky-500">
                Sign up
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        {error && <Text className="text-red-600 mb-2">{error}</Text>}
        <OauthLogin />
        <View className="flex-row items-center my-2">
          <View className="flex-1 h-[1px] bg-slate-500"></View>
          <Text className="mx-2 text-gray-700">or</Text>
          <View className="flex-1 h-[1px] bg-slate-500"></View>
        </View>
        <TextInput
          className="border-x border-y border-gray-500 rounded-md p-2 mb-2"
          placeholder="Enter your email or phone"
          value={identifier}
          onChangeText={(text) =>
            setIdentifier(text.startsWith("+91") ? text : "+91" + text)
          }
          returnKeyType="next"
          onSubmitEditing={() => {
            passwordInputRef.focus();
          }}
        />
        <TextInput
          ref={(input) => {
            passwordInputRef = input;
          }}
          className="border-x border-y border-gray-500 rounded-md p-2 mb-2"
          placeholder="Enter Password"
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <TouchableOpacity
          className="bg-blue-600 p-4 rounded-md items-center mb-2"
          onPress={handleSubmit}
          disabled={loading}
        >
          <Text className="font-bold">{loading ? "Loading..." : "Log In"}</Text>
        </TouchableOpacity>
        <View className="flex-row justify-between">
          <Text>Forgot Password?</Text>
          <TouchableOpacity onPress={resetpressed}>
            <View>
              <Text className="text-sky-500 font-bold">Reset it here</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default LoginSection;
