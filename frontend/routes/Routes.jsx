import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "../Screens/LoginScreen";
import RegisterScreen from "../Screens/RegisterScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Tabs from "./tabs/Tabs";
import HomeScreen from "../Screens/HomeScreen";
import HomeScreen2 from "../Screens/user/HomeScreen2";
import ProductDetailScreen from "../Screens/user/ProductDetailScreen";
import UserProfileScreen from "../Screens/profile/UserProfileScrren";
import UserEditProfile from "../components/UserEditProfile/UserEditProfile";
import MyAccountScreen from "../Screens/user/MyAccount";
import HelpCenterScreen from "../Screens/user/HelpCenter";


const Stack = createNativeStackNavigator();

const Routes = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Home"
                screenOptions={{ headerShown: false }}
            >
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="login" component={LoginScreen} />
                <Stack.Screen name="signup" component={RegisterScreen} />
                <Stack.Screen name="tab" component={Tabs} />
                {/* <Stack.Screen name="Home2" component={HomeScreen2} /> */}
                <Stack.Screen name="productdetail" component={ProductDetailScreen} />
                {/* <Stack.Screen name="edit" component={UserEditProfile} /> */}
                <Stack.Screen name="myaccount" component={MyAccountScreen}/>
                <Stack.Screen name="helpcenter" component={HelpCenterScreen}/>

            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Routes;