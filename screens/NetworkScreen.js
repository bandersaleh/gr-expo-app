// Import necessary React and React Native components
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
// Import the Network module from Expo
import * as Network from 'expo-network';

export default function NetworkScreen() {
  // Define state to store network information
  const [networkState, setNetworkState] = useState({
    isConnected: false,        // Is the device connected to a network?
    type: null,                // Type of network connection (WIFI, CELLULAR, etc.)
    isInternetReachable: false, // Is internet actually accessible?
    ip: null,                  // Device's IP address
  });

  // Set up network monitoring when component mounts
  useEffect(() => {
    // Check network status immediately
    checkNetwork();

    // Set up interval to check network status every 5 seconds
    const interval = setInterval(checkNetwork, 5000);

    // Cleanup: clear interval when component unmounts
    return () => clearInterval(interval);
  }, []); // Empty dependency array means this runs once on mount

  // Function to check and update network status
  const checkNetwork = async () => {
    try {
      // Get current network state using Expo's Network API
      const networkState = await Network.getNetworkStateAsync();
      // Get device's IP address
      const ip = await Network.getIpAddressAsync();

      // Update state with new network information
      setNetworkState({
        isConnected: networkState.isConnected,
        type: networkState.type,
        isInternetReachable: networkState.isInternetReachable,
        ip,
      });
    } catch (error) {
      console.error('Error checking network:', error);
    }
  };

  // Function to get appropriate icon for network type
  const getNetworkTypeIcon = (type) => {
    // Map network types to emoji icons
    const icons = {
      WIFI: '📶',
      CELLULAR: '📱',
      BLUETOOTH: '🦷',
      ETHERNET: '🔌',
      VPN: '🔒',
      UNKNOWN: '❓',
    };
    return icons[type] || '❓';
  };

  return (
    <ScrollView style={styles.container}>
      {/* Network Status Card */}
      <View style={styles.card}>
        <Text style={styles.title}>Network Status</Text>

        {/* Connection Status Indicator */}
        <View style={styles.statusContainer}>
          <Text
            style={[
              styles.connectionDot,
              { backgroundColor: networkState.isConnected ? 'green' : 'red' },
            ]}
          >
            ⬤
          </Text>
          <Text style={styles.statusText}>
            {networkState.isConnected ? 'Connected' : 'Disconnected'}
          </Text>
        </View>

        {/* Network Information Rows */}
        <View style={styles.infoRow}>
          <Text style={styles.label}>Network Type:</Text>
          <Text style={styles.value}>
            {getNetworkTypeIcon(networkState.type)} {networkState.type || 'Unknown'}
          </Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Internet Access:</Text>
          <Text
            style={[
              styles.value,
              { color: networkState.isInternetReachable ? 'green' : 'red' },
            ]}
          >
            {networkState.isInternetReachable ? 'Available' : 'Not Available'}
          </Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>IP Address:</Text>
          <Text style={styles.value}>{networkState.ip || 'Unknown'}</Text>
        </View>
      </View>

      {/* Tips Card */}
      <View style={[styles.card, styles.tipsCard]}>
        <Text style={styles.tipsTitle}>Network Tips</Text>
        <Text style={styles.tipText}>• Turn off WiFi to test cellular connection</Text>
        <Text style={styles.tipText}>• Enable Airplane mode to test offline state</Text>
        <Text style={styles.tipText}>• Connect to VPN to see network type change</Text>
      </View>
    </ScrollView>
  );
}

// Define styles for the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'whitesmoke',
    padding: 20,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    // Add shadow for iOS
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // Add elevation for Android
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  connectionDot: {
    fontSize: 24,
    marginRight: 10,
  },
  statusText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
  },
  label: {
    fontSize: 16,
    color: 'dimgray',
  },
  value: {
    fontSize: 16,
    fontWeight: '500',
  },
  tipsCard: {
    backgroundColor: 'aliceblue',
  },
  tipsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: 'navy',
  },
  tipText: {
    fontSize: 14,
    color: 'darkslategray',
    marginBottom: 8,
  },
});
