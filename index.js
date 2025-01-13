const express = require('express');
const bodyParser = require('body-parser');
const rentalRoutes = require('./routes/rentalRoutes');

const app = express();

app.use(bodyParser.json());
app.get('/', async (req, res) => {
  res.send('Welcome to Car Rental API');
})
app.use('/api/rentals', rentalRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Car Rental API listening on port ${PORT}`);
});

module.exports = app;
