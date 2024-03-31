import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../../../../config";
import confetti from "canvas-confetti";
import { Picker } from "@react-native-picker/picker";

const Payment = ({ formData, saveFormData }) => {
  const dispatch = useDispatch();

  const { currentUser } = useSelector((state) => state.user);
  const username = currentUser?.username;
  const photo = currentUser?.photo;
  const phoneNumber = currentUser?.phoneNumber;

  const [price, setPrice] = useState(formData.price || "");
  const [advanceDeposit, setAdvanceDeposit] = useState(
    formData.advanceDeposit || ""
  );
  const [maintenanceCharges, setMaintenanceCharges] = useState(
    formData.maintenanceCharges || ""
  );
  const [excludeStampDuty, setExcludeStampDuty] = useState(
    formData.excludeStampDuty || false
  );
  const [priceIncludes, setPriceIncludes] = useState(
    formData.priceIncludes || ""
  );

  const handleInputChange = (value, setter, name) => {
    setter(value);
    saveFormData({ ...formData, [name]: value });
  };

  const handlePriceIncludesChange = (value) => {
    setPriceIncludes(value);
    saveFormData({ ...formData, priceIncludes: value });
  };

  const handleCheckboxPress = () => {
    setExcludeStampDuty(!excludeStampDuty);
    saveFormData({ ...formData, excludeStampDuty: !excludeStampDuty });
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <View style={{ width: "80%", padding: 10 }}>
        <Text style={{ marginBottom: 5 }}>Price in INR(₹)</Text>
        <TextInput
          placeholder="Enter price"
          keyboardType="numeric"
          value={price}
          onChangeText={(text) => handleInputChange(text, setPrice, "price")}
          style={{
            borderWidth: 1,
            borderColor: "gray",
            padding: 10,
            marginBottom: 10,
          }}
        />

        <Text style={{ marginBottom: 5 }}>Advance Deposit</Text>
        <TextInput
          placeholder="Enter advance deposit"
          keyboardType="numeric"
          value={advanceDeposit}
          onChangeText={(text) =>
            handleInputChange(text, setAdvanceDeposit, "advanceDeposit")
          }
          style={{
            borderWidth: 1,
            borderColor: "gray",
            padding: 10,
            marginBottom: 10,
          }}
        />

        <Text style={{ marginBottom: 5 }}>Maintenance Charges per Month</Text>
        <TextInput
          placeholder="Enter maintenance charges"
          keyboardType="numeric"
          value={maintenanceCharges}
          onChangeText={(text) =>
            handleInputChange(text, setMaintenanceCharges, "maintenanceCharges")
          }
          style={{
            borderWidth: 1,
            borderColor: "gray",
            padding: 10,
            marginBottom: 10,
          }}
        />

        <Text style={{ marginBottom: 5 }}>Price Includes:</Text>
        <Picker
          selectedValue={priceIncludes}
          onValueChange={(value) => handlePriceIncludesChange(value)}
          style={{ borderWidth: 1, borderColor: "gray", marginBottom: 10 }}
        >
          <Picker.Item label="Select..." value="" />
          <Picker.Item label="Fixed" value="Fixed" />
          <Picker.Item label="Negotiable" value="Negotiable" />
          <Picker.Item label="Call For Price" value="Call For Price" />
        </Picker>

        <TouchableOpacity
          onPress={handleCheckboxPress}
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 10,
          }}
        >
          <View
            style={{
              width: 20,
              height: 20,
              borderWidth: 1,
              marginRight: 10,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: excludeStampDuty ? "gray" : "white",
            }}
          >
            {excludeStampDuty && <Text style={{ color: "white" }}>✓</Text>}
          </View>
          <Text>Exclude Stamp Duty and Registration Charges</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Payment;
