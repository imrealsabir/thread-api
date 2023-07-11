const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 3000;

// Enable CORS for all routes
app.use(cors());

app.get("/" , async ( req , res) => {
    res.send("welcome to thread api");
})

app.get('/download', async (req, res) => {
  try {
    const { link } = req.query
    const apiUrl = `https://api.threadsdownloader.io/load?url=${link}`;
    const response = await axios.get(apiUrl);
    const videoUrl = response.data.media[0].url;
    res.json({ videoUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
