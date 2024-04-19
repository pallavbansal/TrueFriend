import React from 'react';
import {View, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import BottomBar from '../Layouts/BottomBar';
import GradientScreen from '../Layouts/GradientScreen';
import WalletTopBalance from '../Components/Wallet/WalletTopBalance';
import WalletOptionsList from '../Components/Wallet/WalletOptionsList';
import {colors} from '../Styles/ColorData';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';

const Wallet = () => {
  const navigation = useNavigation();
  return (
    <GradientScreen>
      <View
        style={{
          flex: 1,
        }}>
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
        <ScrollView contentContainerStyle={styles.container}>
          <WalletTopBalance />
          <WalletOptionsList />
        </ScrollView>
        <BottomBar />
      </View>
    </GradientScreen>
  );
};

export default Wallet;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    gap: 10,
    paddingBottom: 60,
  },
});
