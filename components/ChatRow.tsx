import { Link } from "expo-router";
import { FC } from "react";
import { Image, StyleSheet, Text, TouchableHighlight, View } from "react-native";
import { format } from "date-fns";
import Colors from "@/constants/Colors";
import AppleStyleSwipeableRow from "./AppleStyleSwipeableRow";
import { Ionicons } from "@expo/vector-icons";

export interface ChatRowProps {
  id: string;
  from: string;
  date: string;
  img: string;
  msg: string;
  unreadCount: number;
}


const ChatRow: FC<ChatRowProps> = ({ id, from, date, img, msg, unreadCount }) => {
  return (
    <AppleStyleSwipeableRow>
      <Link href={`/(tabs)/chats/${id}`} asChild>
        <TouchableHighlight underlayColor={Colors.lightGray} activeOpacity={0.6}>
          <View style={styles.container}>
            <Image source={{ uri: img }} style={styles.avatar} />
            <View style={{ flex: 1 }}>
              <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{from}</Text>
              <Text numberOfLines={2} style={{ color: 'gray' }}>{msg}</Text>
            </View>
            <View style={{ paddingRight: 20, alignItems: 'flex-start' }}>
              <Text style={{ color: Colors.gray}}>{format(date, "MM.dd.yy")}</Text>
              {unreadCount > 0 && <Ionicons name="ellipse" size={15} color={Colors.red} style={{alignSelf: 'flex-end', paddingTop: 5}} /> }
              </View>
          </View>
        </TouchableHighlight>
      </Link>
    </AppleStyleSwipeableRow>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingLeft: 14,
    paddingVertical: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  unreadBlock: {
    backgroundColor: Colors.red,
    borderRadius: 20,
    alignSelf: 'center'
  }
});

export default ChatRow;;