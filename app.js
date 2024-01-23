const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const usersRouter = require('./routes/users');
const { producer, consumer } = require('./kafka.js');

const KAFKA_BROKER = process.env.KAFKA_BROKER || 'kafka:9092';


const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Kafka connection
const run = async () => {
  await producer.connect();
  await consumer.connect();

  // Subscribe to topics
  await consumer.subscribe({ topic: 'user-created-topic', fromBeginning: false });

  // Start consumer
  await consumer.run({
    eachMessage: async ({ message }) => {
      // Handle Kafka messages here
      console.log(`Received message: ${message.value.toString()}`);
    },
  });

  // Middleware
  app.use(bodyParser.json());

  // Routes
  app.get('/', (req, res) => {
    res.send('Hello, API is working!');
  });

  // Use the users router for /users routes
  app.use('/users', usersRouter);

  // Start server
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
};

run().catch(console.error);