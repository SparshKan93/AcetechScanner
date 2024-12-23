import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, Alert, Image, TextInput } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { WebView } from 'react-native-webview';
import { useAppContext } from "../Context/AppContext";

const ScannedLink = ({ route, navigation }) => {
  const { link } = route.params;
  const { removeLinkFromHistory } = useAppContext();
  const [showWebView, setShowWebView] = useState(false);
  const [editableLink, setEditableLink] = useState(link); // State to hold editable link text

  const handleLinkPress = (link) => {
    if (link.startsWith('upi://') || link.startsWith('tel:') || link.startsWith('mailto:')) {
      Linking.openURL(link).catch((err) => console.error('Failed to open custom scheme link:', err));
    } else {
      setShowWebView(true);
    }
  };

  const handleOpenInBrowser = async (link) => {
    try {
      const isValidUrl = await Linking.canOpenURL(link);
      if (isValidUrl) {
        await Linking.openURL(link);
      } else {
        Alert.alert('Invalid URL', 'The provided link is not a valid URL and cannot be opened.');
      }
    } catch (err) {
      console.error('Failed to open URL in external browser:', err);
    }
  };
  
  const handleCopy = async () => {
    await Clipboard.setStringAsync(editableLink); // Copies updated link
    Alert.alert('Copied', 'The link has been copied to your clipboard.');
  };

  const handleDelete = () => {
    removeLinkFromHistory(editableLink);
    navigation.navigate('History');
  };

  const handleWebViewError = () => {
    Alert.alert(
      'Error',
      'The site cannot be opened here. Redirecting to the browser...',
      [
        {
          text: 'OK',
          onPress: () => handleOpenInBrowser(editableLink),
        },
      ]
    );
    setShowWebView(false); 
  };

  return (
    <View style={{ flex: 1 }}>
      {!showWebView ? (
        <>
          <TextInput
            style={styles.linkText}
            value={editableLink}
            onChangeText={setEditableLink} // Updates state when text changes
            multiline={true}
            numberOfLines={3}
          />
          <View style={styles.topButtonsContainer}>
            <TouchableOpacity style={styles.imageButton} onPress={handleCopy}>
              <Image style={styles.copyicon} resizeMode="cover" source={require('../assets/images/copy.png')} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.imageButton} onPress={handleDelete}>
              <Image style={styles.deleteicon} resizeMode="cover" source={require('../assets/images/delete.png')} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.button} onPress={() => handleLinkPress(editableLink)}>
            <Text style={styles.buttonText}>Open URL</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handleOpenInBrowser(editableLink)}>
            <Text style={styles.buttonText}>Open URL in Browser</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('History')}>
            <Text style={styles.buttonText}>View History</Text>
          </TouchableOpacity>
        </>
      ) : (
        <WebView
          source={{ uri: editableLink }}
          style={{ flex: 1 }}
          startInLoadingState={true}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          onError={handleWebViewError} 
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  topButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  imageButton: {
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 10,
  },
  linkText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderWidth: 2,
    borderColor: 'grey',
    borderRadius: 5,
    marginHorizontal: 20,
    marginTop: "5%",
  },
  button: {
    width: 180, // Fixed width for consistent button size
    paddingVertical: 12,
    backgroundColor: 'grey',
    borderRadius: 5,
    marginTop: 10,
    alignSelf: 'center',
    alignItems: 'center', // Centers the text within the button
  },
  copyicon: {
    width: 24,
    height: 24,
    marginBottom: 2,
    alignSelf: "center",
    tintColor: 'grey',
  },
  deleteicon: {
    width: 24,
    height: 24,
    marginBottom: 2,
    alignSelf: "center",
    tintColor: '#FF6347',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default ScannedLink;
