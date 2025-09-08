import React from 'react';
import { StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';

const SSO_URL =
  'https://dbo.riyadhgreen.sa/views/LOCATIONS/SPI?%3Atoolbar=0&%3Alinktarget=_self&%3Aembed=yes#5';

export default function ProgressScreen() {
  return (
    <View style={styles.container}>
      <WebView source={{ uri: SSO_URL }} style={styles.webview} />
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
