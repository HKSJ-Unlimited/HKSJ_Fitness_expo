import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import SearchBar from "@/components/SearchBar";

const AddFood = () => {
  const { type } = useLocalSearchParams();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ title: `Add ${type}` });
  }, [navigation]);
  return (
    <View className="flex-1">
      <View className="flex-1 mt-4">
        <SearchBar />
      </View>
    </View>
  );
};

export default AddFood;
