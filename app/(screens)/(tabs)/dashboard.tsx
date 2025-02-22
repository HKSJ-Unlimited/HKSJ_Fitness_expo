import WeightChart from "@/components/charts/WeightChart";
import { View } from "react-native";

export default function Dashboard() {
  return (
    <View className="flex">
      {/* <CustomColors /> */}
      <WeightChart />
    </View>
  );
}
