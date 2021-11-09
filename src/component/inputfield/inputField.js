import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, ActivityIndicator, View } from 'react-native';
import { connect } from 'react-redux';
import { Icon, Input } from 'react-native-elements';

import { Colors, Fonts } from '../../utils';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
const inputField = (props) => {
    let { maxLength, defaultValue, keyboardType, inputStyleProp, inputTextStyleProp, editable,
        placeholderTextColor, placeholder, errorHeight, errorMessage, onChangeText, secureTextEntry,
        leftIconVisible, rightIconVisible, leftIconName, rightIconName, rightIconType, leftIconType, righticonColor, lefticonColor, onContentSizeChange,
        lefticonSize, onPressRightIcon, rightIconClickAble, label, labelStyle, multiline, numberOfLines, isLoaderEnable, onFocus, onBlur } = props
    return (
        <Input
            label={label && label}
            labelStyle={labelStyle && labelStyle}
            maxLength={maxLength && maxLength}
            defaultValue={defaultValue && defaultValue}
            containerStyle={inputStyleProp && inputStyleProp}
            inputContainerStyle={{ borderBottomWidth: 0 }}
            inputStyle={inputTextStyleProp && inputTextStyleProp}
            placeholderTextColor={placeholderTextColor}
            underlineColorAndroid="transparent"
            placeholder={placeholder}
            multiline={multiline && multiline}
            numberOfLines={numberOfLines && numberOfLines}
            errorStyle={{ height: errorHeight }}
            errorMessage={errorMessage && errorMessage}
            secureTextEntry={secureTextEntry}
            onChangeText={onChangeText}
            onFocus={onFocus}
            onBlur={onBlur}
            onContentSizeChange={onContentSizeChange}
            editable={editable && editable}
            keyboardType={keyboardType && keyboardType}
            autoCapitalize={keyboardType == "email-address" || secureTextEntry ? "none" : "sentences"}
            leftIcon={
                leftIconVisible &&
                <Icon
                    name={leftIconName}
                    type={leftIconType}
                    color={lefticonColor}
                    size={lefticonSize}
                    containerStyle={{ paddingLeft: wp(2) }}
                />
            }
            rightIcon={
                rightIconVisible &&
                <TouchableOpacity disabled={rightIconClickAble ? false : true} onPress={onPressRightIcon && onPressRightIcon}><Icon
                    name={rightIconName}
                    color={righticonColor}
                    size={lefticonSize}
                    containerStyle={{ paddingRight: wp(0) }}
                /></ TouchableOpacity>
            }
        />
    )
}

export default inputField