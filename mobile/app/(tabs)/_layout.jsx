// file to add icons and styling to all tabs
import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router';

// name = filename for each screen within tab navigation
export default function TabLayout() {
	return (
		<Tabs>
			<Tabs.Screen name="index" />
			<Tabs.Screen name="create" />
			<Tabs.Screen name="profile" />
		</Tabs>
	)
}