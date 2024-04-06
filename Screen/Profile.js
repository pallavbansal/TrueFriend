import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
  RefreshControl,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import BottomBar from '../Layouts/BottomBar';
import GradientScreen from '../Layouts/GradientScreen';
import {colors} from '../Styles/ColorData';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SingleMedia from '../Components/Profile/SingleMedia';
import {useFetchProfile} from '../Hooks/Query/ProfileQuery';
import ProfileTop from '../Components/Profile/ProfileTop';
import EditProfile from '../Components/Profile/EditProfile';
import DetailMedia from '../Components/Profile/DetailMedia';
import Loading from './Loading';
import {useRefreshData} from '../Hooks/Custom/useRefreshData';
import MyLoadingIndicator from '../Components/Common/MyLoadingIndicator';
import {useNavigation} from '@react-navigation/native';

const Profile = () => {
  const {isPending, error, data: profiledata, isError} = useFetchProfile();
  const navigation = useNavigation();
  const {refreshing, onRefresh} = useRefreshData();
  const [selectedmediatype, setselectedmediatype] = useState('pictures');
  const [showeditmodel, setshoweditmodel] = useState(false);
  const [showdetailmodel, setshowdetailmodel] = useState({
    show: false,
    data: null,
  });
  const [picturedata2, setpicturedata2] = useState([]);
  const [videodata2, setvideodata2] = useState([]);

  useEffect(() => {
    if (profiledata) {
      setpicturedata2([]);
      setvideodata2([]);
      profiledata.data.profile.media.map(item => {
        item.post_media.map(item2 => {
          if (item2.media_type === '1') {
            setpicturedata2(prev => [...prev, item2]);
          } else {
            setvideodata2(prev => [...prev, item2]);
          }
        });
      });
    }
  }, [profiledata]);

  function handleeditprofile() {
    setshoweditmodel(true);
  }
  function closedetailmodel() {
    setshowdetailmodel({
      show: false,
      data: null,
    });
  }

  function handlerecharge() {
    navigation.navigate('Recharge');
    // navigation.navigate('Payment');
  }

  if (isPending) {
    return <Loading />;
  }

  const finaldata = profiledata.data.profile;
  const Biodata = [
    {
      Sex: finaldata.sex.toUpperCase(),
    },
    {
      Religion: finaldata.religion.toUpperCase(),
    },
    {
      Drinking: finaldata.drinking.toUpperCase(),
    },
    {
      Smoking: finaldata.smoking.toUpperCase(),
    },
    {
      Followers: finaldata.followers_count,
    },
    {
      Looking_For: finaldata.looking_for.toUpperCase(),
    },
    {
      Marital_Status: finaldata.marital_status.toUpperCase(),
    },
  ];
  if (showeditmodel) {
    return (
      <EditProfile
        setshoweditmodel={setshoweditmodel}
        initialdata={finaldata}
      />
    );
  }

  return (
    <GradientScreen>
      <View style={styles.container}>
        <MyLoadingIndicator isRefreshing={refreshing} />
        <View style={styles.imagecontainer}>
          <ProfileTop
            finaldata={finaldata}
            handleeditprofile={handleeditprofile}
            ismyid={true}
          />
        </View>
        <View style={styles.biocontainer}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 10,
            }}>
            <Text style={styles.headingtext}>{finaldata.name}</Text>
            <TouchableOpacity
              onPress={handlerecharge}
              style={{
                backgroundColor: colors.arrow.primary,
                padding: 7,
                paddingHorizontal: 15,
                borderRadius: 50,
              }}>
              <Text
                style={{
                  color: 'white',
                }}>
                Recharge
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={{flexDirection: 'row', gap: 5, alignItems: 'center'}}>
              <MaterialIcons
                name="add-call"
                size={18}
                color={colors.login.headingtext2}
              />
              <Text style={styles.headingtext3}>{finaldata.phone_number}</Text>
            </View>
            <View style={{flexDirection: 'row', gap: 5, alignItems: 'center'}}>
              <MaterialIcons
                name="email"
                size={18}
                color={colors.login.headingtext2}
              />
              <Text style={styles.headingtext3}>{finaldata.email}</Text>
            </View>
          </View>
          <View>
            <Text style={styles.headingtext2}>Short Bio</Text>
          </View>
          <View>
            {finaldata.bio ? (
              <Text style={styles.headingtext3}>{finaldata.bio}</Text>
            ) : (
              <Text style={styles.headingtext3}>No Bio</Text>
            )}
          </View>
        </View>
        <View style={styles.mediacontainer}>
          <View style={styles.optionscontainer}>
            <TouchableOpacity onPress={() => setselectedmediatype('bio')}>
              <Text
                style={[
                  styles.optiontext,
                  {
                    color:
                      selectedmediatype === 'bio'
                        ? colors.arrow.tertiary
                        : colors.arrow.primary,
                  },
                ]}>
                Bio
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setselectedmediatype('pictures')}>
              <Text
                style={[
                  styles.optiontext,
                  {
                    color:
                      selectedmediatype === 'pictures'
                        ? colors.arrow.tertiary
                        : colors.arrow.primary,
                  },
                ]}>
                Pictures
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setselectedmediatype('videos')}>
              <Text
                style={[
                  styles.optiontext,
                  {
                    color:
                      selectedmediatype === 'videos'
                        ? colors.arrow.tertiary
                        : colors.arrow.primary,
                  },
                ]}>
                Videos
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={[
              styles.medialistcontainer,
              selectedmediatype === 'pictures' && picturedata2.length > 3
                ? {alignItems: 'center'}
                : {},
              selectedmediatype === 'videos' && videodata2.length > 3
                ? {alignItems: 'center'}
                : {},
            ]}>
            {selectedmediatype === 'bio' && (
              <View
                style={{
                  width: '100%',
                  height: '100%',
                  padding: 15,
                }}>
                <ScrollView>
                  {Biodata.map((item, index) => {
                    const keys = Object.keys(item);
                    const values = Object.values(item);
                    return (
                      <View
                        key={index}
                        style={{
                          marginBottom: 10,
                          marginHorizontal: 10,
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                          }}>
                          <Text style={styles.headingtext3}>{keys[0]}</Text>
                          <Text style={styles.headingtext3}>{values[0]}</Text>
                        </View>
                      </View>
                    );
                  })}
                </ScrollView>
              </View>
            )}

            {selectedmediatype === 'pictures' &&
              (picturedata2.length > 0 ? (
                <FlatList
                  refreshControl={
                    <RefreshControl
                      refreshing={refreshing}
                      onRefresh={() => onRefresh(['fetchProfile'])}
                      progressViewOffset={-1000}
                    />
                  }
                  data={picturedata2}
                  keyExtractor={item => item.id.toString()}
                  renderItem={({item, index}) => (
                    <TouchableOpacity
                      onPress={() =>
                        setshowdetailmodel({
                          show: true,
                          data: item,
                        })
                      }>
                      <SingleMedia item={item} index={index} />
                    </TouchableOpacity>
                  )}
                  onEndReachedThreshold={0.1}
                  showsVerticalScrollIndicator={false}
                  numColumns={4}
                  contentContainerStyle={{paddingBottom: 80}}
                />
              ) : (
                <Text
                  style={{
                    color: colors.login.headingtext2,
                    marginTop: 50,
                    fontSize: 20,
                    fontWeight: '900',
                    textAlign: 'center',
                  }}>
                  No Pictures
                </Text>
              ))}

            {selectedmediatype === 'videos' &&
              (videodata2.length > 0 ? (
                <FlatList
                  refreshControl={
                    <RefreshControl
                      refreshing={refreshing}
                      onRefresh={() => onRefresh(['fetchProfile'])}
                      progressViewOffset={-1000}
                    />
                  }
                  data={videodata2}
                  keyExtractor={item => item.id.toString()}
                  renderItem={({item, index}) => (
                    <TouchableOpacity
                      onPress={() =>
                        setshowdetailmodel({
                          show: true,
                          data: item,
                        })
                      }>
                      <SingleMedia item={item} index={index} />
                    </TouchableOpacity>
                  )}
                  onEndReachedThreshold={0.1}
                  showsVerticalScrollIndicator={false}
                  numColumns={4}
                  contentContainerStyle={{paddingBottom: 80}}
                />
              ) : (
                <Text
                  style={{
                    color: colors.login.headingtext2,
                    marginTop: 50,
                    fontSize: 20,
                    fontWeight: '900',
                    textAlign: 'center',
                  }}>
                  No Videos
                </Text>
              ))}
          </View>
        </View>
        {showdetailmodel.show && (
          <DetailMedia
            data={showdetailmodel.data}
            close={closedetailmodel}
            ismyid={true}
          />
        )}
        <BottomBar />
      </View>
    </GradientScreen>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagecontainer: {
    flex: 2,
    width: '100%',
    backgroundColor: 'yellow',
    position: 'relative',
  },
  biocontainer: {
    paddingHorizontal: 15,
    flex: 1.3,
    width: '100%',
    justifyContent: 'space-evenly',
  },
  mediacontainer: {
    flex: 3,
    width: '100%',
  },
  headingtext: {
    fontFamily: 'Lexend',
    color: colors.login.headingtext,
    fontWeight: '900',
    fontSize: 28,
    lineHeight: 36,
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
  optionscontainer: {
    paddingHorizontal: 15,
    width: '100%',
    flexDirection: 'row',
    gap: 20,
    marginBottom: 10,
  },
  optiontext: {
    fontFamily: 'Lexend',
    fontWeight: '900',
    fontSize: 18,
    lineHeight: 26,
  },
  medialistcontainer: {
    flex: 1,
    width: '100%',
    // alignItems: 'center',
  },
});
