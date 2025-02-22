import { View, TouchableWithoutFeedback, Keyboard } from "react-native";
import React, { useState } from "react";
import CustomText from "./ui/CustomText";
import CustomButton from "./ui/CustomButton";
import { useSQLiteContext } from "expo-sqlite";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { CallAPI } from "@/utils/FetchInstance";
import { diaryTable, mealTable, totalCalories, usersTable } from "@/db/schema";
import {
  IFullNutritionListResponse,
  INutrients,
  mealType,
} from "@/Types/SharedTypes";
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import { eq } from "drizzle-orm";
import { useAddFood } from "@/db/Meals";

type AddPortionProps = {
  foodId: number;
  meal: mealType;
};
const AddPortion = ({ foodId, meal }: AddPortionProps) => {
  const [portionSize, setPortionSize] = useState("");
  const db = useSQLiteContext();
  const drizzleDb = drizzle(db);

  const handleChangePortion = (text: string) => {
    setPortionSize(text);
  };

  const onAddFood = async () => {
    try {
      const response = await CallAPI<IFullNutritionListResponse>(
        `/food/${foodId}?amount=${portionSize}`,
        "GET"
      );
      await useAddFood(response, meal, portionSize, db);

      console.log("Food added successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View>
      <CustomText className="text-2xl font-bold">
        Select a portion size
      </CustomText>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="gap-2 mt-4">
          <View className="flex flex-row p-3 rounded-xl bg-secondary items-center">
            <BottomSheetTextInput
              placeholder="Enter the portion"
              className="flex-1 p-2 placeholder:text-muted-foreground"
              onChangeText={handleChangePortion}
              keyboardType="numeric"
            />
            <CustomText className="">Grams</CustomText>
          </View>
          {portionSize && (
            <CustomButton
              className="mt-4 bg-primary mx-36 p-3 rounded-md"
              onPress={onAddFood}
            >
              <CustomText>Add Food</CustomText>
            </CustomButton>
          )}
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default AddPortion;
