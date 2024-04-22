import {
  View,
  Text,
  Modal,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {colors} from '../../Styles/ColorData';
import React, {useEffect, useState} from 'react';
import SingleTransaction from './SingleTransaction';
import {
  useFetchDiamondTransactions,
  useFetchPaymentTransactions,
} from '../../Hooks/Query/WalletQuery';
import {useSelector} from 'react-redux';
import Loading from '../../Screen/Loading';

const WalletModal = ({modalVisible, setModalVisible}) => {
  const myuserdata = useSelector(state => state.Auth.userinitaldata);
  // console.log('myuserdata', myuserdata);
  const [transactions, setTransactions] = useState([]);
  const {visible, type} = modalVisible;
  console.log('modal type', type); // 'payment' 'diamond'

  const {
    data: diamondtransactions,
    error: diamonderror,
    fetchNextPage: diamondfetchNextPage,
    hasNextPage: diamondhasNextPage,
    isFetchingNextPage: diamondisFetchingNextPage,
    isPending: diamondisPending,
    isFetching: diamondisFetching,
  } = useFetchDiamondTransactions();

  const {
    data: paymenttransactions,
    error: paymenterror,
    fetchNextPage: paymentfetchNextPage,
    hasNextPage: paymenthasNextPage,
    isFetchingNextPage: paymentisFetchingNextPage,
    isPending: paymentisPending,
    isFetching: paymentisFetching,
  } = useFetchPaymentTransactions();

  const filterTransactionData = item => {
    // console.log('item in filter', item);
    // if (type === 'diamond') {
    //   return (
    //     item.purpose === 'CALL_DEDUCTION' || item.purpose === 'CALL_CREDIT' || item.purpose === 'PACKAGE_PURCHASE';
    //   );
    // } else if (type === 'payment') {
    //   return item.purpose === 'PACKAGE_PURCHASE';
    // }
    // return false;
    return true;
  };

  const timedate = created_at => {
    const dateObj = new Date(created_at);
    const date = dateObj.toLocaleDateString('en-GB');
    const time = dateObj.toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
    });
    return {date, time};
  };

  const transformDiamondData = item => {
    const {date, time} = timedate(item.created_at);
    let type = '';
    let user = {};
    let amount = 0;

    if (item.purpose === 'CALL_DEDUCTION' || item.purpose === 'CALL_CREDIT') {
      type = 'call';
      if (item.receiver_user_id == myuserdata.id) {
        user = {
          id: item.initiator_user_id,
          name: item.initiator_name,
          imageurl: item.initiator_profile_picture,
        };
      } else {
        user = {
          id: item.receiver_user_id,
          name: item.receiver_name,
          imageurl: item.receiver_profile_picture,
        };
      }
    } else if (item.purpose === 'PACKAGE_PURCHASE') {
      type = 'Package';
      user = {
        id: myuserdata.id,
        name: myuserdata.name,
        imageurl: myuserdata.profile_picture,
      };
    }

    return {
      id: item.id,
      date: date,
      time: time,
      type: type,
      amount: parseInt(item.diamonds),
      user: user,
    };
  };

  const transformPaymentData = item => {
    console.log('item in payment', item);
    const {date, time} = timedate(item.created_at);
    let user = {};
    let type = '';
    let amount = 0;
    if (item.purpose === 'PACKAGE_PURCHASE') {
      type = 'Package';
      amount = -1 * parseInt(item.amount);
    }
    user = {
      id: myuserdata.id,
      name: myuserdata.name,
      imageurl: myuserdata.profile_picture,
    };
    return {
      id: item.id,
      date: date,
      time: time,
      type: type,
      amount: amount,
      user: user,
    };
  };

  useEffect(() => {
    if (type === 'diamond') {
      if (diamondtransactions) {
        const finaldata = diamondtransactions.pages.flatMap(page => {
          return page.data.transactions.data
            .filter(item => filterTransactionData(item))
            .map(item => transformDiamondData(item));
        });
        finaldata.reverse();
        setTransactions(finaldata);
      }
    }

    if (type === 'payment') {
      if (paymenttransactions) {
        const finaldata = paymenttransactions.pages.flatMap(page => {
          return page.data.transactions.data
            .filter(item => filterTransactionData(item))
            .map(item => transformPaymentData(item));
        });
        finaldata.reverse();
        setTransactions(finaldata);
      }
    }
  }, [diamondtransactions, type]);

  const ListBottomComponent = () => {
    if (
      type == 'diamond' &&
      (diamondisFetchingNextPage || diamondisPending || diamondisFetching)
    ) {
      return <ActivityIndicator size="large" color={colors.text.primary} />;
    }
    if (
      type == 'payment' &&
      (paymentisFetchingNextPage || paymentisFetching || paymentisPending)
    ) {
      return <ActivityIndicator size="large" color={colors.text.primary} />;
    }
    return null;
  };

  if (
    (type == 'diamond' && diamondisPending) ||
    (type == 'payment' && paymentisPending)
  ) {
    return <Loading />;
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        setModalVisible({
          visible: false,
          type: null,
        });
      }}>
      <View style={styles.centeredView}>
        <FlatList
          style={{
            width: '100%',
            alignSelf: 'center',
          }}
          data={transactions}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <SingleTransaction data={item} setModalVisible={setModalVisible} />
          )}
          showsVerticalScrollIndicator={false}
          onEndReachedThreshold={0.2}
          onEndReached={() => {
            if (
              type == 'diamond' &&
              diamondhasNextPage &&
              !diamondisFetchingNextPage
            ) {
              diamondfetchNextPage();
            }
            if (
              type == 'payment' &&
              paymenthasNextPage &&
              !paymentisFetchingNextPage
            ) {
              paymentfetchNextPage();
            }
          }}
          ListHeaderComponent={() => (
            <View
              style={{
                width: '100%',
                height: 50,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 20,
                  fontWeight: 'bold',
                }}>
                {type === 'diamond'
                  ? 'Diamond Transactions'
                  : type === 'payment'
                  ? 'Payment Transactions'
                  : 'Transactions'}
              </Text>
            </View>
          )}
          ListFooterComponent={() => <ListBottomComponent />}
          ListEmptyComponent={
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: colors.text.primary,
                  fontSize: 20,
                  fontWeight: 'bold',
                  marginVertical: '60%',
                }}>
                {type === 'diamond'
                  ? 'No Diamond Transactions'
                  : type === 'payment'
                  ? 'No Payment Transactions'
                  : 'No Transactions'}
              </Text>
            </View>
          }
        />
      </View>
    </Modal>
  );
};

export default WalletModal;
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
    marginHorizontal: 2,
    paddingTop: 8,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: colors.arrow.secondary,
    overflow: 'hidden',
  },
});
