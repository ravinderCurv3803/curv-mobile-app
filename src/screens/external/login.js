import React, { Component, useState, useEffect, useRef } from "react";
import { View, StyleSheet, Text, ScrollView, Platform, Dimension, Keyboard, TouchableOpacity, ActivityIndicator, Image, TextInput, ImageBackground } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Container, Button } from "native-base";
import Loading from 'react-native-whc-loading';
import { BorderedButton, CircleButton, InputField, chooseImage, Countries, errorMessage, ModalDropDown } from '../../component'
import { Colors, Strings, Fonts } from '../../../src/utils'
import { bg_image, user_default, down_arrow, tick, bg } from '../../assets'
import { Icon, Image as ImageRNE } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'
import ModalDropdown from 'react-native-modal-dropdown';
import { Formik } from 'formik'
import * as Yup from 'yup'
import { CREATEUSER_MUTATION, LOGIN_MUTATION } from '../../component/apis/GraphQL/Mutations';
import { useMutation } from '@apollo/client';
const Login = (props) => {

    const loadingRef = useRef();
    const [isFirstRender, setFirstRender] = useState(true)

    const [countryCode, setCountryCode] = useState('+44 (UK)')
    const [phone, setPhone] = useState('')
    const [isScrolling, setIsScrolling] = useState(false)
    const [isDropDownOpen, setIsDropDownOpen] = useState(false)
    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
    const [loginApi] = useMutation(LOGIN_MUTATION)

    const validationSchema = Yup.object().shape({
        phone: Yup.string()
            .label('Phone')
            .required()
            .matches(phoneRegExp, 'Phone number is not valid')
            .min(10, "to short")
            .max(10, "to long"),
    })


    const chooseMediaImage = () => {
        chooseImage().then((response) => {
            console.log('response', response)
            const { path, mime, filename } = response
            let imageName = filename.split('.')[0]
            const data = { uri: path, name: imageName + '.' + mime.split('/')[1], type: mime }
            setProfileImage(path)
            setProfileImageData(data)
        }).catch((err) => console.log('errror', err))
    }

    const onSubmit = async ({ phone }) => {
        let variables = {
            input: {
                phone: phone,
            }
        }
        loadingRef?.current?.show()
        const res = await loginApi({
            variables
        }).catch(err => console.log("error", err))
        if (res) {
            loadingRef?.current?.close()
            __DEV__ && console.log('variables---->,res', res)
            // const { error, data, token } = res.data.changePassword
            // if (!data) {
            //     errorMessage("", error, 1400)
            // } else {
            // }
        } else {
            loadingRef?.current?.close()
            errorMessage("", 'Something went wrong!', 1400)
        }
    }

    return (
        <View style={{ flex: 1, backgroundColor: Colors.PRIMARY }}>
            <ImageBackground source={bg} style={{ flex: 1 }}>
                <View style={styles.mainView} onStartShouldSetResponder={() => {
                    setIsScrolling(false),
                        Keyboard.dismiss()
                }}>
                    <View style={{ marginTop: hp(15), width: wp(90), alignSelf: 'center' }}>
                        <Text style={styles.topText}>
                            {Strings.LOGIN.LOGINTOP_TEXT}
                        </Text>
                    </View>
                    <KeyboardAwareScrollView scrollEnabled={isScrolling} showsVerticalScrollIndicator={false}
                        keyboardShouldPersistTaps={'handled'} contentContainerStyle={{ flex: 1 }}>
                        <Formik
                            enableReinitialize
                            initialValues={{
                                phone: phone,
                            }}
                            onSubmit={onSubmit}
                            validationSchema={validationSchema}
                        >
                            {({ handleSubmit, handleChange, setFieldValue, setTouched, setErrors, handleBlur, values, errors, isValid, touched, isValidating }) => <View style={{ flex: 1, width: '100%', alignItems: 'center', alignSelf: 'center', width: '100%' }}>
                                <View style={{ marginTop: wp(1), flex: 1, alignItems: 'center', alignSelf: 'center', width: '100%' }}>
                                    <View style={{ width: '85%' }}>

                                        <View style={styles.innerSubView} >
                                            <Text style={styles.input_labelStyle}>{'Number'}</Text>
                                            <View style={styles.numberView}>
                                                <ModalDropDown
                                                    options={Countries}
                                                    countryCode={countryCode}
                                                    onSelect={(index, option) => {
                                                        setCountryCode(option)
                                                    }}
                                                    isDropDownOpen={isDropDownOpen}
                                                    onDropdownWillShow={() => {
                                                        setIsDropDownOpen(true)
                                                    }}
                                                    onDropdownWillHide={() => {
                                                        setIsDropDownOpen(false)
                                                    }} />
                                                <View style={{ height: hp(5), width: '55%' }}>
                                                    <InputField
                                                        editable={true}
                                                        defaultValue={values.phone}
                                                        inputStyleProp={[styles.input, {
                                                            borderBottomWidth: wp(.5),
                                                            borderColor: Colors.YELLOW, height: hp(4.2),
                                                        }]}
                                                        inputTextStyleProp={[styles.inputtext, {
                                                            borderBottomWidth: 0, height: hp(4),
                                                            borderColor: Colors.YELLOW
                                                        }]}
                                                        onChangeText={(text) => {
                                                            setFirstRender(false)
                                                            setFieldValue('phone', text)
                                                        }}
                                                        keyboardType={'phone-pad'}
                                                        maxLength={10}
                                                        onBlur={
                                                            handleBlur('phone')

                                                        }
                                                        onFocus={() => setIsScrolling(true)}
                                                    />
                                                    {(errors.phone && touched.phone) &&
                                                        <Text style={[styles.errorText, { width: '100%', }]}>{errors.phone}</Text>
                                                    }
                                                </View>
                                            </View>
                                        </View>

                                    </View>
                                </View>
                                <View style={[styles.buttonView]}>
                                    <View style={styles.logo_View}>
                                        <CircleButton
                                            onPress={!isFirstRender && isValid ? handleSubmit : () => {
                                                console.log('isValid--->', isValid, isFirstRender)
                                                setErrors({
                                                    phone: 'Provide Your Mobile Number.',
                                                })
                                                setTouched({
                                                    phone: values.phone.length > 0 ? false : true,
                                                })
                                            }}
                                            // onPress={() => {
                                            //     props.navigation.navigate('Otp')
                                            // }}
                                            buttonStyle={{ marginTop: '2%', alignSelf: "center", borderColor: !isFirstRender && isValid ? Colors.ORANGE : Colors.YELLOW, backgroundColor: !isFirstRender && isValid ? Colors.ORANGE : 'transparent' }}
                                        />
                                    </View>
                                </View>
                            </View>
                            }
                        </Formik>
                    </KeyboardAwareScrollView>
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
    logo_View: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonView: { width: wp(90), alignSelf: 'center', position: 'absolute', bottom: hp(12) },
    nextButton:
    {
        alignItems: 'center',
        borderRadius: hp(.8),
        alignContent: 'center',
        alignItems: 'center'
    },
    buttontitle: {
        color: Colors.YELLOW,
        fontSize: Fonts.FontSize.xs,
        fontFamily: Fonts.FontFamily.SemiBold,
        textAlign: 'center',
        textAlignVertical: 'center',

    },
    input: {
        width: '100%',
        height: hp(7),
        alignItems: 'center'

    },
    inputtext: {
        width: '100%',
        color: Colors.WHITE,
        fontSize: 15,
        fontFamily: Fonts.FontFamily.Regular,
        fontWeight: '700',
        textAlign: 'left',
        textAlignVertical: 'center',
        overflow: 'hidden',
        alignItems: 'center',
        borderBottomWidth: wp(.5),
        borderColor: Colors.YELLOW,
    },
    innerSubView:
    {
        marginVertical: hp(3),
        justifyContent: 'space-between',
        width: '95%',
        height: hp(8),
        alignContent: 'center',
        alignSelf: "center"
    },
    textInputStyle:
    {
        fontSize: Fonts.FontSize.md,
        paddingHorizontal: wp(1),
        color: Colors.BLACK,
        alignSelf: "center",
        height: '100%',
        width: "60%", alignSelf: 'center'
    },
    input_labelStyle: {
        color: Colors.WHITE,
        alignSelf: 'flex-start',
        fontFamily: Fonts.FontFamily.Regular,
        fontWeight: '400',
        fontSize: 16
    },
    numberView: {
        marginTop: hp(0.5),
        flexDirection: "row",
        width: '100%',
        justifyContent: 'space-between'
    },
    imageView: {
        paddingBottom: hp(5),
        marginTop: hp(10),
        width: wp(90),
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    countryCodeView: {
        borderBottomWidth: wp(.5),
        borderColor: Colors.YELLOW,
        flexDirection: 'row',
        alignItems: 'center',
        width: '35%',
        justifyContent: 'center'
    },
    countryDropDownView: {

        borderColor: Colors.PRIMARY_TRANSPARENT,
        width: '30%'
    },
    countryCodeText: {
        color: Colors.WHITE,
        alignSelf: "center",
        fontSize: Fonts.FontSize.xxs,
        fontFamily: Fonts.FontFamily.SemiBold,
        height: null,
        textAlign: 'left',
        textAlignVertical: 'center',
    },
    errorText: {
        color: Colors.ORANGE,
        width: '95%',
        alignSelf: 'center',
        fontFamily: Fonts.FontFamily.Regular,
        fontSize: Fonts.FontSize.bs,
        marginTop: 2
    },
    topText: {
        color: Colors.YELLOW,
        fontFamily: Fonts.FontFamily.Regular,
        fontSize: 24,
        marginBottom: "10%",
        textAlign: "center",
        fontWeight: '800'
    },
})

export default Login;