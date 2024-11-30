import * as React from "react";
import { cn } from "@/lib/utils";
import { Image, View } from "react-native";

type CustomAvatarProps = {
  className?: string;
  src: string;
};
export default function CustomAvatar({
  className,
  src,
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
        style={{ width: "90%", height: "90%" }}
        className="rounded-full"
        src={src}
      />
    </View>
  );
}
