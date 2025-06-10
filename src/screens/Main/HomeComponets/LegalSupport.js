import React, { useEffect, useState } from "react";
import { View, Text, TextInput, FlatList, Image, Platform, StyleSheet, TouchableOpacity, SafeAreaView, Modal, Dimensions, ImageBackground } from "react-native";
import Header from "../../../components/CustomHeader";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Storage from "../../../components/LocalStorage";
import Toast from "react-native-simple-toast";
import Loader from "../../../components/Loader";
import Constants from "../../../Redux/Constants";
import Cross from "../../../assets/Icon/CircleCross1";
import { handleUnauthorizedError } from "../../../components/SessionExpire";
import LinearGradient from "react-native-linear-gradient";

const LegalSupport = () => {
    const navigation = useNavigation()
    const [loader, setLoader] = useState(false)
    const [data, setData] = useState()
    const [page, setPage] = useState(1)
    const [visible, setVisible] = useState(false)
    const [image, setImage] = useState('')


    useEffect(() => {
        apiCall()
    }, [])

    const apiCall = async () => {

        const user_token = await AsyncStorage.getItem(Storage.user_token)

        let config = {
            method: 'get',
            url: `${Constants.MainUrl}legalsupport/all/1`,
            headers: {
                'Authorization': `${user_token}`
            }
        };
        setLoader(true)
        axios.request(config)
            .then((response) => {
                if (response.data.code == '200') {
                    // Toast.show(response.data.message)
                    setData(response.data.data)
                    setPage(page + 1)
                    setLoader(false)
                }
                else {
                    setLoader(false)
                    // Toast.show(response.data.message)
                }
                console.log(JSON.stringify(response.data));
            })
            .catch(async error => {
                setLoader(false);
                console.log('Error:', error);

                if (error.response && error.response.status === 401) {
                    await handleUnauthorizedError(navigation);
                } else {
                    Toast.show(error.response?.data?.message);
                }
            });

    }

    const handleApiOnReachEnd = async () => {

        const user_token = await AsyncStorage.getItem(Storage.user_token)

        let config = {
            method: 'get',
            url: `${Constants.MainUrl}legalsupport/all/${page}`,
            headers: {
                'Authorization': `${user_token}`
            }
        };
        setLoader(true)
        axios.request(config)
            .then((response) => {
                if (response.data.code == '200') {
                    // Toast.show(response.data.message)
                    var newData = response.data.data
                    var stateAssetArr = [...news, ...newData]
                    setData(stateAssetArr)
                    setPage(page + 1)
                    setLoader(false)
                }
                else {
                    setLoader(false)
                    // Toast.show(response.data.message)
                }
                console.log(JSON.stringify(response.data));
            })
            .catch(async error => {
                setLoader(false);
                console.log('Error:', error);

                if (error.response && error.response.status === 401) {
                    await handleUnauthorizedError(navigation);
                } else {
                    Toast.show(error.response?.data?.message);
                }
            });

    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#F9F4F1' }}>
            {loader ? <Loader /> : null}
            <Header
                title={'Legal Support'}
                onPress={() => navigation.goBack()}
                onPress2={() => navigation.navigate('Notification')}
            />
            <View style={styles.main}>
                <FlatList
                    data={data}
                    numColumns={2}
                    onEndReachedThreshold={0.5}
                    onEndReached={() => handleApiOnReachEnd()}
                    style={{ marginBottom: 50 }}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() => {
                                setImage(item?.upload_image)
                                setVisible(true)
                            }}
                            style={styles.item}>
                            <View style={styles.item}>
                                <View style={styles.view}>
                                    <LinearGradient
                                        colors={['#DDAC17', '#FFFA8A', '#ECC440']}
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 1, y: 0 }}
                                        style={styles.view1}>

                                        <View style={{ marginTop: -36 }}>
                                            <Image
                                                resizeMode="center"
                                                style={{ height: 82, width: 82, borderRadius: 82 }}
                                                source={{ uri: item.upload_image }} />
                                        </View>
                                    </LinearGradient>

                                    <View style={{ borderWidth: 0, minHeight: 100, width: '100%' }}>
                                        <Text style={styles.title}>{item.name}</Text>
                                        <Text style={styles.post}>{item.post}</Text>
                                    </View>
                                </View>

                            </View>
                        </TouchableOpacity>
                    )}
                />
                <Modal
                    visible={visible}
                    onRequestClose={() => setVisible(false)}
                    animationType="slide"
                >
                    <View style={{
                        height: Dimensions.get('window').height,
                        backgroundColor: '#000'
                    }}>

                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <ImageBackground
                                resizeMode="contain"
                                style={{ height: Dimensions.get('window').height, width: Dimensions.get('window').width }}
                                source={{ uri: image }}>
                                <TouchableOpacity onPress={() => setVisible(false)} style={{ alignSelf: 'flex-end', margin: 20 }}>
                                    <Cross />
                                </TouchableOpacity>
                            </ImageBackground>
                        </View>
                    </View>
                </Modal>
            </View>
        </SafeAreaView>

    )
}
export default LegalSupport;
const styles = StyleSheet.create({

    main: {
        alignItems: 'center',
        marginTop: 15,
        marginLeft: -30
    },
    item: {
        // width: '40%', 
        // height: 135, 
        // marginHorizontal: 20, 
        // marginVertical: 15 
        width: Dimensions.get('window').width / 3 + 28,
        // width:'40%',
        height: 175,
        marginHorizontal: 20,
        marginVertical: 15
    },
    view: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 5, left: 0, right: 0,


    },
    view1: {
        height: 60,
        width: 100,
        // backgroundColor: '#FCDA64',
        borderBottomLeftRadius: Platform.OS == 'android' ? 50 : 65,
        borderBottomRightRadius: Platform.OS == 'android' ? 50 : 65,
        alignItems: 'center'
    },
    title: {
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 14,
        color: '#000000',
        marginTop: 8,
        textAlign: 'center',
    },
    post: {
        fontFamily: 'Montserrat-Medium',
        fontSize: 12,
        color: '#000000',
        marginTop: 2,
        textAlign: 'center',
    }
})
const data = [
    { title: 'Adv. Rajesh \nThakkar', img: require('../../../assets/LocalImage/Ellipse9.png') },
    { title: 'Adv. Sunny \nJain', img: require('../../../assets/LocalImage/Ellipse10.png') },
    { title: 'Adv. Rajesh \nThakkar', img: require('../../../assets/LocalImage/Ellipse11.png') },
    { title: 'Adv. Sunny \nJain', img: require('../../../assets/LocalImage/Ellipse9.png') },
    { title: 'Adv. Rajesh \nThakkar', img: require('../../../assets/LocalImage/Ellipse10.png') },
    { title: 'Adv. Sunny \nJain', img: require('../../../assets/LocalImage/Ellipse11.png') },

]