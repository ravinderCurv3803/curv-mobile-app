import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from '../../utils';


const SafeContainer = (props) => {
    return (
        <SafeAreaView style={[props.style, { flex: 1, backgroundColor: Colors.PRIMARY }]}>
            {props.children}
        </SafeAreaView>
    )
}

export default SafeContainer;