import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Color } from '../../Utils/Color';
import { Fonts } from '../../Utils/Fonts';

const MyAccountScreen = ({ route }) => {
  const { user } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.screenNameText}>My Account</Text>
      <View style={styles.userInfoContainer}>
        <Text style={styles.userInfoText}>Name: {user?.name}</Text>
        <Text style={styles.userInfoText}>Email: {user?.email}</Text>
      </View>
    </SafeAreaView>
  );
};

export default MyAccountScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white,
    padding: 20,
  },
  screenNameText: {
    fontSize: 30,
    fontWeight: '800',
    fontFamily: Fonts.SemiBold,
    color: Color.muted,
    marginBottom: 20,
  },
  userInfoContainer: {
    borderWidth: 5,
    borderColor: Color.light,
    borderRadius: 1,
    padding: 10,
    elevation: 1,
  },
  userInfoText: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: Fonts.Regular,
    color: Color.muted,
    marginBottom: 10,
  },
});
