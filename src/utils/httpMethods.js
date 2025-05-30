import axios from "axios"

export const post = async (url, data) => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const token = userInfo?.data?.token;
    
    const headers = token
      ? { Authorization: `Bearer ${token}` }
      : {};
  
    const response = await axios.post(url, data, { headers });
    return response.data;
  };

export const get = async(url) =>{
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const token = userInfo?.data?.token;
    
    const headers = token
      ? { Authorization: `Bearer ${token}` }
      : {};

    const response = await axios.get(url, { headers })
    return response.data
}

export const put = async(url,data) =>{
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const token = userInfo?.data?.token;
    
    const headers = token
      ? { Authorization: `Bearer ${token}` }
      : {};

    const response = await axios.put(url, data, { headers })
    return response.data
}

export const del = async(url) =>{
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const token = userInfo?.data?.token;
    
    const headers = token
      ? { Authorization: `Bearer ${token}` }
      : {};

    const response = await axios.delete(url, { headers })
    return response.data
}