import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import { Link, Stack, useRouter, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { ClerkProvider, useAuth } from '@clerk/clerk-expo';
import * as SecureStore from 'expo-secure-store';
import { TouchableOpacity, View } from 'react-native';
import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';

const EXPO_CLERK_PUBLISHABLE_API = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

// Cache the Clerk JWT
const tokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

// Catch any errors thrown by the Layout component.
export { ErrorBoundary } from 'expo-router';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const InitialLayout = () => {
  const router = useRouter();
  const segments = useSegments();
  const { isSignedIn, isLoaded } = useAuth();

  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => { if (error) throw error;}, [error]);

  useEffect(() => { if (loaded) { SplashScreen.hideAsync(); } }, [loaded]);

  useEffect(() => {
    if (!isLoaded) return;
    console.log('isSignedIn', isSignedIn);
    if (isSignedIn && segments[0] !== 'tags') {
      router.replace("/(tabs)/chats")
    } else if (!isSignedIn) {
      router.replace("/")
    }
  }, [isSignedIn]);

  if (!loaded || !isLoaded) { return <View/>;}

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="otp" options={{ headerTitle: "Enter Your Phone Number", headerBackVisible: false }} />
      <Stack.Screen name="verify/[phone]" options={{ headerTitle: "Verify Phone Number", headerBackTitle: 'Edit number' }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="(modals)/new-chat" options={{
        presentation: 'modal',
        title: 'New Chat',
        headerTransparent: true,
        headerBlurEffect: 'regular',
        headerStyle: { backgroundColor: Colors.background },
        headerSearchBarOptions: {
          placeholder: 'Search name or number...',
          hideWhenScrolling: false,
        },
        headerRight: () => (
          <Link href="/(tabs)/chats" asChild>
            <TouchableOpacity style={{ backgroundColor: Colors.lightGray, padding: 4, borderRadius: 20 }}>
              <Ionicons name="close" size={30} color={Colors.gray} />
            </TouchableOpacity>
          </Link>
        ),
      }} />
    </Stack>
  );
}

export default function RootLayoutNav() {
  return (
    <ClerkProvider publishableKey={EXPO_CLERK_PUBLISHABLE_API!} tokenCache={tokenCache}>
      <InitialLayout />
    </ClerkProvider>
  );
}