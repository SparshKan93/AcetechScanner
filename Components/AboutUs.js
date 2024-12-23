import React from 'react';
import { View, Image, StyleSheet, Dimensions, Text, ScrollView } from 'react-native';

const { width } = Dimensions.get('window');

const AboutUs = () => {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            {/* Logo */}
            <Image
                style={styles.icon}
                resizeMode="contain"
                source={require('../assets/images/Acetechnoid.png')}
            />

            {/* Title */}
            <Text style={styles.title}>About Us</Text>

            {/* Description */}
            <Text style={styles.description}>
                Welcome to **AceTechnoid**, your trusted partner in cutting-edge technological solutions. 
                At AceTechnoid, we strive to bring innovation, efficiency, and reliability to your business. 
                Our team of dedicated professionals is passionate about delivering high-quality services 
                that cater to your unique needs.
            </Text>

            {/* Mission Section */}
            <Text style={styles.subtitle}>Our Mission</Text>
            <Text style={styles.description}>
                To empower businesses with state-of-the-art technology solutions that drive success 
                and foster growth. We aim to build long-lasting relationships with our clients through 
                transparency, dedication, and results-driven strategies.
            </Text>

            {/* Vision Section */}
            <Text style={styles.subtitle}>Our Vision</Text>
            <Text style={styles.description}>
                To be a global leader in technology and innovation, shaping the future by transforming 
                ideas into impactful solutions.
            </Text>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: 'grey',
        alignItems: 'center',
        padding: 20,
    },
    icon: {
        width: width * 0.6,
        height: undefined,
        aspectRatio: 1,
        marginBottom: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#444',
        marginTop: 20,
        marginBottom: 10,
        alignSelf: 'flex-start',
    },
    description: {
        fontSize: 16,
        color: '#555',
        lineHeight: 22,
        textAlign: 'center',
    },
});

export default AboutUs;
