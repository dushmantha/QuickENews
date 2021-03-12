import React, {useRef, useState} from 'react';
import {TextInput as RNTextInput} from 'react-native';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import auth from '@react-native-firebase/auth';
import {CommonActions} from '@react-navigation/native';
import Spinner from 'react-native-loading-spinner-overlay';
import {Container, Button, Text, Box, useTheme} from '../components';
import {AuthNavigationProps} from '../components/Navigation';
import TextInput from '../components/Form/TextInput';
import Footer from './components/Footer';
import {setUser, getUser} from '../services';
import {storeUser} from '../storage';
const SignUpSchema = Yup.object().shape({
  password: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  passwordConfirmation: Yup.string()
    .equals([Yup.ref('password')], "Passwords don't match")
    .required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
});

const SignUp = ({navigation}: AuthNavigationProps<'SignUp'>) => {
  const [spinner, setSpinner] = useState(false);
  const theme = useTheme();
  const {handleChange, handleBlur, handleSubmit, errors, touched} = useFormik({
    validationSchema: SignUpSchema,
    initialValues: {
      email: '',
      password: '',
      passwordConfirmation: '',
      remember: true,
    },
    onSubmit: (values) => {
      setSpinner(true);
      auth()
        .createUserWithEmailAndPassword(values.email, values.password)
        .then(({user}: any) => setUser(user))
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
  const passwordConfirmation = useRef<RNTextInput>(null);
  const footer = (
    <Footer
      title="Already have an account?"
      action="Login here"
      onPress={() => navigation.navigate('Login')}
    />
  );
  return (
    <Container pattern={1} {...{footer}}>
      <Text variant="title1" textAlign="center" marginBottom="l">
        Create account
      </Text>
      <Text variant="body" textAlign="center" marginBottom="l">
        Let’s us know what your name, email, and your password
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

        <Box marginBottom="m">
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
            onSubmitEditing={() => passwordConfirmation.current?.focus()}
            secureTextEntry
          />
        </Box>

        <Box marginBottom="m">
          <TextInput
            ref={passwordConfirmation}
            icon="lock"
            placeholder="Confirm your Password"
            onChangeText={handleChange('passwordConfirmation')}
            onBlur={handleBlur('passwordConfirmation')}
            error={errors.passwordConfirmation}
            touched={touched.passwordConfirmation}
            autoCompleteType="password"
            autoCapitalize="none"
            returnKeyType="go"
            returnKeyLabel="go"
            onSubmitEditing={() => handleSubmit()}
            secureTextEntry
          />
        </Box>
        <Box alignItems="center" marginTop="m">
          <Button onPress={handleSubmit} label="Create your account" />
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

export default SignUp;
