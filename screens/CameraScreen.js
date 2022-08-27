import { FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { Camera } from "expo-camera";
import React, { useEffect, useRef, useState } from "react";
import { Alert, StyleSheet, TouchableOpacity, View } from "react-native";
import { PROFILE_SCREEN } from "../constants";

export default function CameraScreen() {
  const navigation = useNavigation();

  const [back, setBack] = useState(true);
  const cameraRef = useRef(null);
  const [hasPermission, setHasPermission] = useState(null);

  useEffect(() => {
    // Remove the bottom tab
    navigation.getParent()?.setOptions({ tabBarStyle: { display: "none" } });
    return () => navigation.getParent()?.setOptions({ tabBarStyle: undefined });
  }, [navigation]);

  async function showCamera() {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setHasPermission(status === "granted");
    if (hasPermission === false) Alert.alert("Error: No camera access given.");
  }

  function flip() {
    setBack(!back);
  }

  async function takePicture() {
    const photo = await cameraRef.current.takePictureAsync();
    await AsyncStorage.setItem("photo_uri", photo.uri);
    navigation.navigate(PROFILE_SCREEN);
  }

  useEffect(() => {
    showCamera();
  }, []);

  return (
    <View style={{ flex: 1, paddingBottom: 50 }}>
      <Camera
        style={additionalStyles.camera}
        type={back ? Camera.Constants.Type.back : Camera.Constants.Type.front}
        ref={cameraRef}
      >
        <View style={additionalStyles.innerView}>
          <View style={additionalStyles.buttonView}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={additionalStyles.circleButton}
            >
              <FontAwesome
                name="arrow-left"
                size={24}
                style={{ color: "black" }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={takePicture}
              style={additionalStyles.circleButton}
            >
              <FontAwesome name="camera" size={24} style={{ color: "black" }} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={flip}
              style={additionalStyles.circleButton}
            >
              <FontAwesome
                name="refresh"
                size={24}
                style={{ color: "black" }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </Camera>
    </View>
  );
}

const additionalStyles = StyleSheet.create({
  camera: {
    flex: 1,
  },
  circle: {
    height: 50,
    width: 50,
    borderRadius: 50,
  },
  circleButton: {
    width: 70,
    height: 70,
    bottom: 0,
    borderRadius: 50,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonView: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  innerView: {
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    padding: 20,
    justifyContent: "space-between",
  },
});