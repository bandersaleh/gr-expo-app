import React from 'react';
import { StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';

const SSO_URL =
  'https://sso.riyadhgreen.sa/adfs/oauth2/authorize/?client_id=ae623856-587c-4bcd-a12c-03b8f8996f80&response_type=code&redirect_uri=https%3A%2F%2Fdbo.riyadhgreen.sa%2Fvizportal%2Fapi%2Fweb%2Fv1%2Fauth%2FopenIdLogin&scope=openid+email+profile&state=cGF0aD0lMkZ2aWV3cyUyRkhPTUUlMkZQUk9HUkFNT1ZFUlZJRVclM0YlM0F0b29sYmFyJTNEMCUyNiUzQWxpbmt0YXJnZXQlM0Rfc2VsZiUyNiUzQWVtYmVkJTNEeWVzJTI2JTNBcmVkaXJlY3QlM0RhdXRoJlhTUkYtVE9LRU49U1hzVnlPV0JFRzhVNDJ6Y3YzbFhpbUlBeE1oQWM1ODI&nonce=E3SwY4upMCQ';

export default function HomeScreen() {
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
