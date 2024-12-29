import CustomButton from "@/components/ui/CustomButton";
import CustomCard from "@/components/ui/CustomCard";
import CustomText from "@/components/ui/CustomText";
import { Beer } from "@/lib/icons/Beer";
import { CirclePlus } from "@/lib/icons/CirclePlus";
import { CookingPot } from "@/lib/icons/CookingPot";
import { EggFried } from "@/lib/icons/EggFried";
import { Soup } from "@/lib/icons/Soup";
import { Link } from "expo-router";

import { View } from "react-native";

export default function Diary() {
  return (
    <View className="px-4 mt-5">
      <CustomText className="text-xl">Nutrition</CustomText>
      <CustomCard
        className="mt-3 dark:bg-muted h-20"
        body={
          <View className="flex-row justify-between items-center">
            <View className="flex-row items-center gap-1">
              <EggFried
                className="dark:text-foreground text-primary"
                size={40}
              />
              <View className="ml-2">
                <CustomText className="text-xl">Breakfast</CustomText>
                <CustomText className="text-sm">0/250Kcal</CustomText>
              </View>
            </View>
            <CirclePlus
              className="dark:text-foreground text-primary"
              size={30}
            />
          </View>
        }
      />
      <CustomCard
        className="mt-3 dark:bg-muted h-20"
        body={
          <View className="flex-row justify-between items-center">
            <View className="flex-row items-center gap-1">
              <CookingPot
                className="dark:text-foreground text-primary"
                size={40}
              />
              <View className="ml-2">
                <CustomText className="text-xl">Lunch</CustomText>
                <CustomText className="text-sm">0/250Kcal</CustomText>
              </View>
            </View>
            <CirclePlus
              className="dark:text-foreground text-primary"
              size={30}
            />
          </View>
        }
      />
      <CustomCard
        className="mt-3 dark:bg-muted h-20"
        body={
          <View className="flex-row justify-between items-center">
            <View className="flex-row items-center gap-1">
              <Soup className="dark:text-foreground text-primary" size={40} />
              <View className="ml-2">
                <CustomText className="text-xl">Dinner</CustomText>
                <CustomText className="text-sm">0/250Kcal</CustomText>
              </View>
            </View>
            <CirclePlus
              className="dark:text-foreground text-primary"
              size={30}
            />
          </View>
        }
      />
      <CustomCard
        className="mt-3 dark:bg-muted h-20"
        body={
          <View className="flex-row justify-between items-center">
            <View className="flex-row items-center gap-1">
              <Beer className="dark:text-foreground text-primary" size={40} />
              <View className="ml-2">
                <CustomText className="text-xl">Snack</CustomText>
                <CustomText className="text-sm">0/250Kcal</CustomText>
              </View>
            </View>
            <Link href="/(auth)/(modal)/AddFood">
              <CirclePlus
                className="dark:text-foreground text-primary"
                size={30}
              />
            </Link>
          </View>
        }
      />
    </View>
  );
}
