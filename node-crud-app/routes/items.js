const express = require('express');
const router = express.Router();
const multer = require('multer');
const Item = require('../models/item');

// Configuración de Multer para la carga de archivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage: storage });

// Crear un nuevo item
router.post('/', upload.single('file'), async (req, res) => {
  const { name, description } = req.body;
  const file = req.file.path;

  try {
    const newItem = new Item({
      name,
      description,
      file
    });

    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Obtener todos los items
router.get('/', async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Obtener un item por ID
router.get('/:id', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ error: 'Item not found' });
    res.status(200).json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Actualizar un item por ID
router.put('/:id', upload.single('file'), async (req, res) => {
  const { name, description } = req.body;
  const file = req.file ? req.file.path : null;

  try {
    const updatedItem = await Item.findByIdAndUpdate(
      req.params.id,
      {
        name,
        description,
        ...(file && { file })
      },
      { new: true }
    );

    if (!updatedItem) return res.status(404).json({ error: 'Item not found' });

    res.status(200).json(updatedItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Eliminar un item por ID
router.delete('/:id', async (req, res) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ error: 'Item not found' });
    res.status(200).json({ message: 'Item deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
