import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Color } from './../Utils/Color';
import { Fonts } from './../Utils/Fonts';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureEntery, setSecureEntery] = useState(true);
  const handleLogin = () => {
    const user = {
      email: email,
      password: password,
    };
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        // backgroundColor: 'rgb(231 203 199)',
        backgroundColor: '#EAF0F1',
        alignItems: 'center',
        width: '100%',
        // overflow: 'hidden'
      }}
    >
      <KeyboardAvoidingView>
        <View style={{ alignItems: 'center' }}>
          <Text
            style={{
              fontSize: 24,
              // fontWeight: 'bold',
              fontFamily: Fonts.Bold,
              marginTop: '17%',
              color: '#041E42',
            }}
          >
            Log In to your Account
          </Text>
        </View>

        <View>
          <Image resizeMode='contain' source={require('./../assets/SELM.png')} style={{ marginTop: '5%', height: 90}} />
        </View>

        <View style={{ marginTop: 30 }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 5,
              // backgroundColor: '#D0D0D0',
              borderBottomWidth: 2,
              borderLeftWidth: 1,
              paddingVertical: 5,
              borderRadius: 80,
              marginTop: 30,
              // marginLeft: 10,
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            <MaterialIcons
              style={{ marginLeft: 8 }}
              name="email"
              size={24}
              color="{Color.secondary}"
            />

            <TextInput
              value={email}
              onChangeText={(text) => setEmail(text)}
              style={{
                color: 'gray',
                marginVertical: 10,
                width: 300,
                fontSize: email ? 18 : 18,
              }}
              placeholder="Enter your Email"
              // placeholderTextColor={Color.secondary}
            />
          </View>
        </View>

        <View style={{ marginTop: 10 }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 5,
              // backgroundColor: 'Color.white',
              borderBottomWidth: 2,
              borderLeftWidth: 1,
              paddingVertical: 5,
              borderRadius: 80,
              marginTop: 30,
              // marginLeft: 10,
              marginLeft: 'auto',
              marginRight: 'auto',
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
              secureTextEntry={secureEntery}
              style={{
                color: 'gray',
                marginVertical: 10,
                width: 300,
                fontSize: password ? 18 : 18,
              }}
              placeholder="Enter your Password"
              // placeholderTextColor={Color.secondary}
            />
            <TouchableOpacity
              onPress={() => {
                setSecureEntery((prev) => !prev);
              }}
            ></TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            marginTop: 12,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingLeft: 19,
            paddingRight: 20
          }}
        >
          <Text style={{ fontFamily: Fonts.Light, fontSize: 14}}>Keep me logged in..</Text>

          <TouchableOpacity>
            <Text style={{ color: '#007FFF', fontFamily: Fonts.SemiBold, fontSize: 15 }}>
              Forgot Password?
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{ marginTop: 80 }} />

        <TouchableOpacity
          onPress={handleLogin}
          style={{
            width: 300,
            backgroundColor: 'rgb(31 96 123)',
            borderRadius: 100,
            marginLeft: 'auto',
            marginRight: 'auto',
            padding: 13,
          }}
        >
          <Text
            style={{
              textAlign: 'center',
              color: 'white',
              fontSize: 23,
              // fontWeight: 'bold',
               fontFamily: Fonts.SemiBold
            }}
          >
            Login
          </Text>
        </TouchableOpacity>

        <Text style={styles.continueText}>-- or continue with --</Text>
        <TouchableOpacity style={styles.googleButtonContainer}>
          <Image
            source={require("./../assets/google.png")}
            style={styles.googleImage}
          />
          <Text style={styles.googleText}>Google</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{ marginTop: 15 }}>
          <Text style={{ textAlign: 'center', color: '{Color.primary}', fontSize: 16 }}>
            Don't have an account?{""} <Text style={{ color: '#007FFF', fontWeight: '500' }}>
              SignUp
            </Text>
          </Text>
        </TouchableOpacity>

      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  continueText: {
    textAlign: "center",
    marginVertical: 20,
    fontSize: 18,
    fontFamily: Fonts.Regular,
    color: Color.primary,
  },
  googleButtonContainer: {
    flexDirection: "row",
    borderWidth: 2,
    borderColor: Color.primary,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    width: 300,
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: 10,
    gap: 10,
  },
  googleImage: {
    height: 20,
    width: 20,
  },
  googleText: {
    fontSize: 20,
    fontFamily: Fonts.SemiBold,
  }
});
