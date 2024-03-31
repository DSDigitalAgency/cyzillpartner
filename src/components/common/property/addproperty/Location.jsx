import React, { useState, useEffect, useRef, useContext } from "react";
import {
  View,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Text,
} from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import LocationDetails from "./LocationDetails";
import { UserLocationContext } from "../../../../context/UserLocationContext";

const { width, height } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.00435;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const GOOGLE_MAPS_API_KEY = "AIzaSyBzE9bz84Bdwy24I5DAjwVhgjijqgrEEdU";

const Location = ({ formData, saveFormData }) => {
  const userLocation = useContext(UserLocationContext);
  const [region, setRegion] = useState({
    latitude:
      userLocation && userLocation.coords
        ? userLocation.coords.latitude || 17.406498
        : 17.406498,
    longitude:
      userLocation && userLocation.coords
        ? userLocation.coords.longitude || 78.47724389999999
        : 78.47724389999999,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });

  const [address, setAddress] = useState("");
  const [addressFetched, setAddressFetched] = useState(false);
  const mapRef = useRef(null);

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${region.latitude},${region.longitude}&key=${GOOGLE_MAPS_API_KEY}`
        );
        const data = await response.json();
        if (data.results && data.results.length > 0) {
          const address = data.results[0].formatted_address;
          setAddress(address);
          setAddressFetched(true);
        } else {
          console.log("No address found");
        }
      } catch (error) {
        console.error("Error fetching address:", error);
      }
    };

    fetchAddress();
  }, [region]);

  const handleMapPress = () => {
    mapRef.current.setNativeProps({ scrollEnabled: true });
  };

  const handleRegionChange = (newRegion) => {
    setRegion(newRegion);
  };

  return (
    <ScrollView>
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 24, marginBottom: 20 }}>Location</Text>
        <TouchableOpacity onPress={handleMapPress} activeOpacity={1}>
          <MapView
            provider={PROVIDER_GOOGLE}
            ref={mapRef}
            showsUserLocation={true}
            style={{ height: 208, marginBottom: 20 }}
            region={region}
            onRegionChangeComplete={handleRegionChange}
          >
            <Marker coordinate={region} />
          </MapView>
        </TouchableOpacity>
        <LocationDetails
          address={address}
          handleLatitudeChange={(value) =>
            setRegion({ ...region, latitude: parseFloat(value) })
          }
          handleLongitudeChange={(value) =>
            setRegion({ ...region, longitude: parseFloat(value) })
          }
        />
      </View>
    </ScrollView>
  );
};

export default Location;
