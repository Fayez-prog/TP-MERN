import React, { useEffect, useState } from 'react';
import Affichescategorie from './Affichescategories';
import { CircularProgress } from '@mui/material';
import { fetchscategories } from '../../Services/scategorieservice';
import Insertscategorie from './Insertscategories';
import { Button } from 'react-bootstrap';

const Listscategories = () => {
  const [scategories, setScategories] = useState([]);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [show, setShow] = useState(false);

  const getScategories = async () => {
    try {
      const res = await fetchscategories();
      setScategories(res.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsPending(false);
    }
  };

  useEffect(() => {
    getScategories();
  }, []);

  const handleAddScategorie = (newScategorie) => {
    setScategories([newScategorie, ...scategories]);
  };

  const handleDeleteScategorie = async (scategorieId) => {
    try {
      if (window.confirm("Confirmer la suppression ?")) {
        await deletescategorie(scategorieId);
        setScategories(scategories.filter(sc => sc._id !== scategorieId));
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between mb-3">
        <h2>Sous-Catégories</h2>
        <Button variant="primary" onClick={() => setShow(true)}>
          <i className="fas fa-plus me-2"></i>Nouvelle Sous-Catégorie
        </Button>
      </div>

      {isPending ? (
        <div className="text-center">
          <CircularProgress color="primary" size={60} />
        </div>
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : (
        <Affichescategorie 
          scategories={scategories} 
          onDelete={handleDeleteScategorie}
        />
      )}

      <Insertscategorie
        show={show}
        handleClose={() => setShow(false)}
        onAdd={handleAddScategorie}
      />
    </div>
  );
};

export default Listscategories;
