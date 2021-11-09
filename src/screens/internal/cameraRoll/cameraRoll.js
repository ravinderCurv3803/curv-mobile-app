import React, { Component, useState, useEffect, useRef } from "react";
import { View, StyleSheet, Text, ScrollView, Platform, Dimension, Keyboard, TouchableOpacity, ActivityIndicator, Image, TextInput, ImageBackground } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Container, Button } from "native-base";
import Loading from 'react-native-whc-loading';
import { SimpleButton, BorderedButton, CircleButton, InputField, chooseImage, Countries, errorMessage, SafeContainer } from '../../../component'
import { Colors, Strings, Fonts } from '../../../../src/utils'
import { bg_image, user_default, down_arrow, tick } from '../../../assets'
import { Icon, Image as ImageRNE } from 'react-native-elements';
import CameraRoll from "@react-native-community/cameraroll";
import { SafeAreaView } from "react-native-safe-area-context";
const CameraRollScreen = (props) => {

    const loadingRef = useRef();
    const colors = ['tomato', 'thistle', 'skyblue', 'teal'];

    folderSelection = (name) => {
        if (name != "Gallery") {
            const fetchParams = {
                first: 25,
                groupName: 'Photos',
                groupTypes: 'Album',
                assetType: 'Photos',
                include: ['filename', 'imageSize'],
            };
            CameraRoll.getPhotos(fetchParams)
                .then(r =>
                    console.log('getPhotos---->', r)
                )
        } else {
            const fetchParams = {
                first: 25,
                assetType: 'All',
                include: ['filename', 'imageSize'],
            };
            CameraRoll.getPhotos(fetchParams)
                .then(r =>
                    console.log('getPhotos---->111', r)
                )
        }

    }

    return (
        <SafeContainer style={{ flex: 1, backgroundColor: Colors.PRIMARY }}>
            <View style={{ flex: 1, backgroundColor: Colors.PRIMARY }}>
                <SimpleButton
                    onPress={() => {
                        folderSelection('Gallery')
                    }}
                    buttonStyle={[styles.nextButton, { marginTop: '2%', width: wp(40), alignSelf: "center" }]}
                    titleStyle={[styles.buttontitle, {
                        fontSize: Fonts.FontSize.xxs,
                        fontFamily: Fonts.FontFamily.Bold
                    }]}
                    title={Strings.LOGIN.SIGNIN_BUTTON}
                />
            </View>
        </SafeContainer>
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
    child: { width: wp(100), height: hp(100), justifyContent: 'center' },
    text: { fontSize: 20, textAlign: 'center' },
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
        fontSize: Fonts.FontSize.xs,
        fontFamily: Fonts.FontFamily.ExtraBold,
        textAlign: 'center',
        textAlignVertical: 'center',

    },
})

export default CameraRollScreen;