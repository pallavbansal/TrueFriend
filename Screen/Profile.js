import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
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
const picturesdata = [
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
];
const videosdata = [
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
];

const Profile = () => {
  const {isPending, error, data: profiledata, isError} = useFetchProfile();
  const [selectedmediatype, setselectedmediatype] = useState('pictures');
  const [showeditmodel, setshoweditmodel] = useState(false);
  const [showdetailmodel, setshowdetailmodel] = useState({
    show: false,
    data: null,
  });

  function handleeditprofile() {
    setshoweditmodel(true);
  }
  function closedetailmodel() {
    setshowdetailmodel({
      show: false,
      data: null,
    });
  }

  if (isPending) {
    return <Loading />;
  }

  // if (isError) {
  //   return <Text>Error: {error.message}</Text>;
  // }
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
        <View style={styles.imagecontainer}>
          <ProfileTop
            finaldata={finaldata}
            handleeditprofile={handleeditprofile}
          />
        </View>
        <View style={styles.biocontainer}>
          <View>
            <Text style={styles.headingtext}>{finaldata.name}</Text>
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
            <Text style={styles.headingtext3}>{finaldata.bio}</Text>
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
          <View style={styles.medialistcontainer}>
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

            {selectedmediatype === 'pictures' && (
              <FlatList
                data={picturesdata}
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
            )}
            {selectedmediatype === 'videos' && (
              <FlatList
                data={videosdata}
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
            )}
          </View>
        </View>
        {showdetailmodel.show && (
          <DetailMedia data={showdetailmodel.data} close={closedetailmodel} />
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
    alignItems: 'center',
  },
});
