import { View, LayoutChangeEvent } from "react-native";
import React from "react";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs/lib/typescript/commonjs/src/types";
import TabBarButton from "./TabBarButton";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

const TabBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
  const [dimensions, setDimensions] = React.useState({
    height: 20,
    width: 100,
  });
  const buttonWidth = dimensions.width / state.routes.length;
  const onTabBarLayout = (event: LayoutChangeEvent) => {
    setDimensions({
      height: event.nativeEvent.layout.height,
      width: event.nativeEvent.layout.width,
    });
  };
  const tabPositionX = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: tabPositionX.value }],
    };
  });
  return (
    <View
      onLayout={onTabBarLayout}
      style={{
        position: "absolute",
        bottom: 0,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginHorizontal: 30,
        paddingVertical: 15,
        borderRadius: 30,
        maxHeight: 65,
      }}
      className="bg-primary-foreground"
    >
      <Animated.View
        style={[
          animatedStyle,
          {
            marginHorizontal: 30,
          },
        ]}
        className="h-16 w-16 rounded-full absolute bg-primary opacity-10"
      />
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        if (["_sitemap", "+not-found"].includes(route.name)) return null;

        const isFocused = state.index === index;

        const onPress = () => {
          tabPositionX.value = withSpring(buttonWidth * index, {
            duration: 1500,
          });
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TabBarButton
            key={route.name}
            onPress={onPress}
            onLongPress={onLongPress}
            isFocused={isFocused}
            routeName={route.name}
            label={label as string}
          />
        );
      })}
    </View>
  );
};

export default TabBar;
