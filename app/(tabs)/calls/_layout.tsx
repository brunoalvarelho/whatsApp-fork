import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { Stack } from "expo-router";
import { TouchableOpacity } from "react-native";

const CallsLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{
        title: 'Calls',
        headerLargeTitle: true,
        headerShadowVisible: false,
        headerStyle: { backgroundColor: Colors.background },
        headerRight: () => (
          <TouchableOpacity onPress={() => alert('New call')}>
            <Ionicons name="call-outline" size={30} color={Colors.primary} />
          </TouchableOpacity>
        ),
      }}/>
    </Stack>
  );
}

export default CallsLayout;