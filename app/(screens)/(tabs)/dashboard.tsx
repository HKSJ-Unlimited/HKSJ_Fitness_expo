import { CalorieChart } from "@/components/charts/CaloriesChart";
import { MacrosChart } from "@/components/charts/MacrosChart";
import WeightChart from "@/components/charts/WeightChart";
import CustomColors from "@/components/ui/CustomColors";
import { ScrollView, View } from "react-native";

export default function Dashboard() {
  return (
    <ScrollView className="flex">
      {/* <CustomColors /> */}
      <View className="mb-32">
        <WeightChart />
        <CalorieChart />
        <MacrosChart />
      </View>
    </ScrollView>
  );
}
