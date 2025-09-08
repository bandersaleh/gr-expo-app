import React from 'react';
import { StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';

const SSO_URL =
  'https://dbo.riyadhgreen.sa';

export default function TableauScreen() {
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
