import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, Image, View } from 'react-native';
import { Button, Icon } from 'native-base';
import { Colors, Fonts } from '../../utils';
import { Countries } from '../../component'

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { tick, down_arrow } from '../../assets'
import ModalDropdown from '../../../node_libs/react-native-modal-dropdown';

const ModalDropDown = (props) => {
    let { isDropDownOpen, onDropdownWillHide, onDropdownWillShow, onSelect, countryCode, options } = props
    return (
        <ModalDropdown style={[styles.countryCodeView, { height: hp(4.2), backgroundColor: isDropDownOpen ? 'rgba(0,0,0,0.5)' : 'transparent' }]}
            dropdownStyle={[styles.countryDropDownView, { backgroundColor: Colors.PRIMARY, marginTop: 6, marginLeft: -2, height: 120 }]}
            options={options}
            defaultIndex={0}
            animated={true}
            defaultValue={options[0]}
            isFullWidth={true}
            accessible={true}
            textStyle={styles.countryCodeText}
            showsVerticalScrollIndicator={false}
            onDropdownWillShow={onDropdownWillShow && onDropdownWillShow}
            onDropdownWillHide={onDropdownWillHide && onDropdownWillHide}
            onSelect={onSelect && onSelect}
            renderRow={(option, index, isSelected) => (
                <View style={styles.countryRowItem}>
                    <Text style={styles.countryText}>
                        {option}</Text>
                    {
                        isSelected && <Image style={{ height: 16, width: 16, alignSelf: 'center' }}
                            source={tick}
                            resizeMode='contain'></Image>
                    }
                </View>
            )}
            renderSeparator={() => <View style={{ backgroundColor: Colors.PRIMARY_DARK, height: wp(.2) }}></View>}
        >
            <View style={[styles.countryCodeView, { borderBottomWidth: 0, width: '100%', height: hp(3) }]}>
                <Text numberOfLines={1} style={[styles.countryCodeText, { width: '80%' }]}>
                    {countryCode}</Text>
                <Image style={{ height: 14, width: 12, alignSelf: 'center', marginRight: '1%' }}
                    source={down_arrow}
                    resizeMode='contain'></Image>
            </View>
        </ModalDropdown>
    )
}


const styles = StyleSheet.create({
    countryCodeView: {
        borderBottomWidth: wp(.5),
        borderColor: Colors.YELLOW,
        flexDirection: 'row',
        alignItems: 'center',
        width: '38%',
        justifyContent: 'center'
    },
    countryDropDownView: {
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        borderColor: Colors.PRIMARY_TRANSPARENT,
        width: '32%'
    },
    countryCodeText: {
        color: Colors.WHITE,
        alignSelf: "center",
        fontSize: 13,
        fontWeight: '700',
        fontFamily: Fonts.FontFamily.Regular,
        height: null,
        textAlign: 'left',
        textAlignVertical: 'center',
    },
    countryRowItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: '5%',
        width: '100%',
        height: 40,
        paddingLeft: '15%',
        paddingRight: '10%'
    },
    countryText: {
        color: Colors.WHITE,
        fontFamily: Fonts.FontFamily.Regular,
        fontSize: 12,
        fontWeight: '700'
    }
});


export default ModalDropDown;