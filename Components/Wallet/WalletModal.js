import {View, Text, Modal, StyleSheet, FlatList} from 'react-native';
import {colors} from '../../Styles/ColorData';
import React from 'react';
import SingleTransaction from './SingleTransaction';

const democalltransactions = [
  {
    id: 1,
    date: '12/12/2021',
    time: '10:30 AM',
    type: 'call',
    amount: +100,
    user: {
      id: 56,
      name: 'John Doe',
      email: 'john@example.com',
      phone: '123-456-7890',
      imageurl:
        'https://wooing.boxinallsoftech.com/public/uploads/profile/82080_1709724308_stable-diffusion-xl (5).jpg',
    },
  },
  {
    id: 2,
    date: '13/12/2021',
    time: '11:00 AM',
    type: 'call',
    amount: 100,
    user: {
      id: 64,
      name: 'Jane Doe',
      email: 'jane@example.com',
      phone: '098-765-4321',
      imageurl:
        'https://wooing.boxinallsoftech.com/public/uploads/profile/82239_1709724015_stable-diffusion-xl (8).jpg',
    },
  },
  {
    id: 3,
    date: '14/12/2021',
    time: '12:00 PM',
    type: 'call',
    amount: -100,
    user: {
      id: 65,
      name: 'Bob Smith',
      email: 'bob@example.com',
      phone: '111-222-3333',
      imageurl:
        'https://wooing.boxinallsoftech.com/public/uploads/profile/93495_1706851876_Screenshot_2024-01-25-11-07-38-00_325fbdb1dc4eedea0ce3f5f060f574f6.jpg',
    },
  },
  {
    id: 4,
    date: '15/12/2021',
    time: '01:00 PM',
    type: 'call',
    amount: +200,
    user: {
      id: 56,
      name: 'Alice Johnson',
      email: 'alice@example.com',
      phone: '444-555-6666',
      imageurl:
        'https://wooing.boxinallsoftech.com/public/uploads/profile/39623_1706860152_a.jpg',
    },
  },
  {
    id: 5,
    date: '12/12/2021',
    time: '10:30 AM',
    type: 'call',
    amount: +100,
    user: {
      id: 55,
      name: 'John Doe',
      email: 'john@example.com',
      phone: '123-456-7890',
      imageurl:
        'https://wooing.boxinallsoftech.com/public/uploads/profile/82080_1709724308_stable-diffusion-xl (5).jpg',
    },
  },
  {
    id: 6,
    date: '13/12/2021',
    time: '11:00 AM',
    type: 'call',
    amount: 100,
    user: {
      id: 56,
      name: 'Jane Doe',
      email: 'jane@example.com',
      phone: '098-765-4321',
      imageurl:
        'https://wooing.boxinallsoftech.com/public/uploads/profile/82239_1709724015_stable-diffusion-xl (8).jpg',
    },
  },
  {
    id: 7,
    date: '14/12/2021',
    time: '12:00 PM',
    type: 'call',
    amount: -100,
    user: {
      id: 56,
      name: 'Bob Smith',
      email: 'bob@example.com',
      phone: '111-222-3333',
      imageurl:
        'https://wooing.boxinallsoftech.com/public/uploads/profile/93495_1706851876_Screenshot_2024-01-25-11-07-38-00_325fbdb1dc4eedea0ce3f5f060f574f6.jpg',
    },
  },
  {
    id: 8,
    date: '15/12/2021',
    time: '01:00 PM',
    type: 'call',
    amount: +200,
    user: {
      id: 56,
      name: 'Alice Johnson',
      email: 'alice@example.com',
      phone: '444-555-6666',
      imageurl:
        'https://wooing.boxinallsoftech.com/public/uploads/profile/39623_1706860152_a.jpg',
    },
  },
  {
    id: 9,
    date: '12/12/2021',
    time: '10:30 AM',
    type: 'call',
    amount: +100,
    user: {
      id: 56,
      name: 'John Doe',
      email: 'john@example.com',
      phone: '123-456-7890',
      imageurl:
        'https://wooing.boxinallsoftech.com/public/uploads/profile/82080_1709724308_stable-diffusion-xl (5).jpg',
    },
  },
  {
    id: 10,
    date: '13/12/2021',
    time: '11:00 AM',
    type: 'call',
    amount: 100,
    user: {
      id: 56,
      name: 'Jane Doe',
      email: 'jane@example.com',
      phone: '098-765-4321',
      imageurl:
        'https://wooing.boxinallsoftech.com/public/uploads/profile/82239_1709724015_stable-diffusion-xl (8).jpg',
    },
  },
  {
    id: 11,
    date: '14/12/2021',
    time: '12:00 PM',
    type: 'call',
    amount: -100,
    user: {
      id: 56,
      name: 'Bob Smith',
      email: 'bob@example.com',
      phone: '111-222-3333',
      imageurl:
        'https://wooing.boxinallsoftech.com/public/uploads/profile/93495_1706851876_Screenshot_2024-01-25-11-07-38-00_325fbdb1dc4eedea0ce3f5f060f574f6.jpg',
    },
  },
  {
    id: 12,
    date: '15/12/2021',
    time: '01:00 PM',
    type: 'call',
    amount: +200,
    user: {
      id: 56,
      name: 'Alice Johnson',
      email: 'alice@example.com',
      phone: '444-555-6666',
      imageurl:
        'https://wooing.boxinallsoftech.com/public/uploads/profile/39623_1706860152_a.jpg',
    },
  },
];

const WalletModal = ({modalVisible, setModalVisible}) => {
  const {visible, type} = modalVisible;
  console.log('modal type', type); // 'withdrawal', 'recharge', 'call'
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
          data={democalltransactions}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <SingleTransaction data={item} setModalVisible={setModalVisible} />
          )}
          showsVerticalScrollIndicator={false}
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
                  marginVertical: 100,
                }}>
                {type === 'withdrawal'
                  ? 'No Withdrawal Transactions'
                  : type === 'recharge'
                  ? 'No Recharge Transactions'
                  : 'No Call Transactions'}
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
