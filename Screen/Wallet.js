import React from 'react';
import {
  View,
  StyleSheet,
  RefreshControl,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {useRefreshData} from '../Hooks/Custom/useRefreshData';
import BottomBar from '../Layouts/BottomBar';
import GradientScreen from '../Layouts/GradientScreen';
import WalletTopBalance from '../Components/Wallet/WalletTopBalance';
import WalletOptionsList from '../Components/Wallet/WalletOptionsList';
import {colors} from '../Styles/ColorData';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MyLoadingIndicator from '../Components/Common/MyLoadingIndicator';
import {useNavigation} from '@react-navigation/native';

const Wallet = () => {
  const navigation = useNavigation();
  const {refreshing, onRefresh} = useRefreshData();
  return (
    <GradientScreen>
      <View
        style={{
          flex: 1,
        }}>
        <MyLoadingIndicator isRefreshing={refreshing} />
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
        <ScrollView
          contentContainerStyle={styles.container}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() =>
                onRefresh([
                  'getWallet',
                  'diamondtransactions',
                  'paymenttransactions',
                ])
              }
              progressViewOffset={-500}
            />
          }>
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
