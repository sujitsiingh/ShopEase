import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const ButtonComponent = ({
    title = "My Button",
    btnKind,
    variant,
    size,
    onPress,
}) => {
    const buttonStyles = [
        styles.button,
        styles[btnKind],
        styles[variant], 
        styles[size],
    ];
    const textStyle = [
        variant === "info" || variant === "light"
            ? { color: "black" }
            : styles.text,
    ];

    return (
        <TouchableOpacity onPress={onPress} style={buttonStyles}>
            <Text style={textStyle}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 4,
        justifyContent: "center",
        alignItems: "center",
        margin: 5,
    },
    text: {
        color: "white",
    },
    rounded: {
        borderRadius: 30,
    },
    outlined: {
        borderWidth: 1,
        borderColor: "blue",
    },
    primary: {
        backgroundColor: "blue",
    },
    secondary: {
        backgroundColor: "gray",
    },
    success: {
        backgroundColor: "green",
    },
    warning: {
        backgroundColor: "orange",
    },
    danger: {
        backgroundColor: "red",
    },
    info: {
        backgroundColor: "cyan",
    },
    dark: {
        backgroundColor: "black",
    },
    light: {
        backgroundColor: "#f2f2f2",
    },

    sm: {
        paddingVertical: 8,
        paddingHorizontal: 16,
    },
    md: {
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    lg: {
        paddingVertical: 12,
        paddingHorizontal: 24,
    },
});

export default ButtonComponent;