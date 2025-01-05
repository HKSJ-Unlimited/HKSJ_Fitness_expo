import { View } from "react-native";
import React from "react";
import { ThemeToggle } from "./ThemeToggle";
import CustomText from "./ui/CustomText";
import CustomAvatar from "./ui/CustomAvatar";
import { Link } from "expo-router";
import { db } from "@/db/init";
import { usersTable } from "@/db/schema";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";

const Header = () => {
  const { data } = useLiveQuery(db.select().from(usersTable));
  if (!data || data.length === 0) {
    return null;
  }
  return (
    <View className="flex  min-w-full flex-row justify-between items-center">
      <Link href="/(screens)/user/profile">
        <CustomAvatar src={data[0].image} />
      </Link>
      <CustomText className="text-2xl">HKSJ Fitness</CustomText>
      <ThemeToggle />
    </View>
  );
};

export default Header;
