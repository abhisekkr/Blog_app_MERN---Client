import axios from "axios";

const URL = "http://localhost:5000";

export const userSignin = async (data) => {
	try {
		return await axios.post(`${URL}/signin`, data);
	} catch (error) {
		console.log("Error while calling userSignin API", error);
	}
};

export const userSignup = async (data) => {
	try {
		return await axios.post(`${URL}/signup`, data);
	} catch (error) {
		console.log("Error while calling userSignup API", error);
	}
};

export const authenticateSignin = (data) => {
	if (typeof window !== "undefined") {
		localStorage.setItem("jwt", JSON.stringify(data));
	}
};

export const userSignout = async (next) => {
	if (typeof window !== "undefined") {
		localStorage.removeItem("jwt");
		next();
	}
	try {
		return await axios.get(`${URL}/signout`);
	} catch (error) {
		console.log("Error while calling Signout API", error);
	}
};

export const isAuthenticated = () => {
	if (typeof window == "undefined") {
		return false;
	}
	if (localStorage.getItem("jwt")) {
		return JSON.parse(localStorage.getItem("jwt"));
	} else {
		return false;
	}
};

export const createPost = async (post) => {
	try {
		return await axios.post(`${URL}/create`, post);
	} catch (error) {
		console.log("Error while calling createPost API", error);
	}
};

export const getAllPosts = async (param) => {
	try {
		let response = await axios.get(`${URL}/posts${param}`);
		return response.data;
	} catch (error) {
		console.log("Error while calling getAllPost API", error);
	}
};

export const getPost = async (id) => {
	try {
		let response = await axios.get(`${URL}/post/${id}`);
		return response.data;
	} catch (error) {
		console.log("Error while calling getPost API", error);
	}
};

export const updatePost = async (id, post) => {
	try {
		return await axios.post(`${URL}/update/${id}`, post);
	} catch (error) {
		console.log("Error while calling updatePost API", error);
	}
};

export const deletePost = async (id) => {
	try {
		await axios.delete(`${URL}/delete/${id}`);
	} catch (error) {
		console.log("Error while calling deletePost API", error);
	}
};

export const uploadFile = async (data) => {
	try {
		return await axios.post(`${URL}/file/upload`, data);
	} catch (error) {
		console.log("Error while calling uploadFile API", error);
	}
};

export const newComment = async (data) => {
	try {
		return await axios.post(`${URL}/comment/new`, data);
	} catch (error) {
		console.log("Error while calling comment API", error);
	}
};

export const getComments = async (id) => {
	try {
		let response = await axios.get(`${URL}/comments/${id}`);
		return response.data;
	} catch (error) {
		console.log("Error while clling getComments API", error);
	}
};

export const deleteComment = async (id) => {
	try {
		await axios.delete(`${URL}/comment/delete/${id}`);
	} catch (error) {
		console.log("Error while calling delete comment API", error);
	}
};
