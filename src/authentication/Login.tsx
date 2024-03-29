import React, {useRef, useState} from 'react';
import {TextInput as RNTextInput, TouchableOpacity} from 'react-native';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {CommonActions} from '@react-navigation/native';
import Spinner from 'react-native-loading-spinner-overlay';
import auth from '@react-native-firebase/auth';
import {Container, Button, Text, Box, useTheme} from '../components';
import {AuthNavigationProps} from '../components/Navigation';
import TextInput from '../components/Form/TextInput';
import Checkbox from '../components/Form/Checkbox';
import {getUser} from '../services/';
import Footer from './components/Footer';

const LoginSchema = Yup.object().shape({
  password: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
});

const Login = ({navigation}: AuthNavigationProps<'Login'>) => {
  const [spinner, setSpinner] = useState(false);
  const theme = useTheme();
  const {
    handleChange,
    handleBlur,
    handleSubmit,
    errors,
    touched,
    values,
    setFieldValue,
  } = useFormik({
    validationSchema: LoginSchema,
    initialValues: {email: '', password: '', remember: true},
    onSubmit: () => {
      setSpinner(true);
      auth()
        .signInWithEmailAndPassword(values.email, values.password)
        .then(() => getUser(values.email))
        .then(() => {
          setSpinner(false);
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{name: 'News'}],
            }),
          );
        })
        .catch((error) => {
          setSpinner(false);
          if (error.code === 'auth/email-already-in-use') {
            console.log('That email address is already in use!');
          }

          if (error.code === 'auth/invalid-email') {
            console.log('That email address is invalid!');
          }

          console.error(error);
        });
    },
  });
  const password = useRef<RNTextInput>(null);
  const footer = (
    <Footer
      title="Don’t have an account?"
      action="Sign Up here"
      onPress={() => navigation.navigate('SignUp')}
    />
  );
  return (
    <Container pattern={0} {...{footer}}>
      <Text variant="title1" textAlign="center" marginBottom="l">
        Welcome back
      </Text>
      <Text variant="body" textAlign="center" marginBottom="l">
        Use your credentials below and login to your account
      </Text>
      <Box>
        <Box marginBottom="m">
          <TextInput
            icon="mail"
            placeholder="Enter your Email"
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            error={errors.email}
            touched={touched.email}
            autoCapitalize="none"
            autoCompleteType="email"
            returnKeyType="next"
            returnKeyLabel="next"
            onSubmitEditing={() => password.current?.focus()}
          />
        </Box>
        <TextInput
          ref={password}
          icon="lock"
          placeholder="Enter your Password"
          onChangeText={handleChange('password')}
          onBlur={handleBlur('password')}
          error={errors.password}
          touched={touched.password}
          autoCompleteType="password"
          autoCapitalize="none"
          returnKeyType="go"
          returnKeyLabel="go"
          onSubmitEditing={() => handleSubmit()}
          secureTextEntry
        />
        <Box
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          marginVertical="s">
          <Checkbox
            label="Remember me"
            checked={values.remember}
            onChange={() => setFieldValue('remember', !values.remember)}
          />
          <TouchableOpacity
            onPress={() => navigation.navigate('ForgotPassword')}>
            <Text variant="button" color="background2">
              Forgot password
            </Text>
          </TouchableOpacity>
        </Box>
        <Box alignItems="center" marginTop="m">
          <Button onPress={handleSubmit} label="Log into your account" />
        </Box>
      </Box>
      <Spinner
        visible={spinner}
        textContent={'Loading...'}
        textStyle={{color: theme.colors.background2}}
      />
    </Container>
  );
};

export default Login;
