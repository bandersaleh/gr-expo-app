// ./screens/TestOrientation.js
import React, { useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';

export default function TestOrientation() {
  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT);
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Orientation locked to LANDSCAPE</Text>
      <Button
        title="Lock to PORTRAIT"
        onPress={() => ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP)}
      />
    </View>
  );
}
