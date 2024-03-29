import React from 'react';
import {Linking} from 'react-native';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import auth from '@react-native-firebase/auth';

import {AuthNavigationProps} from '../components/Navigation';
import {Container, Box, Button, Text} from '../components';
import TextInput from '../components/Form/TextInput';
import Footer from './components/Footer';

const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
});

const ForgotPassword = ({
  navigation,
}: AuthNavigationProps<'ForgotPassword'>) => {
  const {handleChange, handleBlur, handleSubmit, errors, touched} = useFormik({
    validationSchema: ForgotPasswordSchema,
    initialValues: {email: ''},
    onSubmit: (values) => {
      auth()
        .sendPasswordResetEmail(values.email)
        .then((user) => {
          console.log('user deatils ', user);
          navigation.navigate('PasswordChanged');
        })
        .catch(function (e: any) {
          console.log(e);
        });
    },
  });
  const footer = (
    <Footer
      title="Don’t work?"
      action="Try another way"
      onPress={() => Linking.openURL('mailto:help@support.com')}
    />
  );
  return (
    <Container pattern={2} {...{footer}}>
      <Text variant="title1" textAlign="center" marginBottom="l">
        Forgot password?
      </Text>
      <Text variant="body" textAlign="center" marginBottom="l">
        Enter the email address associated with your account
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
            returnKeyType="go"
            returnKeyLabel="go"
            onSubmitEditing={() => handleSubmit()}
          />
        </Box>
        <Box alignItems="center" marginTop="m">
          <Button
            variant="primary"
            onPress={handleSubmit}
            label="Reset password"
          />
        </Box>
      </Box>
    </Container>
  );
};

export default ForgotPassword;
