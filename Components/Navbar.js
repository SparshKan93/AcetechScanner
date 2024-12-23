import React, { useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, BackHandler } from 'react-native';
import { useNavigation, useNavigationState, useFocusEffect } from '@react-navigation/native';

const Navbar = () => {
  const navigation = useNavigation();
  const currentRoute = useNavigationState(state =>
    state?.routes?.[state.index]?.name || 'Home'
  );

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        if (currentRoute === 'History' || currentRoute === 'Create') {
          navigation.reset({
            index: 0,
            routes: [{ name: 'Home' }],
          });
          return true; 
        }
        return false; 
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      };
    }, [currentRoute, navigation])
  );

  return (
    <View style={styles.navbar}>
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Image
          style={[
            styles.icon,
            
          ]}
          resizeMode="cover"
          source={require('../assets/images/Home.png')}
        />
        <Text
          style={[
            styles.navLink,
            currentRoute === 'Home' ? styles.activeLink : styles.inactiveLink,
          ]}
        >
          Home
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Scan')}>
        <Image
          style={[
            styles.icon,
            
          ]}
          resizeMode="cover"
          source={require('../assets/images/scan_image.png')}
        />
        <Text
          style={[
            styles.navLink,
            currentRoute === 'Scan' ? styles.activeLink : styles.inactiveLink,
          ]}
        >
          Scan
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
        <Image
          style={[
            styles.icon,
            
          ]}
          resizeMode="cover"
          source={require('../assets/images/profile.png')}
        />
        <Text
          style={[
            styles.navLink,
            currentRoute === 'Profile' ? styles.activeLink : styles.inactiveLink,
          ]}
        >
          Profile
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Create')}>
        <Image
          style={[
            styles.icon,
           
          ]}
          resizeMode="cover"
          source={require('../assets/images/edit_image.png')}
        />
        <Text
          style={[
            styles.navLink,
            currentRoute === 'Create' ? styles.activeLink : styles.inactiveLink,
          ]}
        >
          Create
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('History')}>
        <Image
          style={[
            styles.icon,
            
          ]}
          resizeMode="cover"
          source={require('../assets/images/history_image.png')}
        />
        <Text
          style={[
            styles.navLink,
            currentRoute === 'History' ? styles.activeLink : styles.inactiveLink,
          ]}
        >
          History
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#007bff',
    paddingVertical: '5%',
    paddingHorizontal: '5%',
  },
  navLink: {
    fontSize: 16,
    marginTop: 4,
  },
  activeLink: {
    color: '#fff',
    textDecorationLine: 'underline', 
    fontWeight: 'bold',
  },
  inactiveLink: {
    color: '#fff', 
  },
  icon: {
    width: 24,
    height: 24,
    marginBottom: 2,
    alignSelf: 'center',
  },
});

export default Navbar;
