import { Canvas, Rect } from "@shopify/react-native-skia";
import { Text, View } from "react-native";
import { Pie, PolarChart } from "victory-native";
import CustomText from "../ui/CustomText";

const DATA = () => [
  { label: "Breakfast", value: 500, color: "hsl(120, 70%, 50%)" },
  { label: "Lunch", value: 1200, color: "hsl(45, 90%, 60%)" },
  { label: "Dinner", value: 500, color: "hsl(350, 70%, 50%)" },
  { label: "Snacks", value: 100, color: "hsl(210, 70%, 50%)" },
];

export function CalorieChart() {
  return (
    <View style={{ height: 200 }}>
      <PolarChart
        data={DATA()}
        labelKey={"label"}
        valueKey={"value"}
        colorKey={"color"}
      >
        <Pie.Chart innerRadius={"50%"} startAngle={10}>
          {({ slice }) => {
            return (
              <>
                <Pie.Slice animate={{ type: "spring" }} />
                <Pie.SliceAngularInset
                  animate={{ type: "spring" }}
                  angularInset={{
                    angularStrokeWidth: 5,
                    angularStrokeColor: "white",
                  }}
                />
              </>
            );
          }}
        </Pie.Chart>
      </PolarChart>
      <View style={{ flexDirection: "row", alignSelf: "center", marginTop: 5 }}>
        {DATA().map((d, index) => {
          return (
            <View
              key={index}
              style={{
                marginRight: 8,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Canvas style={{ height: 12, width: 12, marginRight: 4 }}>
                <Rect
                  rect={{ x: 0, y: 0, width: 12, height: 12 }}
                  color={d.color}
                />
              </Canvas>
              <CustomText>{d.label}</CustomText>
            </View>
          );
        })}
      </View>
    </View>
  );
}
