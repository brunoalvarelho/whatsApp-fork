import { ImageBackground, StyleSheet, Text, View } from "react-native"
import messageData from "@/assets/data/messages.json"
import { useCallback, useEffect, useRef, useState } from "react"
import { BubbleProps, GiftedChat, IMessage, Bubble, SystemMessage, Send, InputToolbar } from "react-native-gifted-chat"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import Colors from "@/constants/Colors"
import { Ionicons } from "@expo/vector-icons"
import { Swipeable } from "react-native-gesture-handler"
import ChatMessageBox from "@/components/ChatMessageBox"
import ReplyMessageBar from "@/components/ReplyMessageBar"

type MyMessage = IMessage & {
  replyMessage?: {
    text: string;
    author?: string;
  };
};

const Page = () => {
  const [messages, setMessages] = useState<MyMessage[]>([]);
  const [text, setText] = useState('');
  const [replyMessage, setReplyMessage] = useState<MyMessage | null>(null);
  const swipeableRowRef = useRef<Swipeable | null>(null);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    setMessages([
      ...messageData.map((message) => {
        return {
          _id: message.id,
          text: message.msg,
          createdAt: new Date(message.date),
          user: {
            _id: message.from,
            name: message.from ? 'You' : 'Bob',
          },
        };
      }),
      {
        _id: 0,
        system: true,
        text: 'Message System',
        createdAt: new Date(),
        user: {
          _id: 0,
          name: 'Bot',
        },
      },
    ]);
  }, []);

  useEffect(() => {
    if (replyMessage && swipeableRowRef.current) {
      swipeableRowRef.current.close();
      swipeableRowRef.current = null;
    }
  }, [replyMessage]);


  const onSend = useCallback((messages: MyMessage[] = []) => {
    if (replyMessage) messages[0].replyMessage = { text: replyMessage.text, author: replyMessage.user.name };
    setMessages((previousMessages) => GiftedChat.append(previousMessages, messages));
    setReplyMessage(null);
  }, [replyMessage]);

  const updateRowRef = useCallback((ref: any) => {
    if (ref && replyMessage && ref.props.children.props.currentMessage?._id === replyMessage._id) {
      swipeableRowRef.current = ref;
    }
  }, [replyMessage]);

  const renderInputToolbar = (props: any) => {
    return (
      <InputToolbar
        {...props}
        containerStyle={{ backgroundColor: Colors.background }}
        renderActions={() => (
          <View style={{ height: 44, justifyContent: 'center', alignItems: 'center', left: 5 }}>
            <Ionicons name="add" color={Colors.primary} size={28} />
          </View>
        )}
      />
    );
  };

  const renderBubble = (props: any) => {
    return (
      <Bubble
        {...props}
        textStyle={{ right: { color: '#000' } }}
        timeTextStyle={{ left: { color: Colors.gray }, right: { color: Colors.gray } }}
        wrapperStyle={{ left: { backgroundColor: '#fff' }, right: { backgroundColor: Colors.lightGreen } }}
      />
    );
  };

  const renderSend = (props: any) => {
    return (
      <View style={styles.send}>
        {text === '' && (
          <>
            <Ionicons name="camera-outline" color={Colors.primary} size={28} />
            <Ionicons name="mic-outline" color={Colors.primary} size={28} />
          </>
        )}
        {text.length > 0 && (
          <Send {...props} containerStyle={{ justifyContent: 'center' }}>
            <Ionicons name="send" color={Colors.primary} size={28} />
          </Send>
        )}
      </View>
    );
  };

  const renderMessage = (props: any) => {
    return (
      <ChatMessageBox {...props}
        setReplyOnSwipeOpen={setReplyMessage}
        updateRowRef={updateRowRef}
      />
    );
  };

  const renderReplyMessageView = (props: BubbleProps<MyMessage>) => {
    if (props.currentMessage && props.currentMessage.replyMessage) {
      return (
        <View style={{ opacity: 0.8, backgroundColor: Colors.green, padding: 10, borderRadius: 10, margin: 10 }}>
          <Text style={{ fontWeight: 'bold'}}>{props.currentMessage.replyMessage.author}</Text>
          <Text>{props.currentMessage.replyMessage.text}</Text>
        </View>
      );
    }
  }

  return (
    <ImageBackground source={require('@/assets/images/pattern.png')}
      style={{ flex: 1, marginBottom: insets.bottom, backgroundColor: Colors.background, }}>
      <GiftedChat
        messages={messages}
        onSend={(messages: any) => onSend(messages)}
        onInputTextChanged={setText}
        user={{ _id: 1 }}
        bottomOffset={insets.bottom}
        renderAvatar={null}
        maxComposerHeight={100}
        textInputProps={styles.composer}
        placeholder=""
        renderSystemMessage={(props) => (<SystemMessage {...props} textStyle={{ color: Colors.red }} />)}
        renderChatFooter={() => (<ReplyMessageBar clearReply={() => setReplyMessage(null)} message={replyMessage} />)}
        renderBubble={renderBubble}
        renderSend={renderSend}
        renderInputToolbar={renderInputToolbar}
        renderMessage={renderMessage}
        renderCustomView={renderReplyMessageView}
      />
    </ImageBackground>

  )
}

const styles = StyleSheet.create({
  composer: {
    backgroundColor: '#fff',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: Colors.lightGray,
    paddingHorizontal: 10,
    paddingTop: 8,
    fontSize: 16,
    marginVertical: 4,
  },
  send: {
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 14,
    paddingHorizontal: 14
  }
});

export default Page