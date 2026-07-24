import { Tabs } from 'expo-router';
import React from 'react';
import { Text } from 'react-native';

export default function Layout() {
  return (
    <Tabs screenOptions={{ 
      headerShown: false,
      tabBarShowLabel: false,
      tabBarActiveTintColor: '#000',
      tabBarInactiveTintColor: '#888',
    }}>
      <Tabs.Screen 
        name="index" 
        options={{ tabBarIcon: ({ color }) => <Text style={{ fontSize: 24, color }}>🏠</Text> }} 
      />
      <Tabs.Screen 
        name="search" 
        options={{ tabBarIcon: ({ color }) => <Text style={{ fontSize: 24, color }}>🔍</Text> }} 
      />
      <Tabs.Screen 
        name="reels" 
        options={{ tabBarIcon: ({ color }) => <Text style={{ fontSize: 24, color }}>🎬</Text> }} 
      />
      <Tabs.Screen 
        name="profile" 
        options={{ tabBarIcon: ({ color }) => <Text style={{ fontSize: 24, color }}>👤</Text> }} 
      />
    </Tabs>
  );
}