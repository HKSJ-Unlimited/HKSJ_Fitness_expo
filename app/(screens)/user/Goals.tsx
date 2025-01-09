import { View, Keyboard, TouchableWithoutFeedback } from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import CustomText from "@/components/ui/CustomText";
import CustomCard from "@/components/ui/CustomCard";
import CustomButton from "@/components/ui/CustomButton";
import { Goal } from "@/lib/icons/Goal";
import CustomAvatar from "@/components/ui/CustomAvatar";
import { drizzle, useLiveQuery } from "drizzle-orm/expo-sqlite";
import { goalsTable, usersTable } from "@/db/schema";
import CustomBottomSheet from "@/components/BottomSheet";
import BottomSheet, { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import { eq } from "drizzle-orm";
import { useSQLiteContext } from "expo-sqlite";

type GoalsProps = {
  userId: number;
};
const Goals = ({ userId }: GoalsProps) => {
  const db = useSQLiteContext();
  const drizzleDb = drizzle(db);

  const { data } = useLiveQuery(
    drizzleDb.select().from(goalsTable).where(eq(goalsTable.userId, userId))
  );

  const sheetRef = useRef<BottomSheet>(null);
  const [weight, setWeight] = useState("");
  const [calories, setCalories] = useState("");

  const handleEditGoals = () => {
    sheetRef.current?.snapToIndex(0);
  };

  const handleGoalSave = useCallback(async () => {
    try {
      await drizzleDb
        .insert(goalsTable)
        .values({
          weight: parseInt(weight),
          calories: parseInt(calories),
          userId,
        })
        .onConflictDoUpdate({
          target: goalsTable.userId,
          set: { weight: parseInt(weight), calories: parseInt(calories) },
        });
      Keyboard.dismiss();
      setTimeout(() => sheetRef.current?.close(), 100);
    } catch (error) {
      console.error(error);
    }
  }, [drizzleDb, weight, calories, userId]);

  useEffect(() => {
    if (data.length > 0) {
      setWeight(data[0].weight.toString());
      setCalories(data[0].calories.toString());
    }
  }, [data]);

  if (data.length === 0) {
    return <CustomText>No data available</CustomText>;
  }
  return (
    <View>
      <CustomCard
        className="h-64"
        header="Progress"
        body={
          <View className="flex flex-row justify-between">
            <View className="gap-2 flex flex-shrink">
              <View>
                <CustomText>Weight</CustomText>
                <CustomText className="text-xl font-bold">
                  {data[0].weight} KG
                </CustomText>
              </View>
              <View>
                <CustomText>Calories</CustomText>
                <CustomText className="text-xl font-bold">
                  {data[0].calories} Kcal
                </CustomText>
              </View>
            </View>
            <View className="-mt-3 mr-10 flex justify-center">
              <Goal size={120} className="text-accent-foreground" />
            </View>
          </View>
        }
        footer={
          <CustomButton
            className="flex self-start p-2 mb-2 "
            title="Edit goals"
            onPress={handleEditGoals}
          />
        }
      />

      <CustomBottomSheet ref={sheetRef} snapPoints={["45%", "70%"]}>
        <CustomText className="text-2xl font-bold">
          Edit your goals 🚀
        </CustomText>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View className="gap-2 mt-3">
            <View className="flex flex-row p-3  rounded-xl bg-secondary">
              <BottomSheetTextInput
                className="flex-1 p-2"
                placeholder="Add your ideal Weight"
                keyboardType="numeric"
                defaultValue={data[0].weight.toString()}
                onChangeText={setWeight}
              />
              <CustomText className="self-center">Kg</CustomText>
            </View>
            <View className="flex flex-row p-3  rounded-xl bg-secondary">
              <BottomSheetTextInput
                className="flex-1 p-2"
                placeholder="Add your ideal Calories"
                keyboardType="numeric"
                defaultValue={data[0].calories.toString()}
                onChangeText={setCalories}
              />
              <CustomText className="self-center">Kcal</CustomText>
            </View>
            <CustomButton
              className="bg-primary p-3 mx-28 mt-2"
              title="Save"
              onPress={handleGoalSave}
            />
          </View>
        </TouchableWithoutFeedback>
      </CustomBottomSheet>
    </View>
  );
};

export default Goals;
