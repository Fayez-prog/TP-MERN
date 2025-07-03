import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchscategorieById } from '../../Services/scategorieservice';
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

const Viewscategorie = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [scategorie, setScategorie] = useState(null);
  const [parentCategorie, setParentCategorie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. Fetch sous-catégorie
        const res = await fetchscategorieById(id);
        
        if (!res.data) {
          throw new Error('Sous-catégorie non trouvée');
        }
        
        setScategorie(res.data);

        // 2. Fetch catégorie parente si elle existe
        if (res.data.categorieID) {
          try {
            const parentRes = await fetchcategorieById(res.data.categorieID);
            setParentCategorie(parentRes.data || null);
          } catch (err) {
            console.warn("Erreur chargement catégorie parente:", err);
          }
        }
      } catch (err) {
        setError(err.message || "Erreur lors du chargement");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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
          <Button variant="primary" onClick={() => navigate('/scategories')}>
            Retour à la liste
          </Button>
        </div>
      </Container>
    );
  }

  if (!scategorie) {
    return (
      <Container className="mt-5">
        <Alert variant="warning" className="text-center">
          Aucune donnée disponible
        </Alert>
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

      <Card className="shadow-lg viewscategorie-card">
        <Row className="g-0">
          {/* Colonne Image */}
          <Col md={5} className="d-flex align-items-center bg-light p-4">
            <Image
              src={scategorie.imagescategorie || '/images/default-scategorie.png'}
              alt={scategorie.nomscategorie}
              fluid
              rounded
              thumbnail
              className="img-fluid mx-auto d-block"
              style={{ 
                maxHeight: '400px',
                objectFit: 'contain'
              }}
              onError={(e) => {
                e.target.src = '/images/default-scategorie.png';
              }}
            />
          </Col>

          {/* Colonne Détails */}
          <Col md={7}>
            <Card.Body className="p-4">
              <div className="d-flex justify-content-between align-items-start mb-4">
                <Card.Title as="h2" className="mb-0 text-primary">
                  {scategorie.nomscategorie}
                </Card.Title>
                <Badge bg="info" className="fs-6">
                  ID: {scategorie._id}
                </Badge>
              </div>

              <div className="mb-4">
                <h5 className="text-muted mb-3">Informations</h5>
                <ul className="list-unstyled scategorie-info-list">
                  <li className="mb-2">
                    <strong>Catégorie parente:</strong>{' '}
                    <span className="text-primary">
                      {parentCategorie?.nomcategorie || 'Non spécifiée'}
                    </span>
                  </li>
                </ul>
              </div>

              <div className="d-flex flex-wrap gap-3 mt-5 pt-3 border-top">
                <Button 
                  variant="warning" 
                  onClick={() => navigate(`/scategories/edit/${scategorie._id}`)}
                  className="action-btn"
                >
                  <Pencil className="me-2" />
                  Modifier
                </Button>
                <Button 
                  variant="outline-danger"
                  className="action-btn"
                  onClick={() => {
                    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette sous-catégorie ?')) {
                      // Ajouter ici la logique de suppression
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

export default Viewscategorie;