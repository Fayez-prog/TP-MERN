import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./scategories.css";
import { useParams, useNavigate } from 'react-router-dom';

const Editscategories = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [scategorie, setScategorie] = useState({
        nomscategorie: '',
        imagescategorie: '',
        categorieID: ''
    });
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:3001/api/scategories/${id}`)
            .then(res => {
                setScategorie(res.data);
            })
            .catch(err => console.log(err));

        axios.get("http://localhost:3001/api/categories")
            .then(res => {
                setCategories(res.data);
            })
            .catch(err => console.log(err));
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.put(`http://localhost:3001/api/scategories/${id}`, scategorie)
            .then(res => {
                navigate("/scategories");
            })
            .catch(error => {
                alert("Erreur lors de la modification");
            });
    };

    return (
        <div className="form-container">
            <form className="scategorie-form">
                <h2 className="form-title">Modifier Sous-Catégorie</h2>
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
                        onChange={(e) => setScategorie({...scategorie, imagescat: e.target.value})}
                        className="form-input"
                    />
                    {scategorie.imagescategorie && <img src={scategorie.imagescategorie} alt="prévisualisation" width="100" />}
                </div>
                <div className="form-group">
                    <label>Catégorie parente</label>
                    <select
                        className="form-control"
                        value={scategorie.categorieID?._id || scategorie.categorieID}
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

export default Editscategories;