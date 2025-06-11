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
import VideoIcon from '../../../assets/EventSwarnMela/videoIcon.svg';
import ImageIcon from '../../../assets/EventSwarnMela/imageIcon.svg';
import PluseIcon from '../../../assets/EventSwarnMela/pluseIcon.svg';
import Header from '../../../components/CustomHeader';
import LinearGradient from 'react-native-linear-gradient';

const CatalogueForm = () => {
  const navigation = useNavigation();
  const [isChecked, setIsChecked] = useState(false);

  return (
    <View style={{flex: 1, backgroundColor: '#F8F8F8'}}>
      <Header
        title={''}
        onPress={() => navigation.goBack()}
        onPress2={() => navigation.navigate('Notification')}
      />
      <ScrollView style={{flexGrow: 1, paddingHorizontal: 15}}>
        <Text style={styles.HeadingText}>Complete Your Catalogue</Text>

        <View style={styles.infoDetailSection}>
          <Text style={styles.formTitleheading}>Promotional Banner</Text>

          <View style={styles.uploadBox}>
            <ImageIcon />

            <Text style={[styles.heading, {textAlign: 'center'}]}>
              Upload banner image (1200x300px)
            </Text>
            <TouchableOpacity style={{marginTop: 8}}>
              <LinearGradient
                colors={['#DDAC17', '#FFFA8A', '#ECC440']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                style={{
                  height: 50,
                  width: 150,
                  borderRadius: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 15,
                    fontFamily: 'Montserrat-SemiBold',
                    color: '#000',
                  }}>
                  Choose File
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.infoDetailSection}>
          <Text style={styles.formTitleheading}>Introduction Video</Text>

          <View style={styles.uploadBox}>
            <VideoIcon />

            <Text style={[styles.heading, {textAlign: 'center'}]}>
              Upload company introduction video (Max 2 minutes)
            </Text>
            <TouchableOpacity style={{marginTop: 8}}>
              <LinearGradient
                colors={['#DDAC17', '#FFFA8A', '#ECC440']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                style={{
                  height: 50,
                  width: 150,
                  borderRadius: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 15,
                    fontFamily: 'Montserrat-SemiBold',
                    color: '#000',
                  }}>
                  Choose Video
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.infoDetailSection}>
          <Text style={[styles.formTitleheading, {marginBottom: 10}]}>
            Product Gallery
          </Text>

          <View style={styles.galleryRow}>
            {[1, 2, 3].map((_, index) => (
              <TouchableOpacity key={index} style={styles.imageBox}>
                <PluseIcon height={15} width={15} />
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity style={{width: '100%', marginTop: 5}}>
            <LinearGradient
              colors={['#DDAC17', '#FFFA8A', '#ECC440']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={{
                alignSelf: 'center',
                height: 50,
                width: '100%',
                borderRadius: 10,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontSize: 15,
                  fontFamily: 'Montserrat-SemiBold',
                  color: '#000',
                }}>
                Add Photos (Max 10)
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <View style={styles.infoDetailSection}>
          <Text style={styles.formTitleheading}>About Us</Text>
          <View style={styles.infoSectionCells}>
            <View style={[styles.inputView, {height: 120, marginTop: 15}]}>
              <TextInput
                placeholder="Write a brief description about your company..."
                placeholderTextColor={'#ADAEBC'}
                value={''}
                multiline
                numberOfLines={5}
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
        </View>

        <View style={styles.infoDetailSection}>
          <Text style={styles.formTitleheading}>Exhibitor Guidelines</Text>
          <View style={styles.infoSectionCells}>
            <View
              style={[
                styles.inputView,
                {
                  height: 'auto',
                  marginTop: 15,
                  paddingBottom: 15,
                  paddingHorizontal: 10,
                },
              ]}>
              <Text style={styles.SubHeadingText}>Event Overview</Text>
              <Text style={[styles.heading, {marginTop: 10}]}>
                ZBW Swarn Mela is premier jewelry exhibition showcasing the
                finest craftsmanship...
              </Text>
            </View>
          </View>
          <View style={styles.infoSectionCells}>
            <View
              style={[
                styles.inputView,
                {
                  height: 'auto',
                  marginTop: 15,
                  paddingBottom: 15,
                  paddingHorizontal: 10,
                },
              ]}>
              <Text style={styles.SubHeadingText}>
                Participation Guidelines
              </Text>
              <View style={{marginLeft: 15}}>
                <Text style={[styles.heading, {marginTop: 5}]}>
                  Setup time: 8 AM - 10 AM
                </Text>
                <Text style={[styles.heading, {marginTop: 5}]}>
                  Booth dimensions: 10×10 feet
                </Text>
                <Text style={[styles.heading, {marginTop: 5}]}>
                  Security arrangements provided
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.infoSectionCells}>
            <View
              style={[
                styles.inputView,
                {
                  height: 'auto',
                  marginTop: 15,
                  paddingBottom: 15,
                  paddingHorizontal: 10,
                },
              ]}>
              <Text style={styles.SubHeadingText}>Terms & Conditions</Text>

              <TouchableOpacity
                onPress={() => setIsChecked(!isChecked)}
                style={styles.checkboxContainer}>
                <View
                  style={{
                    borderWidth: 1,
                    height: 15,
                    width: 15,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 2,
                    marginTop: 12,
                  }}>
                  {isChecked && (
                    <View
                      style={{
                        backgroundColor: 'black',
                        height: '75%',
                        width: '75%',
                        borderRadius: 2,
                      }}
                    />
                  )}
                </View>
                <Text style={[styles.heading, {marginTop: 10, width: '100%'}]}>
                  I agree to the terms and conditions of participation in ZBW
                  Swarn Mela
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={{marginVertical: 20}}
          onPress={() => {
            navigation.navigate('ExhibitorProfile');
          }}>
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
              Complete Profile
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};
export default CatalogueForm;
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
  SubHeadingText: {
    marginTop: 10,
    fontSize: 16,
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
  galleryRow: {
    height: 100,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  imageBox: {
    width: '32%',
    height: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#FFE58B',
    borderWidth: 1,
  },
  plusIcon: {
    fontSize: 24,
    color: '#F1B500',
    fontWeight: 'bold',
  },
  checkboxContainer: {
    paddingHorizontal: 8,
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
    width: '90%',
    gap: 10,
  },
});
