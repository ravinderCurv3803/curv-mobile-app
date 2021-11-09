import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { Button, Icon } from 'native-base';
import { Colors, Fonts } from '../../utils';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { app_logo, bg_image, btn_arrow } from '../../assets'


const BorderedButton = (props) => {
    let { buttonStyle, titleStyle, title, onPress } = props
    return (
        <TouchableOpacity
            onPress={onPress && onPress}
            style={[styles.button, buttonStyle]}>
            <Text style={[styles.buttontitle, titleStyle]}>
                {title}
            </Text>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    button: {
        width: wp(35),
        height: hp(4),
        borderWidth: wp(.4),
        borderColor: Colors.YELLOW,
        borderRadius: wp(1),
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttontitle: {
        width: null,
        color: Colors.YELLOW,
        fontFamily: Fonts.FontFamily.SemiBold,
        fontSize: Fonts.FontSize.xs,
        textAlign: 'center',
        textAlignVertical: 'center',

    },
});


export default BorderedButton;