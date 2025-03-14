import { View } from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import CustomText from "../ui/CustomText";
import {
  IFullNutrition,
  IFullNutritionListResponse,
} from "@/Types/SharedTypes";
import { CallAPI } from "@/utils/FetchInstance";

const BottomNutritionScreen = ({ foodId }: { foodId: number }) => {
  const [fullNutrition, setFullNutrition] = useState<IFullNutrition[]>([]);

  const fetchNutritionData = useMemo(async () => {
    const response = await CallAPI<IFullNutritionListResponse>(
      `/food/${foodId}`,
      "GET"
    );
    return response.data.filteredData;
  }, [foodId]);

  useEffect(() => {
    const fetchData = async () => {
      if (!foodId) return;
      const data = await fetchNutritionData;
      setFullNutrition(data);
    };
    fetchData();
  }, [fetchNutritionData]);

  return (
    <>
      <CustomText className="text-xl font-bold">Nutritional Facts</CustomText>
      {fullNutrition.map((item) => (
        <View
          key={item.name}
          className="flex-row px-3 my-3 justify-between items-center"
        >
          <CustomText>{item.name}</CustomText>
          <View className="flex-row justify-end">
            <CustomText>{item.amount}</CustomText>
            <CustomText>{item.unit}</CustomText>
          </View>
        </View>
      ))}
    </>
  );
};

export default BottomNutritionScreen;
