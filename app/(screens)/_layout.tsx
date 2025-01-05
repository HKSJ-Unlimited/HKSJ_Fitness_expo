import { Stack } from "expo-router";
import { SheetProvider } from "react-native-actions-sheet";
import "../../components/Sheets/Sheets";
import { db, expoDB } from "@/db/init";
import { useDrizzleStudio } from "expo-drizzle-studio-plugin";
import { signInAnonymously, onAuthStateChanged } from "firebase/auth";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { useEffect } from "react";
import { usersTable } from "@/db/schema";
export default function AuthLayout() {
  // to debug drizzle
  useDrizzleStudio(expoDB);

  // Handle user state changes
  async function onAuthStateChanged(user: FirebaseAuthTypes.User | null) {
    if (!user) {
      await auth().signInAnonymously();
      await db.insert(usersTable).values({});
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged((user) =>
      onAuthStateChanged(user)
    );
    return subscriber;
  }, []);

  return (
    <SheetProvider>
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
        <Stack.Screen
          name="user/profile"
          options={{ headerTitle: "Profile" }}
        />
      </Stack>
    </SheetProvider>
  );
}
