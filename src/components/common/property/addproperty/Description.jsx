import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TextInput, Button } from "react-native";
import { Picker } from "@react-native-picker/picker";

const useInput = (initialValue, key, formData, saveFormData) => {
  const [value, setValue] = useState(
    formData?.[key] !== undefined ? formData[key] : initialValue
  );

  const handleChange = (newValue) => {
    setValue(newValue);
    if (saveFormData) {
      saveFormData({ ...formData, [key]: newValue });
    }
  };

  const reset = () => {
    setValue(initialValue);
    if (saveFormData) {
      saveFormData({ ...formData, [key]: initialValue });
    }
  };

  return [value, handleChange, reset];
};

const Description = ({ formData, saveFormData }) => {
  const [description, setDescription, resetDescription] = useInput(
    "",
    "description",
    formData,
    saveFormData
  );
  const [personalDetails, setPersonalDetails] = useState("");
  const [forDetails, setForDetails] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [totalFlats, setTotalFlats] = useState("");
  const [warning, setWarning] = useState("");
  const maxDescriptionLength = 1000;

  const handleDescriptionChange = (text) => {
    if (text.length <= maxDescriptionLength) {
      setDescription(text);
      setWarning("");
    } else {
      setWarning("Description exceeds maximum length");
    }
  };

  useEffect(() => {
    if (description && personalDetails && forDetails && propertyType) {
      saveFormData({
        description,
        personalDetails,
        forDetails,
        propertyType,
        totalFlats,
      });
    }
  }, [description, personalDetails, forDetails, propertyType, totalFlats]);

  useEffect(() => {
    if (propertyType !== "flat") {
      setTotalFlats("");
    }
  }, [propertyType]);

  return (
    <ScrollView>
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 24, marginBottom: 20 }}>Description</Text>
        <View style={{ marginBottom: 20 }}>
          <Text>Property Listed By</Text>
          <Picker
            selectedValue={personalDetails}
            onValueChange={(itemValue, itemIndex) =>
              setPersonalDetails(itemValue)
            }
            style={{
              borderWidth: 1,
              borderColor: "gray",
              borderRadius: 5,
              padding: 10,
            }}
          >
            <Picker.Item label="Select" value="" />
            <Picker.Item label="Owner" value="owner" />
            <Picker.Item label="Agent" value="agent" />
          </Picker>
        </View>
        <View style={{ marginBottom: 20 }}>
          <Text>Property Listing Type</Text>
          <Picker
            selectedValue={forDetails}
            onValueChange={(itemValue, itemIndex) => setForDetails(itemValue)}
            style={{
              borderWidth: 1,
              borderColor: "gray",
              borderRadius: 5,
              padding: 10,
            }}
          >
            <Picker.Item label="Select" value="" />
            <Picker.Item label="Sell" value="sell" />
            <Picker.Item label="Rent" value="rent" />
          </Picker>
        </View>
        <View style={{ marginBottom: 20 }}>
          <Text>Type of Property</Text>
          <Picker
            selectedValue={propertyType}
            onValueChange={(itemValue, itemIndex) => setPropertyType(itemValue)}
            style={{
              borderWidth: 1,
              borderColor: "gray",
              borderRadius: 5,
              padding: 10,
            }}
          >
            <Picker.Item label="Select" value="" />
            <Picker.Item label="Flat/Apartment" value="flat" />
            <Picker.Item label="Residential House" value="residentailhouse" />
            {/* Add other property types here */}
          </Picker>
        </View>
        {propertyType === "flat" && (
          <View style={{ marginBottom: 20 }}>
            <Text>Total Number of Flats:</Text>
            <Picker
              selectedValue={totalFlats}
              onValueChange={(itemValue, itemIndex) => setTotalFlats(itemValue)}
              style={{
                borderWidth: 1,
                borderColor: "gray",
                borderRadius: 5,
                padding: 10,
              }}
            >
              <Picker.Item label="Select" value="" />
              <Picker.Item label="Below 50" value="below50" />
              <Picker.Item label="Between 50 and 100" value="between50and100" />
              <Picker.Item label="Above 100" value="above100" />
            </Picker>
          </View>
        )}
        <View style={{ marginBottom: 20 }}>
          <Text>What makes this place special?</Text>
          <TextInput
            value={description}
            onChangeText={handleDescriptionChange}
            placeholder="Enter description about the property (max 1000 characters)"
            multiline={true}
            numberOfLines={1}
            style={{
              borderWidth: 1,
              borderColor: "gray",
              borderRadius: 5,
              padding: 10,
            }}
          />
          <Text style={{ color: "red" }}>{warning}</Text>
          <Text style={{ color: "gray" }}>
            {description.length}/{maxDescriptionLength}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default Description;
