import { View, FlatList, TouchableOpacity } from "react-native";
import React from "react";
import CustomCard from "./ui/CustomCard";
import CustomText from "./ui/CustomText";
import { Link } from "expo-router";
import CustomButton from "./ui/CustomButton";
import { CirclePlus } from "@/lib/icons/CirclePlus";
import { useSQLiteContext } from "expo-sqlite";
import { Trash2 } from "@/lib/icons/Trash";
import { mealType } from "@/Types/SharedTypes";
import { LucideIcon } from "lucide-react-native";

import {
  useDeleteFoodByType,
  useMealsByType,
  useTotalCaloriesByType,
} from "@/db/Meals";

const DiaryFoodCard = ({
  item,
  onPressHandler,
}: {
  item: {
    type: mealType;
    icon: LucideIcon;
  };
  onPressHandler: (id: number) => void;
}) => {
  const db = useSQLiteContext();

  const Icon = item.icon;

  const { data: MealsData } = useMealsByType(db, item.type);
  const { data: calories } = useTotalCaloriesByType(db, item.type);

  const deleteFoodEntry = (id: number) => {
    useDeleteFoodByType(db, id, item.type);
  };
  if (!calories || !MealsData) return null;
  return (
    <CustomCard
      className="mt-3"
      body={
        <View className="flex-row justify-between items-center">
          <View className="flex-row items-center gap-1">
            <Icon className="text-primary" size={40} />
            <View className="ml-2">
              <CustomText className="text-xl">{item.type}</CustomText>
              <CustomText className="text-sm">
                {calories[0]?.totalCalories ?? 0} Kcal
              </CustomText>
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
          data={MealsData}
          keyExtractor={(food) => food.id.toString()}
          renderItem={({ item: food }) => (
            <View className="flex-row justify-between items-center">
              <CustomButton
                className="p-1 mt-3 flex items-start"
                onPress={() => onPressHandler(food.id)}
              >
                <CustomText className="text-lg font-bold">
                  {food.name}
                </CustomText>
                <CustomText className="text-sm">{food.description}</CustomText>
              </CustomButton>
              <TouchableOpacity onPress={() => deleteFoodEntry(food.id)}>
                <Trash2 size={18} className="color-primary-foreground" />
              </TouchableOpacity>
            </View>
          )}
          ItemSeparatorComponent={() => <View className="bg-primary h-0.5" />}
        />
      }
    />
  );
};

export default DiaryFoodCard;
