import React, { useState } from "react";
import { View, Text, ScrollView, Button } from "react-native";
import { Picker } from "@react-native-picker/picker";
import PropertyCard from "../PropertyCard";

const plans = [
  {
    name: "Bronze",
    days: "29 days",
    support: "Business hours only",
    listing: "Instantly",
    emailSupport: true,
    inquiry: "Unlimited",
    price: "₹ 49",
    color: "bg-bronze",
  },
  {
    name: "Silver",
    days: "89 days",
    support: "Business hours only",
    listing: "Instantly",
    emailSupport: true,
    inquiry: "Unlimited",
    price: "₹ 129",
    color: "bg-silver",
  },
  {
    name: "Gold",
    days: "186 days",
    support: "Business hours only",
    listing: "Instantly",
    emailSupport: true,
    inquiry: "Unlimited",
    price: "₹ 309",
    color: "bg-gold",
  },
  {
    name: "Platinum",
    days: "365 days",
    support: "Business hours only",
    listing: "Instantly",
    emailSupport: true,
    inquiry: "Unlimited",
    price: "₹ 369",
    color: "bg-platinum",
  },
];

function calculateTaxes(price) {
  const numericPrice = Number(price.replace(/[^0-9.-]+/g, ""));
  const taxes = numericPrice * 0.05;
  return `₹ ${taxes.toFixed(2)}`;
}

function calculateTotal(price, taxes) {
  const numericPrice = Number(price.replace(/[^0-9.-]+/g, ""));
  const numericTaxes = Number(taxes.replace(/[^0-9.-]+/g, ""));
  const total = numericPrice + numericTaxes;
  return `₹ ${total.toFixed(2)}`;
}

const Plans = () => {
  const [selectedPlan, setSelectedPlan] = useState(plans[0]);

  const handleCheckout = () => {
    console.log("Checkout button pressed");
    // Implement your checkout logic here
  };

  return (
    <ScrollView>
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>
          Cart
        </Text>
        <View style={{ flexDirection: "row", marginBottom: 20 }}>
          <View style={{ flex: 3 }}>
            <Text style={{ fontWeight: "bold" }}>Property Card</Text>
            <PropertyCard property={selectedPlan} />
          </View>
          <View style={{ flex: 2 }}>
            <Text style={{ fontWeight: "bold" }}>Price</Text>
            <Text>{selectedPlan.price}</Text>
            <Text style={{ fontWeight: "bold" }}>Property Plan</Text>
            <Picker
              selectedValue={selectedPlan.name}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedPlan(plans[itemIndex])
              }
            >
              {plans.map((plan, index) => (
                <Picker.Item key={index} label={plan.name} value={plan.name} />
              ))}
            </Picker>
          </View>
        </View>
        <View style={{ flex: 1 }}>
          <View
            style={{ backgroundColor: "white", borderRadius: 10, padding: 20 }}
          >
            <Text
              style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}
            >
              Summary
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 5,
              }}
            >
              <Text>Property Plan</Text>
              <Text>{selectedPlan.price}</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 5,
              }}
            >
              <Text>Taxes 5%</Text>
              <Text>{calculateTaxes(selectedPlan.price)}</Text>
            </View>
            <View
              style={{
                borderBottomWidth: 1,
                borderBottomColor: "black",
                marginBottom: 5,
              }}
            />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 5,
              }}
            >
              <Text style={{ fontWeight: "bold" }}>Total</Text>
              <Text style={{ fontWeight: "bold" }}>
                {calculateTotal(
                  selectedPlan.price,
                  calculateTaxes(selectedPlan.price)
                )}
              </Text>
            </View>
            <Button
              onPress={handleCheckout}
              title="Checkout"
              style={{ backgroundColor: "blue", color: "white", marginTop: 20 }}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Plans;
