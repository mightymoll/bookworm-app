import { create } from "zustand";

// use zustand to create global states accessible throughout app
export const useAuthStore = create((set)=>({
	user:{name:"john"},
	sayHello:() =>{
		console.log("Hello")
	}
}))