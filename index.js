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


  // Get a single user by ID
app.get('/users/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const user = await prisma.users.findUnique({
        where: { id },  // or { email } if searching by email
      });
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: 'Error retrieving user' });
    }
  });
  

  app.listen(5000, () => {
    console.log(`Example app listening on port 5000`)
  })