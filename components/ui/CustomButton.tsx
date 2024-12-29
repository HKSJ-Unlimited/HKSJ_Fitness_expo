import { Pressable, PressableProps } from "react-native";
import React from "react";
import { cn } from "@/lib/utils";
import CustomText from "./CustomText";

interface CustomButtonProps extends PressableProps {
  children?: React.ReactNode;
  className?: string;
  title?: string;
}

const CustomButton = ({
  children,
  className,
  title,
  ...props
}: CustomButtonProps) => {
  return (
    <Pressable
      className={cn(
        props.disabled && "opacity-50",
        "flex items-center justify-center rounded-md bg-primary active:opacity-90",
        className
      )}
      {...props}
    >
      {title && (
        <CustomText className="text-primary-foreground">{title}</CustomText>
      )}
      {children}
    </Pressable>
  );
};

export default CustomButton;
