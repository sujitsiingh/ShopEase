import {
  StyleSheet,
  Text,
  View,
  Image,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Color } from './../Utils/Color';
import { Fonts } from './../Utils/Fonts';
import { useNavigation } from '@react-navigation/native';
import InternetConnectionAlert from 'react-native-internet-connection-alert';
import CustomAlert from './../components/CustomAlert/CustomAlert';
import axios from "axios";

const RegisterScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [secureEntery, setSecureEntery] = useState(true);
  const navigation = useNavigation();


  //method to post the user data to server for user signup using API call
  const handleRegister = () => {
    if (email == '') {
      return setError('Please enter your email');
    }
    if (name == '') {
      return setError('Please enter your name');
    }
    if (password == '') {
      return setError('Please enter your password');
    }
    if (!email.includes('@')) {
      return setError('Email is not valid');
    }
    if (email.length < 6) {
      return setError('Email is too short');
    }
    if (password.length < 5) {
      return setError('Password must be 6 characters long');
    }
    if (password != confirmPassword) {
      return setError('password does not match');
    }
    const user = {
      name: name,
      email: email,
      password: password,
    };

    // send a POST  request to the backend API to register the user
    axios
      .post("http://192.168.12.223:8081/register", user)
      .then((response) => {
        console.log(response);
        Alert.alert(
          "Registration successful",
          "You have been registered Successfully"
        );
        navigation.replace("login");
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
      })
      .catch((error) => {
        // Alert.alert(
        //   "Registration Error",
        //   "An error occurred while registering"
        // );
        return setError('Registration Error',error);
        // console.log("registration failed", error);
      });
  };

  return (
    <InternetConnectionAlert
      onChange={(connectionState) => {
        console.log('Connection State: ', connectionState);
      }}
    >
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
          <ScrollView style={{ flex: 1, width: '100%' }}>
            <View style={{ alignItems: 'center' }}>
              <View style={styles.TopBarContainer}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.goBack();
                  }}
                >
                  <Ionicons
                    name="arrow-back-circle-outline"
                    size={38}
                    color={Color.muted}
                  />
                </TouchableOpacity>
              </View>
              <Text
                style={{
                  fontSize: 24,
                  // fontWeight: 'bold',
                  fontFamily: Fonts.Bold,
                  marginTop: '-5%',
                  color: '#041E42',
                }}
              >
                Register to your Account
              </Text>
            </View>

            <View style={{ alignItems: 'center' }}>
              <Image
                resizeMode="contain"
                source={require('./../assets/SELM.png')}
                style={{ marginTop: '5%', height: 90 }}
              />
            </View>

            <View style={{ marginTop: 10 }}>
              <CustomAlert message={error} type={'error'} />
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 5,
                  // backgroundColor: '#D0D0D0',
                  borderBottomWidth: 1,
                  borderLeftWidth: 1,
                  paddingVertical: 5,
                  borderRadius: 80,
                  marginTop: 10,
                  // marginLeft: 10,
                  marginLeft: 'auto',
                  marginRight: 'auto',
                }}
              >
                <MaterialIcons
                  name="drive-file-rename-outline"
                  size={24}
                  color="black"
                  style={{ marginLeft: 7 }}
                />
                <TextInput
                  value={name}
                  onChangeText={(text) => setName(text)}
                  //   setValue={setName}
                  style={{
                    color: 'gray',
                    marginVertical: 10,
                    paddingLeft: 10,
                    width: 300,
                    fontSize: name ? 18 : 18,
                  }}
                  placeholder="Enter your name"
                />
              </View>
            </View>

            <View style={{ marginTop: 10 }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 5,
                  // backgroundColor: '#D0D0D0',
                  borderBottomWidth: 1,
                  borderLeftWidth: 1,
                  paddingVertical: 5,
                  borderRadius: 80,
                  marginTop: 28,
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
                  //   setValue={setEmail}
                  style={{
                    color: 'gray',
                    marginVertical: 10,
                    width: 300,
                    fontSize: email ? 18 : 18,
                  }}
                  placeholder="Email: Johndoe@gmail.com"
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
                  borderBottomWidth: 1,
                  borderLeftWidth: 1,
                  paddingVertical: 5,
                  borderRadius: 80,
                  marginTop: 20,
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
                  //   setValue={setPassword}
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

            <View style={{ marginTop: 10 }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 5,
                  // backgroundColor: 'Color.white',
                  borderBottomWidth: 1,
                  borderLeftWidth: 1,
                  paddingVertical: 5,
                  borderRadius: 80,
                  marginTop: 20,
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
                  value={confirmPassword}
                  onChangeText={(text) => setConfirmPassword(text)}
                  //   setValue={setConfirmPassword}
                  secureTextEntry={secureEntery}
                  style={{
                    color: 'gray',
                    marginVertical: 10,
                    width: 300,
                    fontSize: password ? 18 : 18,
                  }}
                  placeholder="Confirm Password"
                  // placeholderTextColor={Color.secondary}
                />
                <TouchableOpacity
                  onPress={() => {
                    setSecureEntery((prev) => !prev);
                  }}
                ></TouchableOpacity>
              </View>
            </View>

            <View style={{ marginTop: 50 }} />

            <TouchableOpacity
              onPress={handleRegister}
              style={{
                width: 300,
                backgroundColor: '#1287A5',
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
                  fontFamily: Fonts.SemiBold,
                }}
              >
                Register
              </Text>
            </TouchableOpacity>

            <Text style={styles.continueText}>-- or continue with --</Text>
            <TouchableOpacity style={styles.googleButtonContainer}>
              <Image
                source={require('./../assets/google.png')}
                style={styles.googleImage}
              />
              <Text style={styles.googleText}>Google</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{ marginTop: 15 }}>
              <Text
                onPress={() => navigation.navigate('login')}
                style={{
                  textAlign: 'center',
                  color: '{Color.primary}',
                  fontSize: 16,
                }}
              >
                Already have an account!{' '}
                <Text style={{ color: '#007FFF', fontWeight: '500' }}>
                  SignIn
                </Text>
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </InternetConnectionAlert>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  TopBarContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: 10,
  },
  continueText: {
    textAlign: 'center',
    marginVertical: 20,
    fontSize: 18,
    fontFamily: Fonts.Regular,
    color: Color.primary,
  },
  googleButtonContainer: {
    flexDirection: 'row',
    borderWidth: 2,
    borderColor: Color.primary,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
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
  },
});
