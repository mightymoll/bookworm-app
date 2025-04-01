import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";

// use zustand to create global states accessible throughout app
export const useAuthStore = create((set)=> ({
	user: null,
	token: null,
	isLoading: false,

	// register a new user & set data in AsyncStorage
	registerUser: async(username, email, password) =>{
		set({isLoading:true});
		try{
			const response = await fetch("https://bookworm-app-xuoh.onrender.com/api/auth/register", {
				method:"POST",
				headers: {'Content-Type': 'application/json',},
				body: JSON.stringify({
					username, 
					email, 
					password
				}),
			});

			const data = await response.json();

			if(!response.ok) throw new Error(data.message || 'Something went wrong');

			// save token and user data from API to AsyncStorage
      await AsyncStorage.setItem("user", JSON.stringify(data.user));
			await AsyncStorage.setItem("token", data.token);

      set({user: data.user, token: data.token, isLoading: false});

			return {success: true}
		}
		catch(error){
			set({isLoading: false})
      return {success: false, error: error.message}
		}
	},

	// check AsyncStorage for user & token data
	checkAuth: async()=>{
		try{
			const token = await AsyncStorage.getItem("token");
			const userJson=await AsyncStorage.getItem("user");
			const user = userJson ? JSON.parse(userJson) : null;
      
			set ({token, user})
		}
		catch(error){
			console.log("Auth check failed", error)
		}
	},

	// logout user and remove data from AsyncStorage
	logoutUser:async()=>{
		await AsyncStorage.removeItem("token");
		await AsyncStorage.removeItem("user");
		set({token: null, user: null})
	},

}))