import React, { useEffect, useState, useRef } from 'react'
import { View, Text, Image, Dimensions, StyleSheet, Animated } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { setAsyncStorageValue, getAsyncStorgaeValue } from '../../component'
import { Colors, Strings, Fonts } from '../../../src/utils'
import { splash_image, app_logo } from '../../assets'
import Video from 'react-native-video';
import Loading from 'react-native-whc-loading';
var countries = require('country-data').countries

const splash = ({ navigation }) => {
    const videoPlayer = useRef(null);
    const [pause, setpause] = useState(false)
    const [isFirstLaunch, setIsFirstLaunch] = useState(false)
    const loadingRef = useRef();
    let fadeAnimation = new Animated.Value(1);
    useEffect(() => {
        // let CountriesList = countries?.all?.filter((val) => val?.countryCallingCodes[0]?.length > 0)
        //     .filter((val) => !val?.countryCallingCodes[0]?.includes('+1'))
        //     .sort((a, b) => a?.countryCallingCodes[0] > b?.countryCallingCodes[0] ? 1 : -1)
        //     .map((ele) => {
        //         return {
        //             label: `${ele?.countryCallingCodes[0]} (${ele?.alpha2})`,
        //             value: ele?.alpha2
        //         }
        //     })
        let CountriesList = countries?.all?.filter((val) => val?.countryCallingCodes[0]?.length > 0)
            .filter((val) => !val?.countryCallingCodes[0]?.includes('+1'))
            .sort((a, b) => a?.countryCallingCodes[0] > b?.countryCallingCodes[0] ? 1 : -1)
            .map((ele) => `${ele?.countryCallingCodes[0]} (${ele?.alpha2})`)
        setAsyncStorageValue(Strings.ASYNC_STORAGE_KEYS.COUNTRIES, JSON.stringify(['+44 (UK)', '+1 (US)', '+1 (CA)', ...CountriesList]))
    }, [])


    useEffect(() => {
        Animated.timing(fadeAnimation, {
            toValue: 0,
            duration: 2000,
            useNativeDriver: true
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
                            opacity: fadeAnimation == 0 ? 0 : fadeAnimation
                        }}>
                            BE THE MOVEMENT
                        </Animated.Text>
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
