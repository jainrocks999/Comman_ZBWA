import React, {
    Component
  } from 'react';
  
  import {
    AppRegistry,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
  } from 'react-native';
  
  import Video from 'react-native-video';
  
  class VideoPlayerAndroid extends Component {
  
    constructor(props) {
        super(props);
        this.state = {
            rate: 1,
            volume: 1,
            muted: false,
            resizeMode: 'contain',
            duration: 0.0,
            currentTime: 0.0,
            paused: true,
        };
       
        this.video = null;
      }

    onLoad = (data) => {
      this.setState({ duration: data.duration });
    };
  
    onProgress = (data) => {
      this.setState({ currentTime: data.currentTime });
    };
  
    onEnd = () => {
      this.setState({ paused: true })
      this.video.seek(0)
    };
  
    onAudioBecomingNoisy = () => {
      this.setState({ paused: true })
    };
  
    onAudioFocusChanged = (event) => {
      this.setState({ paused: !event.hasAudioFocus })
    };
  
    getCurrentTimePercentage() {
      if (this.state.currentTime > 0) {
        return parseFloat(this.state.currentTime) / parseFloat(this.state.duration);
      }
      return 0;
    };
  
    renderRateControl(rate) {
      const isSelected = (this.state.rate === rate);
  
      return (
        <TouchableOpacity onPress={() => { this.setState({ rate }) }}>
          <Text style={[styles.controlOption, { fontWeight: isSelected ? 'bold' : 'normal' }]}>
            {rate}x
          </Text>
        </TouchableOpacity>
      );
    }
  
    renderResizeModeControl(resizeMode) {
      const isSelected = (this.state.resizeMode === resizeMode);
  
      return (
        <TouchableOpacity onPress={() => { this.setState({ resizeMode }) }}>
          <Text style={[styles.controlOption, { fontWeight: isSelected ? 'bold' : 'normal' }]}>
            {resizeMode}
          </Text>
        </TouchableOpacity>
      )
    }
  
    renderVolumeControl(volume) {
      const isSelected = (this.state.volume === volume);
  
      return (
        <TouchableOpacity onPress={() => { this.setState({ volume }) }}>
          <Text style={[styles.controlOption, { fontWeight: isSelected ? 'bold' : 'normal' }]}>
            {volume * 100}%
          </Text>
        </TouchableOpacity>
      )
    }
  
    render() {
      const flexCompleted = this.getCurrentTimePercentage() * 100;
      const flexRemaining = (1 - this.getCurrentTimePercentage()) * 100;
  
      return (
        <View 
        style={styles.container}
        >
          <TouchableOpacity
            // style={styles.fullScreen}
            onPress={() => this.setState({ paused: !this.state.paused })}
          >
            <View style={{ position: 'relative', height: 300, width: 250 }}><Video
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            height: 300,
            width: 250,
            borderRadius: 20,
          }}
          resizeMode="cover"
          height={150}
          width={250}
        //   muted={true}
          source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/zbwa-816d7.appspot.com/o/VID-20231226-WA0005.mp4?alt=media&token=dcfab351-60d5-478b-837c-ed280bd81f3f' }}
          allowsExternalPlayback={false}
          
          
              rate={this.state.rate}
              paused={this.state.paused}
              volume={this.state.volume}
              muted={this.state.muted}
            //   resizeMode={this.state.resizeMode}
              onLoad={this.onLoad}
              onProgress={this.onProgress}
              onEnd={this.onEnd}
              onAudioBecomingNoisy={this.onAudioBecomingNoisy}
              onAudioFocusChanged={this.onAudioFocusChanged}
              repeat={false}
          />
            </View>
            {/* <Video
              ref={(ref) => { this.video = ref }}
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                height: 300,
                width: 250,
                borderRadius: 20,
              }}
              height={150}
              width={250}
              
              source={{uri:'https://firebasestorage.googleapis.com/v0/b/zbwa-816d7.appspot.com/o/VID-20231226-WA0005.mp4?alt=media&token=dcfab351-60d5-478b-837c-ed280bd81f3f'}}
            //   style={styles.fullScreen}
              rate={this.state.rate}
              paused={this.state.paused}
              volume={this.state.volume}
              muted={this.state.muted}
              resizeMode={this.state.resizeMode}
              onLoad={this.onLoad}
              onProgress={this.onProgress}
              onEnd={this.onEnd}
              onAudioBecomingNoisy={this.onAudioBecomingNoisy}
              onAudioFocusChanged={this.onAudioFocusChanged}
              repeat={false}
            /> */}
          </TouchableOpacity>
  
          <View style={styles.controls}>
            <View style={styles.generalControls}>
            
            </View>
  
            <View style={styles.trackingControls}>
              <View style={styles.progress}>
                <View style={[styles.innerProgressCompleted, { flex: flexCompleted }]} />
                <View style={[styles.innerProgressRemaining, { flex: flexRemaining }]} />
              </View>
            </View>
          </View>
        </View>
      );
    }
  }
  
  
  const styles = StyleSheet.create({
    container: {
    //   flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'black',
    },
    fullScreen: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
    },
    controls: {
      backgroundColor: 'transparent',
      borderRadius: 5,
      position: 'absolute',
      bottom: 20,
      left: 20,
      right: 20,
    },
    progress: {
      flex: 1,
      flexDirection: 'row',
      borderRadius: 3,
      overflow: 'hidden',
    },
    innerProgressCompleted: {
      height: 20,
      backgroundColor: '#cccccc',
    },
    innerProgressRemaining: {
      height: 20,
      backgroundColor: '#2C2C2C',
    },
    generalControls: {
      flex: 1,
      flexDirection: 'row',
      borderRadius: 4,
      overflow: 'hidden',
      paddingBottom: 10,
    },
    rateControl: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
    },
    volumeControl: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
    },
    resizeModeControl: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    controlOption: {
      alignSelf: 'center',
      fontSize: 11,
      color: 'white',
      paddingLeft: 2,
      paddingRight: 2,
      lineHeight: 12,
    },
  });

  export default VideoPlayerAndroid;