import {RouteProp, CompositeNavigationProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

export interface AuthNavigationProps<
  RouteName extends keyof AuthenticationRoutes
> {
  navigation: CompositeNavigationProp<
    StackNavigationProp<AuthenticationRoutes, RouteName>,
    StackNavigationProp<AppRoutes, 'News'>
  >;
  route: RouteProp<AuthenticationRoutes, RouteName>;
}

export interface HomeNavigationProps<RouteName extends keyof HomeRoutes> {
  navigation: StackNavigationProp<HomeRoutes, RouteName>;
  route: RouteProp<HomeRoutes, RouteName>;
}
export type AppRoutes = {
  Authentication: undefined;
  News: undefined;
};

export type AuthenticationRoutes = {
  Welcome: undefined;
  Login: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
  PasswordChanged: undefined;
};

export type HomeRoutes = {
  News: undefined;
  Setting: undefined;
  Bookmark: undefined;
  ArticleDetails: any;
  PushNotification: undefined;
  DisplaySetting: undefined;
  DataUsage: undefined;
  Autoplay: undefined;
  About: undefined;
  Support: undefined;
};
