import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import React, {useState} from 'react';
import GradientScreen from '../Layouts/GradientScreen';
import GradientText from '../Components/Common/GradientText';
import GradientButton from '../Components/Common/GradientButton';
import {colors} from '../Styles/ColorData';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';

const plandata = [
  {
    id: 1,
    name: 'Starter X',
    duration: '3 Months',
    cost: '$33.00',
    icon: 'diamond',
  },
  {
    id: 2,
    name: 'Pro Buddy',
    duration: '6 Months',
    cost: '$66.00',
    icon: 'diamond',
  },
  {
    id: 3,
    name: 'Advanced U',
    duration: '12 Months',
    cost: '$108.00',
    icon: 'diamond',
  },
];

const Recharge = () => {
  const navigation = useNavigation();
  const [selectedplan, setselectedplan] = useState(0);

  const handleplanclick = item => {
    setselectedplan(item.id);
  };

  return (
    <GradientScreen>
      <View style={styles.container}>
        <View style={styles.headerbackcontainer}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}>
            <MaterialIcons
              name="arrow-back"
              size={24}
              color={colors.arrow.primary}
              style={{marginLeft: 20, marginTop: 10}}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.headingContainer}>
          <Text style={[styles.headingtext]}>For Best Access</Text>
          <View style={{flexDirection: 'row', gap: 3}}>
            <Text style={styles.headingtext4}>Recharge your wallet</Text>
            <AntDesign
              name="heart"
              size={18}
              color={colors.arrow.heart}
              style={{
                transform: [{rotate: '-10deg'}],
              }}
            />
          </View>

          <Text
            style={[
              styles.headingtext3,
              {
                marginTop: 15,
              },
            ]}>
            Top features you will get
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 10,
              marginTop: 10,
            }}>
            <MaterialIcons
              name="arrow-forward"
              size={24}
              color={colors.login.headingtext}
            />
            <Text
              style={[
                styles.headingtext2,
                {
                  flex: 1,
                },
              ]}>
              Able to make audio & video calls without interruption
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 10,
              marginTop: 10,
            }}>
            <MaterialIcons
              name="arrow-forward"
              size={24}
              color={colors.login.headingtext}
            />
            <View
              style={{
                flexDirection: 'row',
                gap: 3,
              }}>
              <Text style={styles.headingtext2}>
                Browse profile invisibly &
              </Text>

              <GradientText style={styles.headingtext2}>
                Many more...
              </GradientText>
            </View>
          </View>
          <Text
            style={[
              styles.headingtext3,
              {
                marginTop: 20,
              },
            ]}>
            Select your Diamond
          </Text>
        </View>

        <View style={styles.plancontainer}>
          {plandata.map((item, index) =>
            selectedplan === item.id ? (
              <LinearGradient
                key={index}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                colors={colors.gradients.buttongradient}
                style={{
                  padding: 2,
                  marginBottom: 7,
                  borderRadius: 50,
                }}>
                <TouchableOpacity
                  style={styles.planouter}
                  onPress={() => handleplanclick(item)}>
                  <View style={styles.planicon}>
                    <MaterialIcons
                      name={item.icon}
                      size={48}
                      color={colors.recharge.primary}
                    />
                  </View>
                  <View style={styles.plantext}>
                    <Text style={styles.headingtext3}>{item.name}</Text>
                    <Text style={styles.headingtext2}>{item.duration}</Text>
                  </View>
                  <View style={styles.plancost}>
                    <Text style={styles.headingtext4}>{item.cost}</Text>
                  </View>
                </TouchableOpacity>
              </LinearGradient>
            ) : (
              <TouchableOpacity
                style={[styles.planouter, {marginBottom: 7}]}
                key={index}
                onPress={() => handleplanclick(item)}>
                <View style={styles.planicon}>
                  <MaterialIcons
                    name={item.icon}
                    size={48}
                    color={colors.recharge.primary}
                  />
                </View>
                <View style={styles.plantext}>
                  <Text style={styles.headingtext3}>{item.name}</Text>
                  <Text style={styles.headingtext2}>{item.duration}</Text>
                </View>
                <View style={styles.plancost}>
                  <Text style={styles.headingtext4}>{item.cost}</Text>
                </View>
              </TouchableOpacity>
            ),
          )}
        </View>

        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            alignItems: 'center',
            marginBottom: 30,
          }}>
          <TouchableOpacity style={{marginTop: 20}}>
            <GradientButton style={styles.submitbutton}>
              <Text style={styles.submittext}>Continue</Text>
            </GradientButton>
          </TouchableOpacity>
        </View>
      </View>
    </GradientScreen>
  );
};

export default Recharge;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerbackcontainer: {
    position: 'absolute',
    top: 0,
  },
  headingContainer: {
    width: '100%',
    marginTop: 50,
    marginLeft: 20,
    marginBottom: 20,
  },
  headingtext: {
    fontFamily: 'Lexend',
    color: colors.login.headingtext,
    fontWeight: '900',
    fontSize: 28,
  },

  headingtext3: {
    fontFamily: 'Lexend',
    color: colors.login.headingtext2,
    fontWeight: '900',
    fontSize: 18,
  },

  headingtext2: {
    fontFamily: 'Lexend',
    color: colors.login.headingtext2,
    fontWeight: '900',
    fontSize: 14,
  },
  headingtext4: {
    fontFamily: 'Lexend',
    color: colors.recharge.primary,
    fontWeight: '900',
    fontSize: 16,
  },

  plancontainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  submitbutton: {
    width: 170,
    height: 55,
    borderRadius: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },

  submittext: {
    fontFamily: 'Lexend',
    color: colors.text.primary,
    fontWeight: '600',
    fontSize: 18,
    lineHeight: 22.5,
  },
  planouter: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 50,
  },
  planicon: {
    marginRight: 10,
  },
  plantext: {
    flex: 1,
  },
  plancost: {},
});
