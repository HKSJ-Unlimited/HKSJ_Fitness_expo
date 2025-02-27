import {
  Circle,
  Group,
  Line as SkiaLine,
  LinearGradient,
  Path,
  Skia,
  Text as SkiaText,
  useFont,
  vec,
} from "@shopify/react-native-skia";
import React from "react";
import { SharedValue, useDerivedValue } from "react-native-reanimated";

const ActiveValueIndicator = ({
  xPosition,
  yPosition,
  top,
  bottom,
  activeValue,
  textColor,
  lineColor,
  indicatorColor,
  topOffset = 10,
}: {
  xPosition: SharedValue<number>;
  yPosition: SharedValue<number>;
  activeValue: SharedValue<number>;
  bottom: number;
  top: number;
  textColor: string;
  lineColor: string;
  indicatorColor: SharedValue<string>;
  topOffset?: number;
}) => {
  const FONT_SIZE = 12;
  const font = useFont(require("../../assets/fonts/SpaceMono-Regular.ttf"), 12);
  const start = useDerivedValue(() => vec(xPosition.value, bottom));
  const end = useDerivedValue(() =>
    vec(xPosition.value, top + 1.5 * FONT_SIZE + topOffset)
  );
  // Text label
  const activeValueDisplay = useDerivedValue(() => activeValue.value + "Kg");
  const activeValueWidth = useDerivedValue(
    () =>
      font
        ?.getGlyphWidths?.(font.getGlyphIDs(activeValueDisplay.value))
        .reduce((sum, value) => sum + value, 0) || 0
  );
  const activeValueX = useDerivedValue(
    () => xPosition.value - activeValueWidth.value / 0.9
  );

  return (
    <>
      <SkiaLine p1={start} p2={end} color={lineColor} strokeWidth={1} />
      <Circle cx={xPosition} cy={yPosition} r={10} color={indicatorColor} />
      <Circle
        cx={xPosition}
        cy={yPosition}
        r={8}
        color="hsla(0, 0, 100%, 0.25)"
      />
      <SkiaText
        color={textColor}
        font={font}
        text={activeValueDisplay}
        x={activeValueX}
        y={top + FONT_SIZE + topOffset}
      />
    </>
  );
};
export default ActiveValueIndicator;
