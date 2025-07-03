import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchcategorieById } from '../../Services/categorieservice';
import { 
  Card, 
  Button, 
  Badge, 
  Container, 
  Row, 
  Col, 
  Spinner,
  Alert,
  Image
} from 'react-bootstrap';
import { ArrowLeft, Pencil, Trash } from 'react-bootstrap-icons';

const Viewcategorie = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [categorie, setCategorie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategorie = async () => {
      try {
        const res = await fetchcategorieById(id);
        if (res.data) {
          setCategorie(res.data);
        } else {
          setError("Catégorie non trouvée");
        }
      } catch (err) {
        setError(err.message || "Erreur lors du chargement de la catégorie");
      } finally {
        setLoading(false);
      }
    };

    fetchCategorie();
  }, [id]);

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger" className="text-center">
          {error}
        </Alert>
        <div className="text-center mt-3">
          <Button variant="primary" onClick={() => navigate('/categories')}>
            Retour à la liste
          </Button>
        </div>
      </Container>
    );
  }

  if (!categorie) {
    return (
      <Container className="mt-5">
        <Alert variant="warning" className="text-center">
          Aucune donnée de catégorie disponible
        </Alert>
        <div className="text-center mt-3">
          <Button variant="primary" onClick={() => navigate('/categories')}>
            Retour à la liste
          </Button>
        </div>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <Button 
        variant="outline-primary" 
        className="mb-4"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="me-2" />
        Retour à la liste
      </Button>

      <Card className="shadow-lg">
        <Row className="g-0">
          {/* Colonne Image */}
          <Col md={5} className="d-flex align-items-center bg-light">
            <div className="p-4 w-100 text-center">
              <Image
                src={categorie.imagecategorie || '/images/default-category.png'}
                alt={categorie.nomcategorie || 'Catégorie sans nom'}
                fluid
                rounded
                thumbnail
                style={{ 
                  maxHeight: '400px',
                  objectFit: 'contain'
                }}
                onError={(e) => {
                  e.target.src = '/images/default-category.png';
                }}
              />
            </div>
          </Col>

          {/* Colonne Détails */}
          <Col md={7}>
            <Card.Body className="p-4">
              <div className="d-flex justify-content-between align-items-start mb-4">
                <Card.Title as="h2" className="mb-0 text-primary">
                  {categorie.nomcategorie || 'Nom non spécifié'}
                </Card.Title>
                <Badge bg="info" className="fs-6">
                  ID: {categorie._id || 'N/A'}
                </Badge>
              </div>

              <div className="d-flex flex-wrap gap-3 mt-5 pt-3 border-top">
                <Button 
                  variant="warning" 
                  onClick={() => navigate(`/categories/edit/${categorie._id}`)}
                >
                  <Pencil className="me-2" />
                  Modifier
                </Button>
                <Button 
                  variant="outline-danger"
                  onClick={() => {
                    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette catégorie ?')) {
                      // Ajoutez ici votre logique de suppression
                    }
                  }}
                >
                  <Trash className="me-2" />
                  Supprimer
                </Button>
              </div>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </Container>
  );
};

export default Viewcategorie;