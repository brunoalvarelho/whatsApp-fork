import Colors from "@/constants/Colors";
import { Stack } from "expo-router";
import { View, Text } from "react-native";

const SettingsLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{
        title: 'Settings',
        headerLargeTitle: true,
        headerShadowVisible: false,
        headerStyle: { backgroundColor: Colors.background },
        headerSearchBarOptions: {
          placeholder: 'Search settings',
          onChangeText: (event) => console.log(event.nativeEvent.text),
        },

      }}/>
    </Stack>
  );
}

export default SettingsLayout;