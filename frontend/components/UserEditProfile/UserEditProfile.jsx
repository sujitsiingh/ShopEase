import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, TextInput, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Color } from '../../Utils/Color';
import { Fonts } from '../../Utils/Fonts';

// Create a new component called UserEditProfile
const UserEditProfile = ({ user, onSave, visible, onDismiss }) => {
  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);

  const saveChanges = () => {
    onSave({ name, email });
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.editFormContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={onDismiss}>
            <Ionicons name="close" size={24} color={Color.primary} />
          </TouchableOpacity>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Name:</Text>
            <TextInput style={styles.input} value={name} onChangeText={setName} />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Email:</Text>
            <TextInput style={styles.input} value={email} onChangeText={setEmail} />
          </View>
          <TouchableOpacity style={styles.saveButton} onPress={saveChanges}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default UserEditProfile;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  editFormContainer: {
    width: '80%',
    padding: 20,
    backgroundColor: Color.white,
    borderRadius: 10,
  },
  closeButton: {
    alignSelf: 'flex-end',
    marginBottom: 10,
  },
  inputContainer: {
    marginBottom: 10,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: Color.muted,
    padding: 10,
    borderRadius: 5,
  },
  saveButton: {
    backgroundColor: Color.primary,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: Color.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});