import React, {ReactNode} from 'react';
import {ViewStyle, TextStyle, ImageStyle, Dimensions} from 'react-native';
import {
  ThemeProvider as ReStyleThemeProvider,
  createText,
  createBox,
  useTheme as useReTheme,
} from '@shopify/restyle';

const {width, height} = Dimensions.get('window');

export const aspectRatio = width / 375;

export const palette = {
  green: '#2CB9B0',
  orange: '#FE5E33',
  yellow: '#FFC641',
  pink: '#FF87A2',
  violet: '#442CB9',
  lightBlue: '#BFEAF5',
  primary: '#F96D41',
  secondary: '#25282F',
  black: '#1E1B26',
  white: '#FFFFFF',
  lightGray: '#64676D',
  lightGray2: '#EFEFF0',
  lightGray3: '#D4D5D6',
  lightGray4: '#7D7E84',
  gray: '#2D3038',
  gray1: '#282C35',
  darkRed: '#31262F',
  lightRed: '#C5505E',
  darkBlue: '#22273B',
  lightPurple: '#424BAF',
  darkGreen: '#213432',
  lightGreen: '#31Ad66',
  blueBackground: '#16224E',
  primaryLight: '#E7F9F7',
  danger: '#FF0058',
  info: '#808080',
  background: '#F6F6F6',
  text: 'rgba(12, 13, 52, 0.7)',
};

export const Size = {
  paddings: {
    s: 8,
    m: 16,
    l: 24,
    xl: 32,
    xxl: 40,
  },

  fontSize: {
    largeTitle: 80,
    h1Title: 30,
    h2Title: 22,
    h3Title: 16,
    h4Title: 14,
    body1: 30,
    body2: 20,
    body3: 16,
    body4: 14,
  },
  globalSizes: {
    base: 8,
    font: 14,
    radius: 12,
    padding: 24,
    padding2: 36,
  },
  appDimensions: {
    width,
    height,
  },
  lineHeight: {
    s: 8,
    m: 16,
    l: 24,
    xl: 30,
    xxl: 80,
  },
};

const theme = {
  colors: {
    primary: palette.green,
    primaryLight: palette.primaryLight,
    secondary: palette.secondary,
    danger: palette.danger,
    info: palette.info,
    edit: palette.lightBlue,
    text: palette.text,
    textContrast: palette.white,
    background: palette.background,
    background2: palette.blueBackground,
    graph1: palette.orange,
    graph2: palette.yellow,
    drawer1: palette.orange,
    drawer2: palette.yellow,
    drawer3: palette.pink,
    drawer4: palette.violet,
    white: palette.white,
    grayFont: palette.gray,
    lightGray: palette.lightGray,
    lightRd: palette.lightRed,
  },
  spacing: {
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
  },
  borderRadii: {
    s: 4,
    m: 10,
    l: 25,
    xl: 75,
  },

  textVariants: {
    largeTitle: {
      fontSize: Size.fontSize.largeTitle,
      lineHeight: Size.lineHeight.xxl,
      fontFamily: 'Roboto-Bold',
      color: 'background',
      textAlign: 'center',
    },
    title1: {
      fontSize: Size.fontSize.h1Title,
      fontFamily: 'RobotoCondensed-Bold',
      color: 'secondary',
    },
    title2: {
      fontSize: Size.fontSize.h2Title,
      lineHeight: Size.lineHeight.l,
      fontFamily: 'RobotoCondensed-Bold',
      color: 'secondary',
    },
    title3: {
      fontSize: Size.fontSize.h3Title,
      fontFamily: 'RobotoCondensed-Bold',
      color: 'secondary',
    },
    body: {
      fontSize: Size.fontSize.h3Title,
      lineHeight: Size.lineHeight.l,
      fontFamily: 'Roboto-Regular',
      color: 'text',
    },
    body2: {
      fontFamily: 'Roboto-Regular',
      fontSize: Size.fontSize.body2,
      lineHeight: Size.lineHeight.xl,
    },
    body3: {
      fontFamily: 'Roboto-Regular',
      fontSize: Size.fontSize.body3,
      lineHeight: Size.lineHeight.l,
    },
    body4: {
      fontFamily: 'Roboto-Regular',
      fontSize: Size.fontSize.body4,
      lineHeight: Size.lineHeight.l,
    },
    button: {
      fontSize: Size.fontSize.h3Title,
      fontFamily: 'Roboto-Medium',
      color: 'text',
      textAlign: 'center',
    },
    header: {
      fontSize: Size.fontSize.body4,
      lineHeight: Size.lineHeight.l,
      fontFamily: 'RobotoCondensed-Bold',
      color: 'secondary',
    },
  },
  breakpoints: {
    phone: 0,
    tablet: 768,
  },
};

export const ThemeProvider = ({children}: {children: ReactNode}) => (
  <ReStyleThemeProvider {...{theme}}>{children}</ReStyleThemeProvider>
);

export type Theme = typeof theme;
export const Box = createBox<Theme>();
export const Text = createText<Theme>();
export const useTheme = () => useReTheme<Theme>();
type NamedStyles<T> = {[P in keyof T]: ViewStyle | TextStyle | ImageStyle};

export const makeStyles = <T extends NamedStyles<T>>(
  styles: (theme: Theme) => T,
) => () => {
  const currentTheme = useTheme();
  return styles(currentTheme);
};
