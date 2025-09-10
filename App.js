// App.js
import React, { useContext, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { View, Image, Text, StyleSheet } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import { UrlProvider, UrlContext } from './context/UrlContext';

// Screens
import DashboardScreen from './screens/DashboardScreen';
import TableauScreen from './screens/TableauScreen';
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

// Navigators
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

// Styles
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
  urlBanner: {
    height: 30,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  urlText: {
    fontSize: 12,
    color: '#333',
  },
});

// Custom drawer with logo
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

// Bottom Tab Navigators
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

// Main App
function MainApp() {
  const { currentUrl } = useContext(UrlContext);

  useEffect(() => {
    const setOrientationBasedOnUrl = async () => {
      if (!currentUrl) return;

      const normalizedUrl = currentUrl.toLowerCase().replace(/\/$/, '');

      try {
        await ScreenOrientation.unlockAsync(); // Always unlock first

        if (normalizedUrl.includes('https://dbo')) {
          await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT);
          console.log('Orientation set to LANDSCAPE');
        } else if (normalizedUrl.includes('https://sso')) {
          await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
          console.log('Orientation set to PORTRAIT');
        }
      } catch (err) {
        console.warn('Orientation error:', err);
      }
    };

    setOrientationBasedOnUrl();
  }, [currentUrl]);

  return (
    <View style={{ flex: 1 }}>
      {/* Top URL banner */}
      {/* <View style={styles.urlBanner}>
        <Text style={styles.urlText}>
          {currentUrl ? `Current URL: ${currentUrl}` : 'Loading URL...'}
        </Text>
      </View> */}

      {/* Navigation */}
      <NavigationContainer>
        <Drawer.Navigator
          drawerContent={(props) => <CustomDrawerContent {...props} />}
          screenOptions={({ route }) => ({
            headerShown: true, // ✅ Show the header (menu button appears)
            drawerIcon: ({ focused, size, color }) => {
              let iconName = 'menu';
              switch (route.name) {
                case 'Home':
                  iconName = focused ? 'home' : 'home-outline';
                  break;
                case 'Procurement':
                  iconName = focused ? 'grid' : 'grid-outline';
                  break;
                case 'Finance':
                  iconName = focused ? 'cash' : 'cash-outline';
                  break;
                case 'Progress':
                  iconName = focused ? 'trending-up' : 'trending-up-outline';
                  break;
                case 'SPI':
                  iconName = focused ? 'stats-chart' : 'stats-chart-outline';
                  break;
                case 'Contracts':
                  iconName = focused ? 'document-text' : 'document-text-outline';
                  break;
                case 'Components':
                  iconName = focused ? 'layers' : 'layers-outline';
                  break;
                case 'Outstanding':
                  iconName = focused ? 'alert-circle' : 'alert-circle-outline';
                  break;
                case 'Tableau':
                  iconName = focused ? 'grid' : 'grid-outline';
                  break;
                default:
                  iconName = 'menu';
              }
              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}
        >
          <Drawer.Screen name="Home" component={DashboardScreen} />
          <Drawer.Screen name="Procurement" component={ProcurementTabs} />
          <Drawer.Screen name="Finance" component={FinanceTabs} />
          <Drawer.Screen name="Progress" component={ProgressTabs} />
          <Drawer.Screen name="SPI" component={SpiScreen} />
          <Drawer.Screen name="Contracts" component={ContractScreen} />
          <Drawer.Screen name="Components" component={ComponentsScreen} />
          <Drawer.Screen name="Outstanding" component={OutstandingScreen} />
          <Drawer.Screen name="Tableau" component={TableauScreen} />
        </Drawer.Navigator>
      </NavigationContainer>
    </View>
  );
}

// Root App
export default function App() {
  return (
    <UrlProvider>
      <MainApp />
    </UrlProvider>
  );
}
