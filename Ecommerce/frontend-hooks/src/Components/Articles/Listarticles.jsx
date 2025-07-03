import React, { useEffect, useState } from 'react'
import Affichearticle from './Affichearticles'
import { CircularProgress } from '@mui/material'
import { fetcharticles, deletearticle } from '../../services/articleservice'
import Insertarticle from './Insertarticles'

const Listarticles = () => {
  const [articles, setArticles] = useState([])
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(true)
  const [show, setShow] = useState(false)
  
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const getarticles = async () => {
    try {
      const res = await fetcharticles()
      setArticles(res.data)
    } catch (error) {
      console.log(error)
      setError(error)
    } finally {
      setIsPending(false)
    }
  }

  useEffect(() => {
    getarticles()
  }, [])

  const handleAddproduct = (newproduit) => {
    setArticles([newproduit, ...articles])
  }

  const handleDeleteProduct = async (productId) => {
    try {
      if(window.confirm("Confirmer la suppression")) {
        await deletearticle(productId)
        setArticles(articles.filter((product) => product._id !== productId))
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleUpdateProduct = (prmod) => {
    setArticles(articles.map((product) => product._id === prmod._id ? prmod : product))
  }

  return (
    <div className="table-container-header">
      <button className="new" onClick={handleShow}>
        <i className="fa-solid fa-plus-square"></i> Nouveau
      </button>
      
      {isPending ? (
        <div>
          <CircularProgress color="primary" size={60}/>
        </div>
      ) : error ? (
        <div>Erreur lors du chargement des articles</div>
      ) : (
        <div>
          <h1><center>Liste des articles</center></h1>
          <Affichearticle 
            articles={articles} 
            handleDeleteProduct={handleDeleteProduct}
            handleUpdateProduct={handleUpdateProduct}
          />
        </div>
      )}
      
      {show && <Insertarticle
        show={show}
        handleClose={handleClose}
        handleAddproduct={handleAddproduct}
      />}
    </div>
  )
}

export default Listarticles