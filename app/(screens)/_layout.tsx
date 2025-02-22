import { Stack } from "expo-router";
import { useDrizzleStudio } from "expo-drizzle-studio-plugin";
import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { useEffect } from "react";
import { useSQLiteContext } from "expo-sqlite";
import { getApp } from "@react-native-firebase/app";
import { useInitUser } from "@/db/User";

export default function AuthLayout() {
  const db = useSQLiteContext();

  // to debug drizzle
  useDrizzleStudio(db);

  // Handle user state changes
  async function onAuthStateChanged(user: FirebaseAuthTypes.User | null) {
    if (!user) {
      await getApp().auth().signInAnonymously();
      useInitUser(db);
    }
  }

  useEffect(() => {
    const subscriber = getApp()
      .auth()
      .onAuthStateChanged((user) => onAuthStateChanged(user));
    return subscriber;
  }, []);

  return (
    <Stack
      screenOptions={{
        animation: "ios_from_left",
      }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="(modal)/AddFood"
        options={{
          presentation: "modal",
          animation: "fade_from_bottom",
        }}
      />
      <Stack.Screen name="user/Profile" options={{ headerTitle: "Profile" }} />
    </Stack>
  );
}
