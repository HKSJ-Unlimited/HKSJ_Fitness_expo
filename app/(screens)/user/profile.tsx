import { View } from "react-native";
import React, { useRef } from "react";
import CustomText from "@/components/ui/CustomText";
import CustomCard from "@/components/ui/CustomCard";
import CustomAvatar from "@/components/ui/CustomAvatar";
import { drizzle, useLiveQuery } from "drizzle-orm/expo-sqlite";
import { usersTable } from "@/db/schema";
import { useSQLiteContext } from "expo-sqlite";
import Goals from "./Goals";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import WeightChart from "@/components/charts/WeightChart";
import CustomButton from "@/components/ui/CustomButton";
import BottomAddWeight from "@/components/sheets/BottomAddWeight";
import Weight from "./Weight";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

const Profile = () => {
  const db = useSQLiteContext();
  const drizzleDb = drizzle(db);
  const { data } = useLiveQuery(drizzleDb.select().from(usersTable));

  if (data.length === 0) {
    return <CustomText>No data available</CustomText>;
  }
  return (
    <ScrollView className="flex-1 p-4">
      <View className="mb-20">
        <CustomAvatar className="self-center h-40 w-40" src={data[0].image} />
        <CustomText className="text-center text-2xl font-bold mt-2">
          {data[0].name}
        </CustomText>
        <CustomCard
          className="p-2 my-3"
          header="Weight"
          body={<WeightChart />}
          footer={<Weight />}
        />
        <Goals userId={data[0].id} />
      </View>
    </ScrollView>
  );
};

export default Profile;
