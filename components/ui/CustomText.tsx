import { Text } from "react-native";
import React from "react";
import { cn } from "@/lib/utils";

type CustomTextProps = {
  children: React.ReactNode;
  className?: string;
  props?: any;
};
const CustomText = ({ className, children, props }: CustomTextProps) => {
  return (
    <Text className={cn("text-base text-foreground", className)} {...props}>
      {children}
    </Text>
  );
};

export default CustomText;
