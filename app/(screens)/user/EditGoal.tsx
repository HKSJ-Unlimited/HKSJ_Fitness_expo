import { View, TouchableWithoutFeedback, Keyboard } from "react-native";
import React, { forwardRef, useState } from "react";
import CustomText from "@/components/ui/CustomText";
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import CustomButton from "@/components/ui/CustomButton";
import { useSQLiteContext } from "expo-sqlite";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { goalsTable } from "@/db/schema";

type EditGoalProps = {
  defaultWeight: number;
  defaultCalories: number;
  userId: number;
};
const EditGoal = forwardRef(
  ({ userId, defaultCalories, defaultWeight }: EditGoalProps, ref: any) => {
    const db = useSQLiteContext();
    const drizzleDb = drizzle(db);

    const [weight, setWeight] = useState(defaultWeight);
    const [calories, setCalories] = useState(defaultCalories);

    const handleGoalSave = async () => {
      try {
        await drizzleDb
          .insert(goalsTable)
          .values({
            weight: weight,
            calories: calories,
            userId,
          })
          .onConflictDoUpdate({
            target: goalsTable.userId,
            set: { weight: weight, calories: calories },
          });
        Keyboard.dismiss();
        setTimeout(() => ref.current?.close(), 100);
      } catch (error) {
        console.error(error);
      }
    };
    return (
      <>
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
                defaultValue={defaultWeight.toString()}
                onChangeText={(text) => setWeight(Number(text))}
              />
              <CustomText className="self-center">Kg</CustomText>
            </View>
            <View className="flex flex-row p-3  rounded-xl bg-secondary">
              <BottomSheetTextInput
                className="flex-1 p-2"
                placeholder="Add your ideal Calories"
                keyboardType="numeric"
                defaultValue={defaultCalories.toString()}
                onChangeText={(text) => setCalories(Number(text))}
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
      </>
    );
  }
);

export default EditGoal;
