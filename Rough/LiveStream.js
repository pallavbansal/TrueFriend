import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {colors} from '../Styles/ColorData';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';

const image1 =
  'https://plus.unsplash.com/premium_photo-1673977132933-2a028c2f05a8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8d29tZW4lMjBkcmVzc3xlbnwwfHwwfHx8MA%3D%3D';
const image2 =
  'https://images.unsplash.com/photo-1534349762230-e0cadf78f5da?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
const LiveStream = () => {
  return (
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      colors={colors.gradients.buttongradient}
      style={{flex: 1}}>
      <View style={styles.topcontainer}>
        <Image source={{uri: image1}} style={{height: '100%', width: '100%'}} />
        <Image
          source={{uri: image2}}
          style={{
            position: 'absolute',
            top: 26,
            right: 26,
            height: 140,
            width: 104,
            borderRadius: 20,
          }}
        />
        <View style={styles.namecontainer}>
          <View style={styles.nametopcontainer}>
            <Text
              style={{
                color: 'white',
              }}>
              Matched
            </Text>
            <AntDesign
              name="heart"
              size={18}
              color={colors.arrow.heart}
              style={{
                position: 'absolute',
                right: -2,
                top: -5,
                transform: [{rotate: '-10deg'}],
              }}
            />
          </View>
          <Text
            style={{
              color: 'white',
              fontSize: 28,
              fontWeight: 'bold',
            }}>
            Sara Christin
          </Text>
        </View>
        <View style={styles.statsiconcontainer}>
          <View style={styles.singlestatsicon}>
            <TouchableOpacity>
              <AntDesign name="like2" size={24} color="white" />
            </TouchableOpacity>
            <Text
              style={{
                color: 'white',
              }}>
              1.6K
            </Text>
          </View>

          <View style={styles.singlestatsicon}>
            <TouchableOpacity>
              <AntDesign name="dislike2" size={24} color="white" />
            </TouchableOpacity>
            <Text
              style={{
                color: 'white',
              }}>
              256
            </Text>
          </View>

          <View style={styles.singlestatsicon}>
            <TouchableOpacity>
              <AntDesign name="eyeo" size={24} color="white" />
            </TouchableOpacity>
            <Text
              style={{
                color: 'white',
              }}>
              1.6K
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.bottomcontainer1}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          colors={colors.gradients.calloutergradient}
          style={styles.gradienticon}>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            colors={colors.gradients.callinnergradient}
            style={styles.calliconcontainer}>
            <Ionicons name="call" size={28} color="white" />
          </LinearGradient>
        </LinearGradient>
      </View>
      <View style={styles.bottomcontainer2}>
        <View style={styles.bottomiconcontainer}>
          <Feather name="upload" size={24} color="white" />
          <Ionicons name="chatbox-ellipses-outline" size={24} color="white" />
        </View>
        <View style={styles.bottomiconcontainer}>
          <MaterialIcons
            name="published-with-changes"
            size={24}
            color="white"
          />
          <Feather name="video-off" size={24} color="white" />
        </View>
      </View>
    </LinearGradient>
  );
};

export default LiveStream;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  topcontainer: {
    flex: 1,
    backgroundColor: 'red',
    borderBottomLeftRadius: 75,
    borderBottomRightRadius: 75,
    marginBottom: 100,
    overflow: 'hidden',
  },
  bottomcontainer1: {
    position: 'absolute',
    bottom: 62.5,
    alignSelf: 'center',
    borderRadius: 40,
    zIndex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomcontainer2: {
    height: 100,
    width: '100%',
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  gradienticon: {
    height: 85,
    width: 85,
    borderRadius: 42.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  calliconcontainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 75,
    width: 75,
    borderRadius: 40,
  },
  bottomiconcontainer: {
    flexDirection: 'row',
    gap: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statsiconcontainer: {
    position: 'absolute',
    bottom: 75,
    right: 26,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  singlestatsicon: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
  },

  namecontainer: {
    position: 'absolute',
    alignItems: 'center',
    bottom: 100,
    left: 26,
  },
  nametopcontainer: {
    position: 'relative',
    flexDirection: 'row',
    marginRight: 'auto',
    gap: 10,
    backgroundColor: colors.arrow.primary,
    padding: 2,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
});
