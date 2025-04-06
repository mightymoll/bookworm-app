import { Stack, useRouter, useSegments } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import SafeScreen from "../components/SafeScreen";
import {StatusBar} from "expo-status-bar";
import {useEffect} from "react";
import { useAuthStore } from "../store/authStore";

export default function RootLayout() {
	const router = useRouter();
	// get the current route and its segments (navigational route)
	const segments = useSegments();

	const {checkAuth, user, token} = useAuthStore();

	useEffect(()=>{
		checkAuth();
	}, [])
	
	// handle navigation based on the auth state
	useEffect(()=>{
		// if segments shows user is @ auth/index.jsx then inAuthScreen = true
		const inAuthScreen = segments[0] === "(auth)";
		// if user and token exist in authStore then isSignedIn = true
		const isSignedIn = user && token;

		// go to Login screen (auth/index.jsx) if user is not already there and is not signed in
		if (!inAuthScreen && !isSignedIn) router.replace("/(auth)");

		// if user is on the login screen and is already signed in then go to the Home page (tabs/index.jsx)
	  else if(inAuthScreen && isSignedIn){
      router.replace("/(tabs)")
    }
	}, [user,token,segments])

	// add routes for each tab and authentication screen
  return (
		<SafeAreaProvider>
			<SafeScreen>
				<Stack screenOptions={{headerShown: false}}>
					<Stack.Screen name="(tabs)" />
					<Stack.Screen name="(auth)" />
				</Stack>
			</SafeScreen>
			<StatusBar style="dark" />
		</SafeAreaProvider>
	)
}
