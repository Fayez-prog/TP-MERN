import React, { useState } from 'react';
import axios from 'axios';
import "./categorie.css";
import { useNavigate } from 'react-router-dom';

const Insertcategories = () => {
    const navigate = useNavigate();
    const [categorie, setCategorie] = useState({
        nomcategorie: '',
        imagecategorie: ''
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        await axios.post("http://localhost:3001/api/categories", categorie)
            .then(res => {
                navigate("/categories");
            })
            .catch(error => {
                alert("Erreur ! Insertion non effectuée");
            });
    };

    return (
        <div className="form-container">
            <form className="categorie-form">
                <h2 className="form-title">Ajouter Catégorie</h2>
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

export default Insertcategories;