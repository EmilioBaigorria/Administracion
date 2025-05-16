import axios from "axios";

export const uploadImageToCloudinary = async (file: File): Promise<string | null> => {
    const cloudUrl = import.meta.env.VITE_CLOUDINARY_URL
    const uploadPreset = import.meta.env.VITE_UPLOAD_PRESET

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', `${uploadPreset}`);

    try {
        const response = await axios.post(cloudUrl, formData)
        if (!response) {
            throw new Error('Ocurrio un error durante la subida de una imagen');
        }

        const data: {
            secure_url: string;
            [key: string]: any;
        } = await response.data;
        return data.secure_url;
    } catch (error) {
        console.error('Ocurrio un error durante la subida de una imagen:', error);
        return null;
    }
};
