import CustomText from "@/components/ui/CustomText";
import { StyleSheet, View, Text } from "react-native";

export default function Diary() {
  return (
    <View style={styles.container}>
      <CustomText>Tab Two</CustomText>
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
