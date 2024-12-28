import React from "react";
import { Tabs } from "expo-router";

import Header from "@/components/Header";
import BottomNavigationBar from "@/components/BottomNavigationBar";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarHideOnKeyboard: true,
      }}
      tabBar={(props) => <BottomNavigationBar {...props} />}
    >
      <Tabs.Screen
        name="dashboard"
        options={{
          title: "Dashboard",
          headerTitle: (props) => <Header />,
        }}
      />
      <Tabs.Screen
        name="diary"
        options={{
          title: "Diary",
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
        }}
      />
    </Tabs>
  );
}
