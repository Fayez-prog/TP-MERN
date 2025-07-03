import { useMemo, useState } from 'react'
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table'
import { Box } from '@mui/material'
import { Button } from 'react-bootstrap'
import Editarticle from './Editarticles'
import { Eye } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';

const Affichearticle = ({articles, handleDeleteProduct, handleUpdateProduct}) => {
  const [show, setShow] = useState(false)
  const [article, setArticle] = useState({})

  const navigate = useNavigate();
  
  const handleShow = () => setShow(true)
  const handleClose = () => setShow(false)
  
  const handleEdit = (art) => {
    setArticle(art)
    handleShow()
  }

  const columns = useMemo(
    () => [
      {
        accessorKey: 'imageart',
        header: 'Image',
        Cell: ({ cell }) => (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <img
              alt="" height={100}
              src={cell.getValue()} loading="lazy"
              style={{ borderRadius: '20%' }}
            />
          </Box>
        ),
      },
      {
        accessorKey: 'reference',
        header: 'Reference',
        size: 100,
      },
      {
        accessorKey: 'designation',
        header: 'Designation',
        size: 100,
      },
      {
        accessorKey: 'marque',
        header: 'Marque',
        size: 100,
      },
      {
        accessorKey: 'prix',
        header: 'Prix',
        size: 100,
      },
      {
        accessorKey: 'qtestock',
        header: 'Stock',
        size: 100,
      },
      {
        accessorKey: '_id', 
        header: 'Actions', 
        size: 100,
        Cell: ({ cell, row }) => (
          <div>
            <Button 
            variant="info" 
            size="md"
            className="me-2"
            onClick={() => navigate(`/articles/view/${row.original._id}`)}
          >
            <Eye size={14} />
            </Button>
            <Button 
              onClick={() => handleEdit(cell.row.original)}
              variant="warning" 
              size="md"
            >
              <i className="fa-solid fa-pen-to-square"></i>
            </Button>
            &nbsp;
            <Button 
              onClick={() => handleDeleteProduct(cell.row.original._id)}
              variant="danger" 
              size="md"
            >
              <i className="fa fa-trash" />
            </Button>
          </div>
        ),
      },
    ],
    [articles],
  )

  const table = useMaterialReactTable({
    columns,
    data: articles,
  })

  return (
    <div>
      {show && <Editarticle
        show={show}
        handleClose={handleClose}
        art={article}
        handleUpdateProduct={handleUpdateProduct}
      />}
      <MaterialReactTable table={table} />
    </div>
  )
}

export default Affichearticle