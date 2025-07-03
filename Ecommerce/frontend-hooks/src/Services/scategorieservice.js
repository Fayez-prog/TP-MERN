import Api from "../Axios/Api";

const SCATEGORIE_API = "scategories";

export const fetchscategories = async () => {
  return await Api.get(SCATEGORIE_API);
};

export const fetchscategorieById = async (scategorieId) => {
  return await Api.get(`${SCATEGORIE_API}/${scategorieId}`);
};

export const fetchcategorieById = async (idcat) => {
  return await Api.get(`${SCATEGORIE_API}/cat/${idcat}`);
};

export const deletescategorie = async (scategorieId) => {
  return await Api.delete(`${SCATEGORIE_API}/${scategorieId}`);
};

export const addscategorie = async (scategorie) => {
  return await Api.post(SCATEGORIE_API, scategorie);
};

export const editscategorie = async (scategorie) => {
  return await Api.put(`${SCATEGORIE_API}/${scategorie._id}`, scategorie);
};