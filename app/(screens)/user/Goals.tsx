import { View } from "react-native";
import React, { useRef } from "react";
import CustomText from "@/components/ui/CustomText";
import CustomCard from "@/components/ui/CustomCard";
import CustomButton from "@/components/ui/CustomButton";
import { Goal } from "@/lib/icons/Goal";
import { drizzle, useLiveQuery } from "drizzle-orm/expo-sqlite";
import { goalsTable, usersTable } from "@/db/schema";
import CustomBottomSheet from "@/components/BottomSheet";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { eq } from "drizzle-orm";
import { useSQLiteContext } from "expo-sqlite";
import EditGoal from "./EditGoal";

type GoalsProps = {
  userId: number;
};
const Goals = ({ userId }: GoalsProps) => {
  const db = useSQLiteContext();
  const drizzleDb = drizzle(db);

  const { data } = useLiveQuery(
    drizzleDb.select().from(goalsTable).where(eq(goalsTable.userId, userId))
  );

  const sheetRef = useRef<BottomSheetModal>(null);

  const handleEditGoals = () => {
    sheetRef.current?.present();
  };

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
        <EditGoal
          defaultCalories={data[0].calories}
          defaultWeight={data[0].weight}
          userId={userId}
          ref={sheetRef}
        />
      </CustomBottomSheet>
    </View>
  );
};

export default Goals;
