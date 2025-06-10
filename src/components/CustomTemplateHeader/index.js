import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import HeaderArrow from "../../assets/Icon/HeaderArrow1.svg";
import DownLoad from "../../assets/Icon/download.svg";
import Svg, { Path } from "react-native-svg"; 
import styles from "./style";
import LinearGradient from "react-native-linear-gradient";

const PencilIcon = ({ size = 18 }) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="black"
    // strokeWidth="1"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <Path d="M12 20h9" fill="black" />
    <Path d="M16.5 3.5a2.121 2.121 0 1 1 3 3L7 19l-4 1 1-4Z" fill="black" />
  </Svg>
);


const CustomTemplateHeader = ({ title, onPress, download, onPress1, onPress2, showEdit }) => {
    return (
         <LinearGradient
            colors={['#DDAC17', '#FFFA8A', '#ECC440']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={styles.container}>
            <TouchableOpacity activeOpacity={0.5} onPress={onPress} style={styles.touch}>
                <HeaderArrow />
            </TouchableOpacity>
            <Text style={styles.title}>{title}</Text>
            {download ? (
                <TouchableOpacity onPress={onPress1} activeOpacity={0.5} style={styles.touch}>
                    <DownLoad />
                </TouchableOpacity>
            ) : (
                showEdit && (
                    <TouchableOpacity onPress={onPress2} activeOpacity={0.5} style={styles.touch}>
                        <PencilIcon size={25} color="#FCDA64" />
                    </TouchableOpacity>
                )
            )}
        </LinearGradient>
    );
};

export default CustomTemplateHeader;
