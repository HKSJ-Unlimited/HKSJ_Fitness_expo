import { FlatList, View } from "react-native";
import CustomButton from "@/components/ui/CustomButton";
import CustomCard from "@/components/ui/CustomCard";
import CustomText from "@/components/ui/CustomText";
import { Link } from "expo-router";
import { EggFried } from "@/lib/icons/EggFried";
import { CookingPot } from "@/lib/icons/CookingPot";
import { Soup } from "@/lib/icons/Soup";
import { Beer } from "@/lib/icons/Beer";
import { CirclePlus } from "@/lib/icons/CirclePlus";
import React from "react";
import { useRef } from "react";
import BottomSheet from "@gorhom/bottom-sheet";
import CustomBottomSheet from "@/components/BottomSheet";
import { IFullNutrition, mealType } from "@/Types/SharedTypes";

const data = [
  {
    id: 1,
    name: "Chicken, breast, boneless, skinless, raw",
    nutrition: "100g, 165Kcal, 31g Protein, 3.6g Fat, 0g Carbs",
  },
  {
    id: 2,
    name: "Rice",
    nutrition: "100g, 130Kcal, 2.7g Protein, 0.3g Fat, 28g Carbs",
  },
  {
    id: 3,
    name: "Broccoli",
    nutrition: "100g, 34Kcal, 2.8g Protein, 0.4g Fat, 6g Carbs",
  },
];

const meals = [
  {
    type: mealType.breakfast,
    icon: EggFried,
    data,
  },
  {
    type: mealType.lunch,
    icon: CookingPot,
    data,
  },
  {
    type: mealType.dinner,
    icon: Soup,
    data,
  },
  {
    type: mealType.snack,
    icon: Beer,
    data,
  },
];
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

export default function Diary() {
  const sheetRef = useRef<BottomSheet>(null);

  const ToggleshowMealNutrition = () => {
    sheetRef.current?.expand();
  };
  const renderMealCard = ({ item }: any) => {
    const Icon = item.icon;
    return (
      <CustomCard
        className="mt-3"
        body={
          <View className="flex-row justify-between items-center">
            <View className="flex-row items-center gap-1">
              <Icon className="text-primary" size={40} />
              <View className="ml-2">
                <CustomText className="text-xl">{item.type}</CustomText>
                <CustomText className="text-sm">0/250Kcal</CustomText>
              </View>
            </View>
            <Link
              href={{
                pathname: "/(screens)/(modal)/AddFood",
                params: { type: item.type },
              }}
              asChild
            >
              <CustomButton>
                <CirclePlus className="text-primary" size={30} />
              </CustomButton>
            </Link>
          </View>
        }
        footer={
          <FlatList
            data={item.data}
            keyExtractor={(food) => food.id.toString()}
            renderItem={({ item: food }) => (
              <CustomButton
                className="p-1 mt-3 flex items-start"
                onPress={ToggleshowMealNutrition}
              >
                <CustomText className="text-lg font-bold">
                  {food.name}
                </CustomText>
                <CustomText className="text-sm">{food.nutrition}</CustomText>
              </CustomButton>
            )}
            ItemSeparatorComponent={() => <View className="bg-primary h-0.5" />}
          />
        }
      />
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
      <CustomBottomSheet ref={sheetRef}>
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
