import { View } from "react-native";
import React from "react";
import { ThemeToggle } from "./ThemeToggle";
import CustomText from "./ui/CustomText";
import CustomAvatar from "./ui/CustomAvatar";
import { Link } from "expo-router";

const Header = () => {
  return (
    <View className="flex  min-w-full flex-row justify-between items-center">
      <Link href="/user/profile">
        <CustomAvatar src="https://lh3.googleusercontent.com/a/ACg8ocKWZosXAn6XXInLC55UpVIJxipkztSIejFovvU8he9WyaUwt7rouw=s96-c" />
      </Link>
      <CustomText className="text-2xl">HKSJ Fitness</CustomText>
      <ThemeToggle />
    </View>
  );
};

export default Header;
