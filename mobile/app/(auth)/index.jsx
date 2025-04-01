import { View, Text, TextInput, Image, TouchableOpacity, ActivityIndicator, KeyboardAvoidingView, Platform, Alert} from 'react-native'
import styles from '../../assets/styles/login.styles'
import { useState } from "react"
import Ionicons from '@expo/vector-icons/Ionicons'
import COLORS from "../../constants/colors"
import { Link } from "expo-router"
import { useAuthStore } from "../../store/authStore"

export default function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	// default showPassword to false
	const [showPassword, setShowPassword] = useState(false);
	const {isLoading, loginUser} = useAuthStore();

	const handleLogin=async ()=>{
		const result = await loginUser(email, password);

		if(!result.success) Alert.alert("Error", result.error)
	};

	return (
		<KeyboardAvoidingView
		style={{ flex: 1 }}
		behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
		>
		<View style={styles.container}>
			{/* illustration */}
			<View style={styles.topIllustration}>
				<Image
				source={require("../../assets/images/book-illustration.png")}
				style={styles.illustrationImage}
				contentFit='contain'
				/>
			</View>

			<View style={styles.card}>
				<View style={styles.formContainer}>
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
							placeholder='Enter your email'
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
							placeholder='Enter your password'
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

					{/* Login button */}
					<TouchableOpacity
            style={styles.button}
            onPress={handleLogin}
            disabled={isLoading}>
							{/* if page is in loading state, show activity indicator */} 
							{isLoading ? (
								<ActivityIndicator color={COLORS.inputBackground} />
							):(
								<Text style={styles.buttonText}>Login</Text>
							)}
						</TouchableOpacity>

					{/* footer */}
					<View style={styles.footer}>
						<Text style={styles.footerText}>Don't have an account? </Text>
						<Link href="/signup" asChild>
						<TouchableOpacity>
							<Text style={styles.link}>Signup</Text>
						</TouchableOpacity>
						</Link>
					</View>

				</View>
			</View>
		</View>
		</KeyboardAvoidingView>
	);
}