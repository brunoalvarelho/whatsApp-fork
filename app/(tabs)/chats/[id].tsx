import { Image, ImageBackground, StyleSheet, Text, View } from "react-native"
import messageData from "@/assets/data/messages.json"
import { useCallback, useEffect, useState } from "react"
import { GiftedChat, IMessage, Bubble, SystemMessage, Send, InputToolbar } from "react-native-gifted-chat"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import Colors from "@/constants/Colors"
import { Ionicons } from "@expo/vector-icons"

const Page = () => {
  const [ messages, setMessages ] = useState<IMessage[]>([]);
  const [text, setText] = useState('');
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

  const onSend = useCallback((messages = []) => {
    console.log(messages)
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
  }, [])

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

  return (
    <ImageBackground source={require('@/assets/images/pattern.png')}
      style={{ flex: 1 , marginBottom: insets.bottom, backgroundColor: Colors.background,}}>
      <GiftedChat
        messages={messages}
        onSend={(messages:any) => onSend(messages)}
        onInputTextChanged={setText}
        user={{ _id: 1 }}
        renderSystemMessage={(props) => ( <SystemMessage {...props} textStyle={{ color: Colors.red }} />)}
        bottomOffset={insets.bottom}
        renderAvatar={null}
        maxComposerHeight={100}
        renderBubble={(props) => {
          return (
            <Bubble
              {...props}
              textStyle={{ right: { color: '#000' } }}
              wrapperStyle={{ left: { backgroundColor: '#fff' }, right: { backgroundColor: Colors.lightGreen } }}
            />
          );
        }}
        renderSend={(props) => (
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
        )}
        renderInputToolbar={renderInputToolbar}
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