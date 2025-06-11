import { uploadImageToCloudinary } from "../../../http/imageRequest";
import styles from "./uploadImage.module.css"
import{ useState, type ChangeEvent } from 'react';


const UploadImage= () => {
  const [imageUrl, setImageUrl] = useState<string|null>("https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM=");

  const handleFileChange = async (image: ChangeEvent<HTMLInputElement>) => {
    const file = image.target.files?.[0];
    if (file) {
      const url = await uploadImageToCloudinary(file);
      setImageUrl(url);
    }
  };

  return (
    <div className={styles.mainContainer}>
      <input className={styles.input} type="file" accept="image/*" onChange={handleFileChange} />
      {imageUrl && (
        <div>
          <p>Preview:</p>
          <img src={imageUrl} alt="" width="100" />
        </div>
      )}
    </div>
  );
};

export default UploadImage;