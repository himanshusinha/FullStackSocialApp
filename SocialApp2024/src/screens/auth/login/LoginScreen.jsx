import React, {useState} from 'react';
import {View, Text, Modal} from 'react-native';
import {Formik} from 'formik';
import WrapperContainer from '../../../components/wrapperContainer/WrapperContainer';
import InputField from '../../../components/input/InputField';
import images from '../../../constants/images';
import styles from './styles';
import Footer from '../../../components/footer/Footer';
import Header from '../../../components/header/Header';
import strings from '../../../constants/strings';
import {useNavigation} from '@react-navigation/native';
import AppIcon from '../../../components/appicon/AppIcon';
import colors from '../../../constants/colors';
import AppButton from '../../../components/button/appButton/AppButton';
import loginValidationSchema from '../../../utils/loginValidationSchema';
import {useDispatch} from 'react-redux';
import routes from '../../../constants/routes';
import {loginAsyncThunk} from '../../../redux/asyncThunk/authAsyncThunk';
import Loader from '../../../components/loader/Loader';

const LoginScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handeleLogin = values => {
    setIsLoading(true);
    const payload = {
      emailId: values.email,
      password: values.password,
    };

    dispatch(loginAsyncThunk(payload))
      .then(res => {
        console.log('Response from server:', res);
        if (res && res.payload && res.payload.status) {
          console.log('User logged in successfully');
          setIsLoading(false);
        } else if (res && res.payload && !res.payload.status) {
          setErrorMessage(res.payload.message);
          setIsLoading(false);
        }
      })
      .catch(err => {
        console.error('Login error. Response:', err?.data?.message);
        setErrorMessage(err?.data?.message || 'An error occurred');
        setIsLoading(false);
      });
  };

  return (
    <WrapperContainer>
      {isLoading ? <Loader /> : null}

      <Formik
        initialValues={{email: '', password: ''}}
        validationSchema={loginValidationSchema}
        onSubmit={handeleLogin}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View style={styles.container}>
            <AppIcon icon={images.social} />
            <Header
              title={strings.WELCOME_BACK}
              sub_title={strings.TO_SOCIAL}
            />
            <View style={styles.inputContainer}>
              <InputField
                leftIcon={images.email}
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                placeholder={'Enter your email'}
                placeholderTextColor={colors.BLACK}
                autoCapitalize={'none'}
                autoCorrect={false}
              />
              {touched.email && errors.email && (
                <Text style={styles.errorText}>{errors.email}</Text>
              )}
            </View>
            <View style={styles.inputContainer}>
              <InputField
                value={values.password}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                leftIcon={images.lock}
                rightIcon={images.eye}
                placeholder={'Enter your password'}
                placeholderTextColor={colors.BLACK}
                secureTextEntry={true}
                autoCapitalize={'none'}
                autoCorrect={false}
              />
              {touched.password && errors.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}
            </View>
            <AppButton
              titleStyle={styles.titleStyle}
              title="Login"
              onPress={handleSubmit}
            />

            <View style={styles.buttonContainer}>
              {errorMessage !== '' && (
                <Text style={styles.errorText}>{errorMessage}</Text>
              )}
            </View>
            <Footer
              onPress={() => navigation.navigate(routes.SIGN_UP)}
              title={strings.DONT_HAVE_AN_ACCONT}
              sub_title={strings.SIGN_UP}
            />
          </View>
        )}
      </Formik>
    </WrapperContainer>
  );
};

export default LoginScreen;
