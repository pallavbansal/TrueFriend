import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {colors} from '../../Styles/ColorData';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';

const SingleFeedProfile = ({item}) => {
  return (
    <View style={styles.container}>
      <View style={styles.topcontainer}>
        <View>
          <Image
            source={{uri: item.imageUrl}}
            style={{
              height: 50,
              width: 50,
              borderRadius: 50,
              borderColor: 'white',
              borderWidth: 2,
            }}
          />
        </View>
        <View>
          <Text style={styles.headingtext2}>{item.name}</Text>
          <Text style={styles.headingtext3}>{'User Id ' + item.id}</Text>
        </View>
      </View>
      <View style={styles.profilecontainer}>
        <Image
          source={{uri: item.imageUrl}}
          style={{height: 250, width: '100%'}}
        />
      </View>
      <View style={styles.actioncontainer}>
        <TouchableOpacity>
          <AntDesign
            name="like2"
            size={24}
            color={colors.socialfeed.actionicons}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <AntDesign
            name="dislike2"
            size={24}
            color={colors.socialfeed.actionicons}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons
            name="chatbubble-outline"
            size={24}
            color={colors.socialfeed.actionicons}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            marginLeft: 'auto',
          }}>
          <AntDesign
            name="download"
            size={24}
            color={colors.socialfeed.actionicons}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SingleFeedProfile;

const styles = StyleSheet.create({
  container: {
    gap: 5,
    marginTop: 10,
    marginBottom: 10,
  },
  topcontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginLeft: 5,
  },
  profilecontainer: {
    elevation: 5,
    backgroundColor: 'white',
  },
  actioncontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    gap: 10,
  },
  headingtext2: {
    fontFamily: 'Lexend',
    color: colors.login.headingtext,
    fontWeight: '900',
    fontSize: 18,
    lineHeight: 26,
  },
  headingtext3: {
    fontFamily: 'Lexend',
    color: colors.login.headingtext2,
    fontWeight: '900',
    fontSize: 14,
    lineHeight: 22.4,
  },
});
