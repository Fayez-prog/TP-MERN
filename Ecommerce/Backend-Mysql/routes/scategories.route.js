const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const router = express.Router();

// Ajouter une sous-catégorie
router.post('/', async (req, res) => {
  const { nomscategorie, imagescategorie, categorieID } = req.body;
  try {
    const scategorie = await prisma.scategories.create({
      data: {
        nomscategorie: nomscategorie,
        imagescategorie: imagescategorie,
        categorieID: Number(categorieID)
      }
    });
    res.json(scategorie);
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: error.message
    });
  }
});

// Afficher la liste des sous-catégories avec leurs catégories
router.get('/', async (req, res) => {
  try {
    const scategories = await prisma.scategories.findMany({
      include: {
        categorie: {
          select: {
            nomcategorie: true,
          },
        }
      }
    });
    res.json(scategories);
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: error.message
    });
  }
});

// Afficher une sous-catégorie spécifique
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const scategorie = await prisma.scategories.findUnique({
      where: {
        id: Number(id),
      }
    });
    res.json(scategorie);
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: error.message
    });
  }
});

// Modifier une sous-catégorie
router.put('/:id', async (req, res) => {
  const { nomscategorie, imagescategorie, categorieID } = req.body;
  const id = req.params.id;

  try {
    const scategorie = await prisma.scategories.update({
      data: {
        nomscategorie: nomscategorie,
        imagescategorie: imagescategorie,
        categorieID: Number(categorieID)
      },
      where: { id: Number(id) },
    });
    res.json(scategorie);
  } catch (error) {
    res.status(404).json({ 
      message: error.message 
    });
  }
});

// Supprimer une sous-catégorie
router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    await prisma.scategories.delete({
      where: { id: Number(id) },
    });
    res.json({ message: "scategory "+ id +" deleted successfully." });
  } catch (error) {
    res.status(404).json({ 
      message: error.message 
    });
  }
});

module.exports = router;