import React from "react";
import { Tabs } from "expo-router";

import { SafeAreaView } from "react-native";
import Header from "@/components/Header";
import { LayoutDashboard } from "@/lib/icons/LayoutDashboard";
import { NotebookPen } from "@/lib/icons/NotebookPen";

export default function TabLayout() {
  return (
    <SafeAreaView style={{ display: "flex", flex: 1 }}>
      <Tabs>
        <Tabs.Screen
          name="dashboard"
          options={{
            title: "Dashboard",
            headerTitle: (props) => <Header />,
            tabBarIcon: ({ color }) => <LayoutDashboard color={color} />,
          }}
        />
        <Tabs.Screen
          name="diary"
          options={{
            title: "Diary",
            tabBarIcon: ({ color }) => <NotebookPen color={color} />,
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
}
