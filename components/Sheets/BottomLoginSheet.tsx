import React from "react";
import CustomButton from "@/components/ui/CustomButton";
import { Chrome } from "@/lib/icons/Chrome";
import { SafeAreaView } from "react-native-safe-area-context";
import ActionSheet from "react-native-actions-sheet";
import GetThemeColor from "@/utlis/GetThemeColor";
import CustomText from "../ui/CustomText";
import { View } from "react-native";
import { firebase } from "@react-native-firebase/auth";
import { db } from "@/db/init";
import { usersTable } from "@/db/schema";
import {
  GoogleSignin,
  isErrorWithCode,
  isSuccessResponse,
  statusCodes,
} from "@react-native-google-signin/google-signin";
GoogleSignin.configure({
  webClientId:
    "398697559104-8avft3hudnj39at7gtt1jnrngc1r19c5.apps.googleusercontent.com",
});
const Login = () => {
  const updateUser = async () => {
    try {
      const currentUser = firebase.auth().currentUser;
      if (currentUser) {
        await db.update(usersTable).set({
          email: currentUser.email,
          name: currentUser.displayName,
          image: currentUser.photoURL,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };
  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const signInResult = await GoogleSignin.signIn();

      if (signInResult && signInResult.data?.idToken) {
        // Create a Google credential with the token
        const googleCredential = firebase.auth.GoogleAuthProvider.credential(
          signInResult.data?.idToken
        );

        // Get the currently signed-in user (anonymous)
        const currentUser = firebase.auth().currentUser;

        if (currentUser) {
          // Link the anonymous user with Google credentials
          const linkedUser = await currentUser.linkWithCredential(
            googleCredential
          );

          // Manually update the user profile with additional information
          await linkedUser.user.updateProfile({
            displayName: signInResult.data.user.givenName,
            photoURL: signInResult.data.user.photo,
          });
          updateUser();
          console.log("User profile updated");
        } else {
          console.log("No user is signed in");
        }
      } else {
        console.log("Sign in was cancelled by the user");
      }
    } catch (error) {
      if (isErrorWithCode(error)) {
        if (error.code === statusCodes.IN_PROGRESS) {
          console.log("Operation (e.g., sign in) already in progress");
        } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
          console.log("Play services not available or outdated");
        } else {
          console.error("An error occurred during sign in:", error);
        }
      }
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
          height: 200,
        }}
      >
        <CustomText className="font-bold py-4 text-xl">
          Sign in to get the full experience 😌
        </CustomText>
        <View className="flex m-5 justify-center items-center">
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

export default Login;
