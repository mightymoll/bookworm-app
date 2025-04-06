import { View, Text, TextInput, KeyboardAvoidingView, ScrollView, Platform, TouchableOpacity, Alert, Image, ActivityIndicator } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import styles from '../../assets/styles/create.styles';
import COLORS from "../../constants/colors";
import Ionicons from '@expo/vector-icons/Ionicons';
import * as ImagePicker from "expo-image-picker";
import { useAuthStore } from "../../store/authStore";
import { API_URL } from "../../constants/api";

export default function CreateTab() {
	const FormData = global.FormData;

// setup states
	const [title, setTitle] = useState("");
	const [review, setReview] = useState("");
	const [rating, setRating] = useState(3);
	const [image, setImage] = useState(null); // to display selected image
	const [loading, setLoading] = useState(false);

	const router = useRouter();
	const { token } = useAuthStore();

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
        exif: true,
      });

      if (!result.canceled){
        setImage(result.assets[0].uri);
			}
		}
		catch (error){
			console.log("Error uploading image:", error)
		}
	};

	const handleSubmit = async()=>{
		// check all field values are complete
		if(!title || !review || !rating || !image){
			Alert.alert("Error", "Please fill in all fields");
			return;
		}
		// if everything is good, try to post book to API
		try{
			setLoading(true);

			const formData = new FormData();
			formData.append("title", title);
			formData.append("review", review);
			formData.append("rating", rating);
			// add image information to formData
			formData.append("image",{
				uri: image,
        name: "image",
        type: "file"
			});

			console.log("formData: ", formData)
 
			// post BOOK to API
      const response = await fetch(`${API_URL}/books/`, {
				method: "POST",
        headers: {
					Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        },
				body: formData,
      });

				console.log(response)
			// if response is not 'ok' then throw an error
			if(!response.ok) throw new Error(data.message || 'Something went wrong');
			
			// else, alert 'success'
			Alert.alert("Success", "Your book recommendation has been posted!");
			
			// reset form to defaults
			setTitle("");
			setReview("");
			setRating(3);
			setImage(null);
			setImageBase64(null);
			router.push("/")
		}
		catch(error){
			console.error("Error creating post:", error);
			Alert.alert("Error", error.message ||  "Something went wrong");
		}
		finally{	
			setLoading(false);
		}
	};

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