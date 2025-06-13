import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  TextInput,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import BorderIcon from '../../../assets/EventSwarnMela/borderIcon.svg';
import PhoneIcon from '../../../assets/EventSwarnMela/fullYellowPhoneIcon.svg';
import ClockIcon from '../../../assets/EventSwarnMela/yellowclockIcon.svg';
import EmailIcon from '../../../assets/EventSwarnMela/yellowEmailIcon.svg';
import WhatsappIcon from '../../../assets/EventSwarnMela/whatsapp-icon.svg';
import SendIcon from '../../../assets/EventSwarnMela/sendIcon.svg';
import Header from '../../../components/CustomHeader';
import LinearGradient from 'react-native-linear-gradient';
import {Dropdown} from 'react-native-element-dropdown';

const HelpDesk = () => {
  const navigation = useNavigation();
  const [inquiryTypeValue, setInquiryTypeValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const inquiryTypeData = [
    {label: 'Private Limited', value: 'private'},
    {label: 'Partnership', value: 'partnership'},
    {label: 'Sole Proprietor', value: 'sole'},
    {label: 'LLP', value: 'llp'},
    {label: 'Public Limited', value: 'public'},
  ];

  return (
    <View style={{flex: 1, backgroundColor: '#F8F8F8'}}>
      <Header
        title={''}
        onPress={() => navigation.goBack()}
        onPress2={() => navigation.navigate('Notification')}
      />
      <ScrollView style={{flexGrow: 1, paddingHorizontal: 15}}>
        <Text style={styles.HeadingText}>Help Desk</Text>
        <View style={{marginBottom: 10}}>
          <Text style={styles.formTitleheading}>Event Layout</Text>
          <View style={styles.imgContainer}>
            <Image
              style={{height: '100%', width: '100%', resizeMode: 'cover'}}
              source={require('../../../assets/EventSwarnMela/demoMap.png')}
            />
          </View>
          <TouchableOpacity>
            <LinearGradient
              colors={['#DDAC17', '#FFFA8A', '#ECC440']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={styles.cardBtn}>
              <BorderIcon />
              <Text
                style={{
                  fontSize: 15,
                  fontFamily: 'Montserrat-SemiBold',
                  color: '#000',
                }}>
                View Full Map
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
        <View style={[styles.rowView, {gap: 10}]}>
          <View
            style={[styles.infoDetailSection, {flex: 1, alignItems: 'center'}]}>
            <PhoneIcon />
            <Text style={styles.heading}>Call Support</Text>
          </View>
          <View
            style={[styles.infoDetailSection, {flex: 1, alignItems: 'center'}]}>
            <WhatsappIcon height={25} width={25} />
            <Text style={styles.heading}>WhatsApp Chat</Text>
          </View>
        </View>

        <View style={styles.infoDetailSection}>
          <Text style={styles.formTitleheading}>Submit Your Concern</Text>
          <View style={styles.infoSectionCells}>
            <Text style={styles.heading}>Name</Text>
            <View style={styles.inputView}>
              <TextInput
                value={''}
                // onChangeText={}
                placeholder="Your Name"
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
            <Text style={styles.heading}>Email</Text>
            <View style={styles.inputView}>
              <TextInput
                value={''}
                placeholder="your@email.com"
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
            <Text style={styles.heading}>Category</Text>
            <View style={styles.inputView}>
              <Dropdown
                style={[styles.dropdown, isFocus && {borderColor: '#000'}]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                // inputSearchStyle={styles.inputSearchStyle}
                // iconStyle={styles.iconStyle}
                data={inquiryTypeData}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="General Inquiry"
                value={inquiryTypeValue}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                  setInquiryTypeValue(item.value);
                  setIsFocus(false);
                }}
              />
            </View>
          </View>

          <View style={styles.infoSectionCells}>
            <Text style={styles.heading}>Message</Text>
            <View style={[styles.inputView, {height: 120}]}>
              <TextInput
                value={''}
                multiline
                numberOfLines={5}
                // onChangeText={}
                placeholder="Describe your concern..."
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

          <TouchableOpacity
            style={{marginTop: 10}}
            // for temprary
            onPress={() => {
              navigation.navigate('RewardsGiftsScreen');
            }}>
            <LinearGradient
              colors={['#DDAC17', '#FFFA8A', '#ECC440']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={styles.cardBtn}>
              <SendIcon />
              <Text
                style={{
                  fontSize: 15,
                  fontFamily: 'Montserrat-SemiBold',
                  color: '#000',
                }}>
                Submit
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <View style={styles.infoDetailSection}>
          <Text style={styles.formTitleheading}>Contact Information</Text>
          <View style={{gap: 15, marginTop: 10}}>
            <View style={[styles.rowView, {gap: 10}]}>
              <EmailIcon height={20} width={20} />
              <Text style={[styles.heading, {alignSelf: 'flex-start'}]}>
                support@zbwmela.com
              </Text>
            </View>
            <View style={[styles.rowView, {gap: 10}]}>
              <PhoneIcon height={20} width={20} />
              <Text style={styles.heading}>+91 123 456 7890</Text>
            </View>
            <View style={[styles.rowView, {gap: 10}]}>
              <ClockIcon height={20} width={20} />
              <Text style={styles.heading}>24/7 Support Available</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
export default HelpDesk;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  main: {
    width: '100%',
    height: 100,
  },
  rowView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imgContainer: {
    marginVertical: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#FFD387',
    overflow: 'hidden',
    height: 300,
    width: '100%',
  },
  infoDetailSection: {
    borderWidth: 1,
    marginVertical: 10,
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#F9F4F1',
    borderColor: '#FFD387',
  },
  HeadingText: {
    marginVertical: 20,
    fontSize: 22,
    fontFamily: 'Montserrat-SemiBold',
    color: '#EEAF2D',
  },
  heading: {
    color: '#000000',
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
  },
  cardImg: {
    alignSelf: 'flex-start',
    height: 100,
    width: 100,
    borderRadius: 10,
  },
  tagText: {
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
    color: '#fff',
  },
  cardBtn: {
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardBtn: {
    height: 45,
    borderRadius: 10,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },
  inputView: {
    height: 50,
    width: '100%',
    marginTop: 5,
    backgroundColor: '#FFF',
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  infoSectionCells: {
    gap: 10,
    marginBottom: 10,
  },
  formTitleheading: {
    color: '#000000',
    fontFamily: 'Montserrat-Regular',
    fontSize: 18,
    marginBottom: 10,
  },
  dropdown: {
    height: 48,
    borderRadius: 6,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
  },
  placeholderStyle: {
    fontSize: 14,
    fontFamily: 'Montserrat-Medium',
    color: '#999',
  },
  selectedTextStyle: {
    fontSize: 14,
    color: '#000',
    fontFamily: 'Montserrat-Medium',
  },
});
