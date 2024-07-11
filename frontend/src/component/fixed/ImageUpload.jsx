import { useState } from "react";
export default  function ImageUpload() {
    const [selectedImage, setSelectedImage] = useState(null);
  
    // Xử lý sự kiện khi người dùng chọn ảnh
    const handleImageChange = (event) => {
      const imageFile = event.target.files[0];
      setSelectedImage(imageFile);
      // Xử lý ảnh được chọn ở đây (ví dụ: tải lên máy chủ, xem trước, vv.)
    };
}
