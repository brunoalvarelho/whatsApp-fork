import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { IMessage } from 'react-native-gifted-chat';
import Animated, { FadeInDown, FadeOutDown } from 'react-native-reanimated';

type ReplyMessageBarProps = {
  clearReply: () => void;
  message: IMessage | null;
};

const ReplyMessageBar = ({ clearReply, message }: ReplyMessageBarProps) => {
  return (
    <>
      {message !== null && (
        <Animated.View style={Styles.container} entering={FadeInDown} exiting={FadeOutDown}>
          <View style={Styles.leftBar}></View>
          <View style={{ flexDirection: 'column' }}>
            <Text style={Styles.username}> {message?.user.name} </Text>
            <Text style={Styles.message}>
              {message!.text.length > 40 ? message?.text.substring(0, 40) + '...' : message?.text}
            </Text>
          </View>
          <View
            style={Styles.closeIcon}>
            <TouchableOpacity onPress={clearReply}>
              <Ionicons name="close-circle-outline" color={Colors.primary} size={28} />
            </TouchableOpacity>
          </View>
        </Animated.View>
      )}
    </>
  );
};

const Styles = StyleSheet.create({
  container: {
    height: 50,
    flexDirection: 'row',
    backgroundColor: '#E4E9EB',
  },
  leftBar: {
    height: 50,
    width: 6,
    backgroundColor: '#89BC0C',
  },
  username: {
    color: '#89BC0C',
    paddingLeft: 10,
    paddingTop: 5,
    fontWeight: '600',
    fontSize: 15,
  },
  message: {
    color: Colors.gray,
    paddingLeft: 10,
    paddingTop: 5,
  },
  closeIcon: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 10,
  },
});

export default ReplyMessageBar;