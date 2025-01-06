import React, { forwardRef, useCallback, useMemo } from "react";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
  useBottomSheetSpringConfigs,
} from "@gorhom/bottom-sheet";
import { Portal } from "@gorhom/portal";
import GetThemeColor from "@/utlis/GetThemeColor";
import { Keyboard } from "react-native";

type CustomBottomSheetProps = {
  children: React.ReactNode;
  snapPoints?: string[];
};
const CustomBottomSheet = forwardRef(
  ({ children, snapPoints }: CustomBottomSheetProps, ref: any) => {
    const renderBackdrop = useCallback(
      (props: any) => (
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
        />
      ),
      []
    );
    const animationConfigs = useBottomSheetSpringConfigs({
      damping: 80,
      overshootClamping: true,
      restDisplacementThreshold: 0.1,
      restSpeedThreshold: 0.1,
      stiffness: 500,
      duration: 400,
    });
    return (
      <Portal>
        <BottomSheet
          ref={ref}
          index={-1}
          animationConfigs={animationConfigs}
          backdropComponent={renderBackdrop}
          snapPoints={snapPoints ?? ["25%", "50%", "70%"]}
          backgroundStyle={{
            backgroundColor: GetThemeColor(),
          }}
          keyboardBehavior="interactive"
          keyboardBlurBehavior="restore"
          android_keyboardInputMode="adjustResize"
        >
          <BottomSheetView
            // onTouchStart={() => Keyboard.dismiss()}
            style={{
              flex: 1,
              padding: 10,
            }}
          >
            {children}
          </BottomSheetView>
        </BottomSheet>
      </Portal>
    );
  }
);

export default CustomBottomSheet;
