import { Canvas, Rect } from "@shopify/react-native-skia";
import { Text, View } from "react-native";
import { Pie, PolarChart } from "victory-native";
import CustomText from "../ui/CustomText";

const DATA = () => [
  { label: "Protein", value: 120, color: "hsl(20, 90%, 70%)" }, // Green
  { label: "Carbohydrate", value: 200, color: "hsl(30, 70%, 74%)" }, // Blue
  { label: "Fat", value: 50, color: "hsl(14, 14%, 77%)" }, // Yellow
];

export function MacrosChart() {
  return (
    <View style={{ height: 250 }}>
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
      <View className="mx-20 flex-wrap flex-row items-center justify-center mt-2 gap-2">
        {DATA().map((d, index) => {
          return (
            <View key={index} className="flex-row items-center mr-2">
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
