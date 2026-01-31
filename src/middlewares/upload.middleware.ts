import multer from "multer";
import path from "path";
import fs from "fs";

const uploadDir = "uploads";

if (!fs.existsSync(uploadDir)) {
	fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
	destination(_req, _file, callback) {
		callback(null, uploadDir);
	},
	filename(req, file, callback) {
		const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
		callback(null, uniqueSuffix + path.extname(file.originalname));
	},
});

const fileFilter = (
	_req: any,
	file: Express.Multer.File,
	cb: multer.FileFilterCallback,
) => {
	if (file.mimetype.startsWith("image/")) {
		console.log("mimetype", file.mimetype);
		cb(null, true);
	} else {
		cb(new Error("Only images are allowed"));
	}
};

export const upload = multer({
	storage,
	fileFilter,
	limits: { fileSize: 5 * 1024 * 1024 },
});
