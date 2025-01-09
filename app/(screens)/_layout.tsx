import { Stack } from "expo-router";
import { useDrizzleStudio } from "expo-drizzle-studio-plugin";
import { signInAnonymously, onAuthStateChanged } from "firebase/auth";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { useEffect } from "react";
import { usersTable } from "@/db/schema";
import { useSQLiteContext } from "expo-sqlite";
import { drizzle } from "drizzle-orm/expo-sqlite";
export default function AuthLayout() {
  const db = useSQLiteContext();
  const drizzleDb = drizzle(db);
  // to debug drizzle
  useDrizzleStudio(db);

  // Handle user state changes
  async function onAuthStateChanged(user: FirebaseAuthTypes.User | null) {
    if (!user) {
      await auth().signInAnonymously();
      await drizzleDb.insert(usersTable).values({});
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged((user) =>
      onAuthStateChanged(user)
    );
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
