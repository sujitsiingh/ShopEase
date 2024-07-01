import { StyleSheet, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { Color } from "./../../Utils/Color";

const CustomIconButton = ({ text, image, onPress, active }) => {
    return (
        <TouchableOpacity
            style={[
                styles.container,
                { backgroundColor: active ? Color.primary_light : Color.white },
            ]}
            onPress={onPress}
        >
            <Image source={image} style={styles.buttonIcon} />
            <Text
                style={[
                    styles.buttonText,
                    { color: active ? Color.dark : Color.muted },
                ]}
            >
                {text}
            </Text>
        </TouchableOpacity>
    );
};

export default CustomIconButton;

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Color.white,
        borderRadius: 15,
        height: 53,
        width: 160,
        elevation: 7,
        margin: 4,
    },
    buttonText: {
        fontSize: 19,
        color: Color.muted,
        fontWeight: "bold",
    },
    buttonIcon: {
        height: 39,
        width: 49,
        resizeMode: "contain",
    },
});