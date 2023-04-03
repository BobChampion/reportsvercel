const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
app.use(
  cors({
    origin: 'https://reportsvercel.vercel.app',
  }),
);
app.use(express.json());
const PORT = process.env.PORT || 8081;

// voluumn
let campaigns = [];
let errors = [];

//axios-functions //adspect
const { getStreams } = require('./helpers/adspect/axiosFunction');

//axios-functions //voluumn
const { voluumnAuth } = require('./helpers/voluumn/axiosFunctions');

//puppetter
const { doPuppetterTask, tests } = require('./helpers/voluumn/puppetterrFunctions');
const { getStreamsWithClick } = require('./helpers/adspect/puppetteer');

// app.use(express.static(path.join(__dirname, '../frontend/dist')));
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'https://reportsvercel.vercel.app');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});
app.get('/', (req, res) => {
  // res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'));
  res.send(tests);
});

app.get('/api/campaigns', (req, res) => {
  voluumnAuth('campaigns').then((result) => {
    campaigns = result;
    res.send(campaigns);
  });
});

app.get('/api/errors', (req, res) => {
  let from = req.query.from;
  let to = req.query.to;
  voluumnAuth('errors', from, to).then((result) => {
    errors = result;
    res.send(errors);
  });
});

app.get('/api/tests', (req, res) => {
  res.send(tests);
});

app.delete('/api/tests', (req, res) => {
  tests.length = 0;
  res.send('Tests clearedd');
});

app.post('/api/tests/:campaignName', (req, res) => {
  let { campaignName } = req.params;
  doPuppetterTask(campaignName, campaigns, res);
});

app.get('/api/streams', (req, res) => {
  getStreams().then((data) => {
    res.send(data);
  });
});

app.get('/api/streamswithclick', (req, res) => {
  getStreamsWithClick(res);
});

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
