const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 8000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

let animals = {
  next_id: 6,
  data: [
    {
      id: 1,
      name: "Koala",
      kingdom: "Animalia",
      phylum: "Chordata",
      class: "Mammalia",
      infraclass: "Marsupialia",
      order: "Diprotodontia",
      family: "Phascolarctidae",
      genus: "Phascolarctos",
      species: "P. cinereus"
    },
    {
      id: 2,
      name: "Cat",
      kingdom: "Animalia",
      phylum: "Chordata",
      class: "Mammalia",
      order: "Carnivora",
      suborder: "Feliformia",
      family: "Felidae",
      subfamily: "Felinae",
      genus: "Felis",
      species: "F. catus"
    },
    {
      id: 3,
      name: "Dog",
      kingdom: "Animalia",
      phylum: "Chordata",
      class: "Mammalia",
      order: "Carnivora",
      family: "Canidae",
      genus: "Canis",
      species: "C. lupus",
      subspecies: "C. l. familiaris"
    },
    {
      id: 4,
      name: "Eagle",
      kingdom: "Animalia",
      phylum: "Chordata",
      class: "Aves",
      order: "Accipitriformes",
      family: "Accipitridae"
    },
    {
      id: 5,
      name: "Snake",
      kingdom: "Animalia",
      phylum: "Chordata",
      class: "Reptilia",
      order: "Squamata",
      clade: "Ophidia",
      suborder: "Serpentes"
    }
  ]
};

// Get Landing Page

app.get("/", (req, res) => {
  res.send({
    message:
      "Hello! This is a page to look for kinds of animals, proceed to /animals to see current data of animals",
    headers: req.headers
  });
});

// Get all animals

app.get("/animals", (req, res) => {
  res.send({
    count: animals.data.length,
    data: animals.data
  });
});

// Search an animal by name

app.get("/animals/search", (req, res) => {
  const queryName = req.query.name.toLowerCase();

  const resultAnimals = animals.data.find(animal => {
    return animal.name.toLowerCase().includes(queryName);
  });

  res.send({
    query: req.query,
    data: resultAnimals
  });
});

// Get animal by id

app.get("/animals/:id", (req, res) => {
  const animal = animals.data.find(animal => {
    return animal.id === Number(req.params.id);
  });

  res.send({
    data: animal
  });
});

// Save new Animal

app.post("/animals", (req, res) => {
  const newAnimal = {
    id: animals.next_id,
    ...req.body,
    gender: `gender=${req.body.gender}`
  };

  const newAnimals = {
    next_id: animals.next_id + 1,
    data: animals.data.concat(newAnimal)
  };

  animals = newAnimals;

  res.send({
    newData: newAnimal,
    data: animals
  });
});

// Delete an animal by id

app.delete("/animals/delete", (req, res) => {
  const animalId = animals.data.find(animal => {
    return animal.id === Number(req.params.id);
  });

  const newAnimal = animals.data.filter((animal, index) => {
    return animal.id === 0;
  });

  animals.data = newAnimal;

  res.send({
    Selected: animalId,
    data: newAnimal
  });
});

// Delete an animal by id

app.delete("/animals/delete/:id", (req, res) => {
  const animalId = animals.data.find(animal => {
    return animal.id === Number(req.params.id);
  });

  const newAnimal = animals.data.filter((animal, index) => {
    return animal.id !== animalId.id;
  });

  animals.data = newAnimal;

  res.send({
    Selected: animalId,
    data: newAnimal
  });
});

// Update an animal info

app.patch("/animals/update/:id", (req, res) => {
  const newAnimals = animals.data.filter(animal => {
    if (animal.id === Number(req.params.id)) {
      return Object.assign(animal, req.body);
    } else {
      return animal;
    }
  });

  res.json(newAnimals);
});

app.listen(port, err => {
  console.log(`Server running at http://localhost:${port}`);
});
