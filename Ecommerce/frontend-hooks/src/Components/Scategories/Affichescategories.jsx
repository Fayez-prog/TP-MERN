import { useMemo, useState } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import { Button } from 'react-bootstrap';
import Editscategorie from './Editscategories';
import { Eye } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';

const Affichescategorie = ({ scategories, onDelete }) => {
  const [showEdit, setShowEdit] = useState(false);
  const [currentScategorie, setCurrentScategorie] = useState(null);

  const navigate = useNavigate();

  const columns = useMemo(() => [
    {
      accessorKey: 'imagescategorie',
      header: 'Image',
      Cell: ({ cell }) => (
        <img 
          src={cell.getValue()} 
          alt="Sous-catégorie"
          style={{ height: 100, borderRadius: '20%', objectFit: 'cover' }}
        />
      ),
    },
    {
      accessorKey: 'nomscategorie',
      header: 'Nom',
      size: 150,
    },
    {
      accessorKey: 'categorieID.nomcategorie',
      header: 'Catégorie Parente',
      size: 150,
    },
    {
      accessorKey: '_id',
      header: 'Actions',
      Cell: ({ row }) => (
        <div>
          <Button 
            variant="info" 
            size="sm"
            className="me-2"
            onClick={() => navigate(`/scategories/view/${row.original._id}`)}
          >
            <Eye size={14} />
          </Button>
          <Button 
            variant="warning" 
            size="sm"
            onClick={() => {
              setCurrentScategorie(row.original);
              setShowEdit(true);
            }}
          >
            <i className="fas fa-edit"></i>
          </Button>
          <Button 
            variant="danger" 
            size="sm" 
            className="ms-2"
            onClick={() => onDelete(row.original._id)}
          >
            <i className="fas fa-trash"></i>
          </Button>
        </div>
      ),
    },
  ], []);

  const table = useMaterialReactTable({
    columns,
    data: scategories,
  });

  return (
    <>
      <MaterialReactTable table={table} />
      {showEdit && (
        <Editscategorie
          show={showEdit}
          handleClose={() => setShowEdit(false)}
          scategorie={currentScategorie}
        />
      )}
    </>
  );
};

export default Affichescategorie;