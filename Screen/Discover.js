import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import React, {useState, useEffect} from 'react';
import BottomBar from '../Layouts/BottomBar';
import {useNavigation} from '@react-navigation/native';
import DiscoverHeader from '../Components/Discover/DiscoverHeader';
import LinearGradient from 'react-native-linear-gradient';
import {colors} from '../Styles/ColorData';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Loading from './Loading';
import Entypo from 'react-native-vector-icons/Entypo';
import GradientInput from '../Components/Common/GradientInput';
import SingleUser from '../Components/Discover/SingleUser';
import Geolocation from '@react-native-community/geolocation';
import NoData from '../Components/Common/NoData';
import {useSelector} from 'react-redux';
import {
  useLocationUpdate,
  useFetchDiscoverProfile,
} from '../Hooks/Query/HomeQuery';

// const friendsdata = [
//   {
//     id: 7,
//     name: 'Jhon Doe',
//     type: 'single',
//     liked: true,
//     imageUrl:
//       'https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=1854&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//     unseenmsg: 0,
//   },
//   {
//     id: 44,
//     name: 'Vivek',
//     type: 'single',
//     imageUrl:
//       'https://images.unsplash.com/photo-1613521140785-e85e427f8002?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//     unseenmsg: 0,
//   },
//   {
//     id: 45,
//     name: 'Vivek 2',
//     type: 'single',
//     liked: true,
//     imageUrl:
//       'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//     unseenmsg: 0,
//   },
//   {
//     id: 56,
//     name: 'Jhon',
//     type: 'single',
//     imageUrl:
//       'https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=1854&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//     liked: true,
//     unseenmsg: 0,
//   },
//   {
//     id: 200,
//     name: 'Friends Group',
//     type: 'group',
//     grouproomid: '123',
//     imageUrl:
//       'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//     unseenmsg: 0,
//   },
// ];
// const requestdata = [
//   {
//     id: 7,
//     name: 'Jhon Doe',
//     type: 'single',
//     imageUrl:
//       'https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=1854&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//   },
//   {
//     id: 44,
//     name: 'Vivek',
//     type: 'single',
//     imageUrl:
//       'https://images.unsplash.com/photo-1613521140785-e85e427f8002?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//   },
//   {
//     id: 45,
//     name: 'Collage Friends',
//     type: 'group',
//     imageUrl:
//       'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D',
//   },
// ];

const Discover = () => {
  const navigation = useNavigation();
  const {
    mutate: locationUpdate,
    isPending: isLocationPending,
    error: locationError,
    reset: locationReset,
  } = useLocationUpdate();
  const myuserid = useSelector(state => state.Auth.userid);
  console.log('My User ID', myuserid);
  const [locationupdated, setlocationupdated] = useState(false);
  const [pageoption, setpageOption] = useState('Discover');
  const [showfilter, setshowfilter] = useState(false);
  const [filterdata, setfilterdata] = useState({
    items: [
      {
        item: '10 Km',
        value: '10',
      },
      {
        item: '50 Km',
        value: '50',
      },
      {
        item: '100 Km',
        value: '100',
      },
      // {
      //   item: 'All',
      //   value: '50',
      // },
    ],
    applied: '50',
  });
  const {
    isPending: isDiscoverPending,
    error: discoverError,
    data: discoverData,
    isError: isDiscoverError,
  } = useFetchDiscoverProfile(filterdata.applied);

  useEffect(() => {
    if (!locationupdated) {
      handlelocation();
    }
  }, [locationupdated]);

  if (isDiscoverPending) {
    return <Loading />;
  }

  function handlelocation() {
    console.log('location update start');
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        console.log(latitude, longitude);
        locationUpdate(
          {
            data: {
              latitude: latitude,
              longitude: longitude,
            },
          },
          {
            onSuccess: data => {
              console.log('location updated Success', data);
              setlocationupdated(true);
            },
          },
        );
      },
      error => {
        // console.error(error);
      },
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
  }

  const handleFilter = () => {
    setshowfilter(!showfilter);
  };

  return (
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      colors={colors.gradients.discovergradient}
      style={styles.screen}>
      <View style={styles.screen}>
        <View style={styles.screencontainer}>
          <DiscoverHeader />

          <View style={[styles.optioncontainer]}>
            <TouchableOpacity onPress={() => setpageOption('Discover')}>
              <Text
                style={[
                  styles.optiontext,
                  {
                    color:
                      pageoption === 'Discover'
                        ? colors.arrow.tertiary
                        : colors.text.primary,
                  },
                ]}>
                Discover
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setpageOption('Nearby')}>
              <Text
                style={[
                  styles.optiontext,
                  {
                    color:
                      pageoption === 'Nearby'
                        ? colors.arrow.tertiary
                        : colors.text.primary,
                  },
                ]}>
                Nearby
              </Text>
            </TouchableOpacity>

            <View
              style={{
                position: 'relative',
                marginLeft: 'auto',
                marginRight: 10,
              }}>
              {pageoption === 'Nearby' && (
                <TouchableOpacity onPress={handleFilter}>
                  <MaterialIcons
                    name="filter-list"
                    size={24}
                    color={colors.text.primary}
                    style={{
                      marginLeft: 'auto',
                    }}
                  />
                </TouchableOpacity>
              )}
              {pageoption === 'Nearby' && showfilter && (
                <GradientInput style={styles.gradientborder2}>
                  <View style={styles.dropcontainer}>
                    {filterdata.items.map((item, index) => (
                      <View key={index} style={styles.singleitem}>
                        <TouchableOpacity
                          onPress={() => {
                            setfilterdata(prev => {
                              return {
                                ...prev,
                                applied: item.value,
                              };
                            });
                            setshowfilter(false);
                          }}>
                          <Text
                            style={[
                              styles.itemtext,
                              {
                                color:
                                  filterdata.applied === item.value
                                    ? colors.arrow.tertiary
                                    : colors.login.headingtext2,
                              },
                            ]}>
                            {item.item}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    ))}
                  </View>
                </GradientInput>
              )}
            </View>
          </View>

          <View style={{marginBottom: 120, alignItems: 'center'}}>
            {discoverData?.data?.profiles ? (
              <FlatList
                data={discoverData?.data?.profiles}
                keyExtractor={item => item.user.id.toString()}
                renderItem={({item, index}) => (
                  <SingleUser item={item} index={index} />
                )}
                onEndReachedThreshold={0.1}
                showsVerticalScrollIndicator={false}
                numColumns={3}
                contentContainerStyle={{paddingBottom: 80}}
              />
            ) : (
              <NoData />
            )}
          </View>

          <View
            style={{
              position: 'absolute',
              bottom: 75,
              right: 20,
              padding: 6,
              borderRadius: 48,
              backgroundColor: colors.text.primarylight,
              // backgroundColor: 'black',
              // backgroundColor: colors.arrow.primary,
              elevation: 50,
            }}>
            <TouchableOpacity
              style={{
                backgroundColor: colors.text.primary,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 40,
                width: 74,
                height: 74,
                elevation: 50,
              }}
              onPress={() =>
                navigation.navigate('StartStream', {
                  isCreator: true,
                })
              }>
              <Entypo
                name="video-camera"
                size={40}
                color={colors.arrow.secondary}
              />
            </TouchableOpacity>
          </View>

          <BottomBar />
        </View>
      </View>
    </LinearGradient>
  );
};

export default Discover;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  screencontainer: {
    flex: 1,
  },
  optioncontainer: {
    width: '100%',
    flexDirection: 'row',
    padding: 10,
    gap: 10,
  },
  optiontext: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  gradientborder2: {
    position: 'absolute',
    top: 35,
    right: -15,
    padding: 2,
    borderRadius: 20,
    overflow: 'hidden',
    alignSelf: 'flex-start',
    zIndex: 1,
  },
  dropcontainer: {
    width: 100,
    backgroundColor: colors.text.primary,
    borderRadius: 18,
    padding: 10,
    paddingHorizontal: 15,
    gap: 10,
    alignSelf: 'flex-start',
  },
  singleitem: {
    // width: '100%',
  },
  itemtext: {
    color: colors.login.headingtext2,
    fontSize: 14,
    fontWeight: 'bold',
  },
});
