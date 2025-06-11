import React, {useState} from 'react';
import {View,ScrollView, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Arrow from '../../../assets/Icon/BlackArrow.svg';
import Computer from '../../../assets/Icon/computer.svg';
import {useNavigation} from '@react-navigation/native';
import SuperLogo from '../../../assets/EventSwarnMela/ZBF-logo.svg';
import SmallTxt from '../../../assets/EventSwarnMela/logoSmText.svg';
import LocationIcon from '../../../assets/EventSwarnMela/locationIcon.svg';
import CalcenderIcon from '../../../assets/EventSwarnMela/calcenderIcon.svg';
import FrameIcon1 from '../../../assets/EventSwarnMela/Frame (1).svg';
import FrameIcon2 from '../../../assets/EventSwarnMela/Frame (2).svg';
import FrameIcon3 from '../../../assets/EventSwarnMela/Frame (3).svg';
import FrameIcon4 from '../../../assets/EventSwarnMela/Frame (5).svg';
import Header from '../../../components/CustomHeader';
import {FlatList} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';

const EventEntry = () => {
  const navigation = useNavigation();

  return (
    <View style={{flex: 1, backgroundColor: '#F8F8F8'}}>
      <Header
        title={''}
        onPress={() => navigation.goBack()}
        onPress2={() => navigation.navigate('Notification')}
      />
      <ScrollView style={{flexGrow: 1, paddingHorizontal: 15}}>
        <View
          style={{
            paddingVertical: 30,
          }}>
          <View
            style={{
              width: '100%',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              alignItems: 'center',
              height: 150,
            }}>
            <SuperLogo />
          </View>
          <View style={{paddingTop: 10, width: '90%', alignSelf: 'center'}}>
            <SmallTxt width={'100%'} />
          </View>
          <Text
            style={{
              alignSelf: 'center',
              paddingVertical: 5,
              fontSize: 15,
              fontFamily: 'Montserrat-Regular',
            }}>
            The Ultimate Jewelry Exhibition
          </Text>
        </View>
        <LinearGradient
          colors={['#DDAC17', '#FFFA8A', '#ECC440']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={{
            height: 110,
            borderRadius: 10,
            flexDirection: 'row',
          }}>
          <View style={styles.timerCells}>
            <Text style={styles.timerLargeText}>90</Text>
            <Text style={styles.timerSmallText}>Days</Text>
          </View>
          <View style={styles.timerCells}>
            <Text style={styles.timerLargeText}>10</Text>
            <Text style={styles.timerSmallText}>Hours</Text>
          </View>
          <View style={styles.timerCells}>
            <Text style={styles.timerLargeText}>24</Text>
            <Text style={styles.timerSmallText}>Minutes</Text>
          </View>
          <View style={styles.timerCells}>
            <Text style={styles.timerLargeText}>48</Text>
            <Text style={styles.timerSmallText}>Seconds</Text>
          </View>
        </LinearGradient>

        <View style={styles.infoDetailSection}>
          <View style={styles.infoSectionCells}>
            <LocationIcon height={20} />
            <View>
              <Text style={styles.infoTitleText}>Exhibition Center</Text>
              <Text style={styles.infoSubTitleText}>Zaveri Bazar</Text>
            </View>
          </View>
          <View style={styles.infoSectionCells}>
            <CalcenderIcon />
            <View>
              <Text style={styles.infoTitleText}>Festival Dates</Text>
              <Text style={styles.infoSubTitleText}>
                22nd Sept To 26th Oct 2025
              </Text>
            </View>
          </View>
          <View style={styles.infoSectionCells}>
            <CalcenderIcon />
            <View>
              <Text style={styles.infoTitleText}>Main Exhibition </Text>
              <Text style={styles.infoSubTitleText}>
                06th Oct To 16th Oct 2025
              </Text>
            </View>
          </View>
        </View>
        <View>
          <FlatList
            data={[
              {
                id: '1',
                svgImage: <FrameIcon1 width={'30%'} height={'30%'} />,
                line1: 'Exhibitor',
                line2: 'Regitration',
              },
              {
                id: '2',
                svgImage: <FrameIcon2 width={'30%'} height={'35%'} />,
                line1: 'Visitor',
                line2: 'Regitration',
              },
              {
                id: '3',
                svgImage: <FrameIcon3 width={'30%'} height={'28%'} />,
                line1: 'Lucky',
                line2: 'Draws',
              },
              {
                id: '4',
                svgImage: <FrameIcon4 width={'30%'} height={'35%'} />,
                line1: 'Scan Exhibitor’s',
                line2: 'QR Code',
              },
            ]}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <LinearGradient
                colors={['#AEAEAE', '#969998', '#4A4A4A']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                style={styles.cardSection}>
                {item?.svgImage}
                <View style={{marginTop: 14}}>
                  <Text style={styles.cardTextBold}>{item?.line1}</Text>
                  <Text style={styles.cardTextBold}>{item?.line2}</Text>
                </View>
              </LinearGradient>
            )}
            numColumns={2}
            contentContainerStyle={{padding: 10, gap: 10}}
          />
        </View>
        <TouchableOpacity style={{marginVertical:20}}
        onPress={()=>{navigation.navigate('VisitorResgister')}}
        // onPress={()=>{navigation.navigate('ExhibitorRegister')}}
        >
          <LinearGradient
            colors={['#DDAC17', '#FFFA8A', '#ECC440']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={{height:65, borderRadius: 10,flex:1,alignItems:"center",justifyContent:"center"}}>
            <Text style={{fontSize:20,fontFamily:"Montserrat-SemiBold",color:"#000"}}>Register Now</Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};
export default EventEntry;
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
  timerCells: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timerLargeText: {
    fontSize: 25,
    fontFamily: 'Montserrat-Bold',
    color: '#000',
  },
  timerSmallText: {
    fontSize: 10,
    fontFamily: 'Montserrat-Medium',
    color: '#000',
  },
  infoDetailSection: {
    borderWidth: 1,
    marginVertical: 20,
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#F9F4F1',
    borderColor: '#FFD387',
  },
  infoSectionCells: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
    gap: 10,
  },
  infoTitleText: {
    fontSize: 16,
    fontFamily: 'Montserrat-SemiBold',
    color: '#EEAF2D',
  },
  infoSubTitleText: {
    fontSize: 13,
    fontFamily: 'Montserrat-Regular',
    color: '#000000',
  },
  cardTextBold: {
    marginHorizontal: 10,
    fontSize: 18,
    fontFamily: 'Montserrat-Bold',
    color: '#FFF',
    // width: '60%',
    fontWeight: 'bold',
  },
  cardSection: {
    width: '50%',
    height: 120,
    borderRadius: 10,
    paddingVertical: 18,
    marginRight: 10,
  },
});
