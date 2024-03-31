import React, { useState } from "react";
import { View, Button, ScrollView } from "react-native";

import Description from "../components/common/property/addproperty/Description";
import Media from "../components/common/property/addproperty/Media";
import Location from "../components/common/property/addproperty/Location";
import Details from "../components/common/property/addproperty/Details";
import Payment from "../components/common/property/addproperty/Payment";
import { useSelector } from "react-redux";

const steps = [Description, Media, Location, Details, Payment];

const AddProperty = () => {
  const { currentUser } = useSelector((state) => state.user);
  const username = currentUser?.username;
  const photo = currentUser?.photo;
  const phoneNumber = currentUser?.phoneNumber;
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({});

  const handleNextStep = (data) => {
    setFormData({ ...formData, ...data });
    if (step < steps.length - 1) {
      setStep(step + 1);
    }
  };

  const handlePreviousStep = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const handleSubmit = (data) => {
    setFormData({ ...formData, ...data });
    console.log("Form submitted!");
    console.log("Form data:", formData);
  };

  const CurrentStepComponent = steps[step];

  return (
    <ScrollView>
      <CurrentStepComponent formData={formData} saveFormData={handleNextStep} />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 20,
          marginTop: 10,
        }}
      >
        {step > 0 && <Button onPress={handlePreviousStep} title="Previous" />}
        {step < steps.length - 1 && (
          <Button onPress={() => setStep(step + 1)} title="Next" />
        )}
        {step === steps.length - 1 && (
          <Button onPress={() => handleSubmit(formData)} title="Submit" />
        )}
      </View>
    </ScrollView>
  );
};

export default AddProperty;
