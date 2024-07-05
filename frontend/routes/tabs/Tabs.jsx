import { StyleSheet, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSelector } from 'react-redux';
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from '@expo/vector-icons';
import HomeScreen2 from './../../Screens/user/HomeScreen2';
import { Color } from './../../Utils/Color';
import { Fonts } from '../../Utils/Fonts';
import UserProfileScreen from "../../Screens/profile/UserProfileScrren";
import CartScreen from '../../Screens/user/CartScreen';
import ProductScreen from '../../Screens/user/ProductScreen';
import { ProfileProvider } from '../../states/ProfileContext';

const Tab = createBottomTabNavigator();

const Tabs = ({ navigation }) => {
  const cart = useSelector((state) => state.cart.cart);
  const cartCount = cart.reduce((acc, curr) => acc + curr.quantity, 0);
  return (
    <Tab.Navigator
    screenOptions={()=>({
        tabBarHideOnKeyboard: true,
        tabBarStyle: [
          {
            display: "flex",
          },
          null,
        ],
        headerShown: false,
        // tabBarShowLabel: false,
        tabBarActiveTintColor: Color.primary,
        tabBarStyle: {
          borderTopLeftRadius: 33,
          borderTopRightRadius: 33,
          borderBottomLeftRadius: 3,
          borderBottomRightRadius: 3,
          backgroundColor: Color.white,
          height: 55,
        },
    })}>
      <Tab.Screen
        name="Home2"
        component={HomeScreen2}
        options={{
          tabBarLabel: "Home",
          tabBarLabelStyle: { color: Color.primary_shadow, fontFamily: Fonts.SemiBold, fontSize: 15 },
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Entypo name="home" size={27} color="#008E97" />
              // <Image
              //   source={HomeIconActive}
              //   style={StyleSheet.tabIconStyle}
              // />
            ) : (
              <AntDesign name="home" size={26} color="black" />
                // <Image source={HomeIcon} style={StyleSheet.tabIconStyle} />
            ),
        }}
      />

      <Tab.Screen
        name="Product"
        component={ProductScreen}
        options={{
          tabBarLabel: "Product",
          tabBarLabelStyle: { color: Color.primary_shadow, fontFamily: Fonts.SemiBold, fontSize: 15 },
          tabBarIcon: ({ focused }) =>
            focused ? (
              <MaterialIcons name="store" size={27} color="#008E97" />
            ) : (
                <MaterialIcons name="store" size={26} color="black" />
            ),
        }}
      />
      
        <Tab.Screen
          name="Profile"
          component={UserProfileScreen}
          options={{
            tabBarLabel: "Profile",
            tabBarLabelStyle: { color: Color.primary_shadow, fontFamily: Fonts.SemiBold, fontSize: 15 },
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Ionicons name="person" size={27} color="#008E97" />
                // <Image
                //   source={userIconActive}
                //   style={StyleSheet.tabIconStyle}
                // />
              ) : (
                <Ionicons name="person-outline" size={26} color="black" />
                // <Image source={userIcon} style={StyleSheet.tabIconStyle} />
              ),
          }}
        >
        {/* {() => (
          <ProfileProvider>
            <UserProfileScreen />
          </ProfileProvider>
        )} */}
        </Tab.Screen>

      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarLabel: "Cart",
          tabBarLabelStyle: { color: Color.primary_shadow, fontFamily: Fonts.SemiBold, fontSize: 15 },
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <AntDesign name="shoppingcart" size={27} color="#008E97" />
            ) : (
              <AntDesign name="shoppingcart" size={26} color="black" />
            ),
          tabBarBadge: cartCount > 0 ? cartCount : null,
          tabBarBadgeStyle: { backgroundColor: Color.primary_shadow },
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;

const styles = StyleSheet.create({
  tabIconStyle: {
    width: 10,
    height: 10,
  },
});
