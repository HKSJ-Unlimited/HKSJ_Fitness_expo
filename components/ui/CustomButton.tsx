import { Pressable, PressableProps } from "react-native";
import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";
import CustomText from "./CustomText";

interface CustomButtonProps extends PressableProps {
  children?: React.ReactNode;
  className?: string;
  title?: string;
}

const CustomButton = forwardRef(
  ({ children, className, title, ...props }: CustomButtonProps, ref: any) => {
    return (
      <Pressable
        className={cn(
          props.disabled && "opacity-50",
          "flex items-center justify-center rounded-md active:opacity-40",
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
  }
);

export default CustomButton;
