const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = 8000;
const routes = require('./routes');
const app = express();

class Server {

  constructor() {
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

}

new Server()