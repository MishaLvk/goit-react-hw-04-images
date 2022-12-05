import axios from 'axios';
axios.defaults.baseURL = 'https://pixabay.com/api';
const API_KEY = '29161019-6ea1164b9701eafe63306bc8a';

export const getImages = async ({ request, page, controller }) => {
  const options = {
    params: {
      q: request,
      page: page,
      key: '30074653-21ce3b3057d55da5e0a16da3c',
      image_type: 'photo',
      orientation: 'horizontal',
      per_page: 12,
    },
    signal: controller.signal,
  };
  const response = await axios.get('https://pixabay.com/api/', options);
  return response.data;
};
