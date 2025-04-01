import { Text, View, StyleSheet, TouchableOpacity} from "react-native";
// use expo for images instead of react-native
import { Image } from "expo-image";
import { Link } from "expo-router";
import { useAuthStore } from "../store/authStore"
import { useEffect } from "react"

/* source image from url : 
			<Image source={{uri: "https://images.unsplash.com/photo-1550399105-c4db5fb85c18?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGJvb2tzfGVufDB8fDB8fHww"}} />
	source image from local :
 		 <Image source={require("./path")} />
*/

export default function Index() {
	const {user, token, checkAuth,logoutUser } = useAuthStore();
	console.log(user, token)

	// useEffect hook to check user and token on app load and refresh whenever token changes	
	useEffect(()=>{
		checkAuth();
	}, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome back {user?.username}</Text>
			{/* links to signup & login pages */}
			<Link href="/(auth)/signup">Signup Page</Link>
			<Link href="/(auth)">Login Page</Link>
			<TouchableOpacity onPress={(logoutUser)}>
				<Text style={styles.link}>Logout</Text>
			</TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
	container:{
		flex: 1,
    justifyContent: "center",
    alignItems: "center",
	},
	title:{
		color: "blue"
	}
})
