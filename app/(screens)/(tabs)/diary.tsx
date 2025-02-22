import { FlatList, View } from "react-native";
import CustomText from "@/components/ui/CustomText";
import { EggFried } from "@/lib/icons/EggFried";
import { CookingPot } from "@/lib/icons/CookingPot";
import { Soup } from "@/lib/icons/Soup";
import { Beer } from "@/lib/icons/Beer";
import React, { useState } from "react";
import { useRef } from "react";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import CustomBottomSheet from "@/components/BottomSheet";
import { IFullNutrition, mealType } from "@/Types/SharedTypes";
import DiaryFoodCard from "@/components/DiaryFoodCard";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { useSQLiteContext } from "expo-sqlite";
import { useNutritionData } from "@/db/Meals";

const meals = [
  {
    type: mealType.breakfast,
    icon: EggFried,
  },
  {
    type: mealType.lunch,
    icon: CookingPot,
  },
  {
    type: mealType.dinner,
    icon: Soup,
  },
  {
    type: mealType.snack,
    icon: Beer,
  },
];

export default function Diary() {
  const db = useSQLiteContext();
  const sheetRef = useRef<BottomSheetModal>(null);
  const [fullNutrition, setFullNutrition] = useState<IFullNutrition[]>([]);

  const ToggleShowMealNutrition = async (id: number) => {
    const temp = await useNutritionData(db, id);
    setFullNutrition(JSON.parse(temp[0].nutrients));
    sheetRef.current?.present();
  };

  const renderMealCard = ({ item }: any) => {
    return (
      <DiaryFoodCard item={item} onPressHandler={ToggleShowMealNutrition} />
    );
  };

  return (
    <>
      <FlatList
        ListHeaderComponent={
          <CustomText className="text-xl font-bold">Nutrients</CustomText>
        }
        style={{ marginBottom: 100 }}
        data={meals}
        keyExtractor={(item) => item.type}
        renderItem={renderMealCard}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingVertical: 8,
        }}
      />
      <CustomBottomSheet ref={sheetRef} snapPoints={["60%"]}>
        <CustomText className="text-xl font-bold">Nutritional Facts</CustomText>
        {fullNutrition.map((item) => (
          <View
            key={item.name}
            className="flex-row px-3 my-3 justify-between items-center"
          >
            <CustomText>{item.name}</CustomText>
            <View className="flex-row justify-end">
              <CustomText>{item.amount}</CustomText>
              <CustomText>{item.unit}</CustomText>
            </View>
          </View>
        ))}
      </CustomBottomSheet>
    </>
  );
}
