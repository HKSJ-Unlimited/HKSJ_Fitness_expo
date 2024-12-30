import { View, Text, Pressable, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { LayoutDashboard } from "@/lib/icons/LayoutDashboard";
import { NotebookPen } from "@/lib/icons/NotebookPen";
import { Settings } from "@/lib/icons/Settings";

type TabBarButtonProps = {
  isFocused: boolean;
  routeName: string;
  label: string;
  onPress: () => void;
  onLongPress: () => void;
};
const TabBarButton = ({
  isFocused,
  label,
  routeName,
  ...props
}: TabBarButtonProps) => {
  const scale = useSharedValue(0);

  useEffect(() => {
    scale.value = withSpring(
      typeof isFocused === "boolean" ? (isFocused ? 1 : 0) : isFocused,
      { duration: 350 }
    );
  }, [scale, isFocused]);

  const animatedIconStyle = useAnimatedStyle(() => {
    const scaleValue = interpolate(scale.value, [0, 1], [1, 1.2]);
    const top = interpolate(scale.value, [0, 1], [0, 9]);

    return {
      // styles
      transform: [{ scale: scaleValue }],
      top,
    };
  });
  const animatedTextStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scale.value, [0, 1], [1, 0]);

    return {
      opacity,
    };
  });
  const icon: Record<string, () => JSX.Element> = {
    dashboard: () => (
      <LayoutDashboard
        size={18}
        className="text-primary-foreground dark:text-primary"
      />
    ),
    diary: () => (
      <NotebookPen
        size={18}
        className="text-primary-foreground dark:text-primary"
      />
    ),
    settings: () => (
      <Settings
        size={18}
        className="text-primary-foreground dark:text-primary"
      />
    ),
  };

  return (
    <Pressable {...props} style={styles.container}>
      <Animated.View className="" style={animatedIconStyle}>
        {icon[routeName]()}
      </Animated.View>

      <Animated.Text
        className="text-primary-foreground dark:text-primary"
        style={[
          animatedTextStyle,
          {
            fontSize: 11,
          },
          ,
        ]}
      >
        {label}
      </Animated.Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
  },
});

export default TabBarButton;
