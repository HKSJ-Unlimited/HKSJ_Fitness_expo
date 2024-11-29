import { View, Text, SafeAreaView } from "react-native";
import React, { ReactNode } from "react";
import { ThemeToggle } from "./ThemeToggle";
import CustomText from "./ui/CustomText";

const Header = () => {
  return (
    <View className="flex flex-1 min-w-full flex-row justify-between items-center">
      <CustomText className="text-2xl">User</CustomText>
      <CustomText className="text-2xl">HKSJ Fitness</CustomText>
      <ThemeToggle />
    </View>
  );
};

export default Header;
