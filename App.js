// Run App via Console: 
// npx expo start
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { View, Image, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';

// screen components
import HomeScreen from './screens/HomeScreen';
import DashboardScreen from './screens/DashboardScreen';
import TableauScreen from './screens/TableauScreen';
import ProcurementScreen from './screens/ProcurementScreen';
import FinanceScreen from './screens/FinanceScreen';
import ProgressScreen from './screens/ProgressScreen';
import SpiScreen from './screens/SpiScreen';
import ContractsScreen from './screens/ContractScreen';
import ComponentsScreen from './screens/ComponentsScreen';
import OutstandingScreen from './screens/OutstandingScreen';
import ProcurementScreenSummary from './screens/ProcurementScreenSummary';
import FinanceScreenContracts from './screens/FinanceScreenContracts';
import FinanceScreenTracking from './screens/FinanceScreenTracking';
import ProgressLoadScreen from './screens/ProgressLoadScreen';
import ProgressDesignScreen from './screens/ProgressDesignScreen';
import ProgressZonesScreen from './screens/ProgressZonesScreen';

// Create Navigators
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

// Procurement Tabs (Bottom Tab Navigator for Procurement only)
function ProcurementTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name="PROCUREMENT OVERVIEW" component={ProcurementScreen} />
      <Tab.Screen name="PROCUREMENT SUMMARY" component={ProcurementScreenSummary} />
    </Tab.Navigator>
  );
}

// Financial Tabs (Bottom Tab Navigator for Finance only)
function FinanceTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name="FINANCIAL SUMMARY" component={FinanceScreen} />
      <Tab.Screen name="INVOICE TRACKING" component={FinanceScreenTracking} />
      {/* <Tab.Screen name="CONTRACTS" component={FinanceScreenContracts} /> */}
    </Tab.Navigator>
  );
}

// Progress Tabs (Bottom Tab Navigator for Progress only)
function ProgressTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen name="CONSTRUCTION" component={ProgressScreen} />
      <Tab.Screen name="LOAD" component={ProgressLoadScreen} />
      <Tab.Screen name="DESIGN" component={ProgressDesignScreen} />
      {/* <Tab.Screen name="ZONES" component={ProgressZonesScreen} />
      <Tab.Screen name="SPI" component={SpiScreen} /> */}
      {/* Add more procurement-related tabs here if needed */}
    </Tab.Navigator>
  );
}
const CustomDrawerContent = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.drawerHeader}>
        <Image
          source={require('./images/fab-logo.png')} // ✅ Your image path
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
};
const styles = StyleSheet.create({
  drawerHeader: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  logo: {
    width: 160,
    height: 80,
  },
});

// Main App Component
export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={({ route }) => ({
          drawerIcon: ({ focused, size, color }) => {
            let iconName = 'menu';
            switch (route.name) {
              case 'Home':
              iconName = focused ? 'home' : 'home-outline';
              break;
              case 'DashboardTabs':
                iconName = focused ? 'home' : 'home-outline';
                break;
              case 'ProcurementTabs':
                iconName = focused ? 'grid' : 'grid-outline';
                break;
              case 'FinanceTabs':
                iconName = focused ? 'cash' : 'cash-outline';
                break;
              case 'ProgressTabs':
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
                iconName = focused ? 'grid' : 'home-outline';
                break;
              default:
                iconName = 'menu';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Drawer.Screen
  name="Home"
  component={DashboardScreen}
  options={{ title: 'Home' }}
/>
        <Drawer.Screen
          name="ProcurementTabs"
          component={ProcurementTabs}
          options={{ title: 'Procurement' }}
        />
        <Drawer.Screen
          name="FinanceTabs"
          component={FinanceTabs}
          options={{ title: 'Finance' }}
        />
        {/* <Drawer.Screen name="Finance" component={FinanceScreen} /> */}
        <Drawer.Screen
          name="ProgressTabs"
          component={ProgressTabs}
          options={{ title: 'Progress' }}
        />
        {/* <Drawer.Screen name="Progress" component={ProgressScreen} /> */}
        <Drawer.Screen name="SPI" component={SpiScreen} />
        <Drawer.Screen name="Contracts" component={ContractsScreen} />
        <Drawer.Screen name="Components" component={ComponentsScreen} />
        <Drawer.Screen name="Outstanding" component={OutstandingScreen} />
        {/* <Drawer.Screen name="Workbook" component={HomeScreen} /> */}
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
