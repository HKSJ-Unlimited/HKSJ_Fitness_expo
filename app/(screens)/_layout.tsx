import { Stack } from "expo-router";
import { useDrizzleStudio } from "expo-drizzle-studio-plugin";
import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { useEffect } from "react";
import { goalsTable, totalCalories, usersTable } from "@/db/schema";
import { useSQLiteContext } from "expo-sqlite";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { getApp } from "@react-native-firebase/app";
import { mealType } from "@/Types/SharedTypes";

export default function AuthLayout() {
  const db = useSQLiteContext();
  const drizzleDb = drizzle(db);
  // to debug drizzle
  useDrizzleStudio(db);

  // Handle user state changes
  async function onAuthStateChanged(user: FirebaseAuthTypes.User | null) {
    if (!user) {
      await getApp().auth().signInAnonymously();
      const user = await drizzleDb.insert(usersTable).values({}).returning({
        id: usersTable.id,
      });
      await drizzleDb.insert(goalsTable).values({
        calories: 2000,
        weight: 69,
        userId: user[0].id,
      });
      await drizzleDb.insert(totalCalories).values({
        type: mealType.breakfast,
      });

      await drizzleDb.insert(totalCalories).values({
        type: mealType.lunch,
      });
      await drizzleDb.insert(totalCalories).values({
        type: mealType.dinner,
      });
      await drizzleDb.insert(totalCalories).values({
        type: mealType.snack,
      });
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
