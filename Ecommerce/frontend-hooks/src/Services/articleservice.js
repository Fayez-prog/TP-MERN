import axios from "../Axios/Api"

const ARTICLE_API = "articles"

export const fetcharticles = async () => {
  return await axios.get(ARTICLE_API)
}

export const fetcharticleById  = async (articleId) => {
  return await axios.get(ARTICLE_API + '/' + articleId)
}

export const deletearticle = async (articleId) => {
  return await axios.delete(ARTICLE_API + '/' + articleId)
}

export const addarticle = async (article) => {
  return await axios.post(ARTICLE_API, article)
}

export const editarticle = (article) => {
  return axios.put(ARTICLE_API + '/' + article._id, article)
}