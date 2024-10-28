import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL || "http://localhost:3001";

const axiosInstance = axios.create({
	baseURL,
	headers: {
		"Content-Type": "application/json",
	},
});
const axiosInstanceMultiData = axios.create({
	baseURL,
	headers: {
		"Content-Type": "multipart/form-data",
	},
});

export {axiosInstanceMultiData}

export default axiosInstance;
