const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
const app = express();

// Middlewares
app.use(express.json());
app.use(cors({origin: '*'}));

// Connexion à MongoDB (version simplifiée)
mongoose.connect(process.env.DATABASE)
  .then(() => console.log("Connexion à MongoDB réussie"))
  .catch(err => console.log("Erreur de connexion", err));

// Routes
const categorieRouter = require('./routes/categorie.route');
const scategorieRouter = require('./routes/scategorie.route');
const articleRouter = require('./routes/article.route');

app.use('/api/categories', categorieRouter);
app.use('/api/scategories', scategorieRouter);
app.use('/api/articles', articleRouter);

// requête
app.get("/",(req,res)=>{
    res.send("bonjour");
});

// Démarrer le serveur
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Serveur en écoute sur le port ${PORT}`);
});

module.exports = app;