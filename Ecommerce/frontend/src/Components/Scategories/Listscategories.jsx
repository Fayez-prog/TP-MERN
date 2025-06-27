import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Affichescategories from './Affichescategories';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

const Listscategories = () => {
    const [scategories, setScategories] = useState([]);

    const getscategories = async () => {
        await axios.get("http://localhost:3001/api/scategories")
            .then(res => {
                setScategories(res.data);
            })
            .catch(error => {
                console.log(error);
            });
    };

    useEffect(() => {
        getscategories();
    }, []);

    return (
        <div className="container mt-4">
            <Button variant="contained" style={{ backgroundColor: 'black', marginBottom: '20px' }}>
                <Link to="/scategories/add" style={{ color: 'white', textDecoration: 'none' }}>
                    <i className="fa-solid fa-plus-square"></i> Nouveau
                </Link>
            </Button>
            <h2 className="mb-4">Liste des sous-catégories</h2>
            <Affichescategories scategories={scategories} setScategories={setScategories} />
        </div>
    );
};

export default Listscategories;