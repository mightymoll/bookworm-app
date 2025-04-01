import { View, StyleSheet } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import COLORS from "../constants/colors"

// component to wrap app 
export default function SafeScreen({children}) {
	// useSafeAreaInsets to get the padding for the top of the screen
	const insets = useSafeAreaInsets();

	return (
		<View style={[
			styles.container,
			{paddingTop: insets.top}
		]}>
			{children}
		</View>
	)
}

const styles = StyleSheet.create({
	container:{
		flex: 1,
		backgroundColor: COLORS.background,
	}
})