import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./article.css";
import { useNavigate } from 'react-router-dom';

const Insertarticles = () => {
    const navigate = useNavigate();
    const [article, setArticle] = useState({
        designation: '',
        imageart: '',
        marque: '',
        prix: 0,
        qtestock: 0,
        reference: '',
        scategorieID: ''
    });
    const [scategories, setScategories] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3001/api/scategories")
            .then(res => {
                setScategories(res.data);
            })
            .catch(err => console.log(err));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post("http://localhost:3001/api/articles", article)
            .then(res => {
                navigate("/articles");
            })
            .catch(error => {
                alert("Erreur lors de l'ajout");
            });
    };

    return (
        <div className="form-container">
            <form className="article-form">
                <h2 className="form-title">Ajouter un article</h2>
                <div className="form-group">
                    <label>Désignation</label>
                    <input
                        type="text"
                        value={article.designation}
                        onChange={(e) => setArticle({...article, designation: e.target.value})}
                        className="form-input"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Image</label>
                    <input
                        type="text"
                        value={article.imageart}
                        onChange={(e) => setArticle({...article, imageart: e.target.value})}
                        className="form-input"
                    />
                    {article.imageart && <img src={article.imageart} alt="prévisualisation" width="100" />}
                </div>
                <div className="form-group">
                    <label>Marque</label>
                    <input
                        type="text"
                        value={article.marque}
                        onChange={(e) => setArticle({...article, marque: e.target.value})}
                        className="form-input"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Prix</label>
                    <input
                        type="number"
                        value={article.prix}
                        onChange={(e) => setArticle({...article, prix: e.target.value})}
                        className="form-input"
                        required
                        min="0"
                        step="0.01"
                    />
                </div>
                <div className="form-group">
                    <label>Quantité en stock</label>
                    <input
                        type="number"
                        value={article.qtestock}
                        onChange={(e) => setArticle({...article, qtestock: e.target.value})}
                        className="form-input"
                        required
                        min="0"
                    />
                </div>
                <div className="form-group">
                    <label>Référence</label>
                    <input
                        type="text"
                        value={article.reference}
                        onChange={(e) => setArticle({...article, reference: e.target.value})}
                        className="form-input"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Sous-catégorie</label>
                    <select
                        className="form-control"
                        value={article.scategorieID}
                        onChange={(e) => setArticle({...article, scategorieID: e.target.value})}
                        required
                    >
                        <option value="">Sélectionner une sous-catégorie</option>
                        {scategories.map((scat) => (
                            <option key={scat._id} value={scat._id}>{scat.nomscategorie}</option>
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

export default Insertarticles;
