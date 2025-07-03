import React, { useState, useEffect } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { addscategorie } from '../../Services/scategorieservice';
import { fetchcategories } from '../../Services/categorieservice';
import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';

registerPlugin();

const Insertscategorie = ({ show, handleClose, onAdd }) => {
  const [scategorie, setScategorie] = useState({
    nomscategorie: '',
    categorieID: '',
    imagescategorie: ''
  });
  const [categories, setCategories] = useState([]);
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const res = await fetchcategories();
        setCategories(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    loadCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await addscategorie(scategorie);
      onAdd(res.data);
      handleClose();
      setScategorie({
        nomscategorie: '',
        categorieID: '',
        imagescategorie: ''
      });
      setFiles([]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Nouvelle Sous-Catégorie</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Nom</Form.Label>
            <Form.Control
              type="text"
              value={scategorie.nomscategorie}
              onChange={(e) => setScategorie({...scategorie, nomscategorie: e.target.value})}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Catégorie Parente</Form.Label>
            <Form.Select
              value={scategorie.categorieID}
              onChange={(e) => setScategorie({...scategorie, categorieID: e.target.value})}
              required
            >
              <option value="">Sélectionner une catégorie</option>
              {categories.map(cat => (
                <option key={cat._id} value={cat._id}>{cat.nomcategorie}</option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Image</Form.Label>
            <FilePond
              files={files}
              onupdatefiles={setFiles}
              allowMultiple={false}
              server={{
                process: (fieldName, file, metadata, load, error) => {
                  const formData = new FormData();
                  formData.append('file', file);
                  formData.append('upload_preset', 'your_upload_preset');
                  
                  fetch('https://api.cloudinary.com/v1_1/your_cloud_name/upload', {
                    method: 'POST',
                    body: formData
                  })
                  .then(res => res.json())
                  .then(data => {
                    setScategorie({...scategorie, imagescategorie: data.secure_url});
                    load(data.public_id);
                  })
                  .catch(err => error(err.message));
                }
              }}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Annuler
          </Button>
          <Button variant="primary" type="submit">
            Enregistrer
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default Insertscategorie;