import { Pressable, PressableProps } from "react-native";
import React from "react";
import { cn } from "@/lib/utils";

interface CustomButtonProps extends PressableProps {
  children: React.ReactNode;
  className?: string;
}

const CustomButton = ({ children, className, ...props }: CustomButtonProps) => {
  return (
    <Pressable
      className={cn(
        props.disabled && "opacity-50",
        "flex items-center justify-center rounded-md bg-primary  active:opacity-90",
        className
      )}
      {...props}
    >
      {children}
    </Pressable>
  );
};

export default CustomButton;
