import React, { Component, useState, useEffect, useRef } from "react";
import { View, StyleSheet, Text, ScrollView, Platform, Dimension, Keyboard, TouchableOpacity, ActivityIndicator, Image, TextInput, ImageBackground } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Container, Button } from "native-base";
import Loading from 'react-native-whc-loading';
import { BorderedButton, CircleButton, InputField, chooseImage, Countries, successMessage, errorMessage, ModalDropDown, getAsyncStorgaeValue } from '../../component'
import { Colors, Strings, Fonts } from '../../../src/utils'
import { bg_image, user_default, down_arrow, tick, bg } from '../../assets'
import { Icon, Image as ImageRNE } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { CREATEUSER_MUTATION, LOGIN_MUTATION } from '../../component/apis/GraphQL/Mutations';
import { useMutation } from '@apollo/client';
import LinearGradient from 'react-native-linear-gradient';

const SignUp = (props) => {

    const loadingRef = useRef();
    const [isFirstRender, setFirstRender] = useState(true)
    const [countryCode, setCountryCode] = useState('+44 (UK)')
    const [firstName, setFirstName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [profileImage, setProfileImage] = useState('')
    const [profileImageData, setProfileImageData] = useState('')
    const [isScrolling, setIsScrolling] = useState(false)
    const [isDropDownOpen, setIsDropDownOpen] = useState(false)
    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

    const [signUpApi] = useMutation(CREATEUSER_MUTATION)

    const validationSchema = Yup.object().shape({
        firstName: Yup.string()
            .label('First Name')
            .required('Provide Your Full Name.'),
        phone: Yup.string()
            .label('Phone')
            .required('Provide Your Mobile Number.')
            .matches(phoneRegExp, 'Phone number is not valid.')
            .min(10, "to short")
            .max(10, "to long"),
        email: Yup.string().email('Please enter a valid email.')
            .required('Provide Your Email.')
    })


    const chooseMediaImage = () => {
        chooseImage().then((response) => {
            console.log('response', response)
            const { path, mime, filename } = response
            let imageName = filename?.split('.')[0]
            const data = { uri: path, name: imageName + '.' + mime?.split('/')[1], type: mime }
            setProfileImage(path)
            setProfileImageData(data)
        }).catch((err) => console.log('errror', err))
    }

    const onSubmit = async ({ firstName, phone, email }) => {
        let params = {
            input: {
                fullName: firstName,
                perfix: countryCode?.split(' ')[0],
                phone: phone,
                email: email,
                photo: profileImage,
            },
        }
        __DEV__ && console.log('params---->,res', params)
        loadingRef?.current?.show()
        await signUpApi({ params }).then((res) => {
            if (res) {
                loadingRef?.current?.close()
                __DEV__ && console.log('signUpApi---->,res', res)
                const { data } = res
                if (!data) {
                    errorMessage("", 'error', 1400)
                } else {
                    successMessage("", `Verification sent sucessfully on ${countryCode?.split(' ')[0]}${phone}`, 1400)
                    const { createUser } = data
                    props.navigation.navigate('Otp', { response: createUser })
                }
            } else {
                loadingRef?.current?.close()
                errorMessage("", 'Something went wrong!', 1400)
            }
        }).catch(err => {
            console.log("error", err)
            loadingRef?.current?.close()
            errorMessage("", 'Something went wrong!', 1400)
        })
    }


    return (
        <View style={{ flex: 1, backgroundColor: Colors.PRIMARY }}>
            <ImageBackground source={bg} style={styles.mainView}>
                <View style={styles.mainView} onStartShouldSetResponder={() => {
                    setIsScrolling(false)
                    Keyboard.dismiss()
                }}>
                    <View style={styles.imageView}>
                        <ImageRNE resizeMode="cover"
                            source={profileImage === "" || profileImage == "NA" ? user_default : { uri: profileImage }}
                            style={{ height: wp(28), aspectRatio: 1, borderRadius: wp(30) / 2 }}
                            placeholderStyle={{ backgroundColor: '#CBDCE8', }}
                            PlaceholderContent={<ActivityIndicator color={Colors.YELLOW} />}
                        />
                        <BorderedButton
                            onPress={chooseMediaImage}
                            buttonStyle={[styles.nextButton, { alignSelf: "center", marginTop: '3%' }]}
                            title={'CHANGE PHOTO'}
                            titleStyle={[styles.buttontitle, {
                                fontSize: 11,
                                fontFamily: Fonts.FontFamily.Regular,
                                fontWeight: '700'
                            }]}
                        />
                    </View>
                    <KeyboardAwareScrollView scrollEnabled={isScrolling} showsVerticalScrollIndicator={false}
                        keyboardShouldPersistTaps={'handled'} contentContainerStyle={{ flex: 1 }}>
                        <Formik
                            enableReinitialize
                            initialValues={{
                                firstName: firstName,
                                phone: phone,
                                email: email
                            }}
                            onSubmit={onSubmit}
                            validationSchema={validationSchema}
                        >
                            {({ handleSubmit, handleChange, setFieldValue, handleBlur, setErrors, setTouched, values, errors, isValid, touched, isValidating }) =>
                                <View style={styles.formikStyle}>
                                    <View style={{ flex: 1, alignItems: 'center', alignSelf: 'center', width: '100%' }}>
                                        <View style={{ width: '85%' }}>
                                            <InputField
                                                label={'Full Name'}
                                                labelStyle={styles.input_labelStyle}
                                                editable={true}
                                                defaultValue={values.firstName}
                                                inputStyleProp={styles.input}
                                                inputTextStyleProp={styles.inputtext}
                                                onChangeText={(text) => {
                                                    setFirstRender(false)
                                                    setFieldValue('firstName', text)
                                                }}
                                                keyboardType={'default'}
                                                onBlur={
                                                    handleBlur('firstName')
                                                }
                                                onFocus={() => setIsScrolling(true)}
                                            />
                                            {(errors.firstName && touched.firstName) &&
                                                <Text style={styles.errorText}>{errors.firstName}</Text>
                                            }
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
                                                        }}
                                                    />
                                                    <View style={{ height: hp(5), width: '55%' }}>
                                                        <InputField
                                                            editable={true}
                                                            defaultValue={values.phone}
                                                            inputStyleProp={[styles.input, {
                                                                borderBottomWidth: wp(.5),
                                                                borderColor: Colors.YELLOW, height: hp(4.2),
                                                            }]}
                                                            inputTextStyleProp={[styles.inputtext, {
                                                                borderBottomWidth: 0,
                                                                borderColor: Colors.YELLOW, height: hp(4)
                                                            }]}
                                                            onChangeText={(text) => {
                                                                setFirstRender(false)
                                                                setFieldValue('phone', text)
                                                            }}
                                                            keyboardType={'phone-pad'}
                                                            maxLength={10}
                                                            onBlur={handleBlur('phone')}
                                                            onFocus={() => setIsScrolling(true)}
                                                        />
                                                        {(errors.phone && touched.phone) &&
                                                            <Text style={[styles.errorText, { width: '100%', marginTop: '2%' }]}>{errors.phone}</Text>
                                                        }
                                                    </View>
                                                </View>
                                            </View>
                                            <InputField
                                                label={'Email'}
                                                labelStyle={styles.input_labelStyle}
                                                editable={true}
                                                defaultValue={values.email}
                                                inputStyleProp={[styles.input]}
                                                inputTextStyleProp={styles.inputtext}
                                                keyboardType={'email-address'}
                                                onFocus={() => setIsScrolling(true)}
                                                onBlur={handleBlur('email')}
                                                onChangeText={(text) => {
                                                    setFirstRender(false)
                                                    setFieldValue('email', text)
                                                }}
                                            />
                                            {(errors.email && touched.email) &&
                                                <Text style={styles.errorText}>{errors.email}</Text>
                                            }
                                        </View>

                                    </View>
                                    <View style={[styles.buttonView]}>
                                        <View style={styles.logo_View}>
                                            <CircleButton
                                                onPress={!isFirstRender && isValid ? handleSubmit : () => {
                                                    setErrors({
                                                        firstName: 'Provide Your Full Name.',
                                                        phone: 'Provide Your Mobile Number.',
                                                        email: 'Provide Your Email.'
                                                    })
                                                    setTouched({
                                                        firstName: values.firstName.length > 0 ? false : true,
                                                        phone: values.phone.length > 0 ? false : true,
                                                        email: values.email.length > 0 ? false : true
                                                    })
                                                }}
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
    buttonView: {
        width: wp(90),
        alignSelf: 'center',
        marginBottom: hp(12)
    },
    nextButton:
    {
        alignItems: 'center',
        borderRadius: hp(.8),
        alignContent: 'center',
        alignItems: 'center'
    },
    formikStyle: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        alignSelf: 'center',
        width: '100%'
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
        height: hp(8),
        alignItems: 'center'

    },
    inputtext: {
        width: '100%',
        height: hp(3.8),
        color: Colors.WHITE,
        fontSize: 15,
        fontFamily: Fonts.FontFamily.Regular,
        fontWeight: '700',
        textAlign: 'left',
        textAlignVertical: 'center',
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
        alignSelf: "center",
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
        paddingBottom: hp(4),
        marginTop: hp(11),
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
        paddingLeft: '1%',
        alignSelf: 'center',
        fontFamily: Fonts.FontFamily.Regular,
        fontSize: Fonts.FontSize.bs,
        marginTop: 2
    },
    countryRowItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: '5%',
        width: '100%',
        height: 50,
        paddingHorizontal: 5
    },
    countryText: {
        color: Colors.WHITE,
        fontFamily: Fonts.FontFamily.Bold,
        fontSize: Fonts.FontSize.xxxs
    },
    dropdown: {
        backgroundColor: 'white',
        borderBottomColor: 'gray',
        borderBottomWidth: 0.5,
        marginTop: 20,
    },
    dropdown2: {
        backgroundColor: 'white',
        borderColor: 'gray',
        borderWidth: 0.5,
        marginTop: 20,
        padding: 8,
    },
    icon: {
        marginRight: 5,
        width: 18,
        height: 18,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    textItem: {
        flex: 1,
        fontSize: 16,
    },
})

export default SignUp;