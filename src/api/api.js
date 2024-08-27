import axios from 'axios';

export const convertImageToText = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await axios.post('https://ocr.vsrv.ir/ocr/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data; // Assuming the API response contains the text
  } catch (error) {
    console.error('API error:', error);
    throw error;
  }
};
