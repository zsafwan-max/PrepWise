const express = require('express');
const cors = require('cors');
const optimizeRoute = require('./routes/optimizeRoute');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'PrepWise API is running.' });
});

app.use('/api', optimizeRoute);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Something went wrong on the server.' });
});

app.listen(PORT, () => {
  console.log(`PrepWise backend running on port ${PORT}`);
});
