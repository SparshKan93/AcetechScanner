import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

const DataEntryScreen = ({ route }) => {
  const { type } = route.params;
  const [input, setInput] = useState('');
  const [qrValue, setQrValue] = useState('');

  const generateQRCode = () => {
    let value = '';
    switch (type) {
      case 'url':
        value = `https://${input}`;
        break;
      case 'phone':
        value = `tel:${input}`;
        break;
      case 'sms':
        value = `sms:${input}`;
        break;
      case 'email':
        value = `mailto:${input}`;
        break;
      case 'wifi':
        value = `WIFI:S:MyWiFiNetwork;T:WPA;P:${input};;`;
        break;
      default:
        value = input; // Plain text or other formats
    }
    setQrValue(value);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter {type.toUpperCase()} Information</Text>
      <TextInput
        style={styles.input}
        placeholder={`Enter ${type}`}
        value={input}
        onChangeText={setInput}
      />
      <Pressable 
        style={[styles.button, { backgroundColor: input ? '#000' : '#808080' }]} // Dynamic button color
        onPress={generateQRCode}
        disabled={!input} // Disable the button if input is empty
      >
        <Text style={styles.buttonText}>Generate QR Code</Text>
      </Pressable>
      {qrValue ? (
        <View style={styles.qrContainer}>
          <QRCode value={qrValue} size={200} />
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    width: '100%',
    marginBottom: 20,
    borderRadius: 5,
  },
  button: {
    padding: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  qrContainer: {
    marginTop: 20,
  },
});

export default DataEntryScreen;
