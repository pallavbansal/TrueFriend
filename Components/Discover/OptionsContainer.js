import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {colors} from '../../Styles/ColorData';
import GradientInput from '../Common/GradientInput';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import React from 'react';

const OptionsContainer = ({
  handlediscoverclick,
  handlenearbyclick,
  isLocationUpdatePending,
  handleFilter,
  showfilter,
  filterdata,
  setfilterdata,
  setshowfilter,
  pageoption,
}) => {
  return (
    <View style={[styles.optioncontainer]}>
      <TouchableOpacity onPress={() => handlediscoverclick(-1)}>
        <Text
          style={[
            styles.optiontext,
            {
              color:
                pageoption === 'Discover'
                  ? colors.arrow.tertiary
                  : colors.text.primary,
            },
          ]}>
          Discover
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => handlenearbyclick(100)}>
        <Text
          style={[
            styles.optiontext,
            {
              color:
                pageoption === 'Nearby'
                  ? colors.arrow.tertiary
                  : colors.text.primary,
            },
          ]}>
          Nearby
        </Text>
      </TouchableOpacity>

      <View
        style={{
          position: 'relative',
          marginLeft: 'auto',
          marginRight: 10,
        }}>
        {pageoption === 'Nearby' && (
          <TouchableOpacity onPress={handleFilter}>
            <MaterialIcons
              name="filter-list"
              size={24}
              color={colors.text.primary}
              style={{
                marginLeft: 'auto',
              }}
            />
          </TouchableOpacity>
        )}
        {pageoption === 'Nearby' && showfilter && (
          <GradientInput style={styles.gradientborder2}>
            <View style={styles.dropcontainer}>
              {filterdata.items.map((item, index) => (
                <View key={index} style={styles.singleitem}>
                  <TouchableOpacity
                    onPress={() => {
                      setfilterdata(prev => {
                        return {
                          ...prev,
                          applied: item.value,
                        };
                      });
                      setshowfilter(false);
                    }}>
                    <Text
                      style={[
                        styles.itemtext,
                        {
                          color:
                            filterdata.applied === item.value
                              ? colors.arrow.tertiary
                              : colors.login.headingtext2,
                        },
                      ]}>
                      {item.item}
                    </Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </GradientInput>
        )}
      </View>
    </View>
  );
};

export default OptionsContainer;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  screencontainer: {
    flex: 1,
  },
  optioncontainer: {
    width: '100%',
    flexDirection: 'row',
    padding: 10,
    gap: 10,
  },
  optiontext: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  gradientborder2: {
    position: 'absolute',
    top: 35,
    right: -15,
    padding: 2,
    borderRadius: 20,
    overflow: 'hidden',
    alignSelf: 'flex-start',
    zIndex: 2,
  },
  dropcontainer: {
    width: 100,
    backgroundColor: colors.text.primary,
    borderRadius: 18,
    padding: 10,
    paddingHorizontal: 15,
    gap: 10,
    alignSelf: 'flex-start',
  },
  singleitem: {
    // width: '100%',
  },
  itemtext: {
    color: colors.login.headingtext2,
    fontSize: 14,
    fontWeight: 'bold',
  },
});
