import React from 'react'
import { View, Text } from 'react-native'
import { BaseToast } from 'react-native-toast-message'
import { Colors, Fonts } from '../utils'

export const ToastConfig = {
  success: ({ text1, text2, ...props }) => (
    <BaseToast
      text1Style={{
        fontFamily: Fonts.FontFamily.Medium,
        fontSize: 16,
        color: Colors.GREEN,
        letterSpacing: .7
      }}
      text2Style={{
        fontFamily: Fonts.FontFamily.regular,
        fontSize: 13
      }}
      text1={text1}
      text2={text2}
      style={{
        borderLeftColor: Colors.GREEN,
      }}
      contentContainerStyle={{
        paddingLeft: '5%'
      }}
      {...props}
    />
  ),
  error: ({ text1, text2, ...props }) => (
    <BaseToast
      text1Style={{
        fontFamily: Fonts.FontFamily.Medium,
        fontSize: 16,
        color: 'red',
        letterSpacing: .7
      }}
      text2Style={{
        fontFamily: Fonts.FontFamily.regular,
        fontSize: 13
      }}
      text1={text1}
      text2={text2}
      style={{
        borderLeftColor: 'red'
      }}
      contentContainerStyle={{
        paddingLeft: '5%'
      }}
      {...props}
    />
  ),
  info: ({ text1, text2, ...props }) => (
    <BaseToast
      text1Style={{
        fontFamily: Fonts.FontFamily.Medium,
        fontSize: 16,
        color: 'red',
        letterSpacing: .7
      }}
      text2Style={{
        fontFamily: Fonts.FontFamily.regular,
        fontSize: 13
      }}
      text1={text1}
      text2={text2}
      style={{
        borderLeftColor: 'red',
        backgroundColor: "black"
      }}
      contentContainerStyle={{
        paddingLeft: '5%'
      }}
      {...props}
    />
  ),
}