import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { editcategorie } from '../../Services/categorieservice';
import axios from 'axios';
import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const Editcategories = ({ show, cat, handleClose, handleUpdateCategory }) => {
  const [categorie, setCategorie] = useState(cat);
  const [files, setFiles] = useState(
    cat.imagecategorie ? [{ source: cat.imagecategorie, options: { type: 'local' } }] : []
  );

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
      },
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await editcategorie(categorie);
      handleUpdateCategory(res.data);
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <h2>Modifier Catégorie</h2>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group mb-3">
            <label>Nom Catégorie</label>
            <input
              type="text"
              className="form-control"
              value={categorie.nomcategorie}
              onChange={(e) => setCategorie({...categorie, nomcategorie: e.target.value})}
              required
            />
          </div>
          <div className="form-group">
            <label>Image</label>
            <FilePond
              files={files}
              onupdatefiles={setFiles}
              allowMultiple={false}
              server={serverOptions()}
              name="file"
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button type="submit" className="btn btn-primary">Enregistrer</button>
          <button type="button" className="btn btn-secondary" onClick={handleClose}>
            Annuler
          </button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default Editcategories;