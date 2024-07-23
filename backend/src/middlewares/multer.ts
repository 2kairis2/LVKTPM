import multer from 'multer';

const storage = multer.diskStorage({
    destination: (req: any, file: any, cb: any) => {
        cb(null, 'public/images');
    },
    filename: (req: any, file: any, cb: any) => {
        const ext = file.originalname.split('.')[1];
        cb(null, `${file.originalname.split('.')[0]}-${Date.now()}.${ext}`);
    },
});

const upload = multer({ storage: storage });

export const uploadSingle = upload.single('image');
export const uploadMultiple = upload.array('images', 5);
export default upload;
