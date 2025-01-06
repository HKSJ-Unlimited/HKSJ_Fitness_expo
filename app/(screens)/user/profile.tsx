import {
  View,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useRef } from "react";
import CustomText from "@/components/ui/CustomText";
import CustomCard from "@/components/ui/CustomCard";
import CustomButton from "@/components/ui/CustomButton";
import { Goal } from "@/lib/icons/Goal";
import CustomAvatar from "@/components/ui/CustomAvatar";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import { db } from "@/db/init";
import { usersTable } from "@/db/schema";
import CustomBottomSheet from "@/components/BottomSheet";

import CustomTextInput from "@/components/ui/CustomTextInput";
import BottomSheet, { BottomSheetTextInput } from "@gorhom/bottom-sheet";

const Goals = () => (
  <View className="flex flex-row justify-between">
    <View className="gap-2 flex flex-shrink">
      <View>
        <CustomText>Weight</CustomText>
        <CustomText className="text-xl font-bold">72 KG</CustomText>
      </View>
      <View>
        <CustomText>Calories</CustomText>
        <CustomText className="text-xl font-bold">2500</CustomText>
      </View>
    </View>
    <View className="-mt-3 mr-10 flex justify-center">
      <Goal size={120} className="text-accent-foreground" />
    </View>
  </View>
);
const GoalsFooter = ({ handleEditGoals }: { handleEditGoals: () => void }) => (
  <CustomButton
    className="flex self-start p-2 mb-2 "
    title="Edit goals"
    onPress={handleEditGoals}
  />
);
const Progress = () => <View className="gap-2 flex"></View>;
const ProgressFooter = () => (
  <CustomButton className="flex self-start p-2 mb-2" title="Add Weight" />
);
const User = () => {
  const sheetRef = useRef<BottomSheet>(null);

  const { data } = useLiveQuery(db.select().from(usersTable));

  if (!data || data.length === 0) {
    return null;
  }
  const handleEditGoals = () => {
    sheetRef.current?.snapToIndex(0);
  };

  return (
    <View className="mt-2 p-4 gap-2">
      <CustomAvatar className="self-center h-40 w-40" src={data[0].image} />
      <CustomText className="text-center text-2xl font-bold mt-2">
        {data[0].name}
      </CustomText>
      <CustomCard
        className="h-64"
        header="Progress"
        body={<Progress />}
        footer={<ProgressFooter />}
      />
      <CustomCard
        className="h-64"
        header="Goals"
        body={<Goals />}
        footer={<GoalsFooter handleEditGoals={handleEditGoals} />}
      />
      <CustomBottomSheet ref={sheetRef} snapPoints={["45%", "70%"]}>
        <CustomText className="text-2xl font-bold">
          Edit your goals 🚀
        </CustomText>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View className="gap-2 mt-3">
            <View className="flex flex-row p-3  rounded-xl bg-secondary">
              <BottomSheetTextInput
                className="flex-1 p-2"
                placeholder="Add your ideal Weight"
                keyboardType="numeric"
              />
              <CustomText className="self-center">Kg</CustomText>
            </View>
            <View className="flex flex-row p-3  rounded-xl bg-secondary">
              <BottomSheetTextInput
                className="flex-1 p-2"
                placeholder="Add your ideal Calories"
                keyboardType="numeric"
              />
              <CustomText className="self-center">Kcal</CustomText>
            </View>
            <CustomButton className="bg-primary p-3 mx-28 mt-2" title="Save" />
          </View>
        </TouchableWithoutFeedback>
      </CustomBottomSheet>
    </View>
  );
};

export default User;
