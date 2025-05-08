const express = require('express');
const connectDB = require('./db');
const cors = require("cors");

const exchangeRoutes = require('../routes/exchange')
const app = express();
connectDB()
// Enable CORS
app.use(
    cors({
      origin: 'http://localhost:8081', // Allow requests from the frontend
      credentials: true, // Allow credentials (if needed)
    })
  );
  
app.use(express.json());
app.use('/api/exchange',exchangeRoutes)

app.get('/', (req, res) => {
    res.send('Exchange Service is running!');
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Exchange Service is running on port ${PORT}`);
});