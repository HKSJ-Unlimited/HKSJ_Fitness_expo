import CustomText from "@/components/ui/CustomText";
import { Search } from "@/lib/icons/Search";
import { useColorScheme } from "@/lib/useColorScheme";

import {
  Keyboard,
  TextInput,
  TouchableWithoutFeedback,
  View,
  Text,
} from "react-native";

export default function Diary() {
  const { colorScheme } = useColorScheme();
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View className="flex-1">
        <View className="flex flex-row  bg-primary-foreground p-3 mt-3 rounded-xl mx-4">
          <Search size={20} className="mr-2 text-foreground" />
          <TextInput
            placeholderTextColor={colorScheme === "dark" ? "#fff" : "#000"}
            placeholder="Search for some food..."
            className="flex-1 text-foreground"
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
