const express = require('express');
const router = express.Router();
const multer = require('multer');
const Person = require('../models/person');

// Configuración de Multer para la carga de fotos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage: storage });

// Crear una nueva persona
router.post('/', upload.single('photo'), async (req, res) => {
  const { name, age } = req.body;
  const photo = req.file.path;

  try {
    const newPerson = new Person({
      name,
      age,
      photo
    });

    await newPerson.save();
    res.status(201).json(newPerson);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Obtener todas las personas
router.get('/', async (req, res) => {
  const { q } = req.query;
  let query = {};
  if (q) {
    query = { name: { $regex: q, $options: 'i' } };
  }
  try {
    const persons = await Person.find(query);
    res.status(200).json(persons);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Obtener una persona por ID
router.get('/:id', async (req, res) => {
  try {
    const person = await Person.findById(req.params.id);
    if (!person) return res.status(404).json({ error: 'Person not found' });
    res.status(200).json(person);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Actualizar una persona por ID
router.put('/:id', upload.single('photo'), async (req, res) => {
  const { name, age } = req.body;
  const photo = req.file ? req.file.path : null;

  try {
    const updatedPerson = await Person.findByIdAndUpdate(
      req.params.id,
      {
        name,
        age,
        ...(photo && { photo })
      },
      { new: true }
    );

    if (!updatedPerson) return res.status(404).json({ error: 'Person not found' });

    res.status(200).json(updatedPerson);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Eliminar una persona por ID
router.delete('/:id', async (req, res) => {
  try {
    const person = await Person.findByIdAndDelete(req.params.id);
    if (!person) return res.status(404).json({ error: 'Person not found' });
    res.status(200).json({ message: 'Person deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
