import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


//import {createDrawerNavigator} from '@react-navigation/drawer';

import { Ionicons, FontAwesome } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen';
import ChangeLangScreen from '../screens/ChangeLangScreen';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import LandingScreen from '../screens/LandingScreen';
import UserDashboardScreen from '../screens/UserDashboardScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import SearchScreen from '../screens/SearchScreen';
import StartupScreen from '../screens/StartupScreen';
import BlankNoteScreen from '../screens/BlankNoteScreen';
import EditNoteScreen from '../screens/EditNoteScreen';

import { Translation } from 'react-i18next';
import i18n from "../i18n.js"


const LandingPageStackNavigator = createStackNavigator();
export const LandingPageNavigator = () => {
    return (
        <Translation>
            {(t, { i18n }) =>
                <LandingPageStackNavigator.Navigator
                    mode='modal'
                >
                    <LandingPageStackNavigator.Screen
                        name='Landing'
                        component={LandingScreen}
                        options={{ headerTitle: t('Home') }}
                    />

                    <LandingPageStackNavigator.Screen
                        name='BlankScreen'
                        component={BlankNoteScreen}
                        options={{ headerTitle: '' }}
                    />
                    <LandingPageStackNavigator.Screen
                        name='EditNoteScreen'
                        component={EditNoteScreen}
                        options={{ headerTitle: '' }}
                    />

                </LandingPageStackNavigator.Navigator>
            }
        </Translation>
    )
}
const UserDashboardStackNavigator = createStackNavigator();
export const UserDashboardNavigator = () => {

    return (
        <Translation>
            {(t, { i18n }) =>
                <UserDashboardStackNavigator.Navigator>
                    <UserDashboardStackNavigator.Screen
                        name='Dashboard'
                        component={UserDashboardScreen}
                        options={{ headerTitle: '' }}
                    />
                    <UserDashboardStackNavigator.Screen
                        name='ChangeLang'
                        component={ChangeLangScreen}
                        options={{ headerTitle: t('Change language') }}
                    />
                </UserDashboardStackNavigator.Navigator>
            }
        </Translation>
    )
}

const FavoritesStackNavigator = createStackNavigator();
export const FavoritesNavigator = () => {

    return (
        <Translation>
            {(t, { i18n }) =>
                <FavoritesStackNavigator.Navigator>
                    <FavoritesStackNavigator.Screen
                        name='Favorites'
                        component={FavoritesScreen}
                        options={{ headerTitle: t('Favorites') }}
                    />

                </FavoritesStackNavigator.Navigator>
            }
        </Translation>
    )
}

const SearchStackNavigator = createStackNavigator();
export const SearchNavigator = () => {

    return (
        <SearchStackNavigator.Navigator>
            <SearchStackNavigator.Screen
                name='Search'
                component={SearchScreen}
                options={{ headerTitle: 'Search' }}
            />

            <SearchStackNavigator.Screen
                name='EditNoteScreen'
                component={EditNoteScreen}
                options={{ headerTitle: '' }}
            />

        </SearchStackNavigator.Navigator>
    )
}

const LoggedInTabNavigator = createBottomTabNavigator();
const LoggedInNavigator = () => {
    return (
        <Translation>
            {(t, { i18n }) =>
                <LoggedInTabNavigator.Navigator
                    tabBarOptions={{
                        activeTintColor: '#DA4633'
                    }}
                >
                    <LoggedInTabNavigator.Screen
                        name='LandingPage'
                        component={LandingPageNavigator}
                        options={{

                            tabBarLabel: t('Home'),
                            tabBarIcon: ({ color, size }) => {
                                return <FontAwesome name='home' size={size} color={color} />
                            }
                        }}
                    />
                    <LoggedInTabNavigator.Screen
                        name='Favorites'
                        component={FavoritesNavigator}
                        options={{
                            tabBarLabel: t('Favorites'),
                            tabBarIcon: ({ color, size }) => {
                                return <Ionicons name='ios-star' size={size} color={color} />
                            }
                        }}
                    />
                    <LoggedInTabNavigator.Screen
                        name='Search'
                        component={SearchNavigator}
                        options={{
                            tabBarLabel: t('Search'),
                            tabBarIcon: ({ color, size }) => {
                                return <Ionicons name='ios-search' size={size} color={color} />
                            }
                        }}
                    />
                    <LoggedInTabNavigator.Screen
                        name='UserDashboardPage'
                        component={UserDashboardNavigator}
                        options={{
                            tabBarLabel: t('Me'),
                            tabBarIcon: ({ color, size }) => {
                                return <Ionicons name='md-person' size={size} color={color} />
                            }
                        }}
                    />
                </LoggedInTabNavigator.Navigator>
            }
        </Translation>
    )
}


const AuthStackNavigator = createStackNavigator();
const AuthNavigator = () => {
    return (
        <Translation>
            {(t, { i18n }) =>
                <AuthStackNavigator.Navigator>
                    <AuthStackNavigator.Screen
                        name='Home'
                        component={HomeScreen}
                        options={{
                            headerShown: false
                        }}
                    />
                    <AuthStackNavigator.Screen
                        name='ChangeLang'
                        component={ChangeLangScreen}
                        options={{
                            headerShown: true,
                            headerTitle: t('Change language')
                        }}
                    />
                    <AuthStackNavigator.Screen
                        name='Login'
                        component={LoginScreen}
                        options={{
                            headerShown: true
                        }}
                    />
                    <AuthStackNavigator.Screen
                        name='SignUp'
                        component={SignUpScreen}
                        options={{
                            headerShown: true,
                            headerTitle: t('New Account')
                        }}
                    />
                    <AuthStackNavigator.Screen
                        name='LoggedIn'
                        component={LoggedInNavigator}
                        options={{
                            headerShown: false
                        }}
                    />
                </AuthStackNavigator.Navigator>
            }
        </Translation>
    )
}
const MainAppNavigator = props => {

    const isAuth = useSelector(state => !!state.auth.token);
    const didTryAutoLogin = useSelector(state => state.auth.didTryAutoLogin);

    return (
        <NavigationContainer>
            {isAuth && <LoggedInNavigator />}
            {!isAuth && didTryAutoLogin && <AuthNavigator />}
            {!isAuth && !didTryAutoLogin && <StartupScreen />}
        </NavigationContainer>
    )
}


export default MainAppNavigator;