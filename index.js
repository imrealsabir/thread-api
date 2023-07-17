const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 3000;

// Enable CORS for multiple origins
const corsOptions = {
  origin: "*"
};

app.use(cors(corsOptions));

app.get("/", async (req, res) => {
  res.send("Welcome to the thread API");
});

app.get('/download', async (req, res) => {
  try {
    const { link } = req.query;
    const apiUrl = `https://downloadthreadsvideo.com/dl?url=${link}`;
    const response = await axios.get(apiUrl);
    const videoUrl = response.data[0];
    if(videoUrl)
    {
    res.json({ videoUrl });
    }
    else{

      const regex = /\/t\/([^/]+)/;
      const match = link.match(regex);
      const data = match ? match[1] : null;
      console.log(data);
      let redirectUrl = `https://threadsvideodownloader.com/download/${data}`
      res.redirect(redirectUrl);

    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred , please reload the page' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
