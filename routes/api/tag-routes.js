
const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');


router.get('/', (req, res) => {
  Tag.findAll({
    include: {
      model: Product,
      as: "products",
    },
  })
  .then((dbTagData) => res.json(dbTagData))
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.get('/:id', (req, res) => {
  Tag.findOne({
    where: {
      id: req.params.id,
    },
    include: {
     model: Product,
     as: "products", 
    },
  });
});

router.post('/', (req, res) => {
  Tag.create({
    tag_name: req.body.tag_name,
  })
  .then((dbTagData) => res.json(dbTagData))
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.put('/:id', (req, res) => {
  Tag.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
  then((dbTagData) => {
    if (!dbTagData[0]) {
      res.status(404).json({ message: "No Id Tag found!"});
      return;
    }
    res.json(dbTagData);
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.delete('/:id', (req, res) => {
  Tag.destroy({
    where: {
      id: req.params.id,
    },
  })
  .then((dbTagData) => {
    if (!dbTagData) {
      res.status(404).json({ message: "No id tag found! "}),
      return;
    }
    res.json(dbTagData);
  })
  .catch((err) => {
    console.log(err);
  });
});

module.exports = router;