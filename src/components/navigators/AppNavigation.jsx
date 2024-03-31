import { View, Text } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../../screens/Login";
import Signup from "../../screens/Signup";
import Home from "../../screens/Home";
import About from "../../screens/About";
import AddProperty from "../../screens/AddProperty";
import Contact from "../../screens/Contact";
import FairUse from "../../screens/FairUse";
import Faqs from "../../screens/Faqs";
import ListedProperties from "../../screens/ListedProperties";
import Menu from "../../screens/Menu";
import PropertyDetails from "../../screens/PropertyDetails";
import PrivacyPolicy from "../../screens/PrivacyPolicy";
import Profile from "../../screens/Profile";
import TermsOfServices from "../../screens/TermsOfServices";
import Plans from "../common/property/plans/Plans";

const AppNavigation = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="SignUp" component={Signup} />
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="About" component={About} />
      <Stack.Screen name="Add Property" component={AddProperty} />
      <Stack.Screen name="Contact" component={Contact} />
      <Stack.Screen name="Fair Use" component={FairUse} />
      <Stack.Screen name="Faq's" component={Faqs} />
      <Stack.Screen name="Listed Properties" component={ListedProperties} />
      <Stack.Screen name="Menu" component={Menu} />
      <Stack.Screen
        name="Property Details"
        component={PropertyDetails}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Privacy Policy" component={PrivacyPolicy} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Terms of Services" component={TermsOfServices} />
      <Stack.Screen name="Plans" component={Plans} />
    </Stack.Navigator>
  );
};

export default AppNavigation;
