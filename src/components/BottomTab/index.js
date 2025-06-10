import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Home from "../../assets/Icon/Home.svg";
import People from "../../assets/Icon/People.svg";
import Msg from "../../assets/Icon/Msg.svg";
import LinearGradient from "react-native-linear-gradient";

const BottomTab = ({ onPress, showMember }) => {
    const navigation = useNavigation()
    return (

        <LinearGradient
            colors={['#DDAC17', '#FFFA8A', '#ECC440']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{
                height: 60,
                width: '100%',
                backgroundColor: '#FCDA64',
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                justifyContent: 'space-between',
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 20
            }}>
            <TouchableOpacity activeOpacity={0.5}>
                <Home />
            </TouchableOpacity>
            <TouchableOpacity
                onPress={onPress}
                activeOpacity={0.5}>
                <People />
            </TouchableOpacity>
            {showMember == 'Not a member' ? null : <TouchableOpacity
                onPress={() => navigation.navigate('ZBWGroup')}
                activeOpacity={0.5}>
                <Msg />
            </TouchableOpacity>}
        </LinearGradient>
    )
}
export default BottomTab;