import { View, Text } from "react-native";
import React from "react";
import CustomText from "@/components/ui/CustomText";
import CustomCard from "@/components/ui/CustomCard";
import CustomButton from "@/components/ui/CustomButton";
import { Goal } from "@/lib/icons/Goal";
import CustomAvatar from "@/components/ui/CustomAvatar";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import { db } from "@/db/init";
import { usersTable } from "@/db/schema";

const Goals = () => (
  <View className="flex flex-row justify-between">
    <View className="gap-2 flex flex-shrink">
      <View>
        <CustomText>Weight</CustomText>
        <CustomText className="text-xl font-bold">72 KG</CustomText>
      </View>
      <View>
        <CustomText>Calories</CustomText>
        <CustomText className="text-xl font-bold">2500</CustomText>
      </View>
    </View>
    <View className="-mt-3 mr-10 flex justify-center">
      <Goal size={120} className="text-accent-foreground" />
    </View>
  </View>
);
const GoalsFooter = () => (
  <CustomButton className="flex self-start p-2 mb-2 " title="Edit goals" />
);
const Progress = () => <View className="gap-2 flex"></View>;
const ProgressFooter = () => (
  <CustomButton className="flex self-start p-2 mb-2" title="Add Weight" />
);
const User = () => {
  const { data } = useLiveQuery(db.select().from(usersTable));

  if (!data || data.length === 0) {
    return null;
  }
  return (
    <View className="mt-2 p-4 gap-2">
      <CustomAvatar className="self-center h-40 w-40" src={data[0].image} />
      <CustomText className="text-center text-2xl font-bold mt-2">
        {data[0].name}
      </CustomText>
      <CustomCard
        className="h-64"
        header="Progress"
        body={<Progress />}
        footer={<ProgressFooter />}
      />
      <CustomCard
        className="h-64"
        header="Goals"
        body={<Goals />}
        footer={<GoalsFooter />}
      />
    </View>
  );
};

export default User;
