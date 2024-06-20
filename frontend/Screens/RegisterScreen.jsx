import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Pressable,
    Image,
    KeyboardAvoidingView,
    TextInput,
    Alert,
} from "react-native";
import React, { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
// import { Ionicons } from "@expo/vector-icons";

const RegisterScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const handleRegister = () => {
        const user = {
            name: name,
            email: email,
            password: password,
        };
    }
    return (
        <SafeAreaView
            style={{ flex: 1, backgroundColor: "white", alignItems: "center", marginTop: 50 }}
        >

            <View>
                <View style={{ alignItems: "center" }}>
                    <Text
                        style={{
                            fontSize: 20,
                            fontWeight: "bold",
                            marginTop: 12,
                            color: "#041E42",
                        }}
                    >
                        Register to your Account
                    </Text>
                </View>

                <View style={{ marginTop: 70 }}>
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 5,
                            backgroundColor: "#D0D0D0",
                            borderBottomWidth: 2,
                            paddingVertical: 5,
                            borderRadius: 5,
                            marginTop: 30,
                            marginLeft: 10
                        }}
                    >
                        {/* <Ionicons
                            // name="ios-person"
                            size={24}
                            color="gray"
                            
                        /> */}
                        <MaterialIcons name="drive-file-rename-outline" size={24} color="black" style={{ marginLeft: 7 }} />
                        <TextInput
                            value={name}
                            onChangeText={(text) => setName(text)}
                            style={{
                                color: "gray",
                                marginVertical: 10,
                                paddingLeft: 10,
                                width: 300,
                                fontSize: name ? 18 : 18,
                            }}
                            placeholder="Enter your name"
                        />
                    </View>

                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 5,
                            backgroundColor: "#D0D0D0",
                            borderBottomWidth: 2,
                            paddingVertical: 5,
                            borderRadius: 5,
                            marginTop: 30,
                            marginLeft: 10
                        }}
                    >
                        <MaterialIcons
                            style={{ marginLeft: 8 }}
                            name="email"
                            size={24}
                            color="black"
                        />

                        <TextInput
                            value={email}
                            onChangeText={(text) => setEmail(text)}
                            style={{
                                color: "gray",
                                marginVertical: 10,
                                width: 300,
                                fontSize: password ? 18 : 18,
                            }}
                            placeholder="Enter your Email"
                        />
                    </View>
                </View>

                <View>
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 5,
                            backgroundColor: "#D0D0D0",
                            borderBottomWidth: 2,
                            paddingVertical: 5,
                            borderRadius: 5,
                            marginTop: 30,
                            marginLeft: 10
                        }}
                    >
                        <AntDesign
                            name="lock1"
                            size={24}
                            color="black"
                            style={{ marginLeft: 8 }}
                        />

                        <TextInput
                            value={password}
                            onChangeText={(text) => setPassword(text)}
                            secureTextEntry={true}
                            style={{
                                color: "gray",
                                marginVertical: 10,
                                width: 300,
                                fontSize: email ? 18 : 18,
                            }}
                            placeholder="Enter your Password"
                        />
                    </View>
                </View>

                <View
                    style={{
                        marginTop: 12,
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        paddingLeft: 11
                    }}
                >
                    <Text>Keep me logged in</Text>

                    <Text style={{ color: "#007FFF", fontWeight: "500" }}>
                        Forgot Password
                    </Text>
                </View>

                <View style={{ marginTop: 80 }} />

                <Pressable
                    onPress={handleRegister}
                    style={{
                        width: 200,
                        backgroundColor: "rgb(49 144 141)",
                        borderRadius: 6,
                        marginLeft: "auto",
                        marginRight: "auto",
                        padding: 15,
                    }}
                >
                    <Text
                        style={{
                            textAlign: "center",
                            color: "white",
                            fontSize: 19,
                            fontWeight: "bold",
                        }}
                    >
                        Register
                    </Text>
                </Pressable>

                <Pressable
                    style={{ marginTop: 15 }}
                >
                    <Text style={{ textAlign: "center", color: "gray", fontSize: 16 }}>
                        Already have an account? Sign In
                    </Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
};

export default RegisterScreen;

const styles = StyleSheet.create({});