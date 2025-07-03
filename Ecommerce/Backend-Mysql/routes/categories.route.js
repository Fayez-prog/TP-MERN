const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const router = express.Router();

// Ajouter une catégorie
router.post('/', async (req, res) => {
  const { nomcategorie, imagecategorie } = req.body;
  try {
    const categorie = await prisma.categories.create({
      data: {
        nomcategorie: nomcategorie,
        imagecategorie: imagecategorie
      }
    });
    res.json(categorie);
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: error.message
    });
  }
});

// Afficher la liste des catégories
router.get('/', async (req, res) => {
  try {
    const categories = await prisma.categories.findMany();
    res.json(categories);
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: error.message
    });
  }
});

// Afficher une catégorie spécifique
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const categorie = await prisma.categories.findUnique({
      where: {
        id: Number(id),
      }
    });
    res.json(categorie);
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: error.message
    });
  }
});

// Modifier une catégorie
router.put('/:id', async (req, res) => {
  const { nomcategorie, imagecategorie } = req.body;
  const id = req.params.id;

  try {
    const categorie = await prisma.categories.update({
      data: {
        nomcategorie: nomcategorie,
        imagecategorie: imagecategorie
      },
      where: { id: Number(id) },
    });
    res.json(categorie);
  } catch (error) {
    res.status(404).json({ 
      message: error.message 
    });
  }
});

// Supprimer une catégorie
router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    await prisma.Categories.delete({
      where: { id: Number(id) },
    })
    res.json({ message: "category "+ id +" deleted successfully." });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

module.exports = router;