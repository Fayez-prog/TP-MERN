import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { addcategorie } from "../../Services/categorieservice";
import axios from "axios";
import { FilePond, registerPlugin } from 'react-filepond';

registerPlugin();

const Insertcategorie = ({ show, handleClose, handleAddCategory }) => {
  const [categorie, setCategorie] = useState({
    nomcategorie: "",
    imagecategorie: ""
  });
  const [files, setFiles] = useState([]);

  const serverOptions = () => {
    return {
      process: (fieldName, file, metadata, load, error, progress, abort) => {
        const data = new FormData();
        data.append('file', file);
        data.append('upload_preset', 'Ecommerce_cloudinary');
        data.append('cloud_name', 'iset-sfax');

        axios.post('https://api.cloudinary.com/v1_1/iset-sfax/image/upload', data)
          .then((response) => {
            setCategorie({...categorie, imagecategorie: response.data.url});
            load(response.data);
          })
          .catch((err) => {
            error('Upload failed');
            abort();
          });
      }
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await addcategorie(categorie);
      handleAddCategory(res.data);
      handleClose();
      setCategorie({ nomcategorie: "", imagecategorie: "" });
      setFiles([]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <h2>Ajouter une catégorie</h2>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group">
            <label>Nom de la catégorie</label>
            <input
              type="text"
              value={categorie.nomcategorie}
              onChange={(e) => setCategorie({...categorie, nomcategorie: e.target.value})}
              className="form-control"
              required
            />
          </div>
          <div className="form-group mt-3">
            <label>Image</label>
            <FilePond
              files={files}
              onupdatefiles={setFiles}
              allowMultiple={false}
              server={serverOptions()}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button type="submit" className="btn btn-primary">Enregistrer</button>
          <button type="button" className="btn btn-secondary" onClick={handleClose}>Annuler</button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default Insertcategorie;
