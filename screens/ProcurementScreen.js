import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';
import * as ScreenOrientation from 'expo-screen-orientation';

const PROCUREMENT_URL =
  'https://dbo.riyadhgreen.sa/views/PROCUREMENTPROJECTS/PROCUREMENTOVERVIEW?%3Atoolbar=0&%3Alinktarget=_self&%3Aembed=yes#2';

// Detect if URL is the SSO login screen
const isLoginUrl = (url) => {
  return url.includes('sso.riyadhgreen.sa/');
};

export default function ProcurementScreen() {
  const [orientation, setOrientation] = useState(null);

  const lockOrientation = async (toPortrait) => {
    try {
      if (toPortrait && orientation !== 'portrait') {
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
        setOrientation('portrait');
      } else if (!toPortrait && orientation !== 'landscape') {
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
        setOrientation('landscape');
      }
    } catch (error) {
      console.warn('Orientation lock failed:', error);
    }
  };

  const handleNavigationChange = (navState) => {
    const { url } = navState;
    if (isLoginUrl(url)) {
      lockOrientation(true); // Login screen = Portrait
    } else {
      lockOrientation(false); // Default view = Landscape
    }
  };

  useEffect(() => {
    // Default orientation to landscape for Procurement screen
    lockOrientation(false);
  }, []);

  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: PROCUREMENT_URL }}
        onNavigationStateChange={handleNavigationChange}
        startInLoadingState={true}
        style={styles.webview}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
});
