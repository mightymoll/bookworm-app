import { Text, View, StyleSheet } from "react-native";
// use expo for images instead of react-native
import { Image } from "expo-image";

/* source image from url : 
			<Image source={{uri: "https://images.unsplash.com/photo-1550399105-c4db5fb85c18?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGJvb2tzfGVufDB8fDB8fHww"}} />
	source image from local :
 		 <Image source={require("./path")} />
*/

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Testing testing 123</Text>
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
