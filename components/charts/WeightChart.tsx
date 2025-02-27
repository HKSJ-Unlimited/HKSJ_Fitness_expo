import { View } from "react-native";
import React from "react";
import { CartesianChart, Line, useChartPressState } from "victory-native";
import { useDerivedValue, type SharedValue } from "react-native-reanimated";
import { Circle, useFont } from "@shopify/react-native-skia";
import { useSQLiteContext } from "expo-sqlite";
import { useGetGoals, useGetProgress } from "@/db/User";
import { progressType } from "@/Types/SharedTypes";
import { useColorScheme } from "@/lib/useColorScheme";
import CustomText from "../ui/CustomText";
import ActiveValueIndicator from "./ActiveValueIndicator";

const format = (date: Date, pattern: string) => {
  return pattern
    .replace(/yyyy/g, date.getFullYear().toString())
    .replace(/MM/g, (date.getMonth() + 1).toString().padStart(2, "0"))
    .replace(/dd/g, date.getDate().toString().padStart(2, "0"))
    .replace(/yy/g, date.getFullYear().toString().slice(2))
    .replace(/HH/g, date.getHours().toString().padStart(2, "0"))
    .replace(/mm/g, date.getMinutes().toString().padStart(2, "0"))
    .replace(/ss/g, date.getSeconds().toString().padStart(2, "0"));
};
const WeightChart = () => {
  const db = useSQLiteContext();
  const { data: DATA } = useGetProgress(db, progressType.weight);
  const { data: Goals } = useGetGoals(db);
  const { colorScheme } = useColorScheme();
  const theme = colorScheme === "dark" ? "white" : "#636362";

  const font = useFont(require("../../assets/fonts/SpaceMono-Regular.ttf"), 12);
  const { state, isActive } = useChartPressState({
    x: 0,
    y: { value: 0 },
  });
  function ToolTip({
    x,
    y,
  }: {
    x: SharedValue<number>;
    y: SharedValue<number>;
  }) {
    return <Circle cx={x} cy={y} r={8} color="black" />;
  }
  // Indicator color based on delta
  const indicatorColor = useDerivedValue<string>(() => {
    return "green";
  });

  if (!DATA.length || !Goals.length)
    return (
      <View className="h-20 flex justify-center items-center">
        <CustomText className="text-center">
          Add some data to see chart.
        </CustomText>
      </View>
    );
  return (
    <View style={{ height: 250 }}>
      <CartesianChart
        data={DATA}
        xKey="date"
        yKeys={["value"]}
        chartPressState={state}
        padding={5}
        axisOptions={{
          font,
          tickCount: 5,
          labelOffset: { x: 12, y: 8 },
          labelPosition: { x: "outset", y: "outset" },
          axisSide: { x: "bottom", y: "left" },
          lineWidth: 0.2,
          formatXLabel: (ms) => format(new Date(ms), "MM/yy"),
          formatYLabel: (value) => `${value}kg`,
          labelColor: theme,
          lineColor: theme,
        }}
        renderOutside={({ chartBounds }) => (
          <>
            {isActive && (
              <ActiveValueIndicator
                xPosition={state.x.position}
                yPosition={state.y.value.position}
                bottom={chartBounds.bottom}
                top={chartBounds.top}
                activeValue={state.y.value.value}
                textColor="#000"
                lineColor="#000"
                indicatorColor={indicatorColor}
              />
            )}
          </>
        )}
      >
        {({ points }) => (
          <>
            <Line
              points={points.value}
              color={
                points.value[points.value.length - 1].yValue! > Goals[0].weight
                  ? "red"
                  : "green"
              }
              strokeWidth={3}
              animate={{ type: "timing", duration: 300 }}
              curveType="bumpX"
              connectMissingData={true}
            />
            {/* {isActive && (
              <ToolTip x={state.x.position} y={state.y.value.position} />
            )} */}
          </>
        )}
      </CartesianChart>
    </View>
  );
};

export default WeightChart;
