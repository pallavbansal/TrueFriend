import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import React from 'react';
import BottomBar from '../Layouts/BottomBar';
import GradientScreen from '../Layouts/GradientScreen';
import FeedHeader from '../Components/SocialFeed/FeedHeader';
import Feather from 'react-native-vector-icons/Feather';
import SingleFeedProfile from '../Components/SocialFeed/SingleFeedProfile';
import {colors} from '../Styles/ColorData';

const feeds = [
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
    name: 'lighting2',
    status: 'online',
    imageUrl:
      'https://images.unsplash.com/photo-1529854140025-25995121f16f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bGlnaHQlMjBidWxifGVufDB8fDB8fHww',
  },
];

const SocialFeed = () => {
  const handlelivestream = () => {
    console.log('live stream');
  };

  return (
    <GradientScreen>
      <View style={styles.container}>
        <FeedHeader />
        <View style={styles.feedscontainer}>
          <FlatList
            data={feeds}
            keyExtractor={item => item.id.toString()}
            renderItem={({item, index}) => (
              <SingleFeedProfile item={item} index={index} />
            )}
            onEndReachedThreshold={0.1}
            showsVerticalScrollIndicator={false}
            numColumns={1}
            contentContainerStyle={{paddingBottom: 120}}
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
              width: 50,
              height: 50,
            }}
            onPress={handlelivestream}>
            <Feather name="upload" size={28} color={colors.arrow.secondary} />
          </TouchableOpacity>
        </View>
        <BottomBar />
      </View>
    </GradientScreen>
  );
};

export default SocialFeed;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  feedscontainer: {},
});
