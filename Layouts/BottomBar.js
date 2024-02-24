import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors} from '../Styles/ColorData';
import {useNavigation, useRoute} from '@react-navigation/native';
import GradientText from '../Components/Common/GradientText';
import LinearGradient from 'react-native-linear-gradient';

const routes = [
  {
    name: 'Discover',
    label: 'Discover',
    icon: focused => {
      return focused ? (
        <MaterialCommunityIcons
          name="book-open-page-variant"
          size={26}
          color={colors.login.headingtext}
        />
      ) : (
        <GradientText>
          <MaterialCommunityIcons name="book-open-page-variant" size={26} />
        </GradientText>
      );
    },
  },

  {
    name: 'SocialFeed',
    label: 'Social Feed',
    icon: focused => {
      return focused ? (
        <MaterialCommunityIcons
          name="dots-grid"
          size={26}
          color={colors.login.headingtext}
        />
      ) : (
        <GradientText>
          <MaterialCommunityIcons name="dots-grid" size={26} />
        </GradientText>
      );
    },
  },
  {
    name: 'FriendsList',
    label: 'Friends',
    icon: focused => {
      return focused ? (
        <MaterialCommunityIcons
          name="chat"
          size={26}
          color={colors.login.headingtext}
        />
      ) : (
        <GradientText>
          <Ionicons name="chatbubble-ellipses" size={26} />
        </GradientText>
      );
    },
  },
  {
    name: 'Profile',
    label: 'Profile',
    icon: focused => {
      return focused ? (
        <MaterialCommunityIcons
          name="account"
          size={26}
          color={colors.login.headingtext}
        />
      ) : (
        <GradientText>
          <MaterialCommunityIcons name="account" size={26} />
        </GradientText>
      );
    },
  },
];

function BottomBar() {
  const navigation = useNavigation();
  const route = useRoute();

  function onPress(routeName) {
    return navigation.navigate(routeName);
  }

  return (
    <View style={[styles.tabContainer, styles.hidetab]}>
      {routes.map((routeItem, index) => {
        const isFocused = route.name === routeItem.name;

        return (
          <TouchableOpacity
            key={index}
            onPress={() => onPress(routeItem.name)}
            style={styles.tab}>
            <View
              style={[
                styles.iconContainer,
                isFocused ? styles.tabTextActive : styles.tabText,
              ]}>
              {/* {isFocused ? (
                <LinearGradient
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 1}}
                  colors={colors.gradients.buttongradient}
                  style={{
                    padding: 5,
                    marginBottom: 10,
                  }}>
                  <View
                    style={{
                      width: 40,
                      height: 0.1,
                    }}></View>
                </LinearGradient>
              ) : null} */}

              <View>{routeItem.icon(isFocused)}</View>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 5,
    backgroundColor: colors.bottomtab.backpri,
    width: '90%',
    alignSelf: 'center',
    borderRadius: 16,
    elevation: 10,
  },
  hidetab: {
    // bottom: -100,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    padding: 12,
  },
  tabText: {
    color: colors.bottomtab.notfocusedtext,
    fontSize: 12,
  },
  tabTextActive: {
    color: colors.bottomtab.focusedtext,
    fontSize: 12,
  },

  iconContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    // marginBottom: 10,
  },
});

export default BottomBar;
