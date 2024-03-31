import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import { store } from "./src/redux/store";
import "react-native-gesture-handler";
import * as Location from "expo-location";
import * as MediaLibrary from "expo-media-library"; // Import MediaLibrary
import { UserLocationContext } from "./src/context/UserLocationContext";
import { UserStorageContext } from "./src/context/UserStorageContext"; // Import UserStoragePermissionContext
import AppNavigation from "./src/components/navigators/AppNavigation";

export default function App() {
  const [location, setLocation] = useState(null);
  const [storagePermission, setStoragePermission] = useState(null); // State for storage permission
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      // Request foreground location permission
      let { status: locationStatus } =
        await Location.requestForegroundPermissionsAsync();
      if (locationStatus !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      // Request local storage permission
      let { status: storageStatus } =
        await MediaLibrary.requestPermissionsAsync();
      if (storageStatus !== "granted") {
        setErrorMsg("Permission to access local storage was denied");
        return;
      }

      // Get current location
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);

      // Set storage permission status
      setStoragePermission(storageStatus === "granted");
    })();
  }, []);

  return (
    <Provider store={store}>
      <UserLocationContext.Provider value={{ location, setLocation }}>
        <UserStorageContext.Provider
          value={{ storagePermission, setStoragePermission }} // Provide storage permission value to context
        >
          <NavigationContainer>
            <AppNavigation />
          </NavigationContainer>
        </UserStorageContext.Provider>
      </UserLocationContext.Provider>
    </Provider>
  );
}
