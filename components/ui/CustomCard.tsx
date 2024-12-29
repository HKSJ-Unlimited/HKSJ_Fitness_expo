import { View, Text } from "react-native";
import React, { ReactNode } from "react";
import { cn } from "@/lib/utils";
import CustomText from "./CustomText";
import CustomButton from "./CustomButton";

type CustomCardProps = {
  className?: string;
  header?: string;
  body?: ReactNode;
  footer?: ReactNode;
};

const CustomCard = ({ className, header, body, footer }: CustomCardProps) => {
  return (
    <View
      className={cn(
        "flex bg-primary-foreground h-36 p-4 rounded elevation",
        className
      )}
    >
      {header && (
        <CustomText className="text-2xl my-1 font-bold">{header}</CustomText>
      )}
      {body && <>{body}</>}
      {footer && <View className="mt-auto">{footer}</View>}
    </View>
  );
};

export default CustomCard;
