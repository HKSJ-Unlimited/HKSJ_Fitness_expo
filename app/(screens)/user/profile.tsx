import { View } from "react-native";
import React from "react";
import CustomText from "@/components/ui/CustomText";
import CustomCard from "@/components/ui/CustomCard";
import CustomButton from "@/components/ui/CustomButton";
import CustomAvatar from "@/components/ui/CustomAvatar";
import { drizzle, useLiveQuery } from "drizzle-orm/expo-sqlite";
import { usersTable } from "@/db/schema";
import { useSQLiteContext } from "expo-sqlite";
import Goals from "./Goals";
import WeightChart from "@/components/charts/WeightChart";

const Progress = () => <View className="gap-2 flex"></View>;
const ProgressFooter = () => {
  return (
    <>
      <WeightChart />
      <CustomButton className="flex self-start p-2 mb-2" title="Add Weight" />
    </>
  );
};
const Profile = () => {
  const db = useSQLiteContext();
  const drizzleDb = drizzle(db);
  const { data } = useLiveQuery(drizzleDb.select().from(usersTable));

  if (data.length === 0) {
    return <CustomText>No data available</CustomText>;
  }
  return (
    <View className="mt-2 p-4 gap-2">
      <CustomAvatar className="self-center h-40 w-40" src={data[0].image} />
      <CustomText className="text-center text-2xl font-bold mt-2">
        {data[0].name}
      </CustomText>
      <CustomCard
        className="p-2"
        header="Weight"
        body={<Progress />}
        footer={<ProgressFooter />}
      />
      <Goals userId={data[0].id} />
    </View>
  );
};

export default Profile;
