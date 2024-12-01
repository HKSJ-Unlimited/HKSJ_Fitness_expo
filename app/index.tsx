import React from "react";
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
const SignIn = () => {
  const router = useRouter();
  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const response = await GoogleSignin.signIn();
      console.log(response.data);
      if (isSuccessResponse(response)) {
        console.log({ userInfo: response.data });
        router.replace("/(auth)/(tabs)/dashboard");
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
    <SafeAreaView className="flex flex-1 justify-center items-center">
      <CustomButton
        title="Sign in with Google"
        className="p-3 px-12 flex flex-row-reverse gap-2"
        onPress={signIn}
      >
        <Chrome className="text-primary-foreground" />
      </CustomButton>
    </SafeAreaView>
  );
};

export default SignIn;
