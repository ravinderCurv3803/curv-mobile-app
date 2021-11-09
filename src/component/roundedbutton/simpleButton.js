import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Button, Icon } from 'native-base';
import { Colors, Fonts } from '../../utils';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const SimpleButton = (props) => {
    let { buttonStyle, titleStyle, title, onPress, iconRight, icon, disable } = props
    return (
        <TouchableOpacity
            disabled={disable && disable}
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
        width: wp(80),
        borderRadius: wp(5),
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttontitle: {
        width: null,
        color: Colors.WHITE,
        fontFamily: Fonts.FontFamily.Medium,
        fontSize: Fonts.FontSize.md,
        textAlign: 'center',
        textAlignVertical: 'center',

    },
});


export default SimpleButton;