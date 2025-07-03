import React from 'react';
import { Nav, Navbar, Container, Form, FormControl, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useShoppingCart } from 'use-shopping-cart';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));

const Menu = () => {
  const { cartCount } = useShoppingCart();

  return (
    <Navbar bg="primary" variant="dark" expand="lg">
      <Container fluid>
        <Navbar.Brand as={Link} to="/">Gestion Commerciale</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/categories">Catégories</Nav.Link>
            <Nav.Link as={Link} to="/scategories">Sous Catégories</Nav.Link>
            <Nav.Link as={Link} to="/articles">Liste des Articles</Nav.Link>
            <Nav.Link as={Link} to="/articlescard">Articles Cards</Nav.Link>
          </Nav>
          <div className="d-flex align-items-center">
            <IconButton 
              aria-label="cart" 
              component={Link}
              to="/cart"
              style={{ color: 'white' }}
              className="me-2"
            >
              <StyledBadge badgeContent={cartCount} color="secondary">
                <ShoppingCartIcon />
              </StyledBadge>
            </IconButton>
            <Form className="d-flex">
              <FormControl
                type="search"
                placeholder="Rechercher"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-light">Chercher</Button>
            </Form>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Menu;