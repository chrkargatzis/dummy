// kafka.js

const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'your-client-id', // choose a unique client ID
  brokers: ['kafka:9092'], // replace w:ith your Kafka broker URL
});

const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: 'your-group-id' }); // replace with your consumer group ID

module.exports = { producer, consumer };
