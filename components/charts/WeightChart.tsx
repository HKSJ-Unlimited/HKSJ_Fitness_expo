import { View } from "react-native";
import React from "react";
import { CartesianChart, Line, useChartPressState } from "victory-native";
import type { SharedValue } from "react-native-reanimated";
import { Circle, useFont } from "@shopify/react-native-skia";

const DATA = [
  {
    date: new Date(2024, 5, 1).valueOf(),
    weight: 72,
  },
  {
    date: new Date(2024, 6, 2).valueOf(),
    weight: 75,
  },
  {
    date: new Date(2024, 7, 3).valueOf(),
    weight: 77,
  },
  {
    date: new Date(2024, 8, 4).valueOf(),
    weight: 77,
  },
  {
    date: new Date(2024, 10, 5).valueOf(),
    weight: 82,
  },
  {
    date: new Date(2025, 1).valueOf(),
    weight: 82,
  },
  {
    date: new Date(2025, 2).valueOf(),
    weight: 85,
  },
  {
    date: new Date(2025, 3).valueOf(),
    weight: 85,
  },
];
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
  const font = useFont(require("../../assets/fonts/SpaceMono-Regular.ttf"), 12);
  const { state, isActive } = useChartPressState({ x: 0, y: { weight: 0 } });
  function ToolTip({
    x,
    y,
  }: {
    x: SharedValue<number>;
    y: SharedValue<number>;
  }) {
    return <Circle cx={x} cy={y} r={8} color="black" />;
  }
  return (
    <View style={{ height: 250 }}>
      <CartesianChart
        data={DATA}
        xKey="date"
        yKeys={["weight"]}
        chartPressState={state}
        padding={15}
        axisOptions={{
          font,
          lineWidth: 0.3,
          formatXLabel: (ms) => format(new Date(ms), "MM/yy"),
          formatYLabel: (value) => `${value}kg`,
        }}
      >
        {({ points }) => (
          <>
            {isActive ? (
              <ToolTip x={state.x.position} y={state.y.weight.position} />
            ) : null}
            <Line
              points={points.weight}
              color="red"
              strokeWidth={3}
              animate={{ type: "timing", duration: 300 }}
              curveType="bumpX"
              connectMissingData={true}
            />
          </>
        )}
      </CartesianChart>
    </View>
  );
};

export default WeightChart;
