import React, { useEffect, useState } from "react";
import {
  Share,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import BASE_URL from "../config";
import PropertyCard from "../components/common/property/PropertyCard";

const ListedProperties = ({ navigation }) => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const [username, setUsername] = useState(currentUser?.username || ""); // Update this line
  const [properties, setProperties] = useState([]);

  useEffect(() => {}, [dispatch]);

  useEffect(() => {
    // Update local state when currentUser changes
    if (currentUser && currentUser.others) {
      setUsername(currentUser.username || ""); // Update this line
    }
  }, [currentUser]);

  useEffect(() => {
    // Fetch properties only when the username is available
    if (username) {
      const fetchData = async () => {
        try {
          const response = await fetch(
            `${BASE_URL}/api/property/properties/user/${username}`
          );
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const data = await response.json();
          setProperties(data);
        } catch (error) {
          console.error("Error fetching properties:", error.message);
        }
      };

      fetchData();
    }
  }, [username]);

  const handleEdit = (propertyId) => {
    // Implement the property deletion logic
    console.log(`Edit property: ${propertyId}`);
  };

  const handleDelete = (propertyId) => {
    // Display a confirmation dialog
    Alert.alert(
      "Confirm Deletion",
      "Do you want to delete this property?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => deleteProperty(propertyId),
        },
      ],
      { cancelable: false }
    );
  };

  const deleteProperty = async (propertyId) => {
    try {
      console.log(`Deleting property: ${propertyId}`);

      const response = await fetch(
        `${BASE_URL}/api/property/properties/${propertyId}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        // Optionally, you can update the local state after successful deletion
        setProperties((prevProperties) =>
          prevProperties.filter((prop) => prop._id !== propertyId)
        );
      } else {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error deleting property:", error.message);
    }
  };

  const handleShare = (property) => {
    // Implement the property sharing logic
    const message = `Check out this property at ${property.location.address}. It's listed for ₹.${property.price}.`;
    const propertyLink = `${BASE_URL}/api/property/properties/${property._id}`; // Replace with your actual deep link or URL

    Share.share({
      message: `${message}\n\n${propertyLink}`,
      title: "Property Details",
      url: propertyLink,
    }).catch((error) => console.error("Error sharing property:", error));
  };

  return (
    <ScrollView className="flex-1">
      {/* ... (other JSX) */}
      {properties.length === 0 ? (
        <View className="flex-1 justify-center items-center mt-16">
          <Text className="text-lg mb-4">No properties found.</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("AddProperty")}
            className="bg-sky-600 px-2 py-4 rounded-lg"
          >
            <Text className="text-lg font-bold">Add Property</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View className="flex-row flex-wrap justify-center p-4">
          {properties.map((property) => (
            <PropertyCard
              key={property._id}
              property={property}
              navigation={navigation}
              customStyles={styles.propertyContainer}
            />
          ))}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  propertyContainer: {
    width: "95%",
    backgroundColor: "#ccc",
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    alignItems: "center",
    position: "relative",
  },
});

export default ListedProperties;
