import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { Color } from '../../Utils/Color';
import { Fonts } from '../../Utils/Fonts';
import { Ionicons } from '@expo/vector-icons';

const OptionList = ({
  Icon,
  iconName,
  text,
  onPress,
  type,
  onPressSecondary,
}) => {
  return (
    <>
      {type == 'morden' ? (
        <View style={[styles.container, { backgroundColor: Color.white }]}>
          <View style={styles.IconContainer}>
            <Icon name={iconName} size={24} color={Color.primary} />
            <Text style={styles.listText}>{text}</Text>
          </View>
          <View style={styles.buttonContainer}>
            {onPressSecondary && (
              <TouchableOpacity
                style={styles.actionButton}
                onPress={onPressSecondary}
              >
                <Icon name={'add'} size={15} color={Color.white} />
              </TouchableOpacity>
            )}
            {onPress && (
              <TouchableOpacity style={styles.actionButton} onPress={onPress}>
                <Icon name={'eye'} size={15} color={Color.white} />
              </TouchableOpacity>
            )}
          </View>
        </View>
      ) : (
        <TouchableOpacity style={styles.container} onPress={onPress}>
          <View style={styles.IconContainer}>
            <Icon name={iconName} size={24} color={Color.primary} />
            <Text style={styles.listText}>{text}</Text>
          </View>
          <View>
            <MaterialIcons
              name="arrow-forward-ios"
              size={24}
              color={Color.dark}
            />
          </View>
        </TouchableOpacity>
      )}
    </>
  );
};

export default OptionList;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Color.gray,
    borderRadius: 45,
    height: 53,
    paddingLeft: 13,
    paddingRight: 12,
    elevation: 7,
    marginBottom: 19,
  },
  IconContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  listText: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: Fonts.SemiBold,
    color: Color.dark,
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  actionButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
    height: 30,
    width: 30,
    backgroundColor: Color.warning,
    borderRadius: 5,
    elevation: 2,
  },
});
