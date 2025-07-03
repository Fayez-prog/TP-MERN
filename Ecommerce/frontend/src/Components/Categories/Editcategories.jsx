import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./categorie.css";
import { useParams, useNavigate } from 'react-router-dom';

const Editcategories = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [categorie, setCategorie] = useState({
        nomcategorie: '',
        imagecategorie: ''
    });

    const loadcategorie = async () => {
        axios.get(`http://localhost:3001/api/categories/${id}`)
            .then((response) => {
                setCategorie(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        loadcategorie();
    }, [id]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        axios.put(`http://localhost:3001/api/categories/${id}`, categorie)
            .then(res => {
                console.log(res);
                navigate("/categories");
            })
            .catch(error => {
                console.log(error);
                alert("Erreur ! Modification non effectuée");
            });
    };

    return (
        <div className="form-container">
            <form className="categorie-form">
                <h2 className="form-title">Modifier Catégorie</h2>
                <div className="form-group">
                    <label htmlFor="nom">Nom catégorie</label>
                    <input
                        type="text"
                        id="nom"
                        value={categorie.nomcategorie}
                        onChange={(e) => setCategorie({ ...categorie, nomcategorie: e.target.value })}
                        className="form-input"
                        placeholder="Entrez nom catégorie"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="image">Image</label>
                    <input
                        type="text"
                        id="image"
                        value={categorie.imagecategorie}
                        onChange={(e) => setCategorie({ ...categorie, imagecategorie: e.target.value })}
                        className="form-input"
                        placeholder="URL de l'image"
                        required
                    />
                    {categorie.imagecategorie && <img src={categorie.imagecategorie} alt="prévisualisation" width="100" style={{ marginTop: '10px' }} />}
                </div>
                <button type="button" className="form-submit-button" onClick={handleSubmit}>
                    Enregistrer
                </button>
            </form>
        </div>
    );
};

export default Editcategories;