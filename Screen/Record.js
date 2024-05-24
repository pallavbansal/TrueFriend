import React, {useState, useEffect} from 'react';
import BackgroundService from 'react-native-background-actions';
import {View, Button, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {colorData} from '../utils/colorData';
import {
  check,
  request,
  openSettings,
  PERMISSIONS,
  RESULTS,
} from 'react-native-permissions';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  startBackgroundTask,
  stopBackgroundTask,
} from '../utils/BackgroundServices';

const Record = () => {
  const [isBackgroundServiceRunning, setIsBackgroundServiceRunning] =
    useState(false);

  useEffect(() => {
    setIsBackgroundServiceRunning(BackgroundService.isRunning());
  }, []);

  const handleStartRecording = async () => {
    try {
      const granted = await check(PERMISSIONS.ANDROID.RECORD_AUDIO);

      if (granted === RESULTS.GRANTED) {
        console.log('Microphone permission granted');
        await startBackgroundTask();
        setIsBackgroundServiceRunning(true);
      } else {
        console.log('Microphone permission denied');
        const requestedPermission = await request(
          PERMISSIONS.ANDROID.RECORD_AUDIO,
        );

        if (requestedPermission === RESULTS.GRANTED) {
          console.log('Microphone permission granted after request');
          await startBackgroundTask();
          setIsBackgroundServiceRunning(true);
        } else if (requestedPermission === RESULTS.DENIED) {
          console.log('Microphone permission denied after request');
        } else if (requestedPermission === RESULTS.BLOCKED) {
          console.log('Microphone permission blocked, opening settings');
          openSettings().catch(() => console.warn('Cannot open settings'));
        }
      }
    } catch (error) {
      console.error('Error checking microphone permission:', error);
    }
  };

  const handleStopRecording = async () => {
    try {
      await stopBackgroundTask();
      setIsBackgroundServiceRunning(false);
    } catch (error) {
      console.error('Failed to stop background task:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Record</Text>
      </View>
      <View
        style={{
          flex: 1,
          padding: 20,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <TouchableOpacity
          style={styles.button}
          onPress={
            isBackgroundServiceRunning
              ? handleStopRecording
              : handleStartRecording
          }>
          <Ionicons
            name={isBackgroundServiceRunning ? 'pause' : 'play'}
            size={24}
            color={
              isBackgroundServiceRunning ? colorData.danger : colorData.success
            }
          />
          <Text style={styles.title2}>
            {isBackgroundServiceRunning ? 'Stop Recording' : 'Start Recording'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

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
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 20,
  },
  title2: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  button: {
    flexDirection: 'row',
    gap: 7,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colorData.back2,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 16,
  },
});

export default Record;
