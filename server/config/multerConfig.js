import multer from "multer";

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "uploads/userAvatars");
	},
	filename: (req, file, cb) => {
		const name = Date.now() + "-" + file.originalname;
		cb(null, name);
	},
});

const upload = multer({ storage });

export default upload;
