import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {colors} from '../../Styles/ColorData';

const myid = '1';

const Message = ({MessageData}) => {
  return (
    <View
      style={[
        styles.container,
        MessageData.sender === myid ? styles.right : styles.left,
      ]}>
      <View style={styles.messageheader}>
        <Text
          style={[
            MessageData.sender === myid ? styles.nametext1 : styles.nametext2,
          ]}>
          {MessageData.senderName}
        </Text>
        <Text style={styles.timetext}>{MessageData.time}</Text>
      </View>
      <Text style={styles.messagetext}>{MessageData.message}</Text>
    </View>
  );
};

export default Message;

const styles = StyleSheet.create({
  container: {
    maxWidth: '70%',
    minWidth: '30%',
    backgroundColor: 'white',
    margin: 10,
    padding: 10,
    paddingHorizontal: 20,
  },
  left: {
    alignSelf: 'flex-start',
    borderTopRightRadius: 35,
    borderBottomRightRadius: 35,
    borderBottomLeftRadius: 35,
  },
  right: {
    alignSelf: 'flex-end',
    borderBottomRightRadius: 35,
    borderBottomLeftRadius: 35,
    borderTopLeftRadius: 35,
  },
  messageheader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    gap: 20,
  },
  timetext: {
    fontFamily: 'Lexend',
    color: colors.arrow.primary,
    fontWeight: '900',
    fontSize: 12,
    lineHeight: 18,
  },
  nametext1: {
    fontFamily: 'Lexend',
    color: colors.arrow.primary,
    fontWeight: '900',
    fontSize: 14,
    lineHeight: 20,
  },
  nametext2: {
    fontFamily: 'Lexend',
    color: colors.arrow.quadary,
    fontWeight: '900',
    fontSize: 14,
    lineHeight: 20,
  },
  messagetext: {
    fontFamily: 'Lexend',
    color: colors.login.headingtext2,
    fontWeight: '900',
    fontSize: 14,
    lineHeight: 20,
  },
});
