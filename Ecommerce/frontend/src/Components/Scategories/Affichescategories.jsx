import { useMemo } from 'react';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import { Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Affichescategories = ({ scategories, setScategories }) => {
    const navigate = useNavigate();

    const deleteScategorie = async (id) => {
        if (!window.confirm("Êtes-vous sûr de vouloir supprimer cette sous-catégorie ?")) {
            return;
        }
        axios.delete(`http://localhost:3001/api/scategories/${id}`)
            .then(() => {
                setScategories(scategories.filter((scat) => scat._id !== id));
            }).catch((error) => {
                console.log(error);
            });
    };

    const columns = useMemo(
        () => [
            {
                accessorKey: 'imagescategorie',
                header: 'Image',
                Cell: ({ cell }) => (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <img
                            alt=""
                            width={200}
                            height={80}
                            src={cell.getValue()}
                            loading="lazy"
                            style={{ borderRadius: '5%' }}
                        />
                    </Box>
                ),
            },
            {
                accessorKey: 'nomscategorie',
                header: 'Nom Sous-Catégorie',
                size: 100,
            },
            {
                accessorKey: 'categorieID.nomcategorie',
                header: 'Catégorie Parente',
                size: 100,
            },
            {
                accessorKey: '_id',
                header: 'Actions',
                Cell: ({ cell, row }) => (
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <Button
                            onClick={() => navigate(`/scategories/view/${cell.row.original._id}`)}
                            variant="contained"
                            color="info"
                            size="small"
                        >
                            <i className="fa fa-eye"></i>
                        </Button>
                        <Button
                            onClick={() => navigate(`/scategories/edit/${cell.row.original._id}`)}
                            variant="contained"
                            color="warning"
                            size="small"
                        >
                            <i className="fa-solid fa-pen-to-square"></i>
                        </Button>
                        <Button
                            onClick={() => deleteScategorie(cell.row.original._id)}
                            variant="contained"
                            color="error"
                            size="small"
                        >
                            <i className="fa fa-trash"></i>
                        </Button>
                    </div>
                ),
            },
        ],
        [navigate]
    );

    const table = useMaterialReactTable({
        columns,
        data: scategories,
    });

    return (
        <div className='container'>
            {scategories && scategories.length > 0 && <MaterialReactTable table={table} />}
        </div>
    );
};

export default Affichescategories;