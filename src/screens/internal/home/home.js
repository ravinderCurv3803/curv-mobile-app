import React, { Component, useState, useEffect, useRef } from "react";
import { View, StyleSheet, Text, ScrollView, Platform, Dimension, Keyboard, TouchableOpacity, ActivityIndicator, Image, TextInput, ImageBackground } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Container, Button } from "native-base";
import Loading from 'react-native-whc-loading';
import { BorderedButton, CircleButton, InputField, chooseImage, Countries, errorMessage, } from '../../../component'
import { Colors, Strings, Fonts } from '../../../../src/utils'
import { bg_image, user_default, down_arrow, tick, feed_2, feed_1 } from '../../../assets'
import { Icon, Image as ImageRNE } from 'react-native-elements';
import { SwiperFlatList } from '../../../../node_libs/react-native-swiper-flatlist';
import LinearGradient from 'react-native-linear-gradient';
import MediaControls, { PLAYER_STATES } from 'react-native-media-controls';

import { FeedImage, FeedVideo } from './components'
import strings from "../../../utils/strings";

const Home = (props) => {

    const loadingRef = useRef();
    const [isFetching, setIsFetching] = useState(false)
    const feedList = [{ name: 'tomato', icon: feed_2, type: 'image' }, { name: 'thistle', icon: require('../../../assets/videos/splashVideo.mp4'), type: 'video' },
    { name: 'thistle', icon: feed_1, type: 'image' }];
    const [currentIndex, setCurrentIndex] = useState(0)
    const [prevIndex, setPrevIndex] = useState(0)



    const renderFeedsItem = ({ item, index }) => {
        return (
            <View style={[styles.listView]}>
                {
                    item?.type == 'image' ? <FeedImage src={item?.icon} />
                        : <FeedVideo src={currentIndex == index && item?.icon} currentIndex={currentIndex} index={index} />
                }
                <LinearGradient
                    colors={['rgba(0,0,0,0.9)', 'rgba(0,0,0,0.6)', 'rgba(0,0,0,0.0)']}
                    end={{ x: 0.0, y: 1.0 }}
                    start={{ x: 0.0, y: 0.0 }}
                    style={styles.topShadow} />
                <LinearGradient
                    colors={['rgba(0,0,0,0.0)', 'rgba(0,0,0,0.6)', 'rgba(0,0,0,0.9)']}
                    end={{ x: 0.0, y: 1.0 }}
                    start={{ x: 0.0, y: 0.0 }}
                    style={styles.bottomShadow} />
                <View style={{ position: 'absolute', bottom: '12%', paddingBottom: '2%', width: wp(100), justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity style={{ width: wp(16), marginBottom: '2%', borderRadius: wp(10), aspectRatio: 1, backgroundColor: 'green', justifyContent: 'center', alignItems: 'center' }}>
                        <Image></Image>
                    </TouchableOpacity>
                    <Text style={{ marginTop: '1%', color: Colors.WHITE, fontSize: 18, fontFamily: Fonts.FontFamily.Regular, fontWeight: '700' }}>LIFE BELOW SEA</Text>
                    <Text style={{ marginTop: '1%', color: Colors.WHITE, fontSize: 14, fontFamily: Fonts.FontFamily.Regular, fontWeight: '400' }}>#Food | #Nature | #ClimateAction</Text>
                </View>
            </View>
        )
    }

    const onRefresh = () => {
        setTimeout(() => {
            setIsFetching(false)
        }, 3000);
    }


    return (
        <View style={{ flex: 1, backgroundColor: Colors.BLACK }}>
            <SwiperFlatList
                index={0}
                vertical={true}
                data={feedList}
                onChangeIndex={(item) => {
                    console.log('onChangeIndex--->', item)
                    setCurrentIndex(item?.index)
                    setPrevIndex(item?.prevIndex)
                }}
                onMomentumScrollEnd={(item) => {
                    console.log('onMomentumScrollEnd--->', item)
                    setCurrentIndex(item?.index)
                }}
                renderItem={renderFeedsItem}
                onRefresh={() => onRefresh}
                isRefreshing={isFetching}
                listEmptyComponent={() => (
                    <View style={{ backgroundColor: Colors.BLACK, width: wp(100), height: hp(100), justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: Colors.WHITE, fontFamily: Fonts.FontFamily.MediumItalic, fontSize: Fonts.FontSize.sm }}>No records found</Text>
                    </View>
                )}
            />
            {/* <LinearGradient
                colors={['rgba(0,0,0,0.9)', 'rgba(0,0,0,0.6)', 'rgba(0,0,0,0.0)']}
                end={{ x: 0.0, y: 1.0 }}
                start={{ x: 0.0, y: 0.0 }}
                style={styles.topShadow} /> */}
            <TouchableOpacity style={styles.discoverBtn}>
                <Text style={styles.discoverBtnText}>{strings.Home.Discover}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.discoverBtn, { left: null, backgroundColor: null, right: '5%', width: wp(10) }]}>
                <Icon
                    name={'user'}
                    type={'evilicon'}
                    size={40}
                    color={Colors.WHITE}
                />
            </TouchableOpacity>
            {/* <LinearGradient
                colors={['rgba(0,0,0,0.0)', 'rgba(0,0,0,0.6)', 'rgba(0,0,0,0.9)']}
                end={{ x: 0.0, y: 1.0 }}
                start={{ x: 0.0, y: 0.0 }}
                style={styles.bottomShadow} /> */}
            <View style={styles.circleBtn_View}>
                <CircleButton type={'create'}
                    onPress={() => {
                        props.navigation.navigate('Home')
                    }}
                    buttonStyle={[styles.circleBtnBGView, { width: wp(15), borderColor: Colors.ORANGE, backgroundColor: Colors.ORANGE }]}
                />
            </View>
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
        backgroundColor: Colors.PRIMARY_TRANSPARENT,
        flex: 1,
    },
    listView: {
        width: wp(100),
        height: hp(100),
        justifyContent: 'center'
    },
    circleBtn_View: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: '3%',
        left: wp(100) / 2 - wp(15) / 2
    },
    circleBtnBGView: {
        marginTop: '2%',
        alignSelf: "center"
    },
    topShadow: {
        flexDirection: 'column',
        justifyContent: 'flex-end',
        minHeight: hp(15),
        left: 0,
        top: 0,
        position: 'absolute',
        right: 0,
        height: hp(15)
    },
    bottomShadow: {
        flexDirection: 'column',
        justifyContent: 'flex-end',
        minHeight: hp(25),
        left: 0,
        bottom: 0,
        position: 'absolute',
        right: 0,
        height: hp(25)
    },
    discoverBtn: {
        borderRadius: wp(2),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.PRIMARY,
        paddingVertical: '1%',
        paddingHorizontal: '2.5%',
        position: 'absolute',
        top: '6%',
        left: '5%'
    },
    discoverBtnText: {
        color: Colors.WHITE,
        textAlign: 'center',
        fontSize: 14,
        fontWeight: '700',
        fontFamily:
            Fonts.FontFamily.Bold
    }
})

export default Home;