import React, {useState, useEffect} from 'react';
import BackgroundService from 'react-native-background-actions';
import {View, Button, StyleSheet, Text} from 'react-native';
import {colorData} from '../utils/colorData';
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
      await startBackgroundTask();
      setIsBackgroundServiceRunning(true);
    } catch (error) {
      console.error('Failed to start background task:', error);
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
        <Button
          title={
            isBackgroundServiceRunning ? 'Stop Recording' : 'Start Recording'
          }
          onPress={
            isBackgroundServiceRunning
              ? handleStopRecording
              : handleStartRecording
          }
        />
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
});

export default Record;
