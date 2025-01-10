import React, { forwardRef, useCallback, useMemo } from "react";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
  useBottomSheetSpringConfigs,
} from "@gorhom/bottom-sheet";
import { Portal } from "@gorhom/portal";
import GetThemeColor from "@/utlis/GetThemeColor";
import { Keyboard, Touchable, TouchableWithoutFeedback } from "react-native";

type CustomBottomSheetProps = {
  children: React.ReactNode | ((data: any) => React.ReactNode);
  snapPoints?: string[];
};
const CustomBottomSheet = forwardRef(
  ({ children, snapPoints }: CustomBottomSheetProps, ref: any) => {
    const renderBackdrop = useCallback(
      (props: any) => (
        <BottomSheetBackdrop
          onPress={() => Keyboard.dismiss()}
          style={{ backgroundColor: "red" }}
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
        <BottomSheetModal
          ref={ref}
          index={0}
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
          {(data) => (
            <BottomSheetView
              style={{
                flex: 1,
                padding: 10,
              }}
            >
              <>{typeof children === "function" ? children(data) : children}</>
            </BottomSheetView>
          )}
        </BottomSheetModal>
      </Portal>
    );
  }
);

export default CustomBottomSheet;
