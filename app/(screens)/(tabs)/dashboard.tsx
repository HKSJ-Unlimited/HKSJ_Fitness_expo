import CustomColors from "@/components/ui/CustomColors";
import { firebase } from "@react-native-firebase/auth";
import { View } from "react-native";

export default function Dashboard() {
  const user = firebase.auth().currentUser;
  console.log("user", user);
  return (
    <View className="flex flex-1">
      <CustomColors />
    </View>
  );
}
