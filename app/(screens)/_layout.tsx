import { Stack } from "expo-router";
import { SheetProvider } from "react-native-actions-sheet";
import "../../components/Sheets/Sheets";
import { db, expoDB } from "@/db/init";
import { useDrizzleStudio } from "expo-drizzle-studio-plugin";
export default function AuthLayout() {
  // to debug drizzle
  useDrizzleStudio(expoDB);
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
