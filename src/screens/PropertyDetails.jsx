import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
  Text,
  ScrollView,
  SafeAreaView,
  Linking,
} from "react-native";
import Swiper from "react-native-swiper";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

import BASE_URL from "../config";

const PropertyDetails = ({ route }) => {
  const navigation = useNavigation();
  const [propertyDetails, setPropertyDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [propertyCoordinates, setPropertyCoordinates] = useState(null);

  useEffect(() => {
    // Check if route or route.params is undefined
    if (!route || !route.params) {
      console.error("Route or route.params is undefined.");
      setError("Invalid route params");
      setLoading(false);
      return;
    }

    const { propertyId } = route.params;

    // Fetch property details from your API using the property ID
    fetchPropertyDetails(propertyId);
  }, [route]);

  const fetchPropertyDetails = async (propertyId) => {
    try {
      const response = await fetch(
        `${BASE_URL}/api/property/properties/${propertyId}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      // Set the property details state
      setPropertyDetails(data);

      // Extract coordinates from the location object
      const { lat, lng, address } = data.location;

      // Set the property coordinates state
      setPropertyCoordinates({ latitude: lat, longitude: lng });

      // Fetch coordinates based on the property address if needed
      // const coordinates = await Geocoding.from(address);
      // const { lat, lng } = coordinates.results[0].geometry.location;

      setLoading(false);
    } catch (error) {
      console.error("Error fetching property details:", error);
      setError("Error fetching property details");
      setLoading(false);
    }
  };

  const dateObject = new Date(propertyDetails.updatedAt);
  const formattedDate = dateObject.toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  const BackPressed = () => {
    navigation.goBack();
  };
  const sharePressed = () => {
    console.log("Share Pressed");
  };
  const contactpressed = () => {
    if (propertyDetails.phoneNumber) {
      // Use Linking to initiate a phone call
      Linking.openURL(`tel:${propertyDetails.phoneNumber}`);
    } else {
      console.log("Phone number not available");
    }
  };

  const handleIndexChanged = (index) => {
    setCurrentIndex(index);
  };

  const statusPress = () => {
    console.log("Status Press");
  };
  const editPress = () => {
    console.log("Edit Press");
  };
  const deletePress = () => {
    console.log("Delete Press");
  };

  return (
    <SafeAreaView className="flex-1 bg-sky-100 dark:bg-sky-800">
      <ScrollView>
        <View>
          <View>
            <TouchableOpacity
              className="absolute bg-black/20 p-2 content-center rounded-full top-6 right-6 z-10"
              onPress={sharePressed}
            >
              <MaterialIcons name="share" size={24} color="white" />
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              className="absolute bg-black/20 p-2 content-center rounded-full top-6 left-6 z-10"
              onPress={BackPressed}
            >
              <MaterialIcons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
          </View>
          <View>
            <Text className="absolute bg-black/20 px-2 py-1 rounded-lg top-60 right-6 z-10 text-white">{`${
              currentIndex + 1
            }/${
              propertyDetails.photos ? propertyDetails.photos.length : 0
            }`}</Text>
          </View>
        </View>
        <View className="mb-[-500]">
          {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <View>
              {propertyDetails.photos && propertyDetails.photos.length > 0 ? (
                <Swiper
                  showsPagination={false}
                  loop={false}
                  onIndexChanged={handleIndexChanged}
                >
                  {propertyDetails.photos.map((item, index) => (
                    <Image
                      key={index}
                      source={{ uri: item }}
                      resizeMode="contain"
                      className="w-full h-72"
                    />
                  ))}
                </Swiper>
              ) : (
                <Text>No photos available</Text>
              )}
            </View>
          )}
        </View>

        <View className="px-4 pt-2 border border-black">
          <View className="flex-row">
            <View className="flex-1">
              <Text className="text-lg font-bold">
                {propertyDetails.forDetails === "rent"
                  ? `Price: ₹${propertyDetails.price} / Month`
                  : `Price: ₹${propertyDetails.price}`}
              </Text>
            </View>
            <View className="flex-1">
              <Text className="text-lg font-bold capitalize">
                {`Plan: ${propertyDetails.licenseCardStatus?.plan || "None"}`}
              </Text>
            </View>
          </View>
          <View className="flex-1">
            <Text className="text-lg font-bold">
              {`sold Status: ${propertyDetails.soldStatus}`}
            </Text>
          </View>
        </View>

        <View className="px-4 pt-2 ">
          <View className="mb-2">
            <View className="flex-row items-center mb-1">
              <MaterialIcons name="bed" size={24} color="black" />
              <Text className="text-base ml-1">{` ${propertyDetails.bedrooms} Bedrooms   `}</Text>
              <MaterialIcons name="home" size={24} color="black" />
              <Text className="text-base ml-1">{` ${propertyDetails.coveredArea} sqft`}</Text>
            </View>
            <View className="flex-row items-center mt-2">
              <MaterialIcons name="location-pin" size={24} color="black" />
              <Text className="text-base ml-1">
                {propertyDetails.location
                  ? propertyDetails.location.address
                  : "Location not available"}
              </Text>
            </View>
            <View className="flex-row items-center mt-2 p-2 bg-sky-200 dark:bg-sky-700 rounded-xl">
              <View className="mr-2">
                <Image
                  source={{ uri: propertyDetails.photo }}
                  className="w-11 h-11 rounded-full"
                />
              </View>
              <View className="flex-col max-w-[70%]">
                <Text className="text-base font-bold">{` ${propertyDetails.username} `}</Text>
                <Text className="text-sm">{` ${propertyDetails.personalDetails} `}</Text>
              </View>
              <View className="ml-auto">
                <TouchableOpacity onPress={contactpressed}>
                  <View className="ml-2 p-2 rounded-full bg-black/20">
                    <MaterialIcons name="phone" size={24} color="black" />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        <View className="px-4">
          <View className="p-2 rounded-lg">
            <View className="mb-1">
              <Text className="text-lg font-bold ">
                Main Features of Property :
              </Text>
              <Text className="text-base">{`• BedRooms: ${propertyDetails.bedrooms} rooms`}</Text>
              <Text className="text-base">{`• BathRooms: ${propertyDetails.bathrooms} bathrooms`}</Text>
              <Text className="text-base">{`• Covered Area: ${propertyDetails.coveredArea} sqft`}</Text>
              <Text className="text-base">{`• Carpet Area: ${propertyDetails.carpetArea} sqft`}</Text>
              <Text className="text-base">{`• Furnished Status: ${propertyDetails.furnishedStatus}`}</Text>
            </View>
            <View className="p-2 rounded-lg">
              <Text className="text-lg font-bold mb-1">Description :</Text>
              <Text className="text-base mb-1">{`${propertyDetails.description}`}</Text>
            </View>
          </View>
          <View>
            <Text className="text-lg font-bold ">
              Property location on maps :
            </Text>
            {propertyCoordinates && (
              <MapView
                provider={PROVIDER_GOOGLE}
                className="h-52 my-2"
                initialRegion={{
                  latitude: propertyCoordinates.latitude,
                  longitude: propertyCoordinates.longitude,
                  latitudeDelta: 0.00435,
                  longitudeDelta: 0.00211,
                }}
              >
                <Marker
                  coordinate={{
                    latitude: propertyCoordinates.latitude,
                    longitude: propertyCoordinates.longitude,
                  }}
                  title="Property Location"
                  description={propertyDetails.location.address}
                />
              </MapView>
            )}
          </View>

          <View>
            <View className="p-2 rounded-lg">
              <Text className="text-lg font-bold mb-2">
                Additional Features :
              </Text>
              <View className="mb-2">
                <Text className="text-base font-bold mb-1">Amenities :</Text>
                {propertyDetails.amenities &&
                propertyDetails.amenities.length > 0 ? (
                  <View className="flex-row flex-wrap">
                    {propertyDetails.amenities.map((amenity, index) => (
                      <Text
                        key={index}
                        className="text-base mr-2 bg-sky-500 py-[2] px-1 rounded-md"
                      >
                        {amenity}
                      </Text>
                    ))}
                  </View>
                ) : (
                  <Text>No amenities available</Text>
                )}
              </View>
              <View>
                <Text className="text-base font-bold mb-1">
                  Other Details :
                </Text>
                <Text className="text-base">{`• Construction Year: ${propertyDetails.constructionYear}`}</Text>
                <Text className="text-base">{`• Advance Deposit: ${propertyDetails.advanceDeposit}`}</Text>
                <Text className="text-base">{`• Price is: ${propertyDetails.priceIncludes}`}</Text>
                <Text className="text-base">{`• Updated on: ${formattedDate}`}</Text>
              </View>
            </View>
          </View>
        </View>
        <View className="flex-row h-12 justify-between items-center px-4 rounded-t-lg bg-sky-200 dark:bg-sky-700">
          <TouchableOpacity onPress={statusPress} className=" px-5">
            <MaterialIcons name="share" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={editPress} className=" px-5">
            <MaterialIcons name="edit" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={deletePress} className=" px-5">
            <MaterialIcons name="delete" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PropertyDetails;
