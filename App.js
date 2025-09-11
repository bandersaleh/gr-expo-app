import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import { UrlProvider } from './context/UrlContext';
import MainApp from './MainApp'; // Move MainApp to a separate file for cleanliness

export default function App() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const prepareApp = async () => {
      try {
        // Lock to PORTRAIT before rendering
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
        console.log('Orientation locked BEFORE render');
      } catch (err) {
        console.warn('Initial orientation lock failed:', err);
      } finally {
        setIsReady(true); // Now allow app to render
      }
    };

    prepareApp();
  }, []);

  if (!isReady) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <UrlProvider>
      <MainApp />
    </UrlProvider>
  );
}

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
