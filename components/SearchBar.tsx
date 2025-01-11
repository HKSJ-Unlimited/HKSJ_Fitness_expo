import CustomButton from "@/components/ui/CustomButton";
import CustomText from "@/components/ui/CustomText";
import useDebounce from "@/hooks/useDebounce";
import { CirclePlus } from "@/lib/icons/CirclePlus";
import { QrCode } from "@/lib/icons/QRIcon";
import { Search } from "@/lib/icons/Search";
import { X } from "@/lib/icons/X";
import { CallAPI } from "@/utlis/FetchInstance";
import { useRef, useState } from "react";
import {
  FlatList,
  Keyboard,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import CustomBottomSheet from "./BottomSheet";
import BottomSheet, {
  BottomSheetModal,
  BottomSheetTextInput,
} from "@gorhom/bottom-sheet";
import AddPortion from "./AddPortion";
import {
  IFood,
  IFoodList,
  IFullNutrition,
  mealType,
} from "@/Types/SharedTypes";
import BottomNutritionScreen from "./sheets/BottomNutritionScreen";
const fullNutrition: IFullNutrition[] = [
  {
    name: "Energy",
    unit: "kcal",
    amount: 370,
  },
  {
    name: "Protein",
    unit: "g",
    amount: 6.81,
  },
  {
    name: "Total lipid (fat)",
    unit: "g",
    amount: 0.55,
  },
  {
    name: "Carbohydrate, by difference",
    unit: "g",
    amount: 81.68,
  },
  {
    name: "Fiber, total dietary",
    unit: "g",
    amount: 2.8,
  },
  {
    name: "Magnesium, Mg",
    unit: "mg",
    amount: 23,
  },
  {
    name: "Sodium, Na",
    unit: "mg",
    amount: 7,
  },
  {
    name: "Zinc, Zn",
    unit: "mg",
    amount: 1.2,
  },
  {
    name: "Vitamin C, total ascorbic acid",
    unit: "mg",
    amount: 0,
  },
  {
    name: "Vitamin B-12",
    unit: "µg",
    amount: 0,
  },
  {
    name: "Fatty acids, total monounsaturated",
    unit: "g",
    amount: 0.2,
  },
  {
    name: "Fatty acids, total polyunsaturated",
    unit: "g",
    amount: 0.198,
  },
  {
    name: "Cholesterol",
    unit: "mg",
    amount: 0,
  },
];
const SearchBar = ({ meal }: { meal: mealType }) => {
  const sheetRef = useRef<BottomSheetModal>(null);
  const nutritionSheetRef = useRef<BottomSheetModal>(null);
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
    nutritionSheetRef.current?.present({ foodId });
  };
  const handleAddFood = (foodId: number) => {
    sheetRef.current?.present({ foodId });
  };

  const clearSearch = () => {
    setQuery("");
    setResults([]);
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View className="flex-1">
        <View className="flex flex-row p-4 bg-secondary rounded-xl mx-4">
          <Search size={20} className="mr-2 text-foreground" />
          <TextInput
            value={query}
            onChangeText={handleSearch}
            placeholder="What are you looking for?"
            className="flex-1 text-foreground placeholder:text-muted-foreground"
          />
          {query.length > 0 && (
            <X
              onPress={clearSearch}
              size={20}
              className="mr-2 text-foreground"
            />
          )}
          <QrCode
            onPress={clearSearch}
            size={20}
            className="mr-2 text-foreground"
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
                  className="flex-row justify-between bg-secondary p-8 mt-2 rounded-xl mx-4"
                >
                  <CustomText className="flex-shrink text-foreground">
                    {item.name}
                  </CustomText>
                  <CustomButton onPress={() => handleAddFood(item.id)}>
                    <CirclePlus className="text-foreground" size={25} />
                  </CustomButton>
                </CustomButton>
              );
            }}
          />
        </View>

        <CustomBottomSheet snapPoints={["70%", "90%"]} ref={nutritionSheetRef}>
          {({ data }: { data: { foodId: number } }) => (
            <BottomNutritionScreen foodId={data.foodId} />
          )}
        </CustomBottomSheet>
        <CustomBottomSheet ref={sheetRef} snapPoints={["35%", "70%"]}>
          {({
            data,
          }: {
            data: {
              foodId: number;
            };
          }) => <AddPortion meal={meal} foodId={data.foodId} />}
        </CustomBottomSheet>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default SearchBar;
