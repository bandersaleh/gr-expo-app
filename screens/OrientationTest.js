import React, { useState } from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';

export default function OrientationTest() {
  const [message, setMessage] = useState('Try locking orientation.');

  const lockPortrait = async () => {
    try {
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
      setMessage('Locked to PORTRAIT');
    } catch (e) {
      setMessage(`Error: ${e.message}`);
    }
  };

  const lockLandscape = async () => {
    try {
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
      setMessage('Locked to LANDSCAPE');
    } catch (e) {
      setMessage(`Error: ${e.message}`);
    }
  };

  return (
    <View style={styles.container}>
      <Text>{message}</Text>
      <Button title="Lock Portrait" onPress={lockPortrait} />
      <Button title="Lock Landscape" onPress={lockLandscape} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
