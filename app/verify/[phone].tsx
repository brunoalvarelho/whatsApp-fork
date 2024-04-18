import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field';
import Colors from "@/constants/Colors";
import { isClerkAPIResponseError, useAuth, useSignIn, useSignUp } from "@clerk/clerk-expo";

const Page = () => {
  const { phone, signin } = useLocalSearchParams<{ phone: string, signin: string }>();
  const [code, setCode] = useState('');
  const ref = useBlurOnFulfill({ value: code, cellCount: 6 });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({value: code, setValue: setCode});
  const { signUp, setActive } = useSignUp();
  const { signIn } = useSignIn();
  const { isSignedIn } = useAuth();

  useEffect(() => {
    if (code.length === 6) signin === 'true' ? verifySignIn() : verifyCode();
  }, [code]);

  const verifySignIn = async () => {
    try {
      await signIn!.attemptFirstFactor({strategy: 'phone_code', code });
      await setActive!({ session: signIn!.createdSessionId });
    } catch (error) {
      if (isClerkAPIResponseError(error)) {
        console.log('verifySignIn error', error.errors[0].code);
      } else {
        console.log('verifySignIn error', JSON.stringify(error, null, 2));
      }
    }
  };

  const verifyCode = async () => {
    try {
      console.log('verifyCode', code);
      await signUp!.attemptPhoneNumberVerification({ code });
      await setActive!({ session: signUp!.createdSessionId });
      console.log('isSignedIn', isSignedIn)
    } catch (error) {
      if (isClerkAPIResponseError(error)) {
        console.log('verifyCode error', error.errors[0].message);
      } else {
        console.log('verifyCode error', JSON.stringify(error, null, 2));
      }
    }
  };

  const resendCode = async () => {
    try {
      if (signin === 'true') {
        const { supportedFirstFactors } = await signIn!.create({identifier: phone});
        const firstPhoneFactor: any = supportedFirstFactors.find((factor: any) => factor.type === 'phone_code');
        const { phoneNumberId } = firstPhoneFactor;
        await signIn!.prepareFirstFactor({ strategy: 'phone_code', phoneNumberId });
      } else {
        await signUp!.create({phoneNumber: phone});
        signUp!.preparePhoneNumberVerification();
      }
    } catch (error) {
      if (isClerkAPIResponseError(error)) {
        console.log('error', error.errors[0].code);
      } else {
        console.log('error', JSON.stringify(error, null, 2));
      }
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerTitle: 'Phone Verification' }} />
      <Text style={styles.legal}>We have sent you an SMS with a code to the following number {phone}</Text>
      <Text style={styles.legal}>
        To complete your phone number verification, please enter the 6-digit activation code.
      </Text>

      <CodeField
        ref={ref}
        {...props}
        value={code}
        onChangeText={setCode}
        cellCount={6}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        // autoComplete={Platform.select({ android: 'sms-otp', default: 'one-time-code' })}
        testID="my-code-input"
        renderCell={({index, symbol, isFocused}) => (
          <View
            key={index}
            style={[styles.cellRoot, isFocused && styles.focusCell]}
            onLayout={getCellOnLayoutHandler(index)}>
            <Text style={styles.cellText}>
              {symbol || (isFocused ? <Cursor/> : null)}
            </Text>
          </View>
        )}
      />


      <TouchableOpacity style={styles.button} onPress={resendCode}>
        <Text style={styles.buttonText}>Didn't receive a verification code?</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: Colors.background,
    gap: 20,
  },
  legal: {
    fontSize: 14,
    textAlign: 'center',
    color: Colors.black,
  },
  button: {
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: Colors.primary,
    fontSize: 18,
  },
  codeFieldRoot: {
    marginTop: 20,
    width: 280,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  cellRoot: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: Colors.lightGray,
    borderBottomWidth: 1,
  },
  cellText: {
    color: Colors.black,
    fontSize: 36,
    textAlign: 'center',
  },
  focusCell: {
    paddingBottom: 4,
    borderBottomColor: Colors.black,
    borderBottomWidth: 2,
  },
});

export default Page;