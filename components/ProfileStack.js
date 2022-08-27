import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { CAMERA_SCREEN, PROFILE_SCREEN } from "../constants";
import ProfileScreen from "../screens/ProfileScreen";
import CameraScreen from "../screens/CameraScreen";

const ProfileStackNav = createStackNavigator();

export default function ProfileStack() {
  return (
    <ProfileStackNav.Navigator>
      <ProfileStackNav.Screen
        name={PROFILE_SCREEN}
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
      <ProfileStackNav.Screen
        name={CAMERA_SCREEN}
        component={CameraScreen}
        options={{ headerShown: false }}
      />
    </ProfileStackNav.Navigator>
  );
}