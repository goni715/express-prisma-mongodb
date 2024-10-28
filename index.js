const express = require('express');
const morgan = require('morgan');
const app = express();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();



//application middleware
app.use(morgan('dev'))
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello World Express with Prisma & Mongodb project!')
  })



  app.get('/users', async (req, res) => {
    const users = await prisma.users.findMany();
    res.json(users);
  });


  app.post('/create-user', async (req, res) => {
    const { name, email } = req.body;
    const newUser = await prisma.users.create({
      data: { name, email },
    });
    res.json(newUser);
  });
  

  app.listen(5000, () => {
    console.log(`Example app listening on port 5000`)
  })