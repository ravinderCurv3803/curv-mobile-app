import React, { Component, useState, useEffect, useRef } from "react";
import { View, StyleSheet, Text, ScrollView, PermissionsAndroid, Platform, Dimension, Keyboard, TouchableOpacity, ActivityIndicator, Image, TextInput, ImageBackground } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Container, Button } from "native-base";
import Loading from 'react-native-whc-loading';
import { SimpleButton, CircleButton, InputField, chooseImage, Countries, errorMessage, } from '../../component'
import { Colors, Strings, Fonts } from '../../../src/utils'
import { bg_image, notifications_big, check_icon } from '../../assets'
import { Icon } from 'react-native-elements';
import { check, request, requestMultiple, PERMISSIONS, RESULTS } from 'react-native-permissions';

const NotificationEnable = (props) => {

    const loadingRef = useRef();
    const [isNotificationEnable, setIsNotificationEnable] = useState(false)

    useEffect(() => {

    }, [])

    askNotificationPermission = () => {
        if (Platform.OS === 'android') {
        } else {
        }
    }


    return (
        <ImageBackground source={bg_image} style={styles.mainView}>
            <View style={styles.mainView} onStartShouldSetResponder={() => Keyboard.dismiss()}>
                <View style={{ marginTop: hp(15), width: wp(90), alignSelf: 'center' }}>
                    <View style={[styles.logo_View, { width: 64, alignSelf: 'center' }]}>
                        <Image style={{ height: 64, width: 64 }}
                            source={notifications_big}
                            resizeMode="contain">
                        </Image>
                        {
                            isNotificationEnable &&
                            <View style={{ backgroundColor: Colors.ORANGE, width: 14, height: 14, borderRadius: 7, position: 'absolute', right: 5, top: 3 }}></View>
                        }
                    </View>
                    <Text style={styles.social_textView}>
                        {Strings.OTP.NOTIFICATION_TEXT}
                    </Text>
                </View>
                <View style={styles.buttonView}>
                    <TouchableOpacity style={{ marginBottom: hp(10), flexDirection: 'row', alignItems: 'center', alignSelf: 'center', justifyContent: 'space-around' }}
                        onPress={() => setIsNotificationEnable(prev => !prev)}>
                        <Text textBreakStrategy={'simple'} style={styles.enableTextView}>
                            {'Enable Notifications'}
                        </Text>
                        <View style={{ marginLeft: '3%', alignItems: 'center', justifyContent: 'center', backgroundColor: isNotificationEnable ? Colors.ORANGE : 'transparent', width: 20, height: 20, borderRadius: wp(1), borderColor: isNotificationEnable ? Colors.ORANGE : Colors.WHITE, borderWidth: wp(.4) }}>
                            {isNotificationEnable && <Image style={{ height: 12, width: 12, alignSelf: 'center' }}
                                source={check_icon}
                                resizeMode="contain">
                            </Image>
                            }
                        </View>
                    </TouchableOpacity>
                    <View style={styles.circleBtn_View}>
                        <CircleButton
                            onPress={() => {
                                // props.navigation.goBack()
                                props.navigation.navigate('Home')
                            }}
                            buttonStyle={[styles.circleBtnBGView, { borderColor: Colors.ORANGE, backgroundColor: Colors.ORANGE }]}
                        />
                    </View>
                </View>
            </View>
            <Loading ref={loadingRef} />
        </ImageBackground >
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
        backgroundColor: Colors.PRIMARY_TRANSPARENT,
        flex: 1,
    },
    logo_View: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    enableTextView: {
        textAlign: 'left',
        marginLeft: wp(2),
        textAlignVertical: 'center',
        fontFamily: Fonts.FontFamily.Regular,
        fontSize: Fonts.FontSize.xxs,
        color: Colors.WHITE,
    },
    social_textView: {
        marginTop: hp(5),
        color: Colors.WHITE,
        fontFamily: Fonts.FontFamily.Bold,
        fontSize: Fonts.FontSize.sm,
        marginBottom: "10%",
        lineHeight: 30,
        textAlign: "center"
    },
    circleBtn_View: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    topText: {
        marginTop: hp(5),
        color: Colors.YELLOW,
        fontFamily: Fonts.FontFamily.Regular,
        fontSize: 24,
        fontWeight: '700',
        marginBottom: "10%",
        textAlign: "center"
    },
    buttonView: { width: wp(90), alignSelf: 'center', position: 'absolute', bottom: hp(12) },
    nextButton:
    {
        alignItems: 'center',
        borderRadius: hp(.8),
        alignContent: 'center',
        alignItems: 'center'
    },
    resendbuttontitle: {
        color: Colors.WHITE,
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: Fonts.FontSize.xxxs,
        fontFamily: Fonts.FontFamily.Regular,
        textDecorationColor: 'white', textDecorationLine: 'underline'

    },
    clickNotificationEnableView:
    {
        marginTop: wp(10),
        alignSelf: "center",
        width: "70%",
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center'
    },
    circleBtnBGView: { marginTop: '2%', alignSelf: "center" }
})

export default NotificationEnable;