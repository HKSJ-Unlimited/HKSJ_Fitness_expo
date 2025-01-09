import { View } from "react-native";
import React from "react";
import { ThemeToggle } from "./ThemeToggle";
import CustomText from "./ui/CustomText";
import CustomAvatar from "./ui/CustomAvatar";
import { Link } from "expo-router";

import { usersTable } from "@/db/schema";
import { drizzle, useLiveQuery } from "drizzle-orm/expo-sqlite";
import { useSQLiteContext } from "expo-sqlite";

const Header = () => {
  const db = useSQLiteContext();
  const drizzleDb = drizzle(db);

  const { data } = useLiveQuery(drizzleDb.select().from(usersTable));

  if (data.length === 0) {
    return <CustomText>No data available</CustomText>;
  }
  return (
    <View className="flex  min-w-full flex-row justify-between items-center">
      <Link href="/(screens)/user/Profile">
        <CustomAvatar src={data[0].image} />
      </Link>
      <CustomText className="text-2xl">HKSJ Fitness</CustomText>
      <ThemeToggle />
    </View>
  );
};

export default Header;
