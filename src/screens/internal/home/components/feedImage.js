import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from '../../../../utils';
import LinearGradient from 'react-native-linear-gradient';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


const FeedImage = (props) => {
    let { src } = props
    return (
        <Image source={src} style={{ width: '100%', height: '100%' }}></Image>
        // <LinearGradient
        //     colors={['rgba(0,0,0,0.0)', 'rgba(0,0,0,0.6)', 'rgba(0,0,0,0.9)']}
        //     end={{ x: 0.0, y: 1.0 }}
        //     start={{ x: 0.0, y: 0.0 }}
        //     style={styles.bottomShadow} />



    )
}
const styles = StyleSheet.create({
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
})

export default FeedImage;