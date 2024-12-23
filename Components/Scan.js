import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Pressable, Image, Alert, Linking, ActivityIndicator, StatusBar  } from "react-native";
import { CameraView, Camera } from "expo-camera";
import * as ImagePicker from 'expo-image-picker';
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { useAppContext } from "../Context/AppContext";

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [torchOn, setTorchOn] = useState(false);
  const navigation = useNavigation();
  const [isScanningImage, setIsScanningImage] = useState(false);
  const { addLinkToHistory } = useAppContext();

  useEffect(() => {
    StatusBar.setBackgroundColor("black");
    StatusBar.setBarStyle("light-content");
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getCameraPermissions();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      setScanned(false);
    }, [])
  );

  const handleBarcodeScanned = async ({ data }) => {
    setScanned(true);
  
    // Check if the data starts with a number
    const startsWithNumber = /^\d/.test(data);
  
    if (startsWithNumber) {
      try {
        const response = await fetch(`https://aceqr.space/api/uidToUrl/${data}`);
        const result = await response.json();
  
        if (result?.url) {
          addLinkToHistory(result.url); // Save to history
          navigation.navigate("ScannedLink", { link: result.url });
          return;
        } else {
          // If no URL is found in the API response, return the scanned number
          addLinkToHistory(data); // Save the scanned number to history
          navigation.navigate("ScannedLink", { link: data }); // Navigate with the scanned number
        }
      } catch (error) {
        Alert.alert("Error fetching data from API.");
        console.error("API fetch error:", error);
      }
    } else {
      // Handle cases where the QR code doesn't start with a number
      addLinkToHistory(data);
      setTimeout(() => {
        navigation.navigate("ScannedLink", { link: data });
      }, 1500);
    }
  };
  
  

  // const pickImage = async () => {
  //   const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
  //   if (permissionResult.granted === false) {
  //     Alert.alert("Permission to access camera roll is required!");
  //     return;
  //   }
  
  //   const result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //     allowsEditing: true, 
  //     quality: 1,
  //   });
  
  //   if (!result.canceled && result.assets && result.assets.length > 0) {
  //     const uri = result.assets[0].uri;
  //     scanImage(uri);
  //   } else {
  //     Alert.alert("No image selected.");
  //   }
  // };
  
//   const scanImage = async (uri) => {
//     setIsScanningImage(true);
  
//     try {
//       if (!uri.startsWith('file://')) {
//         Alert.alert("Invalid image URI.");
//         return;
//       }
      
//       // Attempt to scan for QR codes within the selected image
//       console.log("Scanning image from URI:", uri);
// const result = await Camera.scanFromURLAsync(uri);
// console.log("Scan result:", result);

  
//       if (result && result.length > 0) {
//         const data = result[0].data;
  
//         // Save the scanned data to history and navigate to the ScannedLink screen
//         addLinkToHistory(data); 
//         navigation.navigate("ScannedLink", { link: data });
//       } else {
//         Alert.alert("No QR code found in the selected image.");
//       }
//     } catch (error) {
//       Alert.alert("An error occurred while scanning the image.");
//       console.error("Scan image error:", error);  // Logs the error for debugging
//     } finally {
//       setIsScanningImage(false);
//     }
//   };
  

  if (hasPermission === null) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="white" />
      </View>
    );
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const toggleTorch = () => {
    setTorchOn(prevState => !prevState);
  };

  const handleHelpPress = () => {
    Linking.openURL("https://forms.gle/fsMyYABM7KbvNbvN8")
      .catch(err => Alert.alert("An error occurred while trying to open the link."));
  };

  return (
    <View style={styles.container}>
      <CameraView
        onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ["qr", "pdf417"],
        }}
        enableTorch={torchOn}
        style={StyleSheet.absoluteFillObject}
      />
      <View style={styles.overlayContainer}>
        <Pressable onPress={toggleTorch} style={[styles.button]}>
          <Image style={[styles.icon, { tintColor: torchOn ? "blue" : "white" }]} resizeMode="cover" source={require('../assets/images/light_image.png')} />
          <Text style={[styles.buttonText, { color: torchOn ? "blue" : "white" }]}>Light</Text>
        </Pressable>
        {/* <Pressable onPress={pickImage} style={styles.button}>
          <Image style={styles.icon} resizeMode="cover" source={require('../assets/images/gallery_image.png')} />
          <Text style={styles.buttonText}>Scan Image</Text>
        </Pressable> */}
        <Pressable onPress={handleHelpPress} style={styles.button}>
          <Image style={styles.icon} resizeMode="cover" source={require('../assets/images/Help_image.png')} />
          <Text style={styles.buttonText}>Help</Text>
        </Pressable>
      </View>
      {isScanningImage && <Text style={styles.scanningText}>Scanning Image...</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  overlayContainer: {
    position: "absolute",
    top: 20,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  button: {
    padding: 12,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    textShadowColor: "rgba(0, 0, 0, 0.7)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  icon: {
    width: 24,
    height: 24,
    marginBottom: 2,
    alignSelf: "center"
  },
  scanningText: {
    position: "absolute",
    bottom: 50,
    left: "50%",
    transform: [{ translateX: -50 }],
    color: "white",
    fontSize: 18,
  },
});
