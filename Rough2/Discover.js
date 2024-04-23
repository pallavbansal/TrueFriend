import {View, StyleSheet, FlatList, RefreshControl} from 'react-native';
import React, {useState, useEffect} from 'react';
import BottomBar from '../Layouts/BottomBar';
import DiscoverHeader from '../Components/Discover/DiscoverHeader';
import LinearGradient from 'react-native-linear-gradient';
import {colors} from '../Styles/ColorData';
import StartStream from '../Components/Discover/StartStream';
import SingleUser from '../Components/Discover/SingleUser';
import Geolocation from '@react-native-community/geolocation';
import NoData from '../Components/Common/NoData';
import {useSelector} from 'react-redux';
import socket from '../Socket/Socket';
import {
  useLocationUpdate,
  useFetchDiscoverProfile,
} from '../Hooks/Query/HomeQuery';
import MyLoadingIndicator from '../Components/Common/MyLoadingIndicator';
import {useRefreshData} from '../Hooks/Custom/useRefreshData';
import Toast from 'react-native-toast-message';
import DiscoverSkeleton from '../Skeletons/DiscoverSkeleton';
import OptionsContainer from '../Components/Discover/OptionsContainer';
import RectangleSkeleton from '../SkeletonSmall/RectangleSkeleton';
// import ProfileIconSkeleton from '../SkeletonSmall/ProfileSkeleton';

const emptyData = [
  {
    user: {
      id: 1,
    },
  },
  {
    user: {
      id: 2,
    },
  },
  {
    user: {
      id: 3,
    },
  },
  {
    user: {
      id: 4,
    },
  },
  {
    user: {
      id: 5,
    },
  },
  {
    user: {
      id: 6,
    },
  },
];

const Discover = () => {
  const {refreshing, onRefresh} = useRefreshData();
  const {
    mutate: locationUpdate,
    isPending: isLocationUpdatePending,
    error: locationError,
    reset: locationReset,
  } = useLocationUpdate();
  const myuserid = useSelector(state => state.Auth.userid);
  console.log(useSelector(state => state.Auth.token));
  console.log('My User ID', myuserid);
  const [locationupdated, setlocationupdated] = useState(false);
  const [locationpermission, setlocationpermission] = useState({
    code: 2, // 0 = ok, 1 = location permission off for this app, 2 = device location off
    msg: '',
    msg2: '',
  });
  const [pageoption, setpageOption] = useState('Discover');
  const [showfilter, setshowfilter] = useState(false);
  const [filterdata, setfilterdata] = useState({
    items: [
      {
        item: '10 Km',
        value: 10,
      },
      {
        item: '50 Km',
        value: 50,
      },
      {
        item: '100 Km',
        value: 100,
      },
    ],
    applied: -1,
  });
  const {
    isPending: isDiscoverPending,
    error: discoverError,
    data: discoverData,
    isError: isDiscoverError,
  } = useFetchDiscoverProfile(filterdata.applied);

  function handlediscoverclick(distance) {
    setpageOption('Discover');
    setfilterdata(prev => {
      return {
        ...prev,
        applied: distance,
      };
    });
  }

  function handlenearbyclick(distance) {
    if (locationupdated) {
      setpageOption('Nearby');
      setfilterdata(prev => {
        return {
          ...prev,
          applied: distance,
        };
      });
      return;
    }
    Geolocation.getCurrentPosition(
      position => {
        setpageOption('Nearby');
        setfilterdata(prev => {
          return {
            ...prev,
            applied: distance,
          };
        });
        handlelocation();
      },
      error => {
        Toast.show({
          type: 'error',
          text1:
            error.code === 1 ? 'Location Permission Denied' : 'Location Off',
          text2:
            error.code === 1
              ? 'Please enable location permission for this app'
              : 'Please enable location in your device',
          autoHide: true,
          visibilityTime: 2000,
        });
      },
      {enableHighAccuracy: false, timeout: 100, maximumAge: 1000},
    );
  }

  useEffect(() => {
    handlelocation();
  }, []);

  useEffect(() => {
    console.log('trying to connect to socket server in discover.js');
    socket.on('connect', () => {
      console.log('connected to socket server in discover.js');
      console.log('socket id:', socket.id, socket.connected);
      socket.emit('register', myuserid);
    });
    // return () => {
    //   socket.off('connect');
    // };
  }, []);

  // if (isDiscoverPending) {
  //   // return <Loading />;
  //   return <DiscoverSkeleton />;
  // }

  async function handlelocation() {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;

        locationUpdate(
          {
            data: {
              latitude: latitude,
              longitude: longitude,
            },
          },
          {
            onSuccess: data => {
              // console.log('location updated Success', data);
              setlocationupdated(true);
              // setlocationpermission({
              //   code: 0,
              // });
            },
          },
        );
      },
      error => {
        // console.log('-----------------------------------------', error);
        // setlocationpermission({
        //   code: error.code,
        //   msg: error.code === 1 ? 'Location Permission Denied' : 'Location Off',
        //   msg2:
        //     error.code === 1
        //       ? 'Please enable location permission for this app'
        //       : 'Please enable location in your device',
        // });
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
          <MyLoadingIndicator isRefreshing={refreshing} />
          <DiscoverHeader pageoption={pageoption} />
          <OptionsContainer
            handlediscoverclick={handlediscoverclick}
            handlenearbyclick={handlenearbyclick}
            isLocationUpdatePending={isLocationUpdatePending}
            handleFilter={handleFilter}
            showfilter={showfilter}
            filterdata={filterdata}
            setfilterdata={setfilterdata}
            setshowfilter={setshowfilter}
            pageoption={pageoption}
          />

          <View
            style={{
              marginBottom: 120,
              alignItems:
                discoverData?.data?.profiles?.length > 2 ? 'center' : 'stretch',

              height: '100%',
              paddingBottom: 70,
            }}>
            <FlatList
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={() =>
                    onRefresh(['discoverprofiles', 'fetchProfile'])
                  }
                  progressViewOffset={-500}
                />
              }
              data={
                isDiscoverPending ? emptyData : discoverData?.data?.profiles
              }
              keyExtractor={item => item.user.id.toString()}
              renderItem={({item, index}) =>
                isDiscoverPending ? (
                  <RectangleSkeleton />
                ) : (
                  <SingleUser item={item} index={index} />
                )
              }
              onEndReachedThreshold={0.1}
              showsVerticalScrollIndicator={false}
              numColumns={3}
              contentContainerStyle={{paddingBottom: 80, height: '100%'}}
              ListEmptyComponent={() => <NoData />}
            />
          </View>

          <StartStream />
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
    zIndex: 2,
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
