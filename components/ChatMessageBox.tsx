import Colors from '@/constants/Colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { View, Animated } from 'react-native';
import { GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler';
import { IMessage, Message, MessageProps } from 'react-native-gifted-chat';
// import { isSameDay, isSameUser } from 'react-native-gifted-chat/lib/utils';

type ChatMessageBoxProps = {
  setReplyOnSwipeOpen: (message: IMessage) => void;
  updateRowRef: (ref: any) => void;
} & MessageProps<IMessage>;

const ChatMessageBox = ({ setReplyOnSwipeOpen, updateRowRef, ...props }: ChatMessageBoxProps) => {
  const renderLeftAction = (progressAnimatedValue: Animated.AnimatedInterpolation<any>) => {
    const size = progressAnimatedValue.interpolate({ inputRange: [0, 1, 100], outputRange: [0, 1, 1], });
    const trans = progressAnimatedValue.interpolate({ inputRange: [0, 1, 2], outputRange: [0, 12, 20], });

    return (
      <Animated.View style={[{ width: 40 }, { transform: [{ scale: size }, { translateX: trans }] } ]}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'flex-start'}}>
          <MaterialCommunityIcons name="reply-circle" size={26} color={Colors.gray} />
        </View>
      </Animated.View>
    );
  };

  const onSwipeOpenAction = () => {
    props.currentMessage && setReplyOnSwipeOpen({ ...props.currentMessage });
  };

  return (
    <GestureHandlerRootView>
      <Swipeable
        ref={updateRowRef}
        friction={2}
        leftThreshold={40}
        renderLeftActions={renderLeftAction}
        onSwipeableOpen={onSwipeOpenAction}
      >
        <Message {...props} />
      </Swipeable>
    </GestureHandlerRootView>
  );
};

export default ChatMessageBox;