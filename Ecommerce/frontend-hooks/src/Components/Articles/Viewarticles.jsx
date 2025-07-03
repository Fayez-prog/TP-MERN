import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetcharticleById } from '../../Services/articleservice';
import {
  Card,
  Button,
  Container,
  Row,
  Col,
  Spinner,
  Alert,
  Badge,
  Image,
  ListGroup
} from 'react-bootstrap';
import { ArrowLeft, Pencil } from 'react-bootstrap-icons';

const Viewarticle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getArticleData = async () => {
      try {
        setLoading(true);
        const response = await fetcharticleById(id);
        
        if (!response?.data) {
          throw new Error('Article non trouvé ou données invalides');
        }
        
        setArticle(response.data);
      } catch (err) {
        console.error("Erreur lors du chargement:", err);
        setError(err.message || "Une erreur est survenue lors du chargement de l'article");
      } finally {
        setLoading(false);
      }
    };

    getArticleData();
  }, [id]);

  const handleEdit = () => {
    navigate(`/articles/edit/${id}`);
  };

  const handleBack = () => {
    navigate('/articles');
  };

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '50vh' }}>
        <Spinner animation="border" variant="primary" role="status">
          <span className="visually-hidden">Chargement...</span>
        </Spinner>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="my-5">
        <Alert variant="danger" className="text-center">
          <Alert.Heading>Erreur</Alert.Heading>
          <p>{error}</p>
          <Button variant="primary" onClick={handleBack}>
            Retour à la liste des articles
          </Button>
        </Alert>
      </Container>
    );
  }

  if (!article) {
    return (
      <Container className="my-5">
        <Alert variant="warning" className="text-center">
          <Alert.Heading>Article non trouvé</Alert.Heading>
          <p>L'article demandé n'existe pas ou a été supprimé.</p>
          <Button variant="primary" onClick={handleBack}>
            Retour à la liste des articles
          </Button>
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="my-4">
      <Button 
        variant="outline-primary" 
        onClick={handleBack}
        className="mb-3"
      >
        <ArrowLeft className="me-2" />
        Retour à la liste
      </Button>

      <Card className="shadow-sm">
        <Row className="g-0">
          {/* Colonne Image */}
          <Col md={5} lg={4} className="p-3 bg-light d-flex align-items-center justify-content-center">
            <div className="position-relative" style={{ maxWidth: '100%' }}>
              <Image
                src={article.imageart || '/images/default-article.jpg'}
                alt={article.designation}
                fluid
                rounded
                className="border"
                style={{ 
                  maxHeight: '400px', 
                  objectFit: 'contain',
                  width: '100%'
                }}
                onError={(e) => {
                  e.target.src = '/images/default-article.jpg';
                }}
              />
              <Badge 
                bg={article.qtestock > 0 ? 'success' : 'danger'} 
                className="position-absolute top-0 end-0 m-2"
              >
                {article.qtestock > 0 ? 'En stock' : 'Rupture'}
              </Badge>
            </div>
          </Col>

          {/* Colonne Détails */}
          <Col md={7} lg={8} className="p-4">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-start mb-3">
                <Card.Title as="h1" className="text-primary mb-0">
                  {article.designation}
                </Card.Title>
                <Badge bg="secondary" className="fs-6">
                  REF: {article.reference}
                </Badge>
              </div>

              <ListGroup variant="flush" className="mb-4">
                <ListGroup.Item className="d-flex justify-content-between align-items-center">
                  <span className="fw-bold">Marque:</span>
                  <span>{article.marque || 'Non spécifiée'}</span>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between align-items-center">
                  <span className="fw-bold">Prix:</span>
                  <span>{article.prix ? `${article.prix.toFixed(2)} TND` : 'Non spécifié'}</span>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between align-items-center">
                  <span className="fw-bold">Quantité en stock:</span>
                  <span>{article.qtestock || '0'}</span>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between align-items-center">
                  <span className="fw-bold">Catégorie:</span>
                  <span>{article.scategorieID?.nomscategorie || 'Non spécifiée'}</span>
                </ListGroup.Item>
              </ListGroup>

              <div className="d-flex gap-3 mt-4 pt-3 border-top">
                <Button 
                  variant="warning" 
                  onClick={handleEdit}
                  className="d-flex align-items-center"
                >
                  <Pencil className="me-2" />
                  Modifier
                </Button>
                <Button 
                  variant="outline-secondary" 
                  onClick={handleBack}
                >
                  Retour
                </Button>
              </div>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </Container>
  );
};

export default Viewarticle;