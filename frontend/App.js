import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from './Screens/HomeScreen'
import LoginScreen from './Screens/LoginScreen';
import RegisterScreen from './Screens/RegisterScreen';
import HomeScreen2 from './Screens/user/HomeScreen2';

export default function App() {
  return (
    <View style={styles.container}>
      {/* <StatusBar style="auto" /> */}
      {/* <HomeScreen /> */}
      {/* <LoginScreen/> */}
      {/* <RegisterScreen/> */}
      <HomeScreen2/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
