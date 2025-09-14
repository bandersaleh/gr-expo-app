// MainApp.js
import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
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
import LoginScreen from './screens/LoginScreen';
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

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

// Tab navigators
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

const { width: SCREEN_WIDTH } = Dimensions.get('window');

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
  swipeHintContainer: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 60,
    backgroundColor: 'rgba(255,255,255,0.95)',
    zIndex: 9999,
    elevation: 9999,
    flexDirection: 'column',
    alignItems: 'center',
  },
  swipeHintTextContainer: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  swipeHintText: {
    color: '#000',
    fontSize: 14,
    fontWeight: '600',
    transform: [{ rotate: '-90deg' }],
    width: 200,
    textAlign: 'center',
  },
  iconScrollView: {
    flex: 1,
  },
  iconBar: {
    paddingTop: 10,
    alignItems: 'center',
  },
  iconButton: {
    padding: 8,
    marginVertical: 6,
  },
});

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

const getScreenOptions = (shouldShowIcons, shouldShowHeader) => ({ route }) => ({
  headerShown: shouldShowHeader,
  headerLeft: () => null,
  gestureEnabled: true,
  swipeEnabled: true,
  swipeEdgeWidth: SCREEN_WIDTH, // allow swipe from anywhere
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
      default:
        iconName = 'menu';
    }

    return <Ionicons name={iconName} size={size} color={color} />;
  },
});

const SwipeIconBar = ({ onPressIcon }) => {
  // list of screen names and matching icon names
  const iconList = [
    { screen: 'Home', iconName: 'home-outline' },
    { screen: 'Procurement', iconName: 'grid-outline' },
    { screen: 'Progress', iconName: 'trending-up-outline' },
    { screen: 'Finance', iconName: 'cash-outline' },
    { screen: 'Contracts', iconName: 'document-text-outline' },
    { screen: 'SPI', iconName: 'stats-chart-outline' },
    { screen: 'Components', iconName: 'layers-outline' },
    { screen: 'Outstanding', iconName: 'alert-circle-outline' },
  ];

  return (
    <View style={styles.iconBar}>
      {iconList.map((it) => (
        <TouchableOpacity
          key={it.screen}
          style={styles.iconButton}
          onPress={() => {
            onPressIcon(it.screen);
          }}
        >
          <Ionicons name={it.iconName} size={24} color="#000" />
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default function MainApp() {
  const { currentUrl, isReady } = useContext(UrlContext);
  const lowerUrl = currentUrl?.toLowerCase() ?? '';
  const shouldShowIcons = isReady && lowerUrl.startsWith('https://dbo');
  const shouldShowHeader = lowerUrl.startsWith('https://dbo');

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [navigationRef, setNavigationRef] = useState(null);

  // Orientation lock same as before
  useEffect(() => {
    if (!isReady || !currentUrl) return;
    const normalizedUrl = currentUrl.toLowerCase().replace(/\/$/, '');
    const lockOrientation = async () => {
      try {
        if (normalizedUrl.startsWith('https://dbo')) {
          await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT);
        } else {
          await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
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
      <NavigationContainer
        ref={(ref) => setNavigationRef(ref)}
        onStateChange={(state) => {
          const drawerIsOpen = state.history?.some((entry) => entry.type === 'drawer');
          setIsDrawerOpen(drawerIsOpen);
        }}
      >
        <Drawer.Navigator
          drawerContent={(props) => <CustomDrawerContent {...props} />}
          screenOptions={getScreenOptions(shouldShowIcons, shouldShowHeader)}
        >
          {!lowerUrl.startsWith('https://dbo') && <Drawer.Screen name="Login" component={LoginScreen} />}
          <Drawer.Screen name="Home" component={DashboardScreen} />
          <Drawer.Screen name="Procurement" component={ProcurementTabs} />
          <Drawer.Screen name="Progress" component={ProgressTabs} />
          <Drawer.Screen name="Finance" component={FinanceTabs} />
          <Drawer.Screen name="Contracts" component={ContractScreen} />
          <Drawer.Screen name="SPI" component={SpiScreen} />
          <Drawer.Screen name="Components" component={ComponentsScreen} />
          <Drawer.Screen name="Outstanding" component={OutstandingScreen} />
        </Drawer.Navigator>
      </NavigationContainer>

      {/* Only show when drawer is closed AND URL starts with dbo */}
      {!isDrawerOpen && shouldShowHeader && navigationRef && (
        <View style={styles.swipeHintContainer}>
          <TouchableOpacity
            onPress={() => navigationRef.dispatch({ type: 'OPEN_DRAWER' })}
            style={styles.swipeHintTextContainer}
          >
            <Text style={styles.swipeHintText}>swipe-&gt;</Text>
          </TouchableOpacity>

          <ScrollView
            style={styles.iconScrollView}
            contentContainerStyle={styles.iconBar}
            showsVerticalScrollIndicator={false}
          >
            <SwipeIconBar
              onPressIcon={(screenName) => {
                navigationRef.navigate(screenName);
              }}
            />
          </ScrollView>
        </View>
      )}
    </View>
  );
}
