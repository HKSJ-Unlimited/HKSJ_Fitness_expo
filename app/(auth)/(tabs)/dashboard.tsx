import CustomButton from "@/components/ui/CustomButton";
import CustomText from "@/components/ui/CustomText";
import { StyleSheet, View } from "react-native";

export default function Dashboard() {
  return (
    <View className="flex flex-1 flex-col">
      <View style={styles.container}>
        <CustomText className="text-2xl">Tab One</CustomText>
        <CustomButton title="Press me" className="p-2" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
