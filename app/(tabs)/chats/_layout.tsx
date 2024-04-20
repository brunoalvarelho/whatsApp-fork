import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { Link, Stack } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";

const ChatsLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{
        title: 'Chats',
        headerLargeTitle: true,
        headerShadowVisible: false,
        headerTransparent: true,
        headerBlurEffect: 'systemUltraThinMaterial',
        headerStyle: { backgroundColor: Colors.white },
        headerSearchBarOptions: {
          placeholder: 'Search...',
          onChangeText: (event) => console.log(event.nativeEvent.text),
        },
        headerLeft: () => (
          <TouchableOpacity>
            <Ionicons name="ellipsis-horizontal-circle-outline" color={Colors.primary} size={30} />
          </TouchableOpacity>
        ),
        headerRight: () => (
          <View style={{ flexDirection: 'row', gap: 30 }}>
            <TouchableOpacity>
              <Ionicons name="camera-outline" color={Colors.primary} size={30} />
            </TouchableOpacity>
            <Link href="/(modals)/new-chat" asChild>
              <TouchableOpacity>
                <Ionicons name="add-circle" color={Colors.primary} size={30} />
              </TouchableOpacity>
            </Link>
          </View>
        ),

      }} />

      <Stack.Screen
        name="[id]"
        options={{
          title: '',
          headerBackTitleVisible: false,
          headerStyle: { backgroundColor: Colors.background },
          headerTitle: () => (
            <View
              style={{ flexDirection: 'row', width: 220, alignItems: 'center', gap: 10, paddingBottom: 4 }}>
              <Image source={{ uri: 'https://i.pravatar.cc/150?u=wardsims@genmy.com' }}
                style={{ width: 40, height: 40, borderRadius: 50 }}
              />
              <Text style={{ fontSize: 16, fontWeight: '500' }}>Simon Grimm</Text>
            </View>
          ),
          headerRight: () => (
            <View style={{ flexDirection: 'row', gap: 30 }}>
              <TouchableOpacity>
                <Ionicons name="videocam-outline" color={Colors.primary} size={30} />
              </TouchableOpacity>
              <TouchableOpacity>
                <Ionicons name="call-outline" color={Colors.primary} size={30} />
              </TouchableOpacity>
            </View>
          )
        }}
      />
    </Stack>
  );
}

export default ChatsLayout;