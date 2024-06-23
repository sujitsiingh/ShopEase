import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Alert, View, TextInputComponent } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import ButtonComponent from './components/ButtonComponent';
import HomeScreen from './Screens/HomeScreen'
import LoginScreen from './Screens/LoginScreen';
import RegisterScreen from './Screens/RegisterScreen';
import HomeScreen2 from './Screens/user/HomeScreen2';

export default function App() {
  const handlePress = (buttonTitle) => {
    Alert.alert(
      "Alert",
      `Pressed ${ buttonTitle }`,
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: () => console.log(`${ buttonTitle } Pressed`) },
      ],
      { cancelable: false }
    );
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        {/* <StatusBar style="auto" /> */}
        {/* <HomeScreen /> */}
        {/* <LoginScreen/> */}
        {/* <RegisterScreen/> */}
        {/* <HomeScreen2/> */}
        <View style={styles.column}>
          <ButtonComponent
            title="Success Button"
            btnKind="rounded"
            variant="success"
            size="md"
            onPress={() => handlePress("Success Button")}
          />
          <ButtonComponent
            title="Primary Button"
            btnKind="rounded"
            variant="primary"
            size="md"
            onPress={() => handlePress("Primary Button")}
          />

          <ButtonComponent
            title="Danger Button"
            btnKind="outlined"
            variant="danger"
            size="md"
            onPress={() => handlePress("Danger Button")}
          />

          <ButtonComponent
            title="Outlined Button"
            btnKind="outlined"
            variant="secondary"
            size="md"
            onPress={() => handlePress("Outlined Button")}
          />

          <ButtonComponent
            title="Custom Button"
            btnKind="outlined"
            variant="primary"
            size="lg"
            onPress={() => handlePress("Success Button")}
          />

          <ButtonComponent
            title="Dark Button"
            btnKind="rounded"
            variant="dark"
            size="lg"
            onPress={() => handlePress("Success Button")}
          />

          <ButtonComponent
            title="Info Button"
            btnKind="outlined"
            variant="info"
            size="md"
            onPress={() => handlePress("Success Button")}
          />
          <ButtonComponent
            title="Light Button"
            btnKind="rounded"
            variant="light"
            size="lg"
            onPress={() => handlePress("Success Button")}
          />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
    
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
