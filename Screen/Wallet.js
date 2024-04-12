import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import BottomBar from '../Layouts/BottomBar';
import GradientScreen from '../Layouts/GradientScreen';
import {colors} from '../Styles/ColorData';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import WalletTopBalance from '../Components/Wallet/WalletTopBalance';
import WalletOptionsList from '../Components/Wallet/WalletOptionsList';

const options = [
  {
    id: 1,
    name: 'Account Details',
    icon: 'account-circle',
  },
  {
    id: 2,
    name: 'Withdrawal History',
    icon: 'history',
  },
  {
    id: 3,
    name: 'Recharge History',
    icon: 'payment',
  },
  {
    id: 4,
    name: 'Visit Profile',
    icon: 'person',
  },
  {
    id: 5,
    name: 'Raise a Ticket',
    icon: 'help-outline',
  },
];

const Wallet = () => {
  return (
    <GradientScreen>
      <View
        style={{
          flex: 1,
        }}>
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
    gap: 20,
    paddingBottom: 60,
  },
});
