import React, { useEffect } from "react";
import { useRouter } from "expo-router";
import {
  GoogleSignin,
  isErrorWithCode,
  isSuccessResponse,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import CustomButton from "@/components/ui/CustomButton";
import { Chrome } from "@/lib/icons/Chrome";
import { SafeAreaView } from "react-native-safe-area-context";
GoogleSignin.configure({
  webClientId:
    "398697559104-8avft3hudnj39at7gtt1jnrngc1r19c5.apps.googleusercontent.com",
});
import ActionSheet from "react-native-actions-sheet";
import GetThemeColor from "@/utlis/GetThemeColor";
import CustomText from "../ui/CustomText";
import { View } from "react-native";
const SignIn = () => {
  const router = useRouter();
  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const response = await GoogleSignin.signIn();

      if (isSuccessResponse(response)) {
        const { accessToken, idToken } = await GoogleSignin.getTokens();
        console.log(accessToken);
        console.log(idToken);
      } else {
        // sign in was cancelled by user
      }
    } catch (error) {
      if (isErrorWithCode(error)) {
        console.log(error.message);
        console.log(error.code);
        switch (error.code) {
          case statusCodes.IN_PROGRESS:
            // operation (eg. sign in) already in progress
            break;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            // Android only, play services not available or outdated
            break;
          default:
          // some other error happened
        }
      } else {
        // an error that's not related to google sign in occurred
      }
    }
  };
  const signOut = async () => {
    try {
      await GoogleSignin.signOut();
      // setState({ user: null }); // Remember to remove the user from your app's state as well
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: GetThemeColor(),
      }}
    >
      <ActionSheet
        keyboardHandlerEnabled={false}
        animated
        gestureEnabled
        containerStyle={{
          padding: 10,
          backgroundColor: GetThemeColor(),
          display: "flex",
          flex: 0.3,
        }}
      >
        <CustomText className="font-bold py-4 text-xl">
          Sign in to get the full experience
        </CustomText>
        <View className="flex h-3/4 justify-center items-center">
          <CustomButton
            title="Sign in with Google"
            className="p-3 px-12 flex flex-row-reverse gap-2 bg-primary"
            onPress={signIn}
          >
            <Chrome className="text-primary-foreground" />
          </CustomButton>
        </View>
      </ActionSheet>
    </SafeAreaView>
  );
};

export default SignIn;
