import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {colorData} from '../utils/colorData';
import React, {useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Settings = () => {
  const defaultAutoSaveTime = '30';
  const defaultAutoDeleteTime = '2';
  const [loading, setLoading] = useState(false);
  const [autoSaveTime, setAutoSaveTime] = useState('');
  const [autoDeleteTime, setAutoDeleteTime] = useState('');

  const handleAutoSaveTimeChange = text => {
    if (/^\d*$/.test(text)) {
      setAutoSaveTime(text);
    }
  };

  const handleAutoDeleteTimeChange = text => {
    if (/^\d*$/.test(text)) {
      setAutoDeleteTime(text);
    }
  };

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setLoading(true);
        const savedAutoSaveTime = await AsyncStorage.getItem('autoSaveTime');
        const savedAutoDeleteTime = await AsyncStorage.getItem(
          'autoDeleteTime',
        );

        if (savedAutoSaveTime) {
          setAutoSaveTime(JSON.parse(savedAutoSaveTime));
        } else {
          setAutoSaveTime(defaultAutoSaveTime);
          await AsyncStorage.setItem(
            'autoSaveTime',
            JSON.stringify(defaultAutoSaveTime),
          );
        }

        if (savedAutoDeleteTime) {
          setAutoDeleteTime(JSON.parse(savedAutoDeleteTime));
        } else {
          setAutoDeleteTime(defaultAutoDeleteTime);
          await AsyncStorage.setItem(
            'autoDeleteTime',
            JSON.stringify(defaultAutoDeleteTime),
          );
        }
      } catch (error) {
        console.error('Failed to fetch settings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const saveChanges = async () => {
    if (
      autoSaveTime < 5 ||
      autoSaveTime > 30 ||
      autoDeleteTime < 2 ||
      autoDeleteTime > 7
    ) {
      alert('Invalid input. Please enter values within the specified range');
      return;
    }

    try {
      await AsyncStorage.setItem('autoSaveTime', JSON.stringify(autoSaveTime));
      await AsyncStorage.setItem(
        'autoDeleteTime',
        JSON.stringify(autoDeleteTime),
      );
      alert('Settings saved successfully');
    } catch (error) {
      alert('Failed to save the settings');
    }
  };

  const setDefault = async () => {
    try {
      await AsyncStorage.setItem(
        'autoSaveTime',
        JSON.stringify(defaultAutoSaveTime),
      );
      await AsyncStorage.setItem(
        'autoDeleteTime',
        JSON.stringify(defaultAutoDeleteTime),
      );
      setAutoSaveTime(defaultAutoSaveTime);
      setAutoDeleteTime(defaultAutoDeleteTime);

      alert('Settings reset to default');
    } catch (error) {
      alert('Failed to reset the settings');
    }
  };

  if (loading) return null;

  // if (loading)
  //   return (
  //     <Text
  //       style={{
  //         color: 'black',
  //       }}>
  //       Loading...
  //     </Text>
  //   );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
      </View>

      <View
        style={{
          flex: 1,
          alignContent: 'center',
          justifyContent: 'center',
          padding: 5,
        }}>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Auto Save Duration (minutes):</Text>
          <TextInput
            style={styles.input}
            onChangeText={handleAutoSaveTimeChange}
            value={autoSaveTime}
            placeholder="Enter time in minutes (5-30)"
            keyboardType="numeric"
            placeholderTextColor="#000"
            cursorColor={colorData.back1}
          />

          <Text style={styles.inputLabel}>Auto Delete Time (days):</Text>
          <TextInput
            style={styles.input}
            onChangeText={handleAutoDeleteTimeChange}
            value={autoDeleteTime}
            placeholder="Enter time in days (2-7)"
            keyboardType="numeric"
            placeholderTextColor="#000"
            cursorColor={colorData.back1}
          />

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity style={styles.button} onPress={saveChanges}>
              <Icon name="save" size={20} color={colorData.primary} />
              <Text style={styles.buttonText}>Save Changes</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={setDefault}>
              <Icon name="undo" size={20} color={colorData.success} />
              <Text style={styles.buttonText}>Set Default</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: colorData.back2,
    padding: 12,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  title: {
    fontSize: 20,
    marginLeft: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  inputContainer: {
    padding: 20,
    justifyContent: 'center',
    borderRadius: 25,
    backgroundColor: colorData.back2,
    marginBottom: 100,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  input: {
    width: '100%',
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 15,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: 'white',
    color: 'black',
  },
  button: {
    width: '48%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 12,
    marginTop: 10,
  },
  buttonText: {
    marginLeft: 10,
    color: colorData.back2,
    fontWeight: 'bold',
  },
});
