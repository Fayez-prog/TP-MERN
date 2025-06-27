import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Card, Container, Row, Col } from 'react-bootstrap';

const Viewscategories = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [scategorie, setScategorie] = useState({});

    useEffect(() => {
        axios.get(`http://localhost:3001/api/scategories/${id}`)
            .then((response) => {
                setScategorie(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [id]);

    return (
        <Container className="mt-4">
            <Card>
                <Card.Header as="h2">Détails de la Sous-Catégorie</Card.Header>
                <Card.Body>
                    <Row>
                        <Col md={6}>
                            <p><strong>Nom:</strong> {scategorie.nomscategorie}</p>
                            <p><strong>Catégorie parente:</strong> {scategorie.categorieID?.nomcategorie}</p>
                        </Col>
                        <Col md={6}>
                            {scategorie.imagescat && (
                                <img 
                                    src={scategorie.imagescat} 
                                    alt={scategorie.nomscategorie}
                                    className="img-fluid"
                                    style={{ maxWidth: '200px' }}
                                />
                            )}
                        </Col>
                    </Row>
                    <Button 
                        variant="primary" 
                        onClick={() => navigate('/scategories')}
                        className="mt-3"
                    >
                        Retour à la liste
                    </Button>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default Viewscategories;