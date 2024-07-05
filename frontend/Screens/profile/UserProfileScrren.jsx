import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState, useContext } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import UserProfileCard from '../../components/UserProfileCard/UserProfileCard';
import { Ionicons } from '@expo/vector-icons';
import OptionList from '../../components/OptionList/OptionList';
import { ProfileContext } from '../../states/ProfileContext';
import UserEditProfile from '../../components/UserEditProfile/UserEditProfile';
import { Color } from '../../Utils/Color';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Fonts } from '../../Utils/Fonts';
import { UserType } from '../../states/UserContext';

const UserProfileScreen = ({ navigation }) => {
  const { userId, setUserId } = useContext(UserType);
  const [user, setUser] = useState('');

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          `http://192.168.12.223:8081/profile/${userId}`
        );
        const { user } = response.data;
        // user.id = user.id.toString();
        setUser(user);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchUserProfile();
  }, [userId]);

  const logout = () => {
    clearAuthToken();
  };
  
  const clearAuthToken = async () => {
    await AsyncStorage.removeItem("authToken");
    console.log("Auth token cleared...");
    navigation.replace("login");
  };

  const [isEditing, setIsEditing] = useState(false);

  const saveChanges = (updatedUser) => {
    setUser(updatedUser);
    setIsEditing(false);
  };
  // const saveChanges = () => {
  //   // setProfile({ ...profile, name, email });
  //   // setUser({ ...user, name, email });
  //   setIsEditing(false);
  // };
  const dismissEditForm = () => {
    setIsEditing(false);
  };

  const renderContent = () => {
    if (isEditing) {
      return (
        <UserEditProfile onSave={saveChanges} visible={isEditing} navigation={navigation} onDismiss={dismissEditForm} />
      );
    } else {
      return (
        <View style={styles.UserProfileCardContianer}>
          {/* <UserProfileCard
            Icon={Ionicons}
            name={user?.name}
            email={user?.email}
          /> */}
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>
            Welcome {user?.name}
            {/* Welcome {profile?.name} */}
          </Text>
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>
            {user?.email}
            {/* Email: {profile?.email} */}
          </Text>
        </View>
      );
    }
  };

  
  const renderEditButton = () => {
    if (!isEditing) {
      return (
        // <TouchableOpacity onPress={() => setIsEditing(true)}>
        //   <Ionicons name="pencil" size={24} color={Color.primary} />
        // </TouchableOpacity>
        <OptionList
          text={'Edit Profile'}
          Icon={Ionicons}
          iconName={'pencil'}
          onPress={() => setIsEditing(true)}
          // onPressSecondary={() => navigation.navigate('edit')}
        />
      );
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.TopBarContainer}>
          <TouchableOpacity>
            <Ionicons name="menu-sharp" size={33} color={Color.primary} />
          </TouchableOpacity>
        </View>
        <View style={styles.screenNameContainer}>
          <Text style={styles.screenNameText}>Profile</Text>
        </View>
        <View style={styles.UserProfileCardContianer}>
          {/* <UserProfileCard
            Icon={Ionicons}
            name={user?.name}
            email={user?.email}
          />
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>
            Welcome Smith
          </Text> */}
          {renderContent()}
          {renderEditButton()}
        </View>
        <View style={styles.OptionsContainer}>
          <OptionList
            text={'My Account'}
            Icon={Ionicons}
            iconName={'person'}
            onPress={() => navigation.navigate('myaccount', { user: user })}
          />
          <OptionList
            text={'Wishlist'}
            Icon={Ionicons}
            iconName={'heart'}
            onPress={() =>
              navigation.navigate('mywishlist', { user: user })
            }
          />
          
          <OptionList
          text={"Settings"}
          Icon={Ionicons}
          iconName={"settings-sharp"}
          onPress={() => console.log("working....")}
        />
        <OptionList
          text={"Help Center"}
          Icon={Ionicons}
          iconName={"help-circle"}
            onPress={() => navigation.navigate('helpcenter')}
        />
          
          <OptionList
            text={'Logout'}
            Icon={Ionicons}
            iconName={'log-out'}
            onPress={logout}
          />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default UserProfileScreen;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirecion: 'row',
    backgroundColor: Color.light,
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 20,
    flex: 1,
    backgroundColor: Color.white,
  },
  TopBarContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  UserProfileCardContianer: {
    width: '100%',
    // height: '25%',
  },
  screenNameContainer: {
    marginTop: 10,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 10,
  },
  screenNameText: {
    fontSize: 30,
    fontWeight: '800',
    fontFamily: Fonts.SemiBold,
    color: Color.muted,
  },
  OptionsContainer: {
    width: '100%',
    marginTop: 25,
  },
});
