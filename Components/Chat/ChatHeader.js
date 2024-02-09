import LinearGradient from 'react-native-linear-gradient';
import {colors} from '../../Styles/ColorData';
import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import GradientInput from '../Common/GradientInput';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import ReportUser from './ReportUser';

const ChatHeader = ({name, imageUrl, userid, chattype}) => {
  const [optionsdialog, setoptionsdialog] = useState(false);
  const [reportdialog, setreportdialog] = useState(false);
  const [filterdata, setfilterdata] = useState({
    items: [],
  });

  useEffect(() => {
    if (chattype == 'group') {
      setfilterdata({
        items: [
          {
            item: 'Leave Group',
          },
          {
            item: 'Report Group',
          },
          {
            item: 'Settings',
          },
        ],
      });
    }
    if (chattype == 'single') {
      setfilterdata({
        items: [
          {
            item: 'Report User',
          },
          {
            item: 'Settings',
          },
        ],
      });
    }
  }, [chattype]);

  const handlerreportdialog = () => {
    setreportdialog(!reportdialog);
  };
  const handleroptionsdialog = () => {
    setoptionsdialog(!optionsdialog);
  };
  const handleoptionpress = item => {
    setoptionsdialog(false);
    if (item.item == 'Report User' || item.item == 'Report Group') {
      handlerreportdialog();
    }
    console.log(item);
  };

  const handleaudiocall = () => {
    console.log('call');
  };

  const handlevideocall = () => {
    console.log('video');
  };

  return (
    <>
      <LinearGradient
        colors={colors.gradients.buttongradient}
        style={styles.headercontainer}>
        <View>
          <Image
            source={{uri: imageUrl}}
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              borderWidth: 1,
              borderColor: 'white',
            }}
          />
        </View>
        <View>
          <Text style={styles.headingtext2}>{name}</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            gap: 10,
            marginLeft: 'auto',
          }}>
          {chattype == 'single' && (
            <TouchableOpacity onPress={handleaudiocall}>
              <Ionicons name="call" size={24} color="white" />
            </TouchableOpacity>
          )}
          {chattype == 'single' && (
            <TouchableOpacity onPress={handlevideocall}>
              <FontAwesome5 name="video" size={24} color="white" />
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={handleroptionsdialog}>
            <Entypo name="dots-three-vertical" size={24} color="white" />
          </TouchableOpacity>
        </View>
        {optionsdialog && (
          <GradientInput style={styles.gradientborder2}>
            <View style={styles.dropcontainer}>
              {filterdata.items.map((item, index) => (
                <View key={index} style={styles.singleitem}>
                  <TouchableOpacity onPress={() => handleoptionpress(item)}>
                    <Text style={[styles.itemtext]}>{item.item}</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </GradientInput>
        )}
      </LinearGradient>
      {reportdialog && <ReportUser close={handlerreportdialog} />}
    </>
  );
};

export default ChatHeader;

const styles = StyleSheet.create({
  headercontainer: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    width: '100%',
  },
  headingtext2: {
    fontFamily: 'Lexend',
    color: colors.text.primary,
    fontWeight: '900',
    fontSize: 18,
    lineHeight: 26,
  },
  gradientborder2: {
    position: 'absolute',
    top: 65,
    right: 5,
    padding: 2,
    borderRadius: 20,
    overflow: 'hidden',
    alignSelf: 'flex-start',
    zIndex: 1,
  },
  dropcontainer: {
    // width: 100,
    backgroundColor: colors.text.primary,
    borderRadius: 18,
    padding: 10,
    paddingHorizontal: 15,
    gap: 10,
    alignSelf: 'flex-start',
  },
  singleitem: {},
  itemtext: {
    color: colors.login.headingtext2,
    fontSize: 14,
    fontWeight: 'bold',
  },
});
