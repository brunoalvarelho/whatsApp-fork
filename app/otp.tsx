import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, Linking, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MaskInput from 'react-native-mask-input';

const Page = () => {
  const route = useRouter();
  const { bottom} = useSafeAreaInsets();
  const keybordverticalOffset = Platform.OS === 'ios' ? 90 : 0;
  const regex = /^\+33 \d{1} \d{2} \d{2} \d{2} \d{2}$/;

  const [loading, setLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');

  const onPress = () => {
    Linking.openURL('https://www.whatsapp.com/legal/#privacy-policy');
  }

  const sendOTP = async () => {
  }

  const trySignIn = async () => {
  }


  return (
  <KeyboardAvoidingView style={{flex: 1}}>
    <View style={styles.container}>
      <Text style={styles.description}>
        WhatsApp will need to verify your account. Carrier charges may apply.
      </Text>

      <View style={styles.boutonBlock}>
        <View style={styles.CountryBlock}>
          <Text style={[styles.phoneInput, {fontWeight: 'bold'}]}>FR</Text>
          <Ionicons name="chevron-down" size={24} color={Colors.primary} />
        </View>

        <View style={styles.separator}></View>

        <MaskInput
          style={styles.phoneInput}
          value={phoneNumber}
          onChangeText={(extracted) => setPhoneNumber(extracted)}
          mask={['+', '3', '3', ' ', /\d/, ' ', /\d/, /\d/, ' ', /\d/, /\d/, ' ', /\d/, /\d/, ' ', /\d/, /\d/]}
          keyboardType="number-pad"
          placeholder="Phone number"
          placeholderTextColor={Colors.gray}
        />
      </View>

      <Text style={styles.description}>
        You must be{' '}
        <Text style={styles.link} onPress={onPress}> at least 13 years old </Text>
        {'to register. Learn how WhatsApp works with the'}
        <Text style={styles.link} onPress={onPress}> Meta Companies </Text>
        .
      </Text>

      <View style={{flex: 1}}/>

      <TouchableOpacity
        style={[
          styles.button, regex.test(phoneNumber) ? styles.enabled : null,
          { marginBottom: bottom + 10 }
        ]}
        disabled={regex.test(phoneNumber)}
        onPress={sendOTP}>
        <Text style={[styles.buttonText, regex.test(phoneNumber) ? styles.enabled : null ]}>Next</Text>
      </TouchableOpacity>


    </View>
  </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 40,
    backgroundColor: Colors.background,
    gap: 20,
  },
  description: {
    fontSize: 14,
    color: Colors.gray,
  },
  legal: {
    fontSize: 12,
    textAlign: 'center',
    color: '#000',
  },
  link: {
    color: Colors.primary,
  },
  button: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: Colors.lightGray,
    padding: 10,
    borderRadius: 10,
  },
  enabled: {
    backgroundColor: Colors.primary,
    color: '#fff',
  },
  buttonText: {
    color: Colors.gray,
    fontSize: 22,
    fontWeight: '500',
  },
  boutonBlock: {
    flexDirection: 'row',
    alignItems: 'stretch',
    backgroundColor: '#fff',
    width: '100%',
    borderRadius: 10,
    padding: 10,
  },
  CountryBlock: {
    flexDirection: 'row',
    marginRight: 10,
    marginVertical: 10,
  },
  phoneInput: {
    fontSize: 18,
    color: Colors.primary,
  },
  separator: {
    height: '100%',
    width: StyleSheet.hairlineWidth,
    backgroundColor: Colors.gray,
    opacity: 0.4,
    marginRight: 10,
  },
  input: {
    backgroundColor: '#fff',
    width: '100%',
    fontSize: 16,
    padding: 6,
    marginTop: 10,
  },
  loading: {
    zIndex: 10,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Page;