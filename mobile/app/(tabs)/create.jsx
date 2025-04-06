import { View, Text, TextInput, KeyboardAvoidingView, ScrollView, Platform, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import styles from '../../assets/styles/create.styles';
import COLORS from "../../constants/colors";
import Ionicons from '@expo/vector-icons/Ionicons';


export default function CreateTab() {
// setup states
	const [title, setTitle] = useState("");
	const [review, setReview] = useState("");
	const [rating, setRating] = useState(3);
	const [image, setImage] = useState(null); // to display selected image
	const [imageString, setImageString] = useState(null); // string version of image
	const [loading, setLoading] = useState(false);

	const router = useRouter();

	const pickImage = async()=>{};

	const handleSubmit = async()=>{};

	// fills number of stars based on which is pressed & sets value of 'stars'
	const renderRatingPicker = () =>{
		const stars = [];
		for (let i =1; i <=5; i++){
		stars.push(
			<TouchableOpacity key={i} onPress={() => setRating(i)} style={styles.starButton}>
				<Ionicons
				name={i <= rating ? "star" : "star-outline"}
				size={32}
				color={i <= rating ? '#f4b400' : COLORS.textSecondary}
				/>
			</TouchableOpacity>
			);
		}
		return <View style={styles.ratingContainer}>{stars}</View>
	};

	return (
		<KeyboardAvoidingView
		style={{ flex: 1 }}
		behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
		>
			<ScrollView contentContainerStyle={styles.container} style={styles.scrollViewStyle}>
				<View style={styles.card}>
				{/* HEADER */}
				  <View style={styles.header}>
            <Text style={styles.title}>Add a Recommendation</Text>
						<Text style={styles.subtitle}>Share your favorite books with others</Text>
          </View>
				{/* FORM */}
					<View style={styles.form}>
						{/* BOOK TITLE */}
						<View style={styles.formGroup}>
              <Text style={styles.label}>Book Title</Text>
              <View style={styles.inputContainer}>
								<Ionicons
								name="book-outline"
                size={20}
								color={COLORS.textSecondary}
								style={styles.inputIcon}
								/>
								<TextInput
                  style={styles.input}
                  placeholder="Enter book title"
									placeholderTextColor={COLORS.placeholderText}
                  value={title}
                  onChangeText={setTitle}
								/>
            	</View>
						</View>

						{/* RATING */}
						<View style={styles.formGroup}>
              <Text style={styles.label}>Your Rating</Text>
              {renderRatingPicker()}
						</View>
						{/* REVIEW */}
						<View style={styles.formGroup}></View>
						<Text style={styles.label}>What's special about it?</Text>
						<View style={styles.inputContainer}>
								<Ionicons
								name="pencil-outline"
                size={20}
								color={COLORS.textSecondary}
								style={styles.inputIcon}
								/>
								<TextInput
                  style={styles.input}
                  placeholder="Enter book description"
									placeholderTextColor={COLORS.placeholderText}
                  value={review}
                  onChangeText={setReview}
								/>
            	</View>
					</View>
				</View>
			</ScrollView>
		</KeyboardAvoidingView>
	)
}