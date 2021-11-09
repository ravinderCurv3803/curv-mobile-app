import React, { Component, useState, useEffect, useRef } from "react";

import { StyleSheet, View, ActivityIndicator, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from '../../../../utils';
import MediaControls, { PLAYER_STATES } from 'react-native-media-controls';

import Video from 'react-native-video';

const FeedVideo = (props) => {
    const [currentTime, setCurrentTime] = useState(0)
    const [duration, setDuration] = useState(0)
    const [isLoading, setIsLoading] = useState(true)
    const [pause, setpause] = useState(false)

    const [playerState, setPlayerState] = useState(PLAYER_STATES.PLAYING)
    let { src, ref, poster, currentIndex, index } = props

    const onPaused = playerState => {
        setpause(!pause)
        // setPlayerState(playerState)
    }
    const onLoad = data => {
        setDuration(data.duration)
        setIsLoading(false)
    }

    const onEnd = () => {
        setDuration(0)
        setPlayerState(PLAYER_STATES.PLAYING)
    }

    const onProgress = data => {
        if (!isLoading && playerState !== PLAYER_STATES.ENDED) {
            setCurrentTime(data.currentTime)
        }
    };

    return (

        <TouchableWithoutFeedback style={{ flex: 1 }} onPress={onPaused}>
            <View style={styles.mainView}>
                <Video
                    ref={ref}
                    source={src}   // Can be a URL or a local file.
                    poster={poster}
                    resizeMode={'cover'}
                    // paused={pause}
                    paused={currentIndex === index ? pause : true}
                    repeat={true}
                    onEnd={onEnd}
                    onVideoBuffer={() => {
                        console.log('onVideoBuffer')
                        setIsLoading(true)
                    }}
                    onLoad={onLoad && onLoad}
                    onLoadStart={() => {
                        setpause(false)
                        setIsLoading(true)
                    }}
                    onProgress={onProgress && onProgress}
                    fullscreenOrientation={'portrait'}
                    onFullScreen={true}
                    style={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0 }} />
                {isLoading && (
                    <ActivityIndicator
                        color='white'
                        size='large'
                        style={styles.ActivityIndicatorStyle}
                    />
                )}
            </View>
        </TouchableWithoutFeedback>

    )
}

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        backgroundColor: Colors.BLACK,
        alignItems: 'center',

        justifyContent: 'center'
    },
    ActivityIndicatorStyle: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default FeedVideo;