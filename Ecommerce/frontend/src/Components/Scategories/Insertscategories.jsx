import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./scategories.css";
import { useNavigate } from 'react-router-dom';

const Insertscategories = () => {
    const navigate = useNavigate();
    const [scategorie, setScategorie] = useState({
        nomscategorie: '',
        imagescategorie: '',
        categorieID: ''
    });
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3001/api/categories")
            .then(res => {
                setCategories(res.data);
            })
            .catch(err => console.log(err));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post("http://localhost:3001/api/scategories", scategorie)
            .then(res => {
                navigate("/scategories");
            })
            .catch(error => {
                alert("Erreur lors de l'ajout");
            });
    };

    return (
        <div className="form-container">
            <form className="scategorie-form">
                <h2 className="form-title">Ajouter Sous-Catégorie</h2>
                <div className="form-group">
                    <label>Nom sous-catégorie</label>
                    <input
                        type="text"
                        value={scategorie.nomscategorie}
                        onChange={(e) => setScategorie({...scategorie, nomscategorie: e.target.value})}
                        className="form-input"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Image</label>
                    <input
                        type="text"
                        value={scategorie.imagescategorie}
                        onChange={(e) => setScategorie({...scategorie, imagescategorie: e.target.value})}
                        className="form-input"
                    />
                    {scategorie.imagescategorie && <img src={scategorie.imagescategorie} alt="prévisualisation" width="100" />}
                </div>
                <div className="form-group">
                    <label>Catégorie parente</label>
                    <select
                        className="form-control"
                        value={scategorie.categorieID}
                        onChange={(e) => setScategorie({...scategorie, categorieID: e.target.value})}
                        required
                    >
                        <option value="">Sélectionner une catégorie</option>
                        {categories.map((cat) => (
                            <option key={cat._id} value={cat._id}>{cat.nomcategorie}</option>
                        ))}
                    </select>
                </div>
                <button type="button" className="form-submit-button" onClick={handleSubmit}>
                    Enregistrer
                </button>
            </form>
        </div>
    );
};

export default Insertscategories;
