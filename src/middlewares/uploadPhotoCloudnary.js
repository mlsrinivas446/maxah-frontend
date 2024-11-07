import imageCompression from 'browser-image-compression';

const url = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDNARY_CLOUD_NAME}/auto/upload`;

// Api for upload file in cloudinary 
const uploadFile = async (file) => {
    try {
        
        const compressedFile = await imageCompression(file, {
            maxSizeMB: 1, 
            maxWidthOrHeight: 1024, 
            useWebWorker: true,
        });

        const formatData = new FormData();
        formatData.append("file", compressedFile);
        formatData.append("upload_preset", process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET);
        formatData.append("cloud_name", process.env.REACT_APP_CLOUDNARY_CLOUD_NAME);

        const response = await fetch(url, {
            method: 'POST',
            body: formatData,
        });

        if (!response.ok) throw new Error("Image upload failed");
        
        const responseData = await response.json();
        console.log(responseData);
        return responseData;

    } catch (error) {
        console.error("Error uploading photo:", error);
        throw error; 
    }
};

export default uploadFile;
