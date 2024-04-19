import { View, Text, ScrollView, FlatList, TouchableOpacity, Image } from "react-native";
import Colors from '@/constants/Colors';
import { defaultStyles } from '@/constants/Styles';
import chats from '@/assets/data/chats.json';
import ChatRow from "@/components/ChatRow";

const Page = () => {
  return (
    <View style={{ flex: 1, backgroundColor: Colors.background }}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={{ paddingBottom: 40, backgroundColor: Colors.white}}>
        <FlatList
          scrollEnabled={false}
          data={chats}
          ItemSeparatorComponent={() => <View style={[defaultStyles.separator, {marginLeft: 90}]} />}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <ChatRow {...item} />}
        />
      </ScrollView>
    </View>
  );
}

const styles = {
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  }
}

export default Page;