
// Import necessary components and hooks from React and React Native
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
// Import the Battery module from expo-battery
import * as Battery from 'expo-battery';

export default function BatteryScreen() {
  // State variables to store battery information
  const [batteryLevel, setBatteryLevel] = useState(null);
  const [isCharging, setIsCharging] = useState(false);
  const [batteryState, setBatteryState] = useState('');

  // useEffect hook to handle battery monitoring
  useEffect(() => {
    // Subscribe to battery updates when component mounts
    subscribe();
    // Cleanup function to unsubscribe when component unmounts
    return () => {
      unsubscribe();
    };
  }, []);

  // Function to set up battery monitoring subscriptions
  const subscribe = async () => {
    try {
      // Get initial battery level
      const level = await Battery.getBatteryLevelAsync();
      setBatteryLevel(level);

      // Get initial charging status
      const status = await Battery.getBatteryStateAsync();
      setIsCharging(status === Battery.BatteryState.CHARGING);
      setBatteryState(getBatteryStateLabel(status));

      // Subscribe to battery level changes
      Battery.addBatteryLevelListener(({ batteryLevel }) => {
        setBatteryLevel(batteryLevel);
      });

      // Subscribe to charging state changes
      Battery.addBatteryStateListener(({ batteryState }) => {
        setIsCharging(batteryState === Battery.BatteryState.CHARGING);
        setBatteryState(getBatteryStateLabel(batteryState));
      });
    } catch (error) {
      console.error('Error setting up battery monitoring:', error);
    }
  };

  // Function to cleanup battery monitoring subscriptions
  const unsubscribe = () => {
    Battery.removeBatteryLevelListener();
    Battery.removeBatteryStateListener();
  };

  // Helper function to convert battery state to readable label
  const getBatteryStateLabel = (state) => {
    switch (state) {
      case Battery.BatteryState.UNKNOWN:
        return 'Unknown';
      case Battery.BatteryState.UNPLUGGED:
        return 'Not Charging';
      case Battery.BatteryState.CHARGING:
        return 'Charging';
      case Battery.BatteryState.FULL:
        return 'Full';
      default:
        return 'Unknown';
    }
  };

  // Helper function to determine battery indicator color
  const getBatteryColor = (level) => {
    if (level > 0.5) return '#4CAF50';  // Green for high battery
    if (level > 0.2) return '#FFC107';  // Yellow for medium battery
    return '#F44336';                   // Red for low battery
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Battery Monitor</Text>

      {/* Battery Level Indicator */}
      <View style={styles.batteryContainer}>
        <View style={styles.batteryOuter}>
          <View
            style={[
              styles.batteryInner,
              {
                width: `${(batteryLevel || 0) * 100}%`,
                backgroundColor: getBatteryColor(batteryLevel),
              },
            ]}
          />
        </View>
        <View style={styles.batteryTip} />
      </View>

      {/* Battery Stats */}
      <View style={styles.statsContainer}>
        <Text style={styles.percentage}>
          {batteryLevel ? `${Math.round(batteryLevel * 100)}%` : 'Loading...'}
        </Text>
        <Text style={styles.status}>Status: {batteryState}</Text>
        {isCharging && <Text style={styles.charging}>⚡ Charging</Text>}
      </View>

      <Text style={styles.note}>
        This app demonstrates the use of {Platform.OS === 'ios' ? 'iOS' : 'Android'} battery API
      </Text>
    </View>
  );
}

// Styles for the Battery Screen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  batteryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  batteryOuter: {
    width: 200,
    height: 80,
    borderWidth: 3,
    borderColor: '#333',
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  batteryInner: {
    height: '100%',
    backgroundColor: '#4CAF50',
  },
  batteryTip: {
    width: 10,
    height: 30,
    backgroundColor: '#333',
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  statsContainer: {
    alignItems: 'center',
  },
  percentage: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  status: {
    fontSize: 18,
    color: '#666',
    marginBottom: 5,
  },
  charging: {
    fontSize: 18,
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  note: {
    position: 'absolute',
    bottom: 40,
    color: '#666',
    fontSize: 14,
  },
});
