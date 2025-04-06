import { View, Text, TextInput, KeyboardAvoidingView, ScrollView, Platform, TouchableOpacity, Alert, Image, ActivityIndicator } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import styles from '../../assets/styles/create.styles';
import COLORS from "../../constants/colors";
import Ionicons from '@expo/vector-icons/Ionicons';
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system"

export default function CreateTab() {
// setup states
	const [title, setTitle] = useState("");
	const [review, setReview] = useState("");
	const [rating, setRating] = useState(3);
	const [image, setImage] = useState(null); // to display selected image
	const [imageBase64, setImageBase64] = useState(null); // string version of image
	const [loading, setLoading] = useState(false);

	const router = useRouter();

	// allow user to choose image for Book review
	const pickImage = async()=>{
		try{
			// request permission if not on web
			if (Platform.OS !== "web"){
				const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
				if(status !== "granted"){
					Alert.alert("Permission denied", "We need camera roll permissions to upload an image");
					return;
				}
			}
			// launch image library
			const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: "images",
				allowsEditing: true,
				quality: 0.5, //lower quality for smaller base64
        aspect: [4, 3],
        base64: true,
        exif: true,
      });

      if (!result.canceled){
        // set image state
        setImage(result.assets[0].uri);

				// if base64 is provided, use it
				if(result.assets[0].base64){
					setImageBase64(result.assets[0].base64);
				}
				else{
					// convert uri to base64
          const imageBase64 = await FileSystem.readAsStringAsync(result.assets[0].uri, {
						encoding: FileSystem.EncodingType.Base64,
					});
          setImageBase64(imageBase64);
				}
      }
		}
		catch (error){

		}
	};

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

						{/* IMAGE */}
						<View style={styles.formGroup}>
              <Text style={styles.label}>Image</Text>
              <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
								{/* check if image exists, else use placeholder icon + text */}
								{image ? (
									<Image source={{ uri: image }} style={styles.previewImage} />
								) : (
									<View style={styles.placeholderContainer}>
									<Ionicons name="image-outline" size={40} color={COLORS.textSecondary} />
									<Text style={styles.placeholderText}>Tap to select image</Text>
									</View>
								)}
							</TouchableOpacity>
						</View>

						{/* REVIEW */}
						<View style={styles.formGroup}>
							<Text style={styles.label}>What's special about it?</Text>
							<View style={styles.caption}>
								<TextInput
									style={styles.textArea}
									placeholder="Enter book description"
									placeholderTextColor={COLORS.placeholderText}
									value={review}
									onChangeText={setReview}
									multiline={true}
									lineheight={20}
								/>
							</View>
						</View>
						
						{/* SUBMIT BUTTON */}
						<TouchableOpacity style={styles.button} onPress={handleSubmit}
						disabled={loading}>{
							loading ? (
								<ActivityIndicator color={COLORS.white} />
							) : (
								<>
									<Ionicons 
									name="cloud-upload-outline"
									size={20}
									color={COLORS.white}
									style={styles.buttonIcon}
									/>
									<Text style={styles.buttonText}>Submit</Text>
								</>
							)}
						</TouchableOpacity>
					</View>
				</View>
			</ScrollView>
		</KeyboardAvoidingView>
	)
}