import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  FlatList,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import DirectionIcon from '../../../assets/EventSwarnMela/directionIcon.svg';
import InfoIcon from '../../../assets/EventSwarnMela/infoIcon.svg';
import Header from '../../../components/CustomHeader';
import LinearGradient from 'react-native-linear-gradient';

const VisitedExhibitorList = () => {
  const navigation = useNavigation();

  const data = [
    {
      id: '1',
      name: 'Royal Jewelry Co.',
      booth: 'A-12',
      description: 'Specializing in Diamond Jewelry & Gold Ornaments',
      tags: ['Diamond', 'Gold'],
      vistiedDate: '06th Oct 2025',
    },
    {
      id: '2',
      name: 'Diamond Paradise',
      booth: 'B-15',
      description: 'Premium Diamond Jewelry & Custom Designs',
      tags: ['Diamond', 'Custom'],
      vistiedDate: '06th Oct 2025',
    },
    {
      id: '3',
      name: 'Gemstone Galaxy',
      booth: 'C-08',
      description: 'Expertise in Gemstone Embedded Designs',
      tags: ['Gemstone', 'Custom'],
      vistiedDate: '05th Oct 2025',
    },
  ];

  return (
    <View style={{flex: 1, backgroundColor: '#F8F8F8'}}>
      <Header
        title={''}
        onPress={() => navigation.goBack()}
        onPress2={() => navigation.navigate('Notification')}
      />
      <ScrollView style={{flexGrow: 1, paddingHorizontal: 15}}>
        <Text style={styles.HeadingText}>My Visited Exhibitors</Text>
        <FlatList
          data={data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => {
            const showDate =
              index === 0 || item.vistiedDate !== data[index - 1].vistiedDate;
            return (
              <>
                {showDate && (
                  <Text style={[styles.DateTitle, {marginTop: 15}]}>
                    Visited on {item?.vistiedDate}
                  </Text>
                )}
                <View style={[styles.infoDetailSection, {gap: 10}]}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <View style={{width: '90%'}}>
                      <Text style={styles.cardTitle}>{item?.name}</Text>
                      <Text style={styles.heading}>Booth: {item?.booth}</Text>
                    </View>
                  </View>

                  <View style={styles.alignRow}>
                    <Image
                      style={styles.cardImg}
                      source={require('../../../assets/EventSwarnMela/demoImg.jpg')}
                    />
                    <View style={{width: '62%'}}>
                      <Text style={styles.heading}>{item.description}</Text>
                      <View
                        style={[styles.alignRow, {flexWrap: 'wrap', gap: 5}]}>
                        {item?.tags?.map((tag, index) => (
                          <LinearGradient
                            key={index}
                            colors={['#AEAEAE', '#969998', '#4A4A4A']}
                            start={{x: 0, y: 0}}
                            end={{x: 1, y: 0}}
                            style={styles.cardTag}>
                            <Text style={styles.tagText}>{tag}</Text>
                          </LinearGradient>
                        ))}
                      </View>
                    </View>
                  </View>
                  <View style={styles.alignRow}>
                    <TouchableOpacity style={{flex: 1}}>
                      <LinearGradient
                        colors={['#DDAC17', '#FFFA8A', '#ECC440']}
                        start={{x: 0, y: 0}}
                        end={{x: 1, y: 0}}
                        style={[
                          styles.cardBtn,
                          {flexDirection: 'row', gap: 5, width: '100%'},
                        ]}>
                        <DirectionIcon />
                        <Text style={styles.heading}>Get Directions</Text>
                      </LinearGradient>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{flex: 1}}
                      // for Temprary
                      onPress={() => {
                        navigation.navigate('HelpDesk');
                      }}>
                      <LinearGradient
                        colors={['#DDAC17', '#FFFA8A', '#ECC440']}
                        start={{x: 0, y: 0}}
                        end={{x: 1, y: 0}}
                        style={[
                          styles.cardBtn,
                          {flexDirection: 'row', gap: 5, width: '100%'},
                        ]}>
                        <InfoIcon />
                        <Text style={styles.formTitleheading}>
                          View Details
                        </Text>
                      </LinearGradient>
                    </TouchableOpacity>
                  </View>
                </View>
              </>
            );
          }}
        />
      </ScrollView>
    </View>
  );
};
export default VisitedExhibitorList;
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
  formTitleheading: {
    color: '#000000',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 15,
  },
  cardTitle: {
    color: '#000000',
    fontFamily: 'Montserrat-Medium',
    fontSize: 15,
  },
  DateTitle: {
    color: '#000000',
    fontFamily: 'Montserrat-Medium',
    fontSize: 16,
  },
  cardTag: {
    height: 30,
    borderRadius: 5,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  alignRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 12,
    marginTop: 15,
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
});
