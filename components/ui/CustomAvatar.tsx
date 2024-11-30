import * as React from "react";
import { cn } from "@/lib/utils";
import { Image, View } from "react-native";

type CustomAvatarProps = {
  className?: string;
};
export default function CustomAvatar({
  className,
  ...props
}: CustomAvatarProps) {
  return (
    <View
      {...props}
      className={cn(
        "flex items-center justify-center w-12 h-12 rounded-full bg-gray-200",
        className
      )}
    >
      <Image
        className="w-10 h-10 rounded-full"
        src="https://randomuser.me/api/portraits"
      />
    </View>
  );
}
