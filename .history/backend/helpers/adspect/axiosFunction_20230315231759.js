const axios = require('axios');
require('dotenv').config();

let getStreams = async () => {
  try {
    const response = await axios.get('https://api.adspect.net/v1/streams', {
      headers: {
        Authorization: `Basic ${process.env.API_KEY_FOR_ADSPECT}`,
        'Content-Type': 'application/json',
      },
    });
    const data = response.data;
    return data;
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
};

module.exports = {
  getStreams,
};
