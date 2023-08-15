import multer from "multer";

const storage = multer.diskStorage({});

function isImage(file, cb) {
    const allowedMimes = ['image/jpeg', 'image/png', 'image/gif'];
    if (allowedMimes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only JPEG, PNG, and GIF images are allowed.'));
    }
}

const cloudinaryUpload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        isImage(file, cb); 
    },
});

export default cloudinaryUpload;
