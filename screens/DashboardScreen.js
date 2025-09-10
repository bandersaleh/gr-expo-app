import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ActivityIndicator, Text } from 'react-native';
import { WebView } from 'react-native-webview';
import * as ScreenOrientation from 'expo-screen-orientation';

const INITIAL_URL = 'https://dbo.riyadhgreen.sa/views/HOME/PROGRAMOVERVIEW?%3Atoolbar=0&%3Alinktarget=_self&%3Aembed=yes#2';

export default function DashboardScreen() {
  const [orientationReady, setOrientationReady] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const lockOrientation = async () => {
      try {
        console.log('Locking initial orientation to portrait...');
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
        console.log('Orientation locked to portrait');
        setOrientationReady(true);
      } catch (err) {
        console.error('Failed to lock orientation:', err);
        setError(err.message || 'Unknown error');
      }
    };

    lockOrientation();

    // Safety timeout: if orientation doesn't lock within 5 seconds, proceed anyway
    const timeout = setTimeout(() => {
      if (!orientationReady) {
        console.warn('Timeout reached, proceeding without orientation lock');
        setOrientationReady(true);
      }
    }, 5000);

    return () => clearTimeout(timeout);
  }, []);

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={{ color: 'red', fontWeight: 'bold' }}>Error locking orientation:</Text>
        <Text>{error}</Text>
      </View>
    );
  }

  if (!orientationReady) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Setting up orientation...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: INITIAL_URL }}
        startInLoadingState={true}
        style={styles.webview}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  webview: { flex: 1 },
});
