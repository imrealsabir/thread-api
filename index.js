const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 3000;

// Enable CORS for all routes
app.use(cors());

app.get('/download', async (req, res) => {
  try {
    const apiUrl = 'https://api.threadsdownloader.io/load?url=https://www.threads.net/t/CuW-WBAIljZ/?igshid=NTc4MTIwNjQ2YQ==';
    const response = await axios.get(apiUrl);
    const videoUrl = response.data.media[0].url;
    console.log(videoUrl);
    res.json({ videoUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
