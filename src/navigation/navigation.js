import React from 'react'
import { createStackNavigator, CardStyleInterpolators, TransitionPresets } from '@react-navigation/stack'
import { SafeAreaProvider } from 'react-native-safe-area-context';
const TransitionScreenOptions = {
    ...TransitionPresets.SlideFromRightIOS, // This is where the transition happens
    headerShown: false
};
import { Splash, Initial, Login, SignUp, Otp, NotificationEnable, Home, CameraRollScreen } from '../screens'
const Stack = createStackNavigator()

export default navigation = () => {
    return <Stack.Navigator
        headerMode='none'
        screenOptions={{
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
        }}
    >
        <Stack.Screen name='Splash' component={Splash} />
        <Stack.Screen name='Initial' component={Initial} />
        <Stack.Screen name='SignUp' component={SignUp} />
        <Stack.Screen name='Login' component={Login} />
        <Stack.Screen name='Otp' component={Otp} />
        <Stack.Screen name='NotificationEnable' component={NotificationEnable} />
        <Stack.Screen name='Home' component={Home} />
        <Stack.Screen name='CameraRollScreen' component={CameraRollScreen} />
    </Stack.Navigator>
}



