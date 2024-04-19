import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
  RefreshControl,
  Modal,
} from 'react-native';
import {useFetchProfileById} from '../Hooks/Query/ProfileQuery';
import React, {useEffect, useState} from 'react';
import BottomBar from '../Layouts/BottomBar';
import GradientScreen from '../Layouts/GradientScreen';
import {colors} from '../Styles/ColorData';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SingleMedia from '../Components/Profile/SingleMedia';
import ProfileTop from '../Components/Profile/ProfileTop';
import DetailMedia from '../Components/Profile/DetailMedia';
import {
  useSendRequest,
  useRequestCurrentStatus,
} from '../Hooks/Query/RequestQuery';
import Loading from './Loading';
import Toast from 'react-native-toast-message';
import MyLoadingIndicator from '../Components/Common/MyLoadingIndicator';
import {useRefreshData} from '../Hooks/Custom/useRefreshData';

const ProfileById = ({route}) => {
  const {userid} = route.params;
  const {refreshing, onRefresh} = useRefreshData();
  {
    /* Friends,Sent,Received,Noaction */
  }
  const [request_status, setrequest_status] = useState('Noaction');
  const {
    isPending,
    error,
    data: profiledata,
    isError,
  } = useFetchProfileById(userid);
  const {
    isPending: isRequestStatusPending,
    error: requestStatusError,
    data: requestStatusdata,
    isError: isRequestStatusError,
  } = useRequestCurrentStatus(userid);
  const [selectedmediatype, setselectedmediatype] = useState('post');
  const [showdetailmodel, setshowdetailmodel] = useState({
    show: false,
    data: null,
  });
  const {mutate: sendrequest} = useSendRequest();
  const [postdata, setpostdata] = useState([]);
  const [otherdata, setotherdata] = useState([]);

  useEffect(() => {
    if (profiledata) {
      setotherdata({
        profile_picture: profiledata.data.profile.profile_picture,
        name: profiledata.data.profile.name,
      });
      setpostdata(profiledata.data.profile.media);
    }
  }, [profiledata]);

  useEffect(() => {
    if (requestStatusdata) {
      if (requestStatusdata.data.friend_request_status === 'FRIENDS') {
        setrequest_status('Friends');
      } else if (
        requestStatusdata.data.friend_request_status === 'REQUEST SENT'
      ) {
        setrequest_status('Sent');
      } else if (
        requestStatusdata.data.friend_request_status === 'REQUEST RECEIVED'
      ) {
        setrequest_status('Received');
      } else {
        setrequest_status('Noaction');
      }
    }
  }, [requestStatusdata]);

  function closedetailmodel() {
    setshowdetailmodel({
      show: false,
      data: null,
    });
  }

  function handlepostdelete(post_id) {}

  // acceptrequest,sendrequest,rejectrequest
  function requestaction(option) {
    console.log('requestaction', option);
    if (option === 'sendrequest') {
      const finaldata = {
        receiver_id: userid,
      };
      sendrequest(
        {data: finaldata},
        {
          onSuccess: data => {
            console.log('Request success', data);
            setrequest_status('Sent');
            Toast.show({
              type: 'success',
              text1: 'Request Sent',
              visibilityTime: 2000,
              autoHide: true,
            });
          },
        },
      );
    }
  }

  if (isPending || isRequestStatusPending) {
    return <Loading />;
  }

  console.log('request current status', requestStatusdata);

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
  // console.log('finaldata', finaldata);

  // 'fetchProfileById', 'requestCurrentStatus'

  return (
    <GradientScreen>
      <View style={styles.container}>
        <MyLoadingIndicator isRefreshing={refreshing} />
        <View style={styles.imagecontainer}>
          <ProfileTop
            finaldata={finaldata}
            ismyid={false}
            request_status={request_status}
            setrequest_status={setrequest_status}
            requestaction={requestaction}
            call_amount={finaldata.call_amount}
          />
        </View>
        <View style={styles.biocontainer}>
          <View>
            <Text style={styles.headingtext}>{finaldata.name}</Text>
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
              selectedmediatype === 'post' && postdata.length > 3
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
                <ScrollView
                  refreshControl={
                    <RefreshControl
                      refreshing={refreshing}
                      onRefresh={() =>
                        onRefresh(['fetchProfileById', 'requestCurrentStatus'])
                      }
                      progressViewOffset={-1000}
                    />
                  }>
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

            {selectedmediatype === 'post' &&
              (postdata.length > 0 ? (
                <FlatList
                  refreshControl={
                    <RefreshControl
                      refreshing={refreshing}
                      onRefresh={() =>
                        onRefresh(['fetchProfileById', 'requestCurrentStatus'])
                      }
                      progressViewOffset={-1000}
                    />
                  }
                  data={postdata}
                  keyExtractor={item => item.id.toString()}
                  renderItem={({item, index}) => (
                    <TouchableOpacity
                      onPress={() =>
                        setshowdetailmodel({
                          show: true,
                          data: item,
                        })
                      }>
                      <SingleMedia
                        item={
                          item.post_media.find(
                            media => media.media_type === '1',
                          ) || item.post_media[0]
                        }
                        index={index}
                      />
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
                  No Posts
                </Text>
              ))}
          </View>
        </View>
        <Modal
          animationType="slide"
          transparent={false}
          visible={showdetailmodel.show}
          onRequestClose={() => {
            setshowdetailmodel({
              show: false,
              data: null,
            });
          }}>
          <GradientScreen>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <DetailMedia
                item={showdetailmodel.data}
                otherdata={otherdata}
                ismyid={false}
                handlepostdelete={handlepostdelete}
              />
            </View>
          </GradientScreen>
        </Modal>
        <BottomBar />
      </View>
    </GradientScreen>
  );
};

export default ProfileById;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagecontainer: {
    flex: 1.6,
    width: '100%',
    backgroundColor: 'yellow',
    position: 'relative',
  },
  biocontainer: {
    paddingHorizontal: 15,
    flex: 0.9,
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
