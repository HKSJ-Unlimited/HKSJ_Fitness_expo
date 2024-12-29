import CustomButton from "@/components/ui/CustomButton";
import CustomText from "@/components/ui/CustomText";
import useDebounce from "@/hooks/useDebounce";
import { Search } from "@/lib/icons/Search";
import { useColorScheme } from "@/lib/useColorScheme";
import { CallAPI } from "@/utlis/FetchInstance";
import { useState } from "react";

import {
  FlatList,
  Keyboard,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";

export default function Diary() {
  const { colorScheme } = useColorScheme();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<IFood[] | []>([]);

  useDebounce(
    query,
    async (query) => {
      try {
        const response = await CallAPI<IFoodList>("/food", "POST", { query });
        setResults(response.data);
      } catch (error) {
        console.log(error);
      }
    },
    1500
  );

  const handleSearch = (text: string) => {
    setQuery(text);
    if (!text) {
      setResults([]);
    }
  };

  const handleFoodSelection = (foodId: number) => {
    console.log(foodId);
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View className="flex-1">
        <View className="flex flex-row  bg-primary-foreground p-3 mt-3 rounded-xl mx-4">
          <Search size={20} className="mr-2 text-foreground" />
          <TextInput
            value={query}
            onChangeText={handleSearch}
            placeholderTextColor={colorScheme === "dark" ? "#fff" : "#000"}
            placeholder="Search for some food..."
            className="flex-1 text-foreground"
          />
        </View>
        <View className="flex-1 bg-primary-foreground">
          {results.length === 0 && query.length > 0 && (
            <CustomText className="text-center">No results found</CustomText>
          )}
          <FlatList
            data={results}
            renderItem={({ item }) => {
              return (
                <CustomButton
                  onPress={() => handleFoodSelection(item.id)}
                  className="bg-primary p-3 mt-2 rounded-xl mx-4"
                >
                  <CustomText className="text-center text-secondary-foreground">
                    {item.name}
                  </CustomText>
                </CustomButton>
              );
            }}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
