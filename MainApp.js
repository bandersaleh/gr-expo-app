// MainApp.js
import React, { useContext, useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import * as ScreenOrientation from 'expo-screen-orientation';

import { UrlContext } from './context/UrlContext';

// Screens
import DashboardScreen from './screens/DashboardScreen';
import ProcurementScreen from './screens/ProcurementScreen';
import ProcurementScreenSummary from './screens/ProcurementScreenSummary';
import FinanceScreen from './screens/FinanceScreen';
import FinanceScreenTracking from './screens/FinanceScreenTracking';
import ProgressScreen from './screens/ProgressScreen';
import ProgressLoadScreen from './screens/ProgressLoadScreen';
import ProgressDesignScreen from './screens/ProgressDesignScreen';
import SpiScreen from './screens/SpiScreen';
import ContractScreen from './screens/ContractScreen';
import ComponentsScreen from './screens/ComponentsScreen';
import OutstandingScreen from './screens/OutstandingScreen';
import TestOrientation from './screens/TestOrientation';

// Navigation setup
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

// 🔹 Tab Navigators
function ProcurementTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Overview" component={ProcurementScreen} />
      <Tab.Screen name="Summary" component={ProcurementScreenSummary} />
    </Tab.Navigator>
  );
}

function FinanceTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Summary" component={FinanceScreen} />
      <Tab.Screen name="Invoice Tracking" component={FinanceScreenTracking} />
    </Tab.Navigator>
  );
}

function ProgressTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Construction" component={ProgressScreen} />
      <Tab.Screen name="Load" component={ProgressLoadScreen} />
      <Tab.Screen name="Design" component={ProgressDesignScreen} />
    </Tab.Navigator>
  );
}

// 🔹 Styles
const styles = StyleSheet.create({
  drawerHeader: {
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  logo: {
    width: 150,
    height: 80,
  },
});

// 🔹 Drawer content
const CustomDrawerContent = (props) => (
  <DrawerContentScrollView {...props}>
    <View style={styles.drawerHeader}>
      <Image
        source={require('./images/fab-logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
    <DrawerItemList {...props} />
  </DrawerContentScrollView>
);

// 🔹 Dynamic screen options
const getScreenOptions = (shouldShowIcons, shouldShowHeader) => ({ route }) => ({
  headerShown: shouldShowHeader,
  drawerIcon: ({ focused, size, color }) => {
    if (!shouldShowIcons) return null;

    let iconName = 'menu';
    switch (route.name) {
      case 'Home':
        iconName = focused ? 'home' : 'home-outline';
        break;
      case 'Procurement':
        iconName = focused ? 'grid' : 'grid-outline';
        break;
      case 'Progress':
        iconName = focused ? 'trending-up' : 'trending-up-outline';
        break;
      case 'Finance':
        iconName = focused ? 'cash' : 'cash-outline';
        break;
      case 'Contracts':
        iconName = focused ? 'document-text' : 'document-text-outline';
        break;
      case 'SPI':
        iconName = focused ? 'stats-chart' : 'stats-chart-outline';
        break;
      case 'Components':
        iconName = focused ? 'layers' : 'layers-outline';
        break;
      case 'Outstanding':
        iconName = focused ? 'alert-circle' : 'alert-circle-outline';
        break;
      // case 'Test':
      //   iconName = focused ? 'alert-circle' : 'alert-circle-outline';
      //   break;
      default:
        iconName = 'menu';
    }

    return <Ionicons name={iconName} size={size} color={color} />;
  },
});

export default function MainApp() {
  const { currentUrl, isReady } = useContext(UrlContext);

  const lowerUrl = currentUrl?.toLowerCase() ?? '';
  const shouldShowIcons = isReady && lowerUrl.startsWith('https://dbo');
  const shouldShowHeader = lowerUrl.startsWith('https://dbo');

  // ✅ Orientation lock (cleaned version)
  useEffect(() => {
  console.log('useEffect triggered with:', { currentUrl, isReady });

  if (!isReady || !currentUrl) return;

  const normalizedUrl = currentUrl.toLowerCase().replace(/\/$/, '');
  console.log('Normalized URL:', normalizedUrl);

  const lockOrientation = async () => {
    try {
      if (normalizedUrl.startsWith('https://dbo')) {
        console.log('Locking orientation to LANDSCAPE');
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT);
        console.log('Orientation locked to LANDSCAPE');
      } else if (normalizedUrl.startsWith('https://sso')) {
        console.log('Locking orientation to PORTRAIT');
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
        console.log('Orientation locked to PORTRAIT');
      }
    } catch (e) {
      console.warn('Error locking orientation:', e);
    }
  };

  const timeoutId = setTimeout(() => {
    lockOrientation();
  }, 500);

  return () => clearTimeout(timeoutId);

}, [currentUrl, isReady]);




  return (
    <View style={{ flex: 1 }}>
      <NavigationContainer>
        <Drawer.Navigator
          drawerContent={(props) => <CustomDrawerContent {...props} />}
          screenOptions={getScreenOptions(shouldShowIcons, shouldShowHeader)}
        >
          <Drawer.Screen name="Home" component={DashboardScreen} />
          <Drawer.Screen name="Procurement" component={ProcurementTabs} />
          <Drawer.Screen name="Progress" component={ProgressTabs} />
          <Drawer.Screen name="Finance" component={FinanceTabs} />
          <Drawer.Screen name="Contracts" component={ContractScreen} />
          <Drawer.Screen name="SPI" component={SpiScreen} />
          <Drawer.Screen name="Components" component={ComponentsScreen} />
          <Drawer.Screen name="Outstanding" component={OutstandingScreen} />
          {/* <Drawer.Screen name="Test" component={TestOrientation} /> */}
        </Drawer.Navigator>
      </NavigationContainer>
    </View>
  );
}
