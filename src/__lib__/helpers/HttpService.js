import axios from "axios";
import { toast } from "react-hot-toast";

export const APP_URL = `${process.env.NODE_ENV==="development"? 
"http://localhost:4000/": 
"https://apimeal.vercel.app/"
}`;

export const API_URL = `${APP_URL}api`;
export const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/homefinder/image`;

const api = axios.create({
  baseURL: API_URL,
});

const img = axios.create({
  baseURL: CLOUDINARY_URL, 
});


const authHeader = (token) => {
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
};
export const getData = async (endPoint) => {
  try {
    const { data } = await api.get(endPoint);
    return data;
  } catch (error) {
    return error;
  }
};

export const _getData = async (endPoint, token) => {
  try {
    const { data } = await api.get(endPoint, {
      headers: authHeader(token),
    });
    return data;
  } catch (error) {
    toast.error(`${error?.response?.data?.message}`);
    return error;
  }
};

export const postData = async (endPoint, formData, setProgress) => {
  try {
    const { data } = await api.post(endPoint, formData, {
      onUploadProgress: (progressEvent) => {
        if (setProgress) {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setProgress(progress);
        }
      }
    });
    return data;
  } catch (error) {
    toast.error(`${error?.response?.data?.message}`);
    return error;
  }
};

export const postReq = async (endPoint, formData) => {
  try {
    const { data } = await api.post(endPoint, formData);
    return data;
  } catch (error) {
    toast.error(`${error?.response?.data?.message}`);
    return error;
  }
};

export const authPost = async (endPoint, formData, token) => {
  try {
    const { data } = await api.post(endPoint, formData, {
      headers: authHeader(token)
    });
    return data;
  } catch (error) {
    return error;
  }
};

export const updateData = async (endPoint, formData, token) => {
  try {
    const { data } = await axios.put(API_URL + endPoint, formData, {
      headers: authHeader(token),
    });
    return data;
  } catch (error) {
    return error;
  }
};

export const deleteData = async (endPoint, token) => {
  try {
    const { data } = await axios.delete(API_URL + endPoint, {
      headers: authHeader(token),
    });
    return data;
  } catch (error) {
    return error;
  }
};

export const uploadImage = async (endPoint, formData) => {
  try {
    const { data } = await img.post(endPoint, formData);
    return data;
  } catch (error) {
    toast.error(`${error?.response?.data?.message}`);
    return error;
  }
};

export const getFormData = async (key, data) => {
  // needed for images
  const formData = new FormData();
  for (let i = 0; i < key.length; i++) {
    formData.append(key[i], data[i]);
  }
  return formData;
};
