const express = require('express');
const router = express.Router();
const database = require('../../data/postgres-configs');

const path = 'database';

router.get(`/${path}/products`, async (req, res) => {

  database.query(`select * from products`, (error, result)=> {
    if(error) {
      console.log(error);
      res.status(400).send(error);
    } else {
      console.log(result);
      res.status(200).send(result.rows);
    }
  });
});

router.get(`/${path}/products/:id`, async (req, res) =>{
  const id = req.params.id
  const query = `
    select *
    from products
    where id = ${id};
  `
  try {
    const result = await database.query(query);
    const product = result.rows[0];
    console.log(product);
    res.status(200).send(product);
  } catch (error) {
    console.log(error);
    res.status(400).send(error)
  }
});


router.post(`/${path}/products`, async (req, res) =>{
  const body = req.body;
  const query = `
    insert into products
      (name, price, amount)
    values ( ${body.name}, ${body.price}, ${body.amount});
  `;

  try {
    const result = database.query(query);
    const product = result.rows[0];
    res.status(200).send(product);
  } catch (error) {
    console.log(error);
    res.status(400).send(error)
  }
});

router.put(`/${path}/products`, async (req, res) =>{
  const product = req.params;
  const query = `
    update products
    set name = ${product.name}, price=${product.price}, amount = ${product.amount}
    where id = ${product.id};
  `;

  try {
    const result = database.query(query);
    const product = result.rows[0];
    res.status(200).send(product);
  } catch (error) {
    console.log(error);
    res.status(400).send(error)
  }
});

router.delete(`/${path}/products`, async (req, res) => {
  const id = req.params.id;
  const query = `
    delete from products
    WHERE id = ${id};
  `;
  try {
    const result = database.query(query);
    res.status(200).send();
  } catch (error) {
    console.log(error);
    res.status(400).send(error)
  }
})

module.exports = router;
