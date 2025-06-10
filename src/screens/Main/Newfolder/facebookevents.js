import React, { useRef } from 'react';
import { View, StyleSheet, BackHandler } from 'react-native';
import { WebView } from 'react-native-webview';
import CustomHeader from '../../../components/CustomHeader';

const WebViewScreen = ({ navigation }) => {
  const webViewRef = useRef(null);
  const handleBackPress = () => {
    if (webViewRef.current) { 
      webViewRef.current.goBack();
    } else {
      
      navigation.navigate('HomeScreen');
    }
    return true;
  };
  React.useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackPress
    );
    return () => backHandler.remove();
  }, []);

  return (
    <View style={styles.container}>
      <CustomHeader
        title={"Facebook Events"}
        onPress={() => navigation.goBack()}
        onPress2={() => navigation.navigate("Notification")} 
      />
      <WebView
        ref={webViewRef}
        source={{ uri: 'https://www.facebook.com/share/r/1CuGfrYies/?mibextid=2Xzr3SNpE5dFVwDb' }} 
        startInLoadingState={true}
        style={styles.webview}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  webview: {
    flex: 1,
  },
});

export default WebViewScreen;
