import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import CameraIcon from '../../../assets/EventSwarnMela/cameraIcon.svg';
import PencardIcon from '../../../assets/EventSwarnMela/pencardIcon.svg';
import BillIcon from '../../../assets/EventSwarnMela/billIcon.svg';
import DocIcon from '../../../assets/EventSwarnMela/docIcon.svg';

import Header from '../../../components/CustomHeader';
import LinearGradient from 'react-native-linear-gradient';

const VisitorResgister = () => {
  const navigation = useNavigation();

  return (
    <View style={{flex: 1, backgroundColor: '#F8F8F8'}}>
      <Header
        title={''}
        onPress={() => navigation.goBack()}
        onPress2={() => navigation.navigate('Notification')}
      />
      <ScrollView style={{flexGrow: 1, paddingHorizontal: 15}}>
        <Text style={styles.HeadingText}>Visitor Registration</Text>
        <View style={styles.infoDetailSection}>
          <View style={styles.infoSectionCells}>
            <Text style={styles.heading}>
              PAN Number<Text style={{color: 'red'}}>*</Text>
            </Text>
            <View style={styles.inputView}>
              <TextInput
                value={''}
                placeholder="Enter PAN Number"
                // onChangeText={}
                style={{
                  color: '#000000',
                  fontSize: 14,
                  fontFamily: 'Montserrat-Medium',
                  width: '100%',
                }}
              />
            </View>
          </View>
        </View>
        <View style={styles.infoDetailSection}>
          <Text style={styles.formTitleheading}>Visitor Details</Text>
          <View style={styles.infoSectionCells}>
            <Text style={styles.heading}>
              Full Name<Text style={{color: 'red'}}>*</Text>
            </Text>
            <View style={styles.inputView}>
              <TextInput
                value={''}
                // onChangeText={}
                style={{
                  color: '#000000',
                  fontSize: 14,
                  fontFamily: 'Montserrat-Medium',
                  width: '100%',
                }}
              />
            </View>
          </View>

          <View style={styles.infoSectionCells}>
            <Text style={styles.heading}>
              Designation<Text style={{color: 'red'}}>*</Text>
            </Text>
            <View style={styles.inputView}>
              <TextInput
                value={''}
                // onChangeText={}
                style={{
                  color: '#000000',
                  fontSize: 14,
                  fontFamily: 'Montserrat-Medium',
                  width: '100%',
                }}
              />
            </View>
          </View>

          <View style={styles.infoSectionCells}>
            <Text style={styles.heading}>
              Mobile Number<Text style={{color: 'red'}}>*</Text>
            </Text>
            <View style={styles.inputView}>
              <TextInput
                value={''}
                keyboardType="number-pad"
                // onChangeText={}
                style={{
                  color: '#000000',
                  fontSize: 14,
                  fontFamily: 'Montserrat-Medium',
                  width: '100%',
                }}
              />
            </View>
          </View>

          <View style={styles.infoSectionCells}>
            <Text style={styles.heading}>
              Email ID<Text style={{color: 'red'}}>*</Text>
            </Text>
            <View style={styles.inputView}>
              <TextInput
                value={''}
                // onChangeText={}
                keyboardType="email-address"
                style={{
                  color: '#000000',
                  fontSize: 14,
                  fontFamily: 'Montserrat-Medium',
                  width: '100%',
                }}
              />
            </View>
          </View>

          <TouchableOpacity
            style={styles.uploadBox}
            onPress={() => {
              console.log('open camera');
            }}>
            <CameraIcon />

            <Text style={styles.heading}>Upload Passport Size Photo</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{marginTop: 20}}>
            <LinearGradient
              colors={['#DDAC17', '#FFFA8A', '#ECC440']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={{
                height: 65,
                borderRadius: 10,
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontSize: 20,
                  fontFamily: 'Montserrat-SemiBold',
                  color: '#000',
                }}>
                Add More Visitors
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <View style={styles.infoDetailSection}>
          <Text style={styles.formTitleheading}>Company Details</Text>
          <View style={styles.infoSectionCells}>
            <Text style={styles.heading}>Company Name</Text>
            <View style={styles.inputView}>
              <TextInput
                value={''}
                // onChangeText={}
                style={{
                  color: '#000000',
                  fontSize: 14,
                  fontFamily: 'Montserrat-Medium',
                  width: '100%',
                }}
              />
            </View>
          </View>

          <View style={styles.infoSectionCells}>
            <Text style={styles.heading}>GST Number</Text>
            <View style={styles.inputView}>
              <TextInput
                value={''}
                keyboardType="numbers-and-punctuation"
                // onChangeText={}
                style={{
                  color: '#000000',
                  fontSize: 14,
                  fontFamily: 'Montserrat-Medium',
                  width: '100%',
                }}
              />
            </View>
          </View>

          <View style={styles.infoSectionCells}>
            <Text style={styles.heading}>Address</Text>
            <View style={[styles.inputView, {height: 90}]}>
              <TextInput
                value={''}
                multiline
                numberOfLines={4}
                // onChangeText={}
                style={{
                  textAlignVertical: 'top',
                  color: '#000000',
                  fontSize: 14,
                  fontFamily: 'Montserrat-Medium',
                  width: '100%',
                }}
              />
            </View>
          </View>

          <View style={styles.infoSectionCells}>
            <Text style={styles.heading}>Contact Number</Text>
            <View style={styles.inputView}>
              <TextInput
                value={''}
                // onChangeText={}
                keyboardType="number-pad"
                style={{
                  color: '#000000',
                  fontSize: 14,
                  fontFamily: 'Montserrat-Medium',
                  width: '100%',
                }}
              />
            </View>
          </View>

          <View style={styles.infoSectionCells}>
            <Text style={styles.heading}>Email Address</Text>
            <View style={styles.inputView}>
              <TextInput
                value={''}
                // onChangeText={}
                keyboardType="email-address"
                style={{
                  color: '#000000',
                  fontSize: 14,
                  fontFamily: 'Montserrat-Medium',
                  width: '100%',
                }}
              />
            </View>
          </View>
        </View>

        <View style={styles.infoDetailSection}>
          <Text style={styles.formTitleheading}>Required Documents</Text>

          <TouchableOpacity
            style={styles.uploadBox}
            onPress={() => {
              console.log('open file');
            }}>
            <PencardIcon />

            <Text style={styles.heading}>Upload PAN Card</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.uploadBox}
            onPress={() => {
              console.log('open file');
            }}>
            <BillIcon />

            <Text style={styles.heading}>Upload GST Certificate</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.uploadBox}
            onPress={() => {
              console.log('open file');
            }}>
            <DocIcon />

            <Text style={styles.heading}>Upload Recommendation Letter</Text>
            <Text>Single letter acceptable for multiple visitors</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={{marginVertical: 20}}
         onPress={()=>{navigation.navigate('ExhibitorRegister')}}>
          <LinearGradient
            colors={['#DDAC17', '#FFFA8A', '#ECC440']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={{
              height: 65,
              borderRadius: 10,
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                fontSize: 20,
                fontFamily: 'Montserrat-SemiBold',
                color: '#000',
              }}>
              Submit
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};
export default VisitorResgister;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  main: {
    width: '100%',
    height: 100,
    // backgroundColor: '#FCDA64'
  },
  view: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 5,
  },
  infoDetailSection: {
    borderWidth: 1,
    marginVertical: 10,
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#F9F4F1',
    borderColor: '#FFD387',
  },
  infoSectionCells: {
    gap: 10,
    marginBottom: 10,
  },
  infoTitleText: {
    fontSize: 16,
    fontFamily: 'Montserrat-SemiBold',
    color: '#EEAF2D',
  },
  HeadingText: {
    marginVertical: 20,
    fontSize: 22,
    fontFamily: 'Montserrat-SemiBold',
    color: '#EEAF2D',
  },
  infoSubTitleText: {
    fontSize: 13,
    fontFamily: 'Montserrat-Regular',
    color: '#000000',
  },
  heading: {
    color: '#000000',
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
  },
  formTitleheading: {
    color: '#000000',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 15,
    marginBottom: 10,
  },
  inputView: {
    height: 50,
    width: '100%',
    marginTop: 5,
    backgroundColor: '#FFF',
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  uploadBox: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#000',
    borderRadius: 8,
    paddingVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#faf7f5', // same as in image
    marginTop: 20,
  },
});
