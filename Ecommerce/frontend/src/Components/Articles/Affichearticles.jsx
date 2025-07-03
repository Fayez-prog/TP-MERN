import { useMemo } from 'react';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import { Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Affichearticles = ({ articles, setArticles }) => {
    const navigate = useNavigate();

    const deleteArticle = async (id) => {
        if (!window.confirm("Êtes-vous sûr de vouloir supprimer cet article ?")) {
            return;
        }
        axios.delete(`http://localhost:3001/api/articles/${id}`)
            .then(() => {
                setArticles(articles.filter((art) => art._id !== id));
            }).catch((error) => {
                console.log(error);
            });
    };

    const columns = useMemo(
        () => [
            {
                accessorKey: 'imageart',
                header: 'Image',
                Cell: ({ cell }) => (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <img
                            alt=""
                            width={80}
                            height={80}
                            src={cell.getValue()}
                            loading="lazy"
                            style={{ borderRadius: '5%' }}
                        />
                    </Box>
                ),
            },
            {
                accessorKey: 'designation',
                header: 'Désignation',
                size: 150,
            },
            {
                accessorKey: 'marque',
                header: 'Marque',
                size: 50,
            },
            {
                accessorKey: 'prix',
                header: 'Prix',
                size: 30,
                Cell: ({ cell }) => (
                    <span>{cell.getValue()} TND</span>
                ),
            },
            {
                accessorKey: 'qtestock',
                header: 'Stock',
                size: 30,
            },
            {
                accessorKey: 'scategorieID.nomscategorie',
                header: 'Sous-catégorie',
                size: 100,
            },
            {
                accessorKey: '_id',
                header: 'Actions',
                Cell: ({ cell, row }) => (
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <Button
                            onClick={() => navigate(`/articles/view/${cell.row.original._id}`)}
                            variant="contained"
                            color="info"
                            size="small"
                        >
                            <i className="fa fa-eye"></i>
                        </Button>
                        <Button
                            onClick={() => navigate(`/articles/edit/${cell.row.original._id}`)}
                            variant="contained"
                            color="warning"
                            size="small"
                        >
                            <i className="fa-solid fa-pen-to-square"></i>
                        </Button>
                        <Button
                            onClick={() => deleteArticle(cell.row.original._id)}
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
        data: articles,
    });

    return (
        <div className='container'>
            {articles && articles.length > 0 && <MaterialReactTable table={table} />}
        </div>
    );
};

export default Affichearticles;