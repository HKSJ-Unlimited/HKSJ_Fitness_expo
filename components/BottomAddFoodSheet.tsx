import { FlatList, TextInput, View } from "react-native";
import ActionSheet, {
  SheetManager,
  SheetProps,
} from "react-native-actions-sheet";
import CustomText from "./ui/CustomText";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomCard from "./ui/CustomCard";
import { useState } from "react";
import CustomButton from "./ui/CustomButton";

interface IBottomAddFoodSheet extends SheetProps<"BottomAddFoodSheet"> {
  payload: IFullNutrition[];
}
function BottomAddFoodSheet({ payload }: IBottomAddFoodSheet) {
  const [portionSize, setPortionSize] = useState("");
  const handleChangePortion = (text: string) => {
    setPortionSize(text);
  };
  const handleAddPortion = () => {
    SheetManager.hide("BottomAddFoodSheet");
  };
  return (
    <SafeAreaView>
      <ActionSheet
        keyboardHandlerEnabled={false}
        animated
        gestureEnabled
        containerStyle={{
          padding: 10,
          margin: 20,
        }}
      >
        <CustomText className="text-xl font-bold">Select a portion</CustomText>
        <View className="flex flex-row p-4 mt-5 rounded-xl bg-secondary">
          <TextInput
            keyboardType="numeric"
            value={portionSize}
            onChangeText={handleChangePortion}
            placeholder="Enter the portion"
            className="flex-1 placeholder:text-muted-foreground"
          />
          <CustomText className="">Grams</CustomText>
        </View>
        {portionSize && (
          <CustomButton
            onPress={handleAddPortion}
            className="mt-4 bg-primary mx-36 p-3 rounded-md"
          >
            <CustomText>Add Food</CustomText>
          </CustomButton>
        )}
      </ActionSheet>
    </SafeAreaView>
  );
}

export default BottomAddFoodSheet;
