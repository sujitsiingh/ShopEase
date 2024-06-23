import React from 'react';
import { View, Image, Text, StyleSheet, SafeAreaView, Dimensions, TouchableOpacity } from 'react-native';
import {Color} from './../Utils/Color';
import {Fonts} from './../Utils/Fonts';
import { useNavigation } from "@react-navigation/native";
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function HomeScreen() {
    // const navigation = useNavigation();

    // const handleLogin = () => {
    //     navigation.navigate("LOGIN");
    // };

    // const handleSignup = () => {
    //     navigation.navigate("SIGNUP");
    // };
    return (
        <SafeAreaView style={styles.container}>
            <View style={{ flexDirection: 'row', alignItems: 'center', padding: 1, gap: 25 }}>
                <Image resizeMode='contain' source={require('./../assets/ShopEase.png')} style={{ height: 110, width: 100, marginTop: '7%', borderRadius: 1000, }} />
                <View style={{ flexDirection: 'column' }}>
                    <Text style={{justifyContent: 'center', paddingVertical: 6, paddingTop: 21, fontSize: 17}}>Start Shopping With</Text>
                    <Text style={{ fontWeight: 'bold', fontSize: 35, paddingHorizontal: 34 }}>ShopEase</Text>
                </View>
            </View>

            <View>
                <Image resizeMode='contain' source={require('./../assets/Logo.jpg')} style={{ height: 260, width: 400 }} />
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[
                        styles.loginButtonWrapper,
                        { backgroundColor: Color.primary },
                    ]}
                    // onPress={handleLogin}
                >
                    <Text style={styles.loginButtonText}>Login</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.loginButtonWrapper]}
                    // onPress={handleSignup}
                >
                    <Text style={styles.signupButtonText}>Sign-up</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flex: 1,
        // justifyContent: 'center',
        backgroundColor: 'rgb(231 203 199)',
        height: 'windowHeight'
    },
    buttonContainer: {
        marginTop: 20,
        flexDirection: "row",
        borderWidth: 2,
        borderColor: Color.primary,
        width: "80%",
        height: 60,
        borderRadius: 100,
    },
    loginButtonWrapper: {
        justifyContent: "center",
        alignItems: "center",
        width: "50%",
        borderRadius: 98,
    },
    loginButtonText: {
        color: Color.white,
        fontSize: 18,
        fontFamily: Fonts.SemiBold,
    },
    signupButtonText: {
        fontSize: 18,
        fontFamily: Fonts.SemiBold,
    },
});