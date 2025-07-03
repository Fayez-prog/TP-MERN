import React, { useState, useEffect, useCallback } from 'react';
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Snackbar,
  Alert,
  IconButton,
  Badge,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  CircularProgress
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import axios from 'axios';
import CartDrawer from './CartDrawer'; // À créer séparément

const ListArticleCard = () => {
  // États
  const [articles, setArticles] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarInfo, setSnackbarInfo] = useState({
    message: '',
    severity: 'success'
  });
  const [openCart, setOpenCart] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  // Constantes
  const API_URL = "http://localhost:3001/api/articles";
  const SNACKBAR_DURATION = 3000;

  // Mémoïzation des fonctions
  const showSnackbar = useCallback((message, severity = 'success') => {
    setSnackbarInfo({ message, severity });
    setOpenSnackbar(true);
  }, []);

  const handleCloseSnackbar = useCallback(() => {
    setOpenSnackbar(false);
  }, []);

  // Effets
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const response = await axios.get(API_URL);
        setArticles(response.data);
      } catch (err) {
        setError(err.message);
        showSnackbar('Failed to load articles', 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [showSnackbar]);

  // Fonctions du panier
  const addToCart = useCallback((article) => {
    if (article.qtestock <= 0) {
      showSnackbar('This item is out of stock', 'error');
      return;
    }

    setCart(prevCart => {
      const existingItem = prevCart.find(item => item._id === article._id);
      
      if (existingItem) {
        if (existingItem.quantity >= article.qtestock) {
          showSnackbar('Maximum stock reached for this item', 'warning');
          return prevCart;
        }
        
        return prevCart.map(item =>
          item._id === article._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      
      return [...prevCart, { ...article, quantity: 1 }];
    });

    // Optimistic UI update
    setArticles(prevArticles =>
      prevArticles.map(a =>
        a._id === article._id ? { ...a, qtestock: a.qtestock - 1 } : a
      )
    );

    showSnackbar(`${article.reference} added to cart`);
  }, [showSnackbar]);

  const removeFromCart = useCallback((articleId) => {
    setCart(prevCart => {
      const itemToRemove = prevCart.find(item => item._id === articleId);
      if (!itemToRemove) return prevCart;

      if (itemToRemove.quantity > 1) {
        return prevCart.map(item =>
          item._id === articleId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      } else {
        return prevCart.filter(item => item._id !== articleId);
      }
    });

    // Mettre à jour le stock local
    setArticles(prevArticles =>
      prevArticles.map(a =>
        a._id === articleId ? { ...a, qtestock: a.qtestock + 1 } : a
      )
    );
  }, []);

  const handleArticleClick = (article) => {
    setSelectedArticle(article);
    setOpenDialog(true);
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Rendu conditionnel
  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ margin: 2 }}>
        Error loading articles: {error}
      </Alert>
    );
  }

  return (
    <div className="container">
      {/* En-tête avec panier */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <Typography variant="h4">Liste Des Articles</Typography>
        <IconButton color="inherit" onClick={() => setOpenCart(true)}>
          <Badge badgeContent={totalItems} color="secondary">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
      </div>

      {/* Notification */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={SNACKBAR_DURATION}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarInfo.severity}>
          {snackbarInfo.message}
        </Alert>
      </Snackbar>

      {/* Dialogue de détail d'article */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        {selectedArticle && (
          <>
            <DialogTitle>{selectedArticle.reference}</DialogTitle>
            <DialogContent>
              <img 
                src={selectedArticle.imageart} 
                alt={selectedArticle.reference}
                style={{ width: '100%', height: 'auto', marginBottom: '1rem' }}
              />
              <Typography><strong>Désignation:</strong> {selectedArticle.designation}</Typography>
              <Typography><strong>Marque:</strong> {selectedArticle.marque}</Typography>
              <Typography><strong>Price:</strong> {selectedArticle.prix} DT</Typography>
              <Typography><strong>Stock:</strong> {selectedArticle.qtestock}</Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenDialog(false)}>Close</Button>
              <Button 
                onClick={() => {
                  addToCart(selectedArticle);
                  setOpenDialog(false);
                }}
                color="primary"
                disabled={selectedArticle.qtestock <= 0}
              >
                Add to Cart
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* Liste des articles */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
        {articles.map((art) => (
          <Card key={art._id} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardMedia
              component="img"
              alt={art.reference}
              height="200"
              image={art.imageart}
              onClick={() => handleArticleClick(art)}
              style={{ cursor: 'pointer' }}
            />
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography gutterBottom variant="h6" component="div">
                {art.reference}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Price: {art.prix} DT
              </Typography>
              <Typography 
                variant="body2" 
                color={art.qtestock > 5 ? 'text.secondary' : 'warning.main'}
              >
                Stock: {art.qtestock} {art.qtestock <= 5 && '(Low stock)'}
              </Typography>
            </CardContent>
            <CardActions>
              <Button 
                fullWidth
                variant="contained" 
                color="secondary" 
                size="medium"
                onClick={() => addToCart(art)}
                disabled={art.qtestock <= 0}
                startIcon={<ShoppingCartIcon />}
              >
                {art.qtestock <= 0 ? 'Out of Stock' : 'Add to Cart'}
              </Button>
            </CardActions>
          </Card>
        ))}
      </div>

      {/* Panier latéral */}
      <CartDrawer 
        open={openCart} 
        onClose={() => setOpenCart(false)}
        cart={cart}
        removeFromCart={removeFromCart}
      />
    </div>
  );
};

export default ListArticleCard;