import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Affichearticles from './Affichearticles';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

const Listarticles = () => {
    const [articles, setArticles] = useState([]);

    const getarticles = async () => {
        await axios.get("http://localhost:3001/api/articles")
            .then(res => {
                setArticles(res.data);
            })
            .catch(error => {
                console.log(error);
            });
    };

    useEffect(() => {
        getarticles();
    }, []);

    return (
        <div className="container mt-4">
            <Button variant="contained" style={{ backgroundColor: 'black', marginBottom: '20px' }}>
                <Link to="/articles/add" style={{ color: 'white', textDecoration: 'none' }}>
                    <i className="fa-solid fa-plus-square"></i> Nouvel article
                </Link>
            </Button>
            <h2 className="mb-4">Liste des articles</h2>
            <Affichearticles articles={articles} setArticles={setArticles} />
        </div>
    );
};

export default Listarticles;
