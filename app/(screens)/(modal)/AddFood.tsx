import { View } from "react-native";
import React, { useEffect } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import SearchBar from "@/components/SearchBar";
import { mealType } from "@/Types/SharedTypes";

const AddFood = () => {
  const {
    type,
  }: {
    type: mealType;
  } = useLocalSearchParams();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ title: `Add ${type}` });
  }, [navigation]);
  return (
    <View className="flex-1">
      <View className="flex-1 mt-4">
        <SearchBar meal={type} />
      </View>
    </View>
  );
};

export default AddFood;
