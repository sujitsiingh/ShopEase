import { StyleSheet, Text, View } from 'react-native';
import React, {  useEffect, useContext, useState } from 'react';
import { Color } from '../../Utils/Color';
import { UserType } from '../../states/UserContext';

const UserProfileCard = ({ Icon, name, email }) => {
  const { userId, setUserId } = useContext(UserType);
  const [user, setUser] = useState();

  // useEffect(() => {
  //   fetchUserData(userId)
  //     .then(response => setUser(response))
  //     .catch(error => console.error(error));
  // }, [userId]);


  // const fetchUserData = (userId) => {
  //   return new Promise((resolve, reject) => {
  //     // Simulating a delay for the API call
  //     setTimeout(() => {
  //       if (userId === '6685b0493b717ac7f56960f0') {
  //         resolve({ name: 'Smith', email: 'smith12@gmail.com' });
  //       } else {
  //         reject(new Error('User not found'));
  //       }
  //     }, 1000);
  //   });
  // };

  return (
    <View style={styles.Container}>
      <View style={styles.avatarContainer}>
        <Icon name="person" size={75} color={Color.primary} />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.usernameText}>{user?.name}</Text>
        <Text style={styles.secondaryText}>{user?.email}</Text>
      </View>
    </View>
  );
};

export default UserProfileCard;

const styles = StyleSheet.create({
  Container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  avatarContainer: {
    display: 'flex',
    width: '40%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.gray,
    borderRadius: 20,
    padding: 10,
  },
  infoContainer: {
    display: 'flex',
    width: '50%',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    backgroundColor: Color.light,
    paddingLeft: 10,
  },
  usernameText: {
    fontWeight: 'bold',
    fontSize: 25,
  },
  secondaryText: {
    fontWeight: 'bold',
    fontSize: 12,
  },
});
