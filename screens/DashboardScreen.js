// ./screens/DashboardScreen.js
import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, View, ActivityIndicator, Text } from 'react-native';
import { WebView } from 'react-native-webview';
import { UrlContext } from '../context/UrlContext';

const DBO_URL =
  'https://dbo.riyadhgreen.sa/views/HOME/PROGRAMOVERVIEW?%3Atoolbar=0&%3Alinktarget=_self&%3Aembed=yes';

export default function DashboardScreen() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { setCurrentUrl } = useContext(UrlContext);

  // Set the URL on mount
  useEffect(() => {
    setCurrentUrl(DBO_URL);
  }, []);

  return (
    <View style={styles.container}>
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
        </View>
      )}
      {error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Failed to load dashboard.</Text>
        </View>
      ) : (
        <WebView
          source={{ uri: DBO_URL }}
          style={styles.webview}
          onLoadStart={(navState) => {
            if (navState?.nativeEvent?.url) {
              setCurrentUrl(navState.nativeEvent.url);
            }
          }}
          onLoadEnd={() => setLoading(false)}
          onError={() => {
            setLoading(false);
            setError(true);
          }}
          startInLoadingState={true}
        />
      )}
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
  loadingContainer: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.7)',
    zIndex: 10,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
});
