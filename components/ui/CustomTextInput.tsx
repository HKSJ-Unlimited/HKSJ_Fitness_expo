import { View, Text } from "react-native";
import React from "react";
import { TextInput } from "react-native-gesture-handler";
import { cn } from "@/lib/utils";

import { TextInputProps } from "react-native";

type CustomTextInputProps = TextInputProps & {
  className?: string;
};
const CustomTextInput = ({ className, ...props }: CustomTextInputProps) => {
  return (
    <TextInput
      {...props}
      className={cn("bg-secondary rounded-lg p-3", className)}
    />
  );
};

export default CustomTextInput;
