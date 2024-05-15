import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import Record from './Screen/Record';
import Recordings from './Screen/Recordings';
import RecordingDetails from './Screen/RecordingDetails';
import BottomBar from './Components/Common/BottomBar';

const App = () => {
  const [activescreen, setActivescreen] = useState('Recordings');

  const renderScreen = () => {
    switch (activescreen) {
      case 'Record':
        return <Record />;
      case 'Recordings':
        return <Recordings />;
      case 'RecordingDetails':
        return <RecordingDetails />;
      default:
        return <Record />;
    }
  };

  return (
    <View style={styles.container}>
      {renderScreen()}
      <BottomBar
        activescreen={activescreen}
        setActivescreen={setActivescreen}
      />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
