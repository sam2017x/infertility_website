# LumiDB server readme

## Used technologies
- [Node.js](https://nodejs.org/en/)
- [Express - Node.js web application framework](https://expressjs.com/)

### Logging
- [bunyan - npm](https://www.npmjs.com/package/bunyan)
- [morgan - npm](https://www.npmjs.com/package/morgan)

### Security & Authentication
- [bcrypt - npm](https://www.npmjs.com/package/bcrypt)
- [json-web-token - npm](https://www.npmjs.com/package/json-web-token)

### Database
- [MongoDB](https://www.mongodb.com/)

## Documentation

### Api documentation
In order to view the API documentation, apiDoc needs to be installed.

[apiDoc - Inline Documentation for RESTful web APIs](http://apidocjs.com/)

1. In your terminal, go to *PROJECT_ROOT*/server
2. run the command `npm install apidoc -g`
3. To generate the api run `apidoc -i routes/ -o apidoc/`

### Layout
```   
    .
    ├── apidoc                  # Generated after generating API documentation
    ├── env                     # Environmental variables
    ├── logs                    # Log files of server activity
    ├── models                  # Models for controllers
    ├── routes                  # API routes
    │   └── controllers         # API controllers
    ├── apidoc.json             # ApiDoc configuration files
    ├── logger.js               # Server logging configuration
    ├── server.js               # Server entry point
    └── README.md
```