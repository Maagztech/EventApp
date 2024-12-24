import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/Ionicons';
import Header from './Components/Headers';
import { AuthProvider, useAuth } from './context/authContext';
import { EventProvider } from './context/eventContext';
import Admin from './Screens/Admin';
import Client from './Screens/Client';
import Event from './Screens/Event';
import Login from './Screens/Login';
import Registered from './Screens/Registered';
export type RootStackParamList = {
  Login: undefined;
  Admin: undefined;
  Tabs: undefined;
  Event: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarIcon: ({focused, color, size}) => {
          let iconName: string = '';
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Registered') {
            iconName = focused ? 'person' : 'person-outline';
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'naviblue',
        tabBarInactiveTintColor: 'black',
      })}>
      <Tab.Screen name="Home" component={Client} />
      <Tab.Screen name="Registered" component={Registered} />
    </Tab.Navigator>
  );
};

function AppNavigator(): React.JSX.Element {
  const {userInfo}: any = useAuth(); // useAuth can now be safely used here.

  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Tabs" component={TabNavigator} />
      <Stack.Screen name="Admin" component={Admin} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Event" component={Event}/>
    </Stack.Navigator>
  );
}

function App(): React.JSX.Element {
  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar barStyle="dark-content" />
      <NavigationContainer>
        <AuthProvider>
          <EventProvider>
            <Header />
            <AppNavigator />
          </EventProvider>
        </AuthProvider>
        <Toast />
      </NavigationContainer>
    </SafeAreaView>
  );
}

export default App;
