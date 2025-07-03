import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Container, 
  Card, 
  Button, 
  Row, 
  Col,
  Navbar,
  Nav,
  Form,
  FormControl,
  Alert,
  Spinner
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faEdit, faSearch } from '@fortawesome/free-solid-svg-icons';

const Viewarticle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/articles/${id}`);
        setArticle(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (error) {
    return (
      <Container className="mt-4">
        <Alert variant="danger">
          Erreur lors du chargement : {error}
        </Alert>
        <Button 
          variant="secondary" 
          onClick={() => navigate('/articles')}
          className="mt-3"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
          Retour
        </Button>
      </Container>
    );
  }

  if (!article) {
    return (
      <Container className="mt-4">
        <Alert variant="warning">
          Article non trouvé
        </Alert>
        <Button 
          variant="secondary" 
          onClick={() => navigate('/articles')}
          className="mt-3"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
          Retour
        </Button>
      </Container>
    );
  }

  return (
    <>
      {/* Détails de l'article */}
      <Container className="mt-4">
        <Card>
          <Card.Header className="bg-light">
            <h2 className="mb-0">Détails de l'article</h2>
          </Card.Header>
          <Card.Body>
            <Row>
              <Col md={6}>
                <div className="mb-4">
                  <h5 className="text-primary">Désignation</h5>
                  <p className="fs-4">{article.designation}</p>
                </div>

                <div className="mb-4">
                  <h5 className="text-primary">Marque</h5>
                  <p className="fs-4">{article.marque}</p>
                </div>

                <div className="mb-4">
                  <h5 className="text-primary">Prix</h5>
                  <p className="fs-4">{article.prix} TND</p>
                </div>

                <div className="mb-4">
                  <h5 className="text-primary">Stock disponible</h5>
                  <p className="fs-4">{article.qtestock} unités</p>
                </div>

                {article.reference && (
                  <div className="mb-4">
                    <h5 className="text-primary">Référence</h5>
                    <p className="fs-4">{article.reference}</p>
                  </div>
                )}
              </Col>

              <Col md={6} className="d-flex align-items-center justify-content-center">
                {article.imageart && (
                  <img 
                    src={article.imageart} 
                    alt={article.designation}
                    className="img-fluid rounded shadow"
                    style={{ maxHeight: '300px' }}
                  />
                )}
              </Col>
            </Row>

            <div className="d-flex justify-content-between mt-4">
              <Button 
                variant="secondary" 
                onClick={() => navigate('/articles')}
                size="lg"
              >
                <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
                Retour à la liste
              </Button>

              <Button 
                variant="warning" 
                onClick={() => navigate(`/articles/edit/${id}`)}
                size="lg"
              >
                <FontAwesomeIcon icon={faEdit} className="me-2" />
                Modifier l'article
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default Viewarticle;