const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const port = 8000;
const mongodbUrl = '';
const routes = require('./routes');
const app = express();

class Server {

  constructor() {
    this.initDB();
		this.initCorsMiddleware();
    this.initBodyParserMiddleware();
    this.initRoutes();
    this.start();
  }

  start() {
    app.set('port', (process.env.PORT || port));
    app.listen(app.get('port'), () => {
			console.log('Server listening on port ' + app.get('port'));
    });
  }

  initBodyParserMiddleware() {
		app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
	}
	
	initCorsMiddleware() {
		app.use(cors());
	}

  initRoutes() {
    app.use('/', routes);
  }

  initDB() {
    mongoose.connect(process.env.MONGODB_URL || mongodbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    mongoose.connection.on('connected', () => {
      console.log("Connected to mongo server");
    });
    mongoose.connection.on('error', (error) => {
      console.log('Database error: ' + error);
    });
  }
}

new Server();

module.exports = app;