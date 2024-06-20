import React from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function HomeScreen() {
    return (
        <View style={styles.container}>
            {/* <Text style={{ padding: '20px', fontWeight: '600', fontSize: 15 }}>  Shop</Text> */}
            <Image source={require('./../assets/Logo.jpg')} style={{ width: 400, height: 400 }} />
            <Text >Start Shopping With</Text>
            <Text style={{ fontWeight: '800' }}>ShopEase</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center'
    },
    button: {
        margin: 15,
        backgroundColor: 'gold',
        padding: 10,
        color: 'white',
        fontWeight: 'bold',
        width: 250,
        alignItems: 'center',
        borderRadius: 10,
    }
});