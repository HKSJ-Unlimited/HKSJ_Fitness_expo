import { View, Text } from "react-native";
import React from "react";
import CustomButton from "@/components/ui/CustomButton";
import CustomText from "@/components/ui/CustomText";
import auth from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

const Settings = () => {
  const handleLogout = async () => {
    await auth().signOut();
    await GoogleSignin.signOut();
  };
  const handleLogin = () => {};
  return (
    <View className="flex-1 justify-center">
      <CustomButton className="bg-primary p-5 mx-28" onPress={handleLogout}>
        <CustomText>Logout</CustomText>
      </CustomButton>
      <CustomButton className="bg-accent p-5 mx-28 mt-5" onPress={handleLogin}>
        <CustomText>Login</CustomText>
      </CustomButton>
    </View>
  );
};

export default Settings;
