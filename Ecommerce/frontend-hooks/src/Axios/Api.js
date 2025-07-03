import axios from 'axios';

export default axios.create({
  // baseURL: "https://ecommercebackend2023j.vercel.app/api"
  // ou pour le développement local :
  baseURL: "http://localhost:3001/api/"
});