import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";

const AddFood = () => {
  const { type } = useLocalSearchParams();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ title: `Add ${type}` });
  }, [navigation]);
  return (
    <View>
      <Text>AddFood</Text>
    </View>
  );
};

export default AddFood;
