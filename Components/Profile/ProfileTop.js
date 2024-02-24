import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';
import {colors} from '../../Styles/ColorData';
import React from 'react';

const ProfileTop = ({
  finaldata,
  handleeditprofile,
  ismyid,
  request_status,
  requestaction,
}) => {
  return (
    <>
      <View
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'row',
        }}>
        <LinearGradient
          colors={colors.gradients.buttongradient}
          style={{
            width: '50%',
            height: '100%',
            backgroundColor: 'red',
          }}></LinearGradient>
        <View
          style={{
            width: '50%',
            height: '100%',
            backgroundColor: 'white',
            justifyContent: 'center',
          }}>
          <View
            style={{
              width: '100%',
              height: 1,
              backgroundColor: '#DFD2F3',
              marginBottom: 10,
              marginTop: 10,
            }}
          />
          <View style={styles.statcontainer}>
            <AntDesign name="hearto" size={15} color="#DD3662" />
            <Text style={{color: '#645290', fontSize: 14, fontWeight: 'bold'}}>
              2.7K
            </Text>
          </View>
          <View
            style={{
              width: '100%',
              height: 1,
              backgroundColor: '#DFD2F3',
              marginBottom: 10,
              marginTop: 10,
            }}
          />
          <View style={styles.statcontainer}>
            <AntDesign name="like1" size={15} color="#DD3662" />
            <Text style={{color: '#645290', fontSize: 14, fontWeight: 'bold'}}>
              2.7K
            </Text>
          </View>
          <View
            style={{
              width: '100%',
              height: 1,
              backgroundColor: '#DFD2F3',
              marginBottom: 10,
              marginTop: 10,
            }}
          />
          <View style={styles.statcontainer}>
            <AntDesign name="message1" size={15} color="#DD3662" />
            <Text style={{color: '#645290', fontSize: 14, fontWeight: 'bold'}}>
              2.7K
            </Text>
          </View>
          <View
            style={{
              width: '100%',
              height: 1,
              backgroundColor: '#DFD2F3',
              marginBottom: 10,
              marginTop: 10,
            }}
          />
        </View>
      </View>
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}>
        <Image
          source={{uri: finaldata.profile_picture}}
          style={{
            width: 125,
            height: 125,
            borderRadius: 75,
            alignSelf: 'center',
            marginTop: 50,
          }}
        />
      </View>
      {ismyid && (
        <View
          style={{
            position: 'absolute',
            right: 10,
            bottom: -20,
          }}>
          <View
            style={{
              backgroundColor: colors.profile.edit,
              height: 40,
              width: 40,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 20,
            }}>
            <TouchableOpacity onPress={handleeditprofile}>
              <AntDesign name="edit" size={28} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/*  Friends,Sent,Received,Noaction  */}
      {!ismyid && (
        <View
          style={{
            position: 'absolute',
            right: 10,
            bottom: -15,
          }}>
          <View
            style={[
              styles.requestbutton,
              {
                backgroundColor:
                  request_status === 'Sent'
                    ? 'grey'
                    : request_status === 'Friends'
                    ? 'green'
                    : colors.profile.edit,
              },
            ]}>
            {request_status === 'Sent' && (
              <Text
                style={{
                  color: 'white',
                  fontWeight: 'bold',
                }}>
                Request Sent
              </Text>
            )}
            {request_status === 'Friends' && (
              <Text
                style={{
                  color: 'white',
                  fontWeight: 'bold',
                }}>
                Friends
              </Text>
            )}
            {request_status === 'Received' && (
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: 20,
                }}>
                <TouchableOpacity
                  onPress={() => requestaction('acceptrequest')}>
                  <Text
                    style={{
                      color: 'white',
                      fontWeight: 'bold',
                    }}>
                    Accept
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => requestaction('rejectrequest')}>
                  <Text
                    style={{
                      color: 'white',
                      fontWeight: 'bold',
                    }}>
                    Reject
                  </Text>
                </TouchableOpacity>
              </View>
            )}
            {request_status === 'Noaction' && (
              <TouchableOpacity onPress={() => requestaction('sendrequest')}>
                <Text
                  style={{
                    color: 'white',
                    fontWeight: 'bold',
                  }}>
                  Add Friend
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      )}
    </>
  );
};

export default ProfileTop;

const styles = StyleSheet.create({
  statcontainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingRight: 20,
  },
  requestbutton: {
    backgroundColor: colors.profile.edit,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    padding: 5,
    paddingHorizontal: 10,
  },
});
