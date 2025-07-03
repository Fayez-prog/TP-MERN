import { useMemo, useState } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Eye, Pencil, Trash } from 'react-bootstrap-icons';
import Editscategorie from './Editcategories';

const Affichecategorie = ({ categories, onDelete }) => {
  const navigate = useNavigate();
  const [showEdit, setShowEdit] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);

  const columns = useMemo(() => [
    {
      accessorKey: 'imagecategorie',
      header: 'Image',
      Cell: ({ cell }) => (
        <img 
          src={cell.getValue()} 
          alt="Catégorie"
          style={{ height: 100, borderRadius: '20%', objectFit: 'cover' }}
        />
      ),
    },
    {
      accessorKey: 'nomcategorie',
      header: 'Nom',
      size: 150,
    },
    {
      accessorKey: '_id',
      header: 'Actions',
      Cell: ({ row }) => ( // Ici row est correctement défini dans le scope de la fonction Cell
        <div>
          <Button 
            variant="info"
            size="sm"
            className="me-2"
            onClick={() => navigate(`/categories/view/${row.original._id}`)}
            title="Voir détails"
          >
            <Eye size={14} />
          </Button>
          <Button 
            variant="warning" 
            size="sm"
            className="me-2"
            onClick={() => {
              setCurrentCategory(row.original);
              setShowEdit(true);
            }}
            title="Modifier"
          >
            <Pencil size={14} />
          </Button>
          <Button 
            variant="danger" 
            size="sm"
            onClick={() => onDelete(row.original._id)}
            title="Supprimer"
          >
            <Trash size={14} />
          </Button>
        </div>
      ),
    },
  ], [navigate, onDelete]);

  const table = useMaterialReactTable({
    columns,
    data: categories,
  });

  return (
    <>
      <MaterialReactTable table={table} />
      {showEdit && (
        <Editscategorie
          show={showEdit}
          handleClose={() => setShowEdit(false)}
          categorie={currentCategory}
        />
      )}
    </>
  );
};

export default Affichecategorie;