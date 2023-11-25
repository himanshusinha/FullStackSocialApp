import React, {useState} from 'react';
import {View, Text, Alert, Modal} from 'react-native';
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
import GenderSelectionButton from '../../../components/button/genderButton/GenderSelectionButton';
import signUpValidationSchema from '../../../utils/signUpValidationSchema';
import {useDispatch} from 'react-redux';
import {signUpAsyncThunk} from '../../../redux/asyncThunk/authAsyncThunk';
import Loader from '../../../components/loader/Loader';
import {moderateScale, scale} from 'react-native-size-matters';

const SignUpScreen = () => {
  const navigation = useNavigation();
  const [selectedGender, setSelectedGender] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [errorText, setErrorText] = useState('');

  const dispatch = useDispatch();

  const handleSignUp = (values, {setSubmitting}) => {
    const genderString = selectedGender === 0 ? 'Male' : 'Female';

    values.gender = genderString;
    setIsLoading(true);

    const payload = {
      username: values.username,
      emailId: values.email,
      mobile: values.mobile,
      gender: genderString,
      password: values.password,
    };
    dispatch(signUpAsyncThunk(payload))
      .unwrap()
      .then(res => {
        if (res && res.data.status === 200) {
          console.log('User signed up successfully');
          setIsLoading(false);
        } else {
          console.log('Incorrect credentials');
          setIsLoading(false);
        }
      })
      .catch(err => {
        if (err.response && err.response.status === 400) {
          console.log(err.response.status);
          setErrorMessage(err.response.data.message);
          setIsLoading(false);
        } else if (err.response && err.response.status === 401) {
          console.log(err.response.status);
          setErrorMessage(err.response.data.message);
          setIsLoading(false);
        } else {
          console.log('Something went wrong');
          setErrorMessage(err.response.data.message);
          setIsLoading(false);
        }
      })
      .finally(() => {
        setSubmitting(false);
        setIsLoading(false);
      });
  };

  return (
    <WrapperContainer>
      <Modal transparent={true} animationType="none" visible={isLoading}>
        {isLoading && <Loader />}
      </Modal>
      <Formik
        initialValues={{
          username: '',
          email: '',
          mobile: '',
          gender: 0,
          password: '',
        }}
        validationSchema={signUpValidationSchema}
        onSubmit={handleSignUp}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          setFieldValue,
        }) => (
          <View style={styles.container}>
            <AppIcon icon={images.social} />
            <Header title={'Welcome Back'} sub_title={'To Social'} />

            <View style={styles.inputContainer}>
              <InputField
                leftIcon={images.account}
                value={values.username}
                onChangeText={handleChange('username')}
                onBlur={handleBlur('username')}
                placeholder={'Enter username'}
                placeholderTextColor={colors.BLACK}
                autoCapitalize={'none'}
                autoCorrect={false}
              />
              {touched.username && errors.username && (
                <Text style={styles.errorText}>{errors.username}</Text>
              )}
            </View>
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
                value={values.mobile}
                onChangeText={handleChange('mobile')}
                onBlur={handleBlur('mobile')}
                leftIcon={images.call}
                placeholder={'Enter your mobile username'}
                placeholderTextColor={colors.BLACK}
                keyboardType={'numeric'}
              />
              {touched.mobileUsername && errors.mobileUsername && (
                <Text style={styles.errorText}>{errors.mobileUsername}</Text>
              )}
            </View>
            <View style={styles.genderButtonStyle}>
              <GenderSelectionButton
                isSelected={selectedGender === 0}
                onPress={() => {
                  setSelectedGender(0);
                  setFieldValue('gender', 'Male');
                }}
                imageSource={images.male}
              />
              <View style={styles.gapStyle} />
              <GenderSelectionButton
                isSelected={selectedGender === 1}
                onPress={() => {
                  setSelectedGender(1);
                  setFieldValue('gender', 'Female');
                }}
                imageSource={images.female}
              />
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
              style={styles.buttonStyle}
              titleStyle={styles.titleStyle}
              title="Sign Up"
              onPress={handleSubmit}
            />
            {errorMessage !== '' && (
              <Text style={styles.errorText}>{errorMessage}</Text>
            )}
            <Footer
              onPress={() => navigation.goBack()}
              title={strings.ALREADY_HAVE_AN_ACCOUNT}
              sub_title={strings.LOGIN}
            />
          </View>
        )}
      </Formik>
    </WrapperContainer>
  );
};

export default SignUpScreen;
