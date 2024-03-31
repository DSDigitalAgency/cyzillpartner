import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import OauthLogin from "./OauthLogin";
import { MaterialIcons } from "@expo/vector-icons";
import BASE_URL from "../../config";

const SignUpSection = ({ navigation }) => {
  const [state, setState] = useState({
    username: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    termsAccepted: false,
    error: null,
    passwordErrors: {
      length: true,
      lowercase: true,
      uppercase: true,
      number: true,
      specialChar: true,
    },
    showPasswordSuggestions: false,
  });

  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      phoneNumber: "",
      password: "",
      passwordErrors: {
        length: true,
        lowercase: true,
        uppercase: true,
        number: true,
        specialChar: true,
      },
      phoneNumberError: false,
      passwordsMatch: true,
    }));
  }, []);

  const handleSubmit = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: state.username,
          email: state.email,
          phoneNumber: state.phoneNumber,
          password: state.password,
          termsAccepted: state.termsAccepted ? "ok" : "",
        }),
      });

      if (response.ok) {
        setState((prevState) => ({
          ...prevState,
          error: "User created successfully!",
        }));
        // Assuming you have a 'Profile' screen, you can navigate to it
        navigation.navigate("Login");
      } else {
        const errorData = await response.json();
        console.error("Server error:", errorData);
        setState((prevState) => ({
          ...prevState,
          error: errorData.message || "Registration failed.",
        }));
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
      setState((prevState) => ({
        ...prevState,
        error: "An unexpected error occurred. Please try again.",
      }));
    }
  };

  const loginpressed = () => {
    navigation.navigate("Login");
  };

  const handleConfirmPasswordChange = (confirmPassword) => {
    setState((prevState) => ({
      ...prevState,
      confirmPassword,
      passwordsMatch: confirmPassword === prevState.password,
    }));
  };

  const handlePasswordChange = (password) => {
    setState((prevState) => ({
      ...prevState,
      password,
      passwordErrors: {
        length: !validateLength(password),
        lowercase: !validateLowercase(password),
        uppercase: !validateUppercase(password),
        number: !validateNumber(password),
        specialChar: !validateSpecialChar(password),
      },
      showPasswordSuggestions: true,
      passwordSuggestions: generatePasswordSuggestions(password),
    }));
  };

  const validateLength = (password) => password.length >= 8;
  const validateLowercase = (password) => /[a-z]/.test(password);
  const validateUppercase = (password) => /[A-Z]/.test(password);
  const validateNumber = (password) => /\d/.test(password);
  const validateSpecialChar = (password) => /[^A-Za-z0-9]/.test(password);

  const handlePhoneNumberChange = (phoneNumber) => {
    if (phoneNumber.trim() !== "") {
      setState((prevState) => ({
        ...prevState,
        phoneNumber: phoneNumber.startsWith("+91")
          ? phoneNumber
          : "+91" + phoneNumber,
        phoneNumberError: !validatePhoneNumber(phoneNumber),
      }));
    } else {
      console.error("Phone number cannot be null or empty");
    }
  };

  const validatePhoneNumber = (phoneNumber) => {
    const phoneNumberRegex = /^\+91[6789]\d{9}$/;
    return phoneNumberRegex.test(phoneNumber);
  };

  const generatePasswordSuggestions = (password) => {
    const newSuggestions = [];

    if (!validateLength(password)) {
      newSuggestions.push("At least 8 characters");
    }
    if (!validateLowercase(password)) {
      newSuggestions.push("At least one lowercase letter");
    }
    if (!validateUppercase(password)) {
      newSuggestions.push("At least one uppercase letter");
    }
    if (!validateNumber(password)) {
      newSuggestions.push("At least one number");
    }
    if (!validateSpecialChar(password)) {
      newSuggestions.push("At least one special character");
    }

    return newSuggestions;
  };

  const { passwordsMatch, error, passwordErrors } = state;

  const termsandconditionspress = () => {
    console.log("Terms and Conditions Pressed");
  };
  return (
    <ScrollView className="flex-1 p-5" keyboardShouldPersistTaps={"always"}>
      <View className="flex-1 mb-5">
        <Text className="text-2xl font-bold mb-3">Sign up</Text>

        <View className="flex-row items-center mt-2">
          <Text>Already have an account?</Text>
          <TouchableOpacity onPress={loginpressed}>
            <View className="ml-1">
              <Text className="text-blue-500 font-bold">Log In</Text>
            </View>
          </TouchableOpacity>
        </View>

        <OauthLogin />

        <View className="flex-row items-center my-2">
          <View className="flex-1 h-[1px] bg-slate-500"></View>
          <Text className="mx-2 text-gray-700">or</Text>
          <View className="flex-1 h-[1px] bg-slate-500"></View>
        </View>

        <View className="mb-3">
          <Text className="font-bold mb-1">Name</Text>
          <TextInput
            className="border border-gray-400 rounded p-2 mb-2 text-gray-700 placeholder:text-gray-600"
            value={state.username}
            placeholder="Please enter name"
            onChangeText={(text) =>
              setState((prevState) => ({ ...prevState, username: text.trim() }))
            }
            returnKeyType="next"
            onSubmitEditing={() => {
              phoneInputRef.focus();
            }}
          />
        </View>

        <View className="mb-3">
          <Text className="font-bold mb-1">Phone Number</Text>
          <TextInput
            ref={(input) => {
              phoneInputRef = input;
            }}
            className="border border-gray-400 rounded p-2 mb-2 text-gray-700 placeholder:text-gray-600"
            keyboardType="numeric"
            placeholder="Please enter you phone number"
            value={state.phoneNumber}
            onChangeText={handlePhoneNumberChange}
            returnKeyType="next"
            onSubmitEditing={() => {
              emailInputRef.focus();
            }}
          />
          {state.phoneNumberError && (
            <Text className="text-red-600">Invalid phone number</Text>
          )}
        </View>

        <View className="mb-3">
          <Text className="font-bold mb-1">Email</Text>
          <TextInput
            ref={(input) => {
              emailInputRef = input;
            }}
            className="border border-gray-400 rounded p-2 mb-2 text-gray-700 placeholder:text-gray-600"
            keyboardType="email-address"
            placeholder="Plase enter your email"
            value={state.email}
            onChangeText={(text) =>
              setState((prevState) => ({ ...prevState, email: text.trim() }))
            }
            returnKeyType="next"
            onSubmitEditing={() => {
              passwordInputRef.focus();
            }}
          />
        </View>

        <View className="mb-3">
          <Text className="font-bold mb-1">Password</Text>
          <TextInput
            ref={(input) => {
              passwordInputRef = input;
            }}
            className="border border-gray-400 rounded p-2 mb-2 text-gray-700 placeholder:text-gray-600"
            secureTextEntry
            value={state.password}
            placeholder="Please enter a stong password"
            onChangeText={handlePasswordChange}
            returnKeyType="next"
            onSubmitEditing={() => {
              conpasswordInputRef.focus();
            }}
          />
          {state.showPasswordSuggestions && (
            <View>
              {state.passwordSuggestions.map((suggestion, index) => (
                <Text key={index} style={styles.passwordSuggestions}>
                  {suggestion}
                </Text>
              ))}
            </View>
          )}
        </View>
        <View className="mb-3">
          <Text className="font-bold mb-1">Confirm Password</Text>
          <TextInput
            ref={(input) => {
              conpasswordInputRef = input;
            }}
            className="border border-gray-400 rounded p-2 mb-2 text-gray-700 placeholder:text-gray-600"
            secureTextEntry
            placeholder="Plese enter the same password"
            onChangeText={handleConfirmPasswordChange}
          />
          {!passwordsMatch && (
            <Text style={styles.passwordSuggestions}>
              Passwords do not match
            </Text>
          )}
        </View>
        {error && (
          <View className="p-2 mb-5 bg-rose-400 border border-red-700">
            <Text className="text-red-500">{error}</Text>
          </View>
        )}

        <View className="mb-2 flex-row items-center">
          <TouchableOpacity
            onPress={() =>
              setState((prevState) => ({
                ...prevState,
                termsAccepted: !state.termsAccepted,
              }))
            }
          >
            <View className="flex-row items-center">
              {state.termsAccepted && (
                <MaterialIcons name="check-box" size={24} />
              )}
              {!state.termsAccepted && (
                <MaterialIcons name="check-box-outline-blank" size={24} />
              )}
              <View className="flex-row items-center">
                <Text className="flex-row items-center">
                  Clicking this, you agree to our{" "}
                </Text>
                <View>
                  <TouchableOpacity onPress={termsandconditionspress}>
                    <Text className="text-blue-500">terms and conditions.</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          className="bg-blue-600 p-4 rounded-md items-center"
          onPress={handleSubmit}
        >
          <Text className="font-bold">Create account</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  passwordSuggestions: {
    color: (suggestion) => (passwordErrors[suggestion] ? "green" : "red"),
  },
});

export default SignUpSection;
