import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import React from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Color } from '../../Utils/Color';
import { Fonts } from '../../Utils/Fonts';

const HelpCenterScreen = ({ navigation }) => {
  const faqs = [
    {
      question: 'How do I create an account?',
      answer:
        'To create an account, navigate to the sign up page and fill out the required information.',
    },
    {
      question: 'How do I reset my password?',
      answer:
        'To reset your password, navigate to the login page and click on the "Forgot Password?" link. Follow the instructions provided.',
    },
  ];

  const renderItem = ({ item }) => (
    <View style={styles.faqContainer}>
      <Text style={styles.faqQuestion}>{item.question}</Text>
      <Text style={styles.faqAnswer}>{item.answer}</Text>
    </View>
  );

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.TopBarContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={33} color={Color.primary} />
          </TouchableOpacity>
        </View>
        <View style={styles.screenNameContainer}>
          <Text style={styles.screenNameText}>Help Center</Text>
        </View>
        <FlatList
          data={faqs}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default HelpCenterScreen;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirecion: 'row',
    backgroundColor: Color.light,
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 15,
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
  faqContainer: {
    marginBottom: 20,
  },
  faqQuestion: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  faqAnswer: {
    fontSize: 16,
    marginBottom: 10,
  },
});
