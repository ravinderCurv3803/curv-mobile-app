import React, { useEffect, useState, useRef } from 'react'
import { View, Text, Image, Dimensions, StyleSheet, Animated, ActivityIndicator } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { setAsyncStorageValue, getAsyncStorgaeValue } from '../../component'
import { Colors, Strings, Fonts } from '../../../src/utils'
import { splash_image, app_logo } from '../../assets'
import Video from 'react-native-video';
import Loading from 'react-native-whc-loading';

const splash = ({ navigation }) => {
    const videoPlayer = useRef(null);
    const [pause, setpause] = useState(false)
    const [isFirstLaunch, setIsFirstLaunch] = useState(false)
    const loadingRef = useRef();
    let fadeAnimation = new Animated.Value(1);

    useEffect(() => {
        Animated.timing(fadeAnimation, {
            toValue: 0,
            duration: 2000
        }).start();
    }, [])

    useEffect(() => {
        const confirmLogin = async () => {
            const loginData = await getAsyncStorgaeValue(Strings.ASYNC_STORAGE_KEYS.USER_DATA)
            if (loginData) {
                setIsFirstLaunch(false)
                loadingRef?.current?.show()
                setTimeout(async () => {
                    loadingRef?.current?.close()
                    navigation.replace('Initial')
                }, 4000)
            } else {
                setIsFirstLaunch(false)
                setTimeout(async () => {
                    loadingRef?.current?.close()
                    navigation.replace('Initial')
                }, 2000)
                setAsyncStorageValue(Strings.ASYNC_STORAGE_KEYS.ISFIRSTLAUNCH, false)
            }
        }
        confirmLogin()
    }, [])

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setpause(false)
        });

        return unsubscribe;
    }, [navigation]);

    useEffect(() => {
        const unsubscribe1 = navigation.addListener('blur', () => {
            setpause(true)
        });
        return unsubscribe1;
    }, [navigation]);



    return (
        <View style={{
            flex: 1,
            backgroundColor: Colors.PRIMARY,
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            {
                !isFirstLaunch ?
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{
                            color: Colors.WHITE,
                            fontSize: 16,
                            lineHeight: 24,
                            fontFamily: Fonts.FontFamily.Regular,
                            fontWeight: '400',
                        }}>
                            JOIN THE MOVEMENT
                        </Text>
                        <Animated.Text style={{
                            color: Colors.WHITE,
                            fontSize: 16,
                            lineHeight: 24,
                            fontFamily: Fonts.FontFamily.Regular,
                            fontWeight: '800',
                            opacity: fadeAnimation
                        }}>
                            BE THE MOVEMENT
                        </Animated.Text>
                        <ActivityIndicator color={Colors.YELLOW} />
                    </View>
                    // <Image source={app_logo} />
                    :
                    <Video
                        ref={videoPlayer}
                        source={require('../../assets/videos/splashVideo.mp4')}   // Can be a URL or a local file.
                        resizeMode={'cover'}
                        paused={pause}
                        onEnd={() => {
                            setpause(true)
                            navigation.replace('Initial')
                        }}
                        fullscreenOrientation={'portrait'}
                        onFullScreen={true}
                        style={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0 }} />
            }
            <Loading ref={loadingRef} />
        </View>
    )
}

export default splash
