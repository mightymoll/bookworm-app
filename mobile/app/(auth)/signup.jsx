import { View, Text, TextInput, KeyboardAvoidingView, Platform, TouchableOpacity, ActivityIndicator, Alert} from 'react-native'
import styles from "../../assets/styles/signup.styles"
import { useState } from "react"
import Ionicons from '@expo/vector-icons/Ionicons'
import COLORS from '../../constants/colors'
import { useRouter} from "expo-router"
import { useAuthStore } from "../../store/authStore"

export default function Signup() {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);

	// useAuthStore to get user, token, loading state and 'registerUser' function from AsyncStorage
	const {user, isLoading, registerUser, token} = useAuthStore();

	const router = useRouter();

	const handleSignup = async () => {
		// run 'registerUser' fn from authStore.js when signup button is pushed
		const result = await registerUser(username, email, password);

		if (!result.success) Alert.alert("Error :", result.error)
	};

	// for testing
	// console.log(user);
	// console.log(token);
		
	return (
		<KeyboardAvoidingView
		style={{ flex: 1 }}
		behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
		>
			<View style={styles.container}>
				<View style={styles.card}>
					{/* header */}
					<View style={styles.header}>
						<Text style={styles.title}>Bookworm 🐛</Text>
						<Text style={styles.subtitle}>Share your favorite reads</Text>
					</View>
					{/* form */}
					<View style={styles.formContainer}>
						{/* username input */}
						<View style={styles.inputGroup}>
						<Text style={styles.label}>Username</Text>
						<View style={styles.inputContainer}>
							<Ionicons
							name="person-outline"
							size={20}
							color={COLORS.primary}
							style={styles.inputIcon}
							/>
							<TextInput
								style={styles.input}
								placeholder='BookWorm'
								placeholderTextColor={COLORS.placeholderText}
								value={username}
								onChangeText={setUsername}
								autoCapitalize="none" 
							/>
					</View>
					</View>
					{/* Email input */}
					<View style={styles.inputGroup}>
						<Text style={styles.label}>Email</Text>
						<View style={styles.inputContainer}>
							<Ionicons
							name="mail-outline"
							size={20}
							color={COLORS.primary}
							style={styles.inputIcon}
							/>
							<TextInput
							style={styles.input}
							placeholder='bookworm@gmail.com'
							placeholderTextColor={COLORS.placeholderText}
							value={email}
							onChangeText={setEmail}
							keyboardType="email-address"
							autoCapitalize="none"
							/>
						</View>
					</View>

					{/* Password */}
					<View style={styles.inputGroup}>
						<Text style={styles.label}>Password</Text>
						<View style={styles.inputContainer}>
							{/* LEFT ICON */}
							<Ionicons
							name="lock-closed-outline"
							size={20}
							color={COLORS.primary}
							style={styles.inputIcon}
							/>
							<TextInput
							style={styles.input}
							placeholder='Enter a password'
							placeholderTextColor={COLORS.placeholderText}
							value={password}
							onChangeText={setPassword}
							secureTextEntry={!showPassword}
							keyboardType="email-address"
							autoCapitalize="none"
							/>
							{/* RIGHT ICON : shows password input onPress */}
							<TouchableOpacity
								onPress={()=> setShowPassword(!showPassword)}
								style={styles.eyeIcon}>
									<Ionicons
                  name={showPassword? 'eye-outline' : 'eye-off-outline'}
                  size={20}
                  color={COLORS.primary}
                  />
							</TouchableOpacity>
						</View>
					</View>

					{/* Signup button */}
					<TouchableOpacity
            style={styles.button}
            onPress={handleSignup}
            disabled={isLoading}>
							{/* if page is in loading state, show activity indicator */} 
							{isLoading ? (
								<ActivityIndicator color={COLORS.inputBackground} />
							):(
								<Text style={styles.buttonText}>Signup</Text>
							)}
						</TouchableOpacity>

					{/* footer */}
					<View style={styles.footer}>
						<Text style={styles.footerText}>Already have an account? </Text>
						<TouchableOpacity onPress={()=> router.back()}>
							<Text style={styles.link}>Login</Text>
						</TouchableOpacity>
					</View>

					</View>
				</View>
			</View>
		</KeyboardAvoidingView>
	)
}