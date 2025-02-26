import {
  BottomSheetTextInput,
  TouchableWithoutFeedback,
} from "@gorhom/bottom-sheet";
import CustomButton from "@/components/ui/CustomButton";
import CustomText from "@/components/ui/CustomText";
import { forwardRef, useState } from "react";
import { Keyboard, View } from "react-native";
import { useUpdateWeightProgress } from "@/db/User";
import { useSQLiteContext } from "expo-sqlite";

const BottomAddWeight = forwardRef((props, ref: any) => {
  const [weight, setWeight] = useState<string>("");
  const db = useSQLiteContext();

  const handleWeightSave = () => {
    const userId = 1;
    useUpdateWeightProgress(db, Number(weight), userId);
    setTimeout(() => ref.current?.close(), 100);
  };

  const handleTextChange = (text: string) => {
    setWeight(text);
  };

  return (
    <>
      <CustomText className="text-2xl font-bold">Add your weight ⚖️</CustomText>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="gap-2 mt-3">
          <View className="flex flex-row p-3 rounded-xl bg-secondary">
            <BottomSheetTextInput
              className="flex-1 p-2"
              placeholder="Add your ideal Weight"
              keyboardType="numeric"
              onChangeText={handleTextChange}
            />
            <CustomText className="self-center">Kg</CustomText>
          </View>
          <CustomButton
            className="bg-primary p-3 mx-28 mt-2"
            title="Save"
            onPress={handleWeightSave}
          />
        </View>
      </TouchableWithoutFeedback>
    </>
  );
});

export default BottomAddWeight;
