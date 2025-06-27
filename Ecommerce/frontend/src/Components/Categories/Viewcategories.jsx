import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Card, Container, Row, Col } from 'react-bootstrap';

const Viewcategories = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [categorie, setCategorie] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:3001/api/categories/${id}`)
      .then((response) => {
        setCategorie(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  return (
    <Container className="mt-4">
      <Card>
        <Card.Header as="h2">Détails de la Catégorie</Card.Header>
        <Card.Body>
          <Row>
            <Col md={6}>
              <p><strong>Nom:</strong> {categorie.nomcategorie}</p>
            </Col>
            <Col md={6}>
              {categorie.imagecategorie && (
                <img 
                  src={categorie.imagecategorie} 
                  alt={categorie.nomcategorie}
                  className="img-fluid"
                  style={{ maxWidth: '200px' }}
                />
              )}
            </Col>
          </Row>
          <Button 
            variant="primary" 
            onClick={() => navigate('/categories')}
            className="mt-3"
          >
            Retour à la liste
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Viewcategories;