/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from 'react';
import { LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { NativeBaseProvider } from 'native-base';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import Toast from 'react-native-toast-message';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { newLink, ToastConfig, StateProvider, reducer, initialState, Navigation } from './src'
console.disableYellowBox = true;

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: newLink
})

const App = () => {
  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, [])
  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      <ApolloProvider client={client}>
        {/* <SafeAreaView style={CommonStyles.rootContainer} forceInset={{ top: 'never' }}> */}
        <SafeAreaProvider>
          <StatusBar barStyle={'light-content'} />
          <NavigationContainer>
            <NativeBaseProvider>
              <Navigation />
            </NativeBaseProvider>
          </NavigationContainer>
        </SafeAreaProvider>
        <Toast ref={ref => Toast.setRef(ref)} config={ToastConfig} />
        {/* </SafeAreaView> */}
      </ApolloProvider>
    </StateProvider>
  );
};


export default App;
