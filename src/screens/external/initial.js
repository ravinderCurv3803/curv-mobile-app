import React, { Component, useState, useEffect, useRef } from "react";
import { View, StyleSheet, Image, Animated, Text, Easing, Platform, TouchableOpacity, ActivityIndicator, ImageBackground } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Container, Icon, Button } from "native-base";
import Loading from 'react-native-whc-loading';
import { SimpleButton } from '../../component'
import { Colors, Strings, Fonts } from '../../../src/utils'
import { app_logo, bg_image, bg } from '../../assets'
import navigation from "../../navigation/navigation";
import Video from 'react-native-video';

const Initial = (props) => {

    const loadingRef = useRef();
    let rotateValueHolder = new Animated.Value(0);
    useEffect(() => {
        startImageRotateFunction()
    }, [])

    const startImageRotateFunction = () => {
        rotateValueHolder.setValue(0);
        Animated.timing(rotateValueHolder, {
            toValue: .15,
            duration: 5000,
            easing: Easing.linear,
            useNativeDriver: false,
        }).start(() => startImageRotateFunction());
    };

    const rotateData = rotateValueHolder.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    return (
        <View style={styles.mainView}>
            <Animated.Image source={bg} style={[styles.mainView, {
                transform: [
                    { rotate: rotateData },
                    {
                        translateX: rotateValueHolder.interpolate({
                            inputRange: [0, 1],
                            outputRange: [0, 10]
                        })
                    },
                    {
                        translateY: rotateValueHolder.interpolate({
                            inputRange: [0, 1],
                            outputRange: [0, 15]
                        })
                    },
                    {
                        scaleX: rotateValueHolder.interpolate({
                            inputRange: [0, 1],
                            outputRange: [1, 15]
                        })
                    },
                    {
                        scaleY: rotateValueHolder.interpolate({
                            inputRange: [0, 1],
                            outputRange: [1, 12.5]
                        })
                    }
                ]
            }]}>
            </Animated.Image >
            <View style={styles.mainView}>
                <View style={{ marginTop: hp(20), width: wp(90), alignSelf: 'center' }}>
                    <View style={[styles.logo_View]}>
                        <Image style={{ height: 60, width: 246 }}
                            source={app_logo}
                            resizeMode="contain">
                        </Image>
                    </View>
                    <Text style={styles.social_textView}>
                        {Strings.LOGIN.SOCIAL_CHANGE}
                    </Text>
                </View>
                <View style={styles.buttonView}>
                    <View style={styles.logo_View}>
                        <SimpleButton
                            onPress={() => { props.navigation.navigate('SignUp') }}
                            buttonStyle={[styles.nextButton, { alignSelf: "center", width: wp(80), backgroundColor: Colors.ORANGE }]}
                            titleStyle={styles.buttontitle}
                            size={'sm'}
                            colorScheme='green'
                            title={Strings.LOGIN.JOIN_BUTTON}
                        />
                        <SimpleButton
                            onPress={() => {
                                props.navigation.navigate('Login')
                            }}
                            buttonStyle={[styles.nextButton, { marginTop: '2%', width: wp(40), alignSelf: "center" }]}
                            titleStyle={[styles.buttontitle, {
                                fontSize: 16,
                                fontFamily: Fonts.FontFamily.Regular,
                                fontWeight: '700'
                            }]}
                            title={Strings.LOGIN.SIGNIN_BUTTON}
                        />
                    </View>
                    <Text style={[styles.terms_textView, { textDecorationLine: 'none', marginTop: '5%' }]}>
                        {`By continuing you confirm that you have read and\naccepted our`} <Text onPress={() => { }} style={[styles.terms_textView, {
                            fontFamily: Fonts.FontFamily.Regular, textDecorationLine: 'underline', marginTop: '5%', fontSize: 10,
                            fontWeight: '700',
                        }]}>
                            {`Terms`}
                            <Text style={[styles.terms_textView, { textDecorationLine: 'underline', textDecorationColor: 'transparent', marginTop: '5%' }]}>
                                {` and`}  <Text onPress={() => { }} style={[styles.terms_textView, {
                                    textDecorationColor: 'white', textDecorationLine: 'underline', marginTop: '5%', fontFamily: Fonts.FontFamily.Regular, fontSize: 10,
                                    fontWeight: '700',
                                }]}>
                                    {`Ethics & Privacy Policy`}</Text>
                            </Text>
                        </Text>
                    </Text>
                </View>
            </View>
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        width: wp(100),
        height: hp(100),
        backgroundColor: 'red',
        justifyContent: 'space-around',
    },
    mainView: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        flex: 1
    },
    logo_View: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonView: {
        width: wp(90),
        alignSelf: 'center',
        position: 'absolute',
        bottom: hp(2)
    },
    social_textView: {
        marginTop: hp(7),
        color: Colors.WHITE,
        fontFamily: Fonts.FontFamily.Regular,
        fontWeight: '800',
        fontSize: 24,
        marginBottom: "10%",
        textAlign: "center"
    },
    terms_textView: {
        lineHeight: 15,
        marginTop: hp(5),
        color: Colors.WHITE,
        fontFamily: Fonts.FontFamily.Regular,
        fontSize: 10,
        fontWeight: '400',
        marginBottom: "10%",
        textAlign: "center"
    },
    nextButton:
    {
        height: hp(6),
        width: "100%",
        paddingVertical: 0,
        alignItems: 'center',
        borderRadius: hp(1.2), alignContent: 'center', alignItems: 'center'
    },
    buttontitle: {
        color: Colors.WHITE,
        fontSize: 20,
        fontFamily: Fonts.FontFamily.Regular,
        fontWeight: '800',
        textAlign: 'center',
        textAlignVertical: 'center',

    },
})

export default Initial;