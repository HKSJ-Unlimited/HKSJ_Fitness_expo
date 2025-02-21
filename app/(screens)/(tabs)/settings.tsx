import { View } from "react-native";
import React from "react";
import CustomButton from "@/components/ui/CustomButton";
import CustomText from "@/components/ui/CustomText";
import auth, {
  linkWithPopup,
  signInWithRedirect,
} from "@react-native-firebase/auth";
import { getApp } from "@react-native-firebase/app";
import { useSQLiteContext } from "expo-sqlite";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { usersTable } from "@/db/schema";
interface FirebaseError extends Error {
  code: string;
}

const Settings = () => {
  const db = useSQLiteContext();
  const drizzleDb = drizzle(db);

  const handleLogout = async () => {
    await getApp().auth().signOut();
  };
  const handleLogin = async () => {
    let user = getApp().auth().currentUser;
    const provider = new auth.OAuthProvider("google.com");
    if (user) {
      try {
        const { additionalUserInfo } = await linkWithPopup(user, provider);
        console.log("additionalUserInfo", additionalUserInfo);
        await drizzleDb.update(usersTable).set({
          email: additionalUserInfo?.profile?.email,
          name: additionalUserInfo?.profile?.name,
          image: additionalUserInfo?.profile?.picture,
        });
      } catch (error) {
        const firebaseError = error as FirebaseError;
        if (firebaseError.code === "auth/credential-already-in-use") {
          await signInWithRedirect(getApp().auth(), provider);
        } else {
          console.log("Error linking account", error);
        }
      }
    }
  };

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
