import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import React, {useState, useEffect} from 'react';
import BottomBar from '../Layouts/BottomBar';
import {useNavigation} from '@react-navigation/native';
import DiscoverHeader from '../Components/Discover/DiscoverHeader';
import LinearGradient from 'react-native-linear-gradient';
import {colors} from '../Styles/ColorData';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import GradientInput from '../Components/Common/GradientInput';
import SingleUser from '../Components/Discover/SingleUser';
import Geolocation from '@react-native-community/geolocation';
import {
  useLocationUpdate,
  useFetchDiscoverProfile,
} from '../Hooks/Query/HomeQuery';

const categories = [
  {
    id: '1',
    name: 'smartphones',
    status: 'online',
    imageUrl:
      'https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=1854&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: '2',
    name: 'laptops',
    status: 'online',
    imageUrl:
      'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: '3',
    name: 'fragrances',
    imageUrl:
      'https://images.unsplash.com/photo-1613521140785-e85e427f8002?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: '4',
    name: 'skincare',
    imageUrl:
      'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: '5',
    name: 'groceries',
    status: 'online',
    imageUrl:
      'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: '6',
    name: 'home-decoration',
    imageUrl:
      'https://images.unsplash.com/photo-1534349762230-e0cadf78f5da?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: '7',
    name: 'furniture',
    status: 'offline',
    imageUrl:
      'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGZ1cm5pdHVyZXxlbnwwfHwwfHx8MA%3D%3D',
  },
  {
    id: '8',
    name: 'tops',
    status: 'online',
    imageUrl:
      'https://images.unsplash.com/photo-1525171254930-643fc658b64e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dG9wc3xlbnwwfHwwfHx8MA%3D%3D',
  },
  {
    id: '9',
    name: 'womens-dresses',
    status: 'online',
    imageUrl:
      'https://plus.unsplash.com/premium_photo-1673977132933-2a028c2f05a8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8d29tZW4lMjBkcmVzc3xlbnwwfHwwfHx8MA%3D%3D',
  },
  {
    id: '10',
    name: 'womens-shoes',
    imageUrl:
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d29tZW4lMjBzaG9lc3xlbnwwfHwwfHx8MA%3D%3D',
  },
  {
    id: '11',
    name: 'mens-shirts',
    imageUrl:
      'https://images.unsplash.com/photo-1603251579431-8041402bdeda?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bWVuJTIwc2hpcnR8ZW58MHx8MHx8fDA%3D',
  },
  {
    id: '12',
    name: 'mens-shoes',
    status: 'online',
    imageUrl:
      'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bWVuJTIwc2hvZXN8ZW58MHx8MHx8fDA%3D',
  },
  {
    id: '13',
    name: 'mens-watches',
    status: 'offline',
    imageUrl:
      'https://images.unsplash.com/photo-1524738258074-f8125c6a7588?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWVuJTIwd2F0Y2h8ZW58MHx8MHx8fDA%3D',
  },
  {
    id: '14',
    name: 'womens-watches',
    status: 'online',
    imageUrl:
      'https://images.unsplash.com/photo-1604242692760-2f7b0c26856d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8d29tZW4lMjB3YXRjaGVzfGVufDB8fDB8fHww',
  },
  {
    id: '15',
    name: 'womens-bags',
    imageUrl:
      'https://images.unsplash.com/photo-1559563458-527698bf5295?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d29tZW4lMjBiYWdzfGVufDB8fDB8fHww',
  },
  {
    id: '16',
    name: 'womens-jewellery',
    status: 'online',
    imageUrl:
      'https://images.unsplash.com/photo-1612314317004-d650718f188a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHdvbWVuJTIwamV3ZWxsZXJ5fGVufDB8fDB8fHww',
  },
  {
    id: '17',
    name: 'sunglasses',
    imageUrl:
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3VuZ2xhc3Nlc3xlbnwwfHwwfHx8MA%3D%3D',
  },
  {
    id: '18',
    name: 'automotive',
    imageUrl:
      'https://images.unsplash.com/photo-1594420307680-4e404e105d86?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YXV0b21hdGl2ZXxlbnwwfHwwfHx8MA%3D%3D',
  },
  {
    id: '19',
    name: 'motorcycle',
    status: 'online',
    imageUrl:
      'https://images.unsplash.com/photo-1559289431-9f12ee08f8b6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bW90b3JjeWNsZXxlbnwwfHwwfHx8MA%3D%3D',
  },
  {
    id: '20',
    name: 'lighting',
    status: 'offline',
    imageUrl:
      'https://images.unsplash.com/photo-1529854140025-25995121f16f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bGlnaHQlMjBidWxifGVufDB8fDB8fHww',
  },
  {
    id: '21',
    name: 'smartphones',
    imageUrl:
      'https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=1854&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: '22',
    name: 'laptops',
    imageUrl:
      'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: '23',
    name: 'fragrances',
    imageUrl:
      'https://images.unsplash.com/photo-1613521140785-e85e427f8002?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: '24',
    name: 'skincare',
    imageUrl:
      'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: '25',
    name: 'groceries',
    status: 'offline',
    imageUrl:
      'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: '26',
    name: 'home-decoration',
    status: 'online',
    imageUrl:
      'https://images.unsplash.com/photo-1534349762230-e0cadf78f5da?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: '27',
    name: 'furniture',
    imageUrl:
      'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGZ1cm5pdHVyZXxlbnwwfHwwfHx8MA%3D%3D',
  },
  {
    id: '28',
    name: 'tops',
    status: 'offline',
    imageUrl:
      'https://images.unsplash.com/photo-1525171254930-643fc658b64e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dG9wc3xlbnwwfHwwfHx8MA%3D%3D',
  },
  {
    id: '29',
    name: 'womens-dresses',
    status: 'online',
    imageUrl:
      'https://plus.unsplash.com/premium_photo-1673977132933-2a028c2f05a8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8d29tZW4lMjBkcmVzc3xlbnwwfHwwfHx8MA%3D%3D',
  },
  {
    id: '30',
    name: 'womens-shoes',
    imageUrl:
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d29tZW4lMjBzaG9lc3xlbnwwfHwwfHx8MA%3D%3D',
  },
  {
    id: '31',
    name: 'mens-shirts',
    status: 'online',
    imageUrl:
      'https://images.unsplash.com/photo-1603251579431-8041402bdeda?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bWVuJTIwc2hpcnR8ZW58MHx8MHx8fDA%3D',
  },
  {
    id: '32',
    name: 'mens-shoes',
    imageUrl:
      'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bWVuJTIwc2hvZXN8ZW58MHx8MHx8fDA%3D',
  },
  {
    id: '33',
    name: 'mens-watches',
    status: 'online',
    imageUrl:
      'https://images.unsplash.com/photo-1524738258074-f8125c6a7588?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWVuJTIwd2F0Y2h8ZW58MHx8MHx8fDA%3D',
  },
  {
    id: '34',
    name: 'womens-watches',
    status: 'offline',
    imageUrl:
      'https://images.unsplash.com/photo-1604242692760-2f7b0c26856d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8d29tZW4lMjB3YXRjaGVzfGVufDB8fDB8fHww',
  },
  {
    id: '35',
    name: 'womens-bags',
    status: 'online',
    imageUrl:
      'https://images.unsplash.com/photo-1559563458-527698bf5295?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d29tZW4lMjBiYWdzfGVufDB8fDB8fHww',
  },
  {
    id: '36',
    name: 'womens-jewellery',
    imageUrl:
      'https://images.unsplash.com/photo-1612314317004-d650718f188a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHdvbWVuJTIwamV3ZWxsZXJ5fGVufDB8fDB8fHww',
  },
  {
    id: '37',
    name: 'sunglasses',
    status: 'offline',
    imageUrl:
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3VuZ2xhc3Nlc3xlbnwwfHwwfHx8MA%3D%3D',
  },
  {
    id: '38',
    name: 'automotive',
    status: 'online',
    imageUrl:
      'https://images.unsplash.com/photo-1594420307680-4e404e105d86?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YXV0b21hdGl2ZXxlbnwwfHwwfHx8MA%3D%3D',
  },
  {
    id: '39',
    name: 'motorcycle',
    status: 'offline',
    imageUrl:
      'https://images.unsplash.com/photo-1559289431-9f12ee08f8b6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bW90b3JjeWNsZXxlbnwwfHwwfHx8MA%3D%3D',
  },
  {
    id: '40',
    name: 'lighting',
    status: 'online',
    imageUrl:
      'https://images.unsplash.com/photo-1529854140025-25995121f16f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bGlnaHQlMjBidWxifGVufDB8fDB8fHww',
  },
];

const Discover = () => {
  const navigation = useNavigation();
  const {
    mutate: locationUpdate,
    isPending: isLocationPending,
    error: locationError,
    reset: locationReset,
  } = useLocationUpdate();

  const [locationupdated, setlocationupdated] = useState(false);
  const [pageoption, setpageOption] = useState('Discover');
  const [showfilter, setshowfilter] = useState(false);
  const [filterdata, setfilterdata] = useState({
    items: [
      {
        item: '1 Km',
        value: '1',
      },
      {
        item: '3 Km',
        value: '3',
      },
      {
        item: '5 Km',
        value: '5 ',
      },
      {
        item: 'All',
        value: 'All',
      },
    ],
    applied: '1',
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
  }, []);

  if (isDiscoverPending) {
    return <Text>Loading...</Text>;
  }

  console.log('discoverData', discoverData.data.profiles);

  const handleLogin = () => {
    return navigation.navigate('Login');
  };

  function handlelocation() {
    console.log('location update');
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
                      pageoption === 'Discover' ? colors.text.primary : null,
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
                    color: pageoption === 'Nearby' ? colors.text.primary : null,
                  },
                ]}>
                Nearby
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleLogin}>
              <Text>LO</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate('ProfileCreation')}>
              <Text>PC</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Recharge')}>
              <Text>RE</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Payment')}>
              <Text>PY</Text>
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
                          <Text style={styles.itemtext}>{item.item}</Text>
                        </TouchableOpacity>
                      </View>
                    ))}
                  </View>
                </GradientInput>
              )}
            </View>
          </View>

          <View style={{marginBottom: 120, alignItems: 'center'}}>
            <FlatList
              data={categories}
              keyExtractor={item => item.id.toString()}
              renderItem={({item, index}) => (
                <SingleUser item={item} index={index} />
              )}
              onEndReachedThreshold={0.1}
              showsVerticalScrollIndicator={false}
              numColumns={3}
              contentContainerStyle={{paddingBottom: 80}}
            />
          </View>

          <View
            style={{
              position: 'absolute',
              bottom: 75,
              right: 20,
              padding: 6,
              borderRadius: 48,
              backgroundColor: colors.text.primarylight,
              elevation: 10,
            }}>
            <TouchableOpacity
              style={{
                backgroundColor: colors.text.primary,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 40,
                width: 74,
                height: 74,
              }}
              onPress={() => navigation.navigate('LiveStream')}>
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
  },
});
