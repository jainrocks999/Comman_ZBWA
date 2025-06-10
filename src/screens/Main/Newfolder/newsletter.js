import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import CustomHeader from '../../../components/CustomHeader';

const Newsletters = ({ navigation }) => {
  return (
   
       <View style={styles.background}>
      <CustomHeader
        title={'Newsletter'}
        onPress={() => navigation.goBack()}
        onPress2={() => navigation.navigate('Notification')}
      />
      <SafeAreaView style={{ flex: 1, }}>
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.title}>ZBWA News Bulletin</Text>

          <Text style={styles.subtitle}>January 2025 Edition</Text>

          <View style={styles.contentContainer}>
            <Text style={styles.heading}>Message from the President</Text>
            <Text style={styles.content}>Coming Soon...</Text>

            <Text style={styles.heading}>Upcoming Events</Text>
            <Text style={styles.content}>Coming Soon...</Text>

            <Text style={styles.heading}>Spotlight</Text>
            <Text style={styles.content}>Coming Soon..</Text>

            <Text style={styles.footer}>
              Thank you for staying connected with ZBWA. For more updates,
              follow us on our official app!
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    // resizeMode: 'cover',
    backgroundColor:'#FFFFFF'
  },
  container: {
    flexGrow: 1,
    padding: 10,
   backgroundColor: '#F9F4F1',
    borderWidth: 1,
        borderColor: '#FFD387',
    borderRadius: 15,
    margin: 15,
    elevation:10,
  },
  title: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 25,
    color: '#000000',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 15,
    color: '#000000',
    textAlign: 'center',
    marginBottom: 10,
  },
  contentContainer: {
    padding: 10,
  },
  heading: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 20,
    color: '#000000',
    marginVertical: 10,
  },
  content: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 15,
    color: '#444',
    lineHeight: 24,
    marginBottom: 10,
  },
  footer: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 12,
    color: '#555',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default Newsletters;
