import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";

const Details = ({ formData, saveFormData }) => {
  const [bedrooms, setBedrooms] = useState(formData.bedrooms || "");
  const [bathrooms, setBathrooms] = useState(formData.bathrooms || "");
  const [totalFloors, setTotalFloors] = useState(formData.totalFloors || "");
  const [floorNumber, setFloorNumber] = useState(formData.floorNumber || "");
  const [furnishedStatus, setFurnishedStatus] = useState(
    formData.furnishedStatus || "Furnished"
  );
  const [coveredArea, setCoveredArea] = useState(formData.coveredArea || "");
  const [carpetArea, setCarpetArea] = useState(formData.carpetArea || "");
  const [constructionYear, setConstructionYear] = useState(
    formData.constructionYear || ""
  );
  const [selectedAmenities, setSelectedAmenities] = useState([]);

  const handleBedroomsChange = (value) => {
    setBedrooms(value);
    saveFormData({ bedrooms: value });
  };

  const handleBathroomsChange = (value) => {
    setBathrooms(value);
    saveFormData({ bathrooms: value });
  };

  const handleTotalFloorsChange = (value) => {
    setTotalFloors(value);
    saveFormData({ totalFloors: value });
  };

  const handleFloorNumberChange = (value) => {
    setFloorNumber(value);
    saveFormData({ floorNumber: value });
  };

  const handleFurnishedStatusChange = (value) => {
    setFurnishedStatus(value);
    saveFormData({ furnishedStatus: value });
  };

  const handleCoveredAreaChange = (value) => {
    setCoveredArea(value);
    saveFormData({ coveredArea: value });
  };

  const handleCarpetAreaChange = (value) => {
    setCarpetArea(value);
    saveFormData({ carpetArea: value });
  };

  const handleConstructionYearChange = (value) => {
    setConstructionYear(value);
    saveFormData({ constructionYear: value });
  };

  const amenitiesOptions = [
    "Water",
    "Parking",
    "Pool",
    "Gym",
    "Wifi",
    "Security",
    "Lift",
    "Power Backup",
  ];

  const toggleAmenity = (amenity) => {
    if (selectedAmenities.includes(amenity)) {
      setSelectedAmenities(
        selectedAmenities.filter((item) => item !== amenity)
      );
    } else {
      setSelectedAmenities([...selectedAmenities, amenity]);
    }
  };

  return (
    <View>
      <Text style={{ marginBottom: 5 }}>Bedrooms:</Text>
      <TextInput
        placeholder="Enter number of bedrooms"
        keyboardType="numeric"
        value={bedrooms}
        onChangeText={handleBedroomsChange}
        style={{
          borderWidth: 1,
          borderColor: "gray",
          padding: 10,
          marginBottom: 10,
        }}
      />
      <Text style={{ marginBottom: 5 }}>Bathrooms:</Text>
      <TextInput
        placeholder="Enter number of bathrooms"
        keyboardType="numeric"
        value={bathrooms}
        onChangeText={handleBathroomsChange}
        style={{
          borderWidth: 1,
          borderColor: "gray",
          padding: 10,
          marginBottom: 10,
        }}
      />
      <Text style={{ marginBottom: 5 }}>Total Floors:</Text>
      <TextInput
        placeholder="Enter total number of floors"
        keyboardType="numeric"
        value={totalFloors}
        onChangeText={handleTotalFloorsChange}
        style={{
          borderWidth: 1,
          borderColor: "gray",
          padding: 10,
          marginBottom: 10,
        }}
      />
      <Text style={{ marginBottom: 5 }}>Floor Number:</Text>
      <TextInput
        placeholder="Enter floor number"
        keyboardType="numeric"
        value={floorNumber}
        onChangeText={handleFloorNumberChange}
        style={{
          borderWidth: 1,
          borderColor: "gray",
          padding: 10,
          marginBottom: 10,
        }}
      />
      <Text style={{ marginBottom: 5 }}>Furnished Status:</Text>
      <Picker
        selectedValue={furnishedStatus}
        onValueChange={handleFurnishedStatusChange}
        style={{ borderWidth: 1, borderColor: "gray", marginBottom: 10 }}
      >
        <Picker.Item label="Furnished" value="Furnished" />
        <Picker.Item label="Semi-Furnished" value="Semi-Furnished" />
        <Picker.Item label="Unfurnished" value="Unfurnished" />
      </Picker>
      <Text style={{ marginBottom: 5 }}>Covered Area:</Text>
      <TextInput
        placeholder="Enter covered area in sqft"
        keyboardType="numeric"
        value={coveredArea}
        onChangeText={handleCoveredAreaChange}
        style={{
          borderWidth: 1,
          borderColor: "gray",
          padding: 10,
          marginBottom: 10,
        }}
      />
      <Text style={{ marginBottom: 5 }}>Carpet Area:</Text>
      <TextInput
        placeholder="Enter carpet area in sqft"
        keyboardType="numeric"
        value={carpetArea}
        onChangeText={handleCarpetAreaChange}
        style={{
          borderWidth: 1,
          borderColor: "gray",
          padding: 10,
          marginBottom: 10,
        }}
      />
      <Text style={{ marginBottom: 5 }}>Year of Construction:</Text>
      <TextInput
        placeholder="Enter year of construction"
        keyboardType="numeric"
        value={constructionYear}
        onChangeText={handleConstructionYearChange}
        style={{
          borderWidth: 1,
          borderColor: "gray",
          padding: 10,
          marginBottom: 10,
        }}
      />
      <Text style={{ marginBottom: 5 }}>Amenities:</Text>
      <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
        {amenitiesOptions.map((amenity, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => toggleAmenity(amenity)}
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginRight: 20,
              marginBottom: 10,
            }}
          >
            <View
              style={{
                width: 20,
                height: 20,
                borderRadius: 10,
                borderWidth: 1,
                alignItems: "center",
                justifyContent: "center",
                marginRight: 5,
                backgroundColor: selectedAmenities.includes(amenity)
                  ? "blue"
                  : "white",
              }}
            >
              {selectedAmenities.includes(amenity) && (
                <Text style={{ color: "white" }}>✓</Text>
              )}
            </View>
            <Text>{amenity}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default Details;
