const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bookRoutes = require('./routes/bookRoutes');

MONGO_URI = 'mongodb://localhost:27017/bookdb';

const PORT = 4000;

const app = express();
app.use(cors());
app.use(express.json());
app.use('/books', bookRoutes);

mongoose.connect(MONGO_URI, {
     useNewUrlParser: true,
      useUnifiedTopology: true
     }).then(() => console.log('MongoDB connected'))
     .catch(err => console.error('MongoDB Error:', err));


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

