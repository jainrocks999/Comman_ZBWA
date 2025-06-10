import React, { useState, useEffect } from "react";
import { View, Text, Dimensions, ScrollView, ImageBackground } from "react-native";
import Header from "../../../../components/CustomHeader";
import { useNavigation } from "@react-navigation/native";
import Loader from "../../../../components/Loader";

const OurAchievements = () => {

    const navigation = useNavigation()
    const [loader, setLoader] = useState(false)

    return (
        <ImageBackground source={require('../../../../assets/Logo/background.png')} style={{ flex: 1, }}>
            {loader ? <Loader /> : null}
            <Header
                title={'About Us'}
                onPress={() => navigation.goBack()}
                onPress2={() => navigation.navigate('Notification')}
            />
            <ScrollView style={{ padding: 20 }}>
                <Text>OurAchievements</Text>
            </ScrollView>
        </ImageBackground>
    )
}
export default OurAchievements;