import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

const Create = ({ navigation }) => {
  const options = ['url', 'phone', 'sms', 'email', 'wifi', 'text'];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select QR Code Type</Text>
      {options.map((option) => (
        <Pressable
          key={option} // Ensure each option has a unique key
          style={styles.button} // Apply a button style
          onPress={() => navigation.navigate('DataEntry', { type: option })}
        >
          <Text style={styles.buttonText}>{`Generate ${option.toUpperCase()} QR`}</Text>
        </Pressable>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    alignSelf: 'center',
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    marginVertical: 15,
    width: 180
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default Create;
