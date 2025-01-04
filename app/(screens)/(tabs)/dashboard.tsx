import CustomColors from "@/components/ui/CustomColors";
import { useFocusEffect } from "expo-router";
import { useCallback, useEffect } from "react";
import { View } from "react-native";
import { SheetManager } from "react-native-actions-sheet";

export default function Dashboard() {
  useFocusEffect(
    useCallback(() => {
      console.log("Hello, Im focused!");
      SheetManager.show("BottomLoginSheet");
      return () => {
        console.log("This route is now unfocused.");
      };
    }, [])
  );
  return (
    <View className="flex flex-1">
      <CustomColors />
    </View>
  );
}
