import CustomButton from "@/components/ui/CustomButton";
import CustomText from "@/components/ui/CustomText";
import useDebounce from "@/hooks/useDebounce";
import { QrCode } from "@/lib/icons/QRIcon";
import { Search } from "@/lib/icons/Search";
import { X } from "@/lib/icons/X";
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

const SearchBar = () => {
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
      clearSearch();
    }
  };

  const handleFoodSelection = (foodId: number) => {
    console.log(foodId);
  };

  const clearSearch = () => {
    setQuery("");
    setResults([]);
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View className="flex-1">
        <View className="flex flex-row bg-primary-foreground  p-4 mt-3 rounded-xl mx-4">
          <Search size={20} className="mr-2 text-primary" />
          <TextInput
            value={query}
            onChangeText={handleSearch}
            placeholder="What are you looking for?"
            className="flex-1  placeholder:text-muted-foreground"
          />
          {query.length > 0 && (
            <X onPress={clearSearch} size={20} className="mr-2 text-primary" />
          )}
          <QrCode
            onPress={clearSearch}
            size={20}
            className="mr-2 text-primary"
          />
        </View>
        <View className="flex-1">
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
};

export default SearchBar;
