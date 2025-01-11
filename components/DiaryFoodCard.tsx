import { View, FlatList } from "react-native";
import React from "react";
import CustomCard from "./ui/CustomCard";
import CustomText from "./ui/CustomText";
import { Link } from "expo-router";
import CustomButton from "./ui/CustomButton";
import { CirclePlus } from "@/lib/icons/CirclePlus";
import { drizzle, useLiveQuery } from "drizzle-orm/expo-sqlite";
import { useSQLiteContext } from "expo-sqlite";
import { mealTable } from "@/db/schema";
import { eq } from "drizzle-orm";

const DiaryFoodCard = ({ item, onPressHandler }) => {
  const db = useSQLiteContext();
  const drizzleDb = drizzle(db);
  const Icon = item.icon;

  const { data } = useLiveQuery(
    drizzleDb.select().from(mealTable).where(eq(mealTable.type, item.type))
  );
  if (!data) return null;

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
          data={data}
          keyExtractor={(food) => food.id.toString()}
          renderItem={({ item: food }) => (
            <CustomButton
              className="p-1 mt-3 flex items-start"
              onPress={() => onPressHandler(food.id)}
            >
              <CustomText className="text-lg font-bold">{food.name}</CustomText>
              <CustomText className="text-sm">{food.description}</CustomText>
            </CustomButton>
          )}
          ItemSeparatorComponent={() => <View className="bg-primary h-0.5" />}
        />
      }
    />
  );
};

export default DiaryFoodCard;
