import { FlatList, View } from "react-native";
import ActionSheet, { SheetProps } from "react-native-actions-sheet";
import CustomText from "../ui/CustomText";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import GetThemeColor from "@/utlis/GetThemeColor";

interface IBottomNutritionSheet extends SheetProps<"BottomNutritionSheet"> {
  payload: IFullNutrition[];
}
function BottomNutritionSheet({ payload }: IBottomNutritionSheet) {
  const insets = useSafeAreaInsets();
  return (
    <View>
      <ActionSheet
        safeAreaInsets={insets}
        animated
        gestureEnabled
        snapPoints={[100, 80, 50]}
        containerStyle={{
          padding: 10,
          margin: 20,
          backgroundColor: GetThemeColor(),
        }}
      >
        <CustomText className="text-xl font-bold">Nutritional Facts</CustomText>
        <FlatList
          data={payload}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <View className="flex-row px-3 my-3 justify-between items-center">
              <CustomText>{item.name}</CustomText>
              <View className="flex-row justify-end">
                <CustomText>{item.amount}</CustomText>
                <CustomText>{item.unit}</CustomText>
              </View>
            </View>
          )}
        />
      </ActionSheet>
    </View>
  );
}

export default BottomNutritionSheet;
