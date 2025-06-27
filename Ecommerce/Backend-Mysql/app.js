const express = require('express');
const cors = require('cors');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
const categoriesRouter = require('./routes/categories.route');
const scategoriesRouter = require('./routes/scategories.route');
const articlesRouter = require('./routes/articles.route');

app.use('/api/categories', categoriesRouter);
app.use('/api/scategories', scategoriesRouter);
app.use('/api/articles', articlesRouter);

// Gestion des erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Démarrage du serveur
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));