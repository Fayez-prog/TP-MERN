import React, { useEffect, useState } from 'react'
import { fetchscategories } from "../../Services/scategorieservice"
import { Modal } from 'react-bootstrap'
import axios from "axios"
import { FilePond, registerPlugin } from 'react-filepond'
import 'filepond/dist/filepond.min.css'
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
import { editarticle } from "../../Services/articleservice"

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview)

const Editarticle = ({ show, art, handleClose, handleUpdateProduct }) => {
  const [article, setArticle] = useState(art)
  const [scategories, setScategories] = useState([])
  const [files, setFiles] = useState([])

  const loadscategories = async () => {
    try {
      const res = await fetchscategories()
      setScategories(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    loadscategories()
    if (art.imageart) {
      setFiles([{
        source: art.imageart,
        options: { type: 'local' }
      }])
    }
  }, [art])

  const handlemodif = (e) => {
    setArticle({...article, [e.target.id]: e.target.value})
  }

  const serverOptions = () => {
    return {
      load: (source, load, error, progress, abort, headers) => {
        var myRequest = new Request(source)
        fetch(myRequest).then(function(response) {
          response.blob().then(function(myBlob) {
            load(myBlob)
          })
        })
      },
      process: (fieldName, file, metadata, load, error, progress, abort) => {
        const data = new FormData()
        data.append('file', file)
        data.append('upload_preset', 'Ecommerce_cloudinary')
        data.append('cloud_name', 'iset-sfax')
        data.append('public_id', file.name)

        axios.post('https://api.cloudinary.com/v1_1/iset-sfax/image/upload', data)
          .then((response) => response.data)
          .then((data) => {
            setArticle({...article, imageart: data.url })
            load(data)
          })
          .catch((err) => {
            console.error('Error uploading file:', err)
            error('Upload failed')
            abort()
          })
      }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await editarticle(article).then(res => {
        handleUpdateProduct(article)
        handleClose()
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="form-container">
      <Modal show={show} onHide={handleClose}>
        <form className="article-form">
          <Modal.Header closeButton>
            <h2>Modifier Article</h2>
          </Modal.Header>
          <Modal.Body>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="reference">Référence</label>
                <input
                  type="text"
                  id="reference"
                  value={article.reference || ''}
                  onChange={handlemodif}
                  className="form-input"
                  placeholder="Entrez référence article"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="designation">Désignation</label>
                <input
                  type="text"
                  id="designation"
                  value={article.designation || ''}
                  onChange={handlemodif}
                  className="form-input"
                  placeholder="Entrez la désignation article"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="marque">Marque</label>
                <input
                  type="text"
                  id="marque"
                  value={article.marque || ''}
                  onChange={handlemodif}
                  className="form-input"
                  placeholder="Entrez marque"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="qtestock">Quantité</label>
                <input
                  type="number"
                  id="qtestock"
                  value={article.qtestock || ''}
                  onChange={handlemodif}
                  className="form-input"
                  placeholder="Entrez quantité stock"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="prix">Prix</label>
                <input
                  type="number"
                  required
                  id="prix"
                  value={article.prix || ''}
                  onChange={handlemodif}
                  className="form-input"
                  placeholder="Entrez prix"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="scategorieID">Catégorie</label>
                <select
                  id="scategorieID"
                  className="form-control"
                  value={article.scategorieID || ''}
                  onChange={handlemodif}
                >
                  <option value="">Sélectionnez une catégorie</option>
                  {scategories.map((scat, index) => (
                    <option key={index} value={scat._id}>{scat.nomscategorie}</option>
                  ))}
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="imageart">Image</label>
                <div style={{ width: "80%", margin: "auto", padding: "1%" }}>
                  <FilePond
                    files={files}
                    acceptedFileTypes="image/*"
                    onupdatefiles={setFiles}
                    allowMultiple={false}
                    server={serverOptions()}
                    name="file"
                  />
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button type="button" className="form-submit-button" onClick={handleSubmit}>
              Enregistrer
            </button>
            <button type="reset" className="form-reset-button" onClick={handleClose}>
              Annuler
            </button>
          </Modal.Footer>
        </form>
      </Modal>
    </div>
  )
}

export default Editarticle