import {
  StyleSheet,
  Text,
  View,
  Image,
  KeyboardAvoidingView,
  TextInput,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Color } from './../Utils/Color';
import { Fonts } from './../Utils/Fonts';
import { Ionicons } from '@expo/vector-icons';
import InternetConnectionAlert from 'react-native-internet-connection-alert';
import CustomAlert from './../components/CustomAlert/CustomAlert';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureEntery, setSecureEntery] = useState(true);
  const [error, setError] = useState('');
  const [isloading, setIsloading] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem('authToken');
        if (token) {
          navigation.replace('tab');
        }
      } catch (err) {
        console.log('error message', err);
      }
    };
    checkLoginStatus();
  }, []);

  //method to validate the user credentials and navigate to Home Screen / Dashboard
  const handleLogin = () => {
    setIsloading(true);
    //[check validation] -- Start
    // if email does not contain @ sign
    if (email == '') {
      setIsloading(false);
      return setError('Please enter your email');
    }
    if (password == '') {
      setIsloading(false);
      return setError('Please enter your password');
    }
    if (!email.includes('@')) {
      setIsloading(false);
      return setError('Email is not valid');
    }
    // length of email must be greater than 5 characters
    if (email.length < 6) {
      setIsloading(false);
      return setError('Email is too short');
    }
    // length of password must be greater than 5 characters
    if (password.length < 5) {
      setIsloading(false);
      return setError('Password must be 5 characters long');
    }
    //[check validation] -- End
    const user = {
      email: email,
      password: password,
    };

    axios
      .post('http://192.168.12.223:8081/login', user) // API call
      .then((response) => {
        console.log(response);
        const token = response.data.token;
        AsyncStorage.setItem('authToken', token);
        navigation.replace('tab');
        setEmail('');
        setPassword('');
      })
      .catch((error) => {
        setIsloading(false);
        console.log('error', setError(error.message));
      });
  };

  return (
    <InternetConnectionAlert onChange={(connectionState) => {}}>
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
          <ScrollView>
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
                  fontFamily: Fonts.Bold,
                  color: '#041E42',
                }}
              >
                Log In to your Account
              </Text>
            </View>

            <View>
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
                  borderBottomWidth: 1,
                  borderLeftWidth: 1,
                  paddingVertical: 5,
                  borderRadius: 80,
                  marginTop: 20,
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
                  // setValue={setEmail}
                  onChangeText={(text) => setEmail(text)}
                  style={{
                    color: 'gray',
                    marginVertical: 10,
                    width: 300,
                    fontSize: email ? 18 : 18,
                  }}
                  placeholder="Email: Johndoe@gmail.com"
                />
              </View>
            </View>

            <View style={{ marginTop: 10 }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 5,
                  borderBottomWidth: 1,
                  borderLeftWidth: 1,
                  paddingVertical: 5,
                  borderRadius: 80,
                  marginTop: 20,
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
                paddingRight: 20,
              }}
            >
              <Text style={{ fontFamily: Fonts.Light, fontSize: 14 }}>
                Keep me logged in..
              </Text>

              <TouchableOpacity>
                <Text
                  onPress={() => navigation.navigate('forgetpassword')}
                  style={{
                    color: '#007FFF',
                    fontFamily: Fonts.SemiBold,
                    fontSize: 15,
                  }}
                >
                  Forgot Password?
                </Text>
              </TouchableOpacity>
            </View>

            <View style={{ marginTop: 80 }} />

            <TouchableOpacity
              onPress={handleLogin}
              onLongPress={() => navigation.navigate('tab')}
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
                onPress={handleLogin}
                style={{
                  textAlign: 'center',
                  color: 'white',
                  fontSize: 23,
                  fontFamily: Fonts.SemiBold,
                }}
              >
                Login
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
                style={{
                  textAlign: 'center',
                  color: '{Color.primary}',
                  fontSize: 16,
                }}
              >
                Don't have an account?{''}{' '}
                <Text
                  onPress={() => navigation.navigate('signup')}
                  style={{ color: '#007FFF', fontWeight: '500' }}
                >
                  SignUp
                </Text>
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </InternetConnectionAlert>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  TopBarContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: 13,
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
