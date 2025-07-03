import React, { useEffect, useState } from 'react';
import Affichecategorie from './Affichecategories';
import { CircularProgress } from '@mui/material';
import { fetchcategories, deletecategorie } from '../../Services/categorieservice';
import Insertcategorie from './Insertcategories';

const Listcategories = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [show, setShow] = useState(false);

  const getCategories = async () => {
    try {
      const res = await fetchcategories();
      setCategories(res.data);
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setIsPending(false);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const handleAddCategory = (newCategory) => {
    setCategories([newCategory, ...categories]);
  };

  const handleDeleteCategory = async (categoryId) => {
    try {
      if (window.confirm("Confirmer la suppression ?")) {
        await deletecategorie(categoryId);
        setCategories(categories.filter((cat) => cat._id !== categoryId));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateCategory = (updatedCat) => {
    setCategories(categories.map((cat) => 
      cat._id === updatedCat._id ? updatedCat : cat
    ));
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between mb-3">
        <h2>Gestion des Catégories</h2>
        <button 
          className="btn btn-primary"
          onClick={() => setShow(true)}
        >
          <i className="fas fa-plus me-2"></i>Nouvelle Catégorie
        </button>
      </div>

      {isPending ? (
        <div className="text-center">
          <CircularProgress color="primary" size={60} />
        </div>
      ) : error ? (
        <div className="alert alert-danger">Erreur lors du chargement des catégories</div>
      ) : (
        <Affichecategorie 
          categories={categories} 
          handleDeleteCategory={handleDeleteCategory}
          handleUpdateCategory={handleUpdateCategory}
        />
      )}

      <Insertcategorie
        show={show}
        handleClose={() => setShow(false)}
        handleAddCategory={handleAddCategory}
      />
    </div>
  );
};

export default Listcategories;