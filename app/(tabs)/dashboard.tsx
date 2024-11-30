import CustomButton from "@/components/ui/CustomButton";
import CustomText from "@/components/ui/CustomText";
import { Text, StyleSheet, View } from "react-native";

export default function Dashboard() {
  return (
    <View style={styles.container}>
      <CustomText className="text-2xl">Tab One</CustomText>
      <CustomButton className="p-2">
        <CustomText className="text-primary-foreground">Press me</CustomText>
      </CustomButton>
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
