import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { Colors, Fonts } from '../../utils';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { app_logo, bg_image, btn_arrow } from '../../assets'


const CircleButton = (props) => {
    let { buttonStyle, title, onPress, type } = props
    return (
        <TouchableOpacity
            onPress={onPress && onPress}
            style={[styles.button, buttonStyle]}>
            {type == 'create' ?
                <Icon
                    name={'pluscircleo'}
                    type={'antdesign'}
                    size={30}
                    color={Colors.WHITE}
                    onPress={() => { }}
                /> : <Image source={btn_arrow}>
                </Image>
            }

        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    button: {
        width: wp(16),
        aspectRatio: 1,
        borderWidth: wp(.4),
        borderColor: Colors.YELLOW,
        borderRadius: wp(10),
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


export default CircleButton;