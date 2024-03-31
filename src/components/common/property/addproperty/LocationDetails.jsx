import React from "react";
import { View, TextInput, StyleSheet } from "react-native";

const LocationDetails = ({ address }) => {
  return (
    <View style={styles.container}>
      <TextInput
        value={address}
        editable={false}
        multiline={true} // Set multiline to true
        style={styles.input}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginBottom: 20,
  },
  input: {
    width: "90%",
    padding: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    color: "black",
  },
});

export default LocationDetails;
