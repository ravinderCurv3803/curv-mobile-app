import React, { Component, useState, useEffect, useRef } from "react";
import { View, StyleSheet, Text, ScrollView, Platform, Dimension, Keyboard, TouchableOpacity, ActivityIndicator, Image, TextInput, ImageBackground } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Container, Button } from "native-base";
import Loading from 'react-native-whc-loading';
import { SimpleButton, CircleButton, InputField, chooseImage, Countries, errorMessage, successMessage, } from '../../component'
import { Colors, Strings, Fonts } from '../../../src/utils'
import { bg_image, user_default, down_arrow, tick, bg } from '../../assets'
import OTPTextInput from 'react-native-otp-textinput';
import CountDown from 'react-native-countdown-component';
import { CREATEUSER_MUTATION, LOGIN_MUTATION } from '../../component/apis/GraphQL/Mutations';
import { useMutation } from '@apollo/client';
const Otp = (props) => {

    const loadingRef = useRef();
    const otpRef = useRef();
    const [otpText, setOtpText] = useState('')
    const [showCount, setShowCount] = useState(true)
    const [isResendEnable, setIsResendEnable] = useState(false)
    const [isCodeEnter, setIsCodeEnter] = useState(true)
    const routeParams = props?.route?.params?.response
    console.log('routeParams---->', routeParams)
    const [SignUpApi] = useMutation(CREATEUSER_MUTATION)

    useEffect(() => {

        setTimeout(() => {
            // otpRef?.current?.setValue("1234");
            // setOtpText('2346')
        }, 2000);
    }, [])


    const onVerifyAction = async () => {
        let variables = {
            input: {
                fullName: routeParams?.fullName,
                perfix: routeParams?.perfix,
                phone: routeParams?.phone,
                email: routeParams?.email,
                photo: routeParams?.photo,
                code: ''

            },
        }
        loadingRef?.current?.show()
        const res = await SignUpApi({
            variables
        }).catch(err => {
            loadingRef?.current?.close()
            console.log("error", err)
        })

        if (res) {
            loadingRef?.current?.close()
            __DEV__ && console.log('onVerifyAction---->,res', res)
            const { data } = res
            if (!data) {
                errorMessage("", error, 1400)
            } else {
                successMessage("", 'SignUp sucessfully', 1400)
                const { createUser } = data
                props.navigation.navigate('NotificationEnable')
            }
        } else {
            loadingRef?.current?.close()
            errorMessage("", 'Something went wrong!', 1400)
        }
    }

    const onResendOtpAction = async () => {
        let variables = {
            input: {
                fullName: routeParams?.fullName,
                perfix: routeParams?.perfix,
                phone: routeParams?.phone,
                email: routeParams?.email,
                photo: routeParams?.photo,

            },
        }
        loadingRef?.current?.show()
        const res = await SignUpApi({
            variables
        }).catch(err => console.log("error", err))
        if (res) {
            loadingRef?.current?.close()
            __DEV__ && console.log('variables---->,res', res)
            const { data } = res
            if (!data) {
                errorMessage("", error, 1400)
            } else {
                setShowCount(true)
                setIsResendEnable(false)
                successMessage("", `Verification sent sucessfully on ${routeParams?.prefix}${routeParams?.phone}`, 1400)
            }
        } else {
            loadingRef?.current?.close()
            errorMessage("", 'Something went wrong!', 1400)
        }
    }

    return (
        <View style={{ flex: 1, backgroundColor: Colors.PRIMARY }}>
            <ImageBackground source={bg} style={styles.mainView}>
                <View style={styles.mainView} onStartShouldSetResponder={() => Keyboard.dismiss()}>
                    <View style={{ marginTop: hp(10), width: wp(90), alignSelf: 'center' }}>
                        <Text style={styles.topText}>
                            {Strings.OTP.TOP_TEXT}
                        </Text>
                    </View>
                    <View style={styles.otpView}>
                        <OTPTextInput ref={otpRef}
                            containerStyle={{ alignSelf: 'center' }}
                            textInputStyle={{
                                color: Colors.WHITE, fontFamily: Fonts.FontFamily.Regular, fontWeight: '700', fontSize: 35, height: 50,
                                width: 50,
                                borderBottomWidth: 2,
                                textAlign: 'center',
                            }}
                            defaultValue={otpText}
                            tintColor={Colors.YELLOW}
                            offTintColor={Colors.YELLOW}
                            handleTextChange={(text) => {
                                setOtpText(text)
                                setIsCodeEnter(otpText < 4 ? false : true)
                            }}
                        />
                        {!isCodeEnter &&
                            <Text style={[styles.errorText, { width: '85%' }]}>{'Please provide OTP'}</Text>
                        }
                    </View>
                    <View style={{ marginTop: '1%', justifyContent: 'center', alignContent: 'center' }}>
                        {showCount ?
                            <CountDown
                                size={15}
                                until={120}
                                onFinish={() => {
                                    setShowCount(false)
                                    setIsResendEnable(true)
                                }}
                                digitStyle={{ backgroundColor: 'transparent', fontWeight: '400', fontFamily: Fonts.FontFamily.Regular, fontSize: 12 }}
                                digitTxtStyle={{ color: Colors.WHITE, fontWeight: '400', fontFamily: Fonts.FontFamily.Regular, fontSize: 12 }}
                                timeLabelStyle={{ color: 'red', fontWeight: 'normal', fontWeight: '400', fontFamily: Fonts.FontFamily.Regular, fontSize: 12 }}
                                separatorStyle={{ color: Colors.WHITE }}
                                timeToShow={['M', 'S']}
                                timeLabels={{ m: null, s: null }}
                                showSeparator
                            /> : null
                        }
                    </View>
                    <SimpleButton
                        disable={!isResendEnable}
                        onPress={() => {
                            onResendOtpAction()

                        }}
                        buttonStyle={[styles.nextButton, { marginTop: '2%', width: wp(40), alignSelf: "center" }]}
                        titleStyle={[styles.resendbuttontitle]}
                        title={Strings.OTP.RESENDTEXT}
                    />
                    <SimpleButton
                        onPress={() => { props.navigation.goBack() }}
                        buttonStyle={[styles.nextButton, { marginTop: '5%', width: wp(40), alignSelf: "center" }]}
                        titleStyle={[styles.backbuttontitle]}
                        title={Strings.OTP.GOBACK}
                    />
                    <View style={styles.buttonView}>
                        <View style={styles.circleBtn_View}>
                            <CircleButton
                                onPress={() => {
                                    if (otpText.length == 4) {
                                        onVerifyAction()
                                    } else {
                                        setIsCodeEnter(false)
                                    }
                                }}
                                buttonStyle={[styles.circleBtnBGView, { borderColor: otpText.length == 4 ? Colors.ORANGE : Colors.YELLOW, backgroundColor: otpText.length == 4 ? Colors.ORANGE : 'transparent' }]}
                            />
                        </View>
                    </View>
                </View>
                <Loading ref={loadingRef} backgroundColor='transparent' indicatorColor={Colors.YELLOW} easing={Loading.EasingType.ease} />
            </ImageBackground >
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
        flex: 1,
    },
    circleBtn_View: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    topText: {
        marginTop: hp(5),
        color: Colors.YELLOW,
        fontFamily: Fonts.FontFamily.Regular,
        fontWeight: '800',
        fontSize: 24,
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
    backbuttontitle: {
        color: Colors.WHITE,
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: 12,
        fontFamily: Fonts.FontFamily.Regular,
        fontWeight: '400'

    },
    otpView:
    {
        marginTop: wp(10),
        alignSelf: "center",
        width: "70%",
        justifyContent: 'center',
        alignItems: 'center'
    },
    circleBtnBGView: { marginTop: '2%', alignSelf: "center" },
    errorText: {
        color: Colors.ORANGE,
        width: '100%',
        alignSelf: 'center',
        fontWeight: '400',
        fontFamily: Fonts.FontFamily.Regular,
        fontSize: 12,
        marginTop: 2,
    },
})

export default Otp;