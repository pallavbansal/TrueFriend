import {View, StyleSheet, ScrollView} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import GradientScreen from '../Layouts/GradientScreen';
import GradientText from '../Components/Common/GradientText';
import {colors} from '../Styles/ColorData';
import Message from '../Components/Chat/Message';
import ChatHeader from '../Components/Chat/ChatHeader';
import ChatBottom from '../Components/Chat/ChatBottom';
import {useSelector} from 'react-redux';
import {useFetchChatting} from '../Hooks/Query/ChatQuery';
import Loading from './Loading';
import socket from '../Socket/Socket';

const Chat = ({route}) => {
  const [MessageData, setMessageData] = useState([]);
  const {userid, name, imageUrl, type: chattype, grouproomid} = route.params;
  const myuserid = useSelector(state => state.Auth.userid);
  const {name: myname} = useSelector(state => state.Auth.userinitaldata);
  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollViewRef = useRef(null);
  const {
    data,
    error,
    fetchPreviousPage,
    hasPreviousPage,
    isFetchingPreviousPage,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending,
    isFetching,
  } = useFetchChatting(userid);

  useEffect(() => {
    const handleMessage = msg => {
      setMessageData(prev => [...prev, msg]);
    };
    socket.on('chat message', handleMessage);
    return () => {
      socket.off('chat message', handleMessage);
    };
  }, []);

  useEffect(() => {
    if (data) {
      const finaldata = data.pages.flatMap(page => {
        return page.data.chats.data;
      });
      finaldata.reverse();
      setMessageData(finaldata);
    }
  }, [data]);

  useEffect(() => {
    if (MessageData.length > 20) {
      console.log(
        '-------------------------------------------',
        MessageData.length,
      );
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollTo({y: scrollPosition, animated: false});
      }
    }
  }, [MessageData]);

  if (isPending) {
    return <Loading />;
  }

  return (
    <GradientScreen>
      <View style={styles.container}>
        <ChatHeader
          name={name}
          imageUrl={imageUrl}
          userid={userid}
          chattype={chattype}
        />
        <ScrollView
          ref={scrollViewRef}
          style={styles.chatcontainer}
          onScroll={({nativeEvent}) => {
            if (
              nativeEvent.contentOffset.y === 0 &&
              hasNextPage &&
              !isFetchingNextPage
            ) {
              fetchNextPage();
            }
          }}
          scrollEventThrottle={400}>
          {MessageData.map((item, index) => (
            <Message
              MessageData={item}
              index={index}
              myid={myuserid}
              key={item.id}
            />
          ))}
        </ScrollView>
        {isFetching || isFetchingPreviousPage || isFetchingNextPage ? (
          <View
            style={{
              position: 'absolute',
              top: 70,
              width: '100%',
              backgroundColor: 'transparent',
              alignItems: 'center',
            }}>
            <View
              style={{
                paddingHorizontal: 20,
                paddingVertical: 5,
                borderRadius: 20,
                backgroundColor: colors.text.primary,
                borderWidth: 2,
                borderColor: colors.arrow.primary,
              }}>
              <GradientText style={styles.headingtext2}>
                Loading...
              </GradientText>
            </View>
          </View>
        ) : null}
        <ChatBottom
          socket={socket}
          senderid={myuserid}
          receiverid={userid}
          myname={myname}
          chattype={chattype}
          grouproomid={grouproomid}
          MessageData={MessageData}
        />
      </View>
    </GradientScreen>
  );
};

export default Chat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headingtext2: {
    fontFamily: 'Lexend',
    color: colors.text.primary,
    fontWeight: '900',
    fontSize: 18,
    lineHeight: 26,
  },
  chatcontainer: {
    flex: 1,
  },
});
