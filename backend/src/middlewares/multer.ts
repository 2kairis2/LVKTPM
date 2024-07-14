import multer from 'multer';

const storage = multer.diskStorage({
    destination: (req: any, file: any, cb: any) => {
        cb(null, 'public/images');
    },
    filename: (req: any, file: any, cb: any) => {
        const ext = file.originalname.split('.')[1];
        cb(null, `${file.originalname.split('.')[0]}_${Date.now()}.${ext}`);
    },
});

const upload = multer({ storage: storage });

export default upload;
