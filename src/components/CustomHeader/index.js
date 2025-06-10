import React from "react";
import { View,Text,TouchableOpacity } from "react-native";
import HeaderArrow from "../../assets/Icon/HeaderArrow1.svg";
import HeaderBell from "../../assets/Icon/HeaderBell1.svg";
import DownLoad from "../../assets/Icon/download.svg";
import styles from "./style";
import { useNavigation } from "@react-navigation/native";
import LinearGradient from "react-native-linear-gradient";

const CustomHeader=({title,onPress,download,onPress1,onPress2,notification})=>{
  const navigation = useNavigation()
    return(
       <LinearGradient
      colors={['#DDAC17', '#FFFA8A', '#ECC440']}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      style={styles.container}>
            <TouchableOpacity
            activeOpacity={0.5} 
            onPress={onPress}
            style={styles.touch}>
              <HeaderArrow/>
            </TouchableOpacity>
            <Text style={styles.title}>{title}</Text>
            {download?<TouchableOpacity
            onPress={onPress1}
            activeOpacity={0.5}
            style={styles.touch}>
              <DownLoad/>
            </TouchableOpacity>:
            <View>
            {notification?<View style={{width:30}}/>:<TouchableOpacity
            onPress={()=>navigation.navigate('Notification')}
            activeOpacity={0.5}
            style={styles.touch}>
              <HeaderBell/>
            </TouchableOpacity>}
            </View>
            }
        </LinearGradient>
    )
}
export default CustomHeader;