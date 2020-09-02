const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const reportRoutes = require('./routes/reports');
const keywordRoutes = require('./routes/keywords');

const app = express();
app.use(bodyParser.json());

const dbUrl = require('./config/keys').mongoURI;

mongoose
	.connect(dbUrl)
	.then(()=> console.log('mongoDb connected'))
	.catch(err => console.log(err));

app.use('/api/reports', reportRoutes);
app.use('/api/keywords', keywordRoutes);
	
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is listenning on ${port}`));