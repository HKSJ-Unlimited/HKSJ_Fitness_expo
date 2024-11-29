import React from "react";
import { Tabs } from "expo-router";

import { ThemeToggle } from "@/components/ThemeToggle";
import { LayoutDashboard, NotebookPen } from "lucide-react-native";
import { View, Text, SafeAreaView } from "react-native";
import Header from "@/components/Header";

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
