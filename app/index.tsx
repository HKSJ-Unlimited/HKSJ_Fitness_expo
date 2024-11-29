import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import {
  GoogleSignin,
  GoogleSigninButton,
  isErrorWithCode,
  isSuccessResponse,
  statusCodes,
} from "@react-native-google-signin/google-signin";
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
        router.replace("/(tabs)");
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
    <SafeAreaView className="flex flex-1 justify-center">
      <Text onPress={signIn} className="text-center text-foreground">
        SignIn2
      </Text>
    </SafeAreaView>
  );
};

export default SignIn;
