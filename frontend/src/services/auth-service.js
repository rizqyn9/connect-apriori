import axios from "axios";
import { BASE_URL } from "../config";

export async function signIn() {
	console.log("edas");
	try {
		let res = await axios.post(BASE_URL + "/auth/signup", {
			email: "rizqy@gmail.com",
			password: "test123",
			username: "rizqyn9",
		});
		return res;
	} catch (error) {
		console.log(error);
	}
}
