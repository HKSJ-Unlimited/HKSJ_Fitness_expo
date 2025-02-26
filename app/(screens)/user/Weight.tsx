import { View } from "react-native";
import React, { useRef } from "react";
import CustomButton from "@/components/ui/CustomButton";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import CustomBottomSheet from "@/components/BottomSheet";
import BottomAddWeight from "@/components/sheets/BottomAddWeight";

const Weight = () => {
  const sheetRef = useRef<BottomSheetModal>(null);

  return (
    <View>
      <CustomButton
        className="flex self-start p-2 mb-2"
        title="Add Weight"
        onPress={() => sheetRef.current?.present()}
      />
      <CustomBottomSheet ref={sheetRef} snapPoints={["45%", "70%"]}>
        <BottomAddWeight ref={sheetRef} />
      </CustomBottomSheet>
    </View>
  );
};

export default Weight;
