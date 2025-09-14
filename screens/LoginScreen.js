// ./screens/DashboardScreen.js
import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, View, ActivityIndicator, Text } from 'react-native';
import { WebView } from 'react-native-webview';
import { UrlContext } from '../context/UrlContext';

const DBO_URL =
  'https://sso.riyadhgreen.sa/adfs/oauth2/authorize/?client_id=ae623856-587c-4bcd-a12c-03b8f8996f80&response_type=code&redirect_uri=https%3A%2F%2Fdbo.riyadhgreen.sa%2Fvizportal%2Fapi%2Fweb%2Fv1%2Fauth%2FopenIdLogin&scope=openid+email+profile&state=cGF0aD0lMkZ2aWV3cyUyRkhPTUUlMkZQUk9HUkFNT1ZFUlZJRVclM0YlM0F0b29sYmFyJTNEMCUyNiUzQWxpbmt0YXJnZXQlM0Rfc2VsZiUyNiUzQWVtYmVkJTNEeWVzJTI2JTNBcmVkaXJlY3QlM0RhdXRoJlhTUkYtVE9LRU49ZVI0TTdEV21iWWEwMFhwdUFSNnZKVjF1STEzaDdkZmw&nonce=ZVuh2fBA3Q8';

export default function LoginScreen() {
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
